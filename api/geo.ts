import { http } from "./core";

export interface Country {
  id: string;
  name: string;
  dialCode: string;
  mask: string;
  flagUrl: string;
  active: boolean;
  currencyShort: string;
  currencySymbol: string;
  currencyCode: string;
}

export const geo = {
  getCityByIp: async (): Promise<string | null> => {
    try {
      const response = await fetch('https://api.sypexgeo.net/pnuX2/json');
      const data = await response.json();
      return data?.city?.name_ru || null;
    } catch (error) {
      console.error('API города лежит.', error);
      return null;
    }
  },
  getChosenCity: async (citySlug?: string, isClient: boolean = false): Promise<any> => {
    try {
      const url = citySlug 
        ? `/city/chosen?citySlug=${encodeURIComponent(citySlug)}`
        : '/city/chosen';
      
      if (isClient && typeof window !== 'undefined') {
        const apiUrl = `/api${url}`;
        
        const response = await fetch(apiUrl, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch city');
        }
        
        const data = await response.json();
        return data;
      }
      
      const response = await http.get(url);
      const data = await response;
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  getCountry: async (params: Record<string, string> = {}): Promise<Country[]> => {
    const searchParams = new URLSearchParams(params);
    const queryString = searchParams.toString();
    const normalizedUrl = queryString ? `/country?${queryString}` : "/country";
    try {
      const response = await http.get(normalizedUrl);
      const data = await response;
      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  },
};
