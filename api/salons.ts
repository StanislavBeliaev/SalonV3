import { http } from "./core";

export interface Salon {
    id: number;
    name: string;
    categoryId: null | number;
    contactAddress?: string;
    smallAvatar?: string;
    rating?: number;
    reviewsCount?: number;
    liked?: boolean;
}

export interface SalonsResponse {
    content: Salon[];
    totalElements: number;
    totalPages: number;
    number: number;
    size: number;
}

export const salons = {
  getSalons: async (params: Record<string, string | number | string[]>): Promise<Salon[]> => {
    const p = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach(v => p.append(key, String(v)));
      } else {
        p.append(key, String(value));
      }
    });
    try {
      const response = await http.get(`/salon?${p.toString()}`);
      const data = await response;
      return data.content || [];
    } catch (error) {
      console.error(error);
      return [];
    }
  },
  getSalonsWithPagination: async (params: Record<string, string | number | string[]>): Promise<SalonsResponse> => {
    const p = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach(v => p.append(key, String(v)));
      } else {
        p.append(key, String(value));
      }
    });
    try {
      const response = await http.get(`/salon?${p.toString()}`);
      const data = await response;
      return {
        content: data.content || [],
        totalElements: data.totalElements || 0,
        totalPages: data.totalPages || 0,
        number: data.number || 0,
        size: data.size || 0,
      };
    } catch (error) {
      console.error(error);
      return {
        content: [],
        totalElements: 0,
        totalPages: 0,
        number: 0,
        size: 0,
      };
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