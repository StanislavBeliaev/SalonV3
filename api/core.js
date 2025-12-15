const BASE_URL = process.env.NODE_ENV === 'production'
  ? process.env.NEXT_PUBLIC_BASE_URL_RELEASE
  : process.env.NEXT_PUBLIC_BASE_URL_TEST;
  
class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

async function getServerCookies() {
  if (typeof window !== 'undefined') return {};
  
  try {
    const { cookies: getCookies } = await import('next/headers');
    const cookieStore = await getCookies();
    const cookieMap = {};
    
    cookieStore.getAll().forEach(cookie => {
      cookieMap[cookie.name] = cookie.value;
    });
    
    return cookieMap;
  } catch (error) {
    return {};
  }
}

export async function fetcher(endpoint, options = {}) {
  const isClient = typeof window !== 'undefined';
  const url = isClient ? `/api${endpoint}` : `${BASE_URL}${endpoint}`;
  
  let cookieHeader = null;
  
  if (options.cookies) {
    cookieHeader = Object.entries(options.cookies)
      .map(([key, value]) => `${key}=${value}`)
      .join('; ');
  } else if (typeof window === 'undefined') {
    const serverCookies = await getServerCookies();
    if (Object.keys(serverCookies).length > 0) {
      cookieHeader = Object.entries(serverCookies)
        .map(([key, value]) => `${key}=${value}`)
        .join('; ');
    }
  }
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...(cookieHeader && { 'Cookie': cookieHeader }),
      ...options.headers,
    },
    credentials: 'include',
    next: { 
      revalidate: 60,
      ...options.next, 
    },
  };

  const { cookies, ...restOptions } = options;
  
  const config = {
    ...defaultOptions,
    ...restOptions,
    headers: {
      ...defaultOptions.headers,
      ...restOptions.headers,
    },
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        errorData = { message: response.statusText };
      }
      
      throw new ApiError(
        errorData.message || 'API request failed',
        response.status,
        errorData
      );
    }

    const contentLength = response.headers.get('content-length');
    if (contentLength === '0' || response.status === 204) {
      return null;
    }

    return await response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    
    throw new ApiError(
      error.message || 'Network error',
      0,
      { message: error.message }
    );
  }
}

export const http = {
  get: (endpoint, options) => fetcher(endpoint, { ...options, method: 'GET' }),
  post: (endpoint, data, options) => fetcher(endpoint, { 
    ...options, 
    method: 'POST', 
    body: JSON.stringify(data) 
  }),
  put: (endpoint, data, options) => fetcher(endpoint, { 
    ...options, 
    method: 'PUT', 
    body: JSON.stringify(data) 
  }),
  patch: (endpoint, data, options) => fetcher(endpoint, { 
    ...options, 
    method: 'PATCH', 
    body: JSON.stringify(data) 
  }),
  delete: (endpoint, options) => fetcher(endpoint, { ...options, method: 'DELETE' }),
};