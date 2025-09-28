const BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://test3.salon.balinasoft.com/api/v1'
  : 'http://localhost:3000/api';
  
class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

export async function fetcher(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    credentials: 'include',
    next: { 
      revalidate: 60,
      ...options.next, 
    },
  };

  const config = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
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