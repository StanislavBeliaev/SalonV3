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
  },
  likeSalon: async (salonId: number): Promise<void> => {
    try {
      await http.post(`/salon/${salonId}/like`, {});
    } catch (error) {
      console.error("Error liking salon:", error);
      throw error;
    }
  },
  unlikeSalon: async (salonId: number): Promise<void> => {
    try {
      await http.delete(`/salon/${salonId}/like`);
    } catch (error) {
      console.error("Error unliking salon:", error);
      throw error;
    }
  }
}