import { http } from "./core";
export interface Category {
  id: number;
  name: string;
  smallPhoto: string;
  level: number;
  parentId: number;
  parentName: string;
  salonsCount: number;
  tags: string;
  cityId: number;
}
export const category = {
  getCategory: async (params: Record<string, string>): Promise<Category[]> => {
    const p = new URLSearchParams(params);
    try {
    const response = await http.get(`/category?${p.toString()}`);
    const data = await response;
    return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  },
  getCategoryPopular: async (cityId: number | string): Promise<Category[]> => {
    try {
    const response = await http.get(`/category/popular?cityId=${cityId}`);
    const data = await response;
    return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}