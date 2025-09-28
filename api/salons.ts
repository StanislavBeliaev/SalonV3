import { http } from "./core";
interface Salon {
    categoryId: null | number;
}
export const salons = {
  getSalons: async (params: Record<string, string>): Promise<Salon[]> => {
    const p = new URLSearchParams(params);
    try {
    const response = await http.get(`/salon?${p.toString()}`);
    const data = await response;
    return data.content;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}