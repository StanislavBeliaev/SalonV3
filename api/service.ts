import { http } from "./core";

interface ServicePicture {
    smallAvatar: string;
}

interface ServiceCurrency {
    currencySymbol: string;
}

interface ServiceSalon {
    name: string;
    currency: ServiceCurrency;
}

export interface Service {
    id?: number;
    serviceId: number;
    name: string;
    smallAvatar?: string;
    salon: ServiceSalon;
    exactPrice?: number | null;
    minPrice: number;
    maxPrice: number;
    duration: number;
    onlineReservation: boolean;
    pictures: ServicePicture[];
}
export const service = {
    getSelectionServices: async (params: Record<string, string>): Promise<Service[]> => {
        const p = new URLSearchParams(params);
        try {
            const response = await http.get(`/service/selection?${p.toString()}`);
            const data = await response;
            return data;
        } catch (error) {
            console.error(error);
            return [];
        }
    },
    getServices: async (params: Record<string, string>): Promise<Service[]> => {
        const p = new URLSearchParams(params);
        try {
            const response = await http.get(`/service/page?${p.toString()}`);
            const data = await response;
            return data.content;
        } catch (error) {
            console.error(error);
            return [];
        }
    }
}