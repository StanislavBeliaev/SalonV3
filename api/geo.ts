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
  getChosenCity: async (): Promise<void> => {
    try {
      const response = await http.get(`/city/chosen?cityName=Минск`);
      const data = await response;
      return data;
    } catch (error) {
      console.error(error);
      return;
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
