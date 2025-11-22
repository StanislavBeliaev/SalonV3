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

const createSearchParams = (params: Record<string, any>): URLSearchParams => {
    const p = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            value.forEach(v => p.append(key, String(v)));
        } else if (value !== undefined && value !== null) {
            p.append(key, String(value));
        }
    });
    return p;
}

export const service = {
    getSelectionServices: async (params: Record<string, any>): Promise<Service[]> => {
        const p = createSearchParams(params);
        try {
            const response = await http.get(`/service/selection?${p.toString()}`);
            const data = await response;
            return data;
        } catch (error) {
            console.error(error);
            return [];
        }
    },
    getServices: async (params: Record<string, any>): Promise<Service[]> => {
        const p = createSearchParams(params);
        try {
            const response = await http.get(`/service/page?${p.toString()}`);
            const data = await response;
            return data.content;
        } catch (error) {
            console.error(error);
            return [];
        }
    },
    getBounds: async (categoryId: number, salonId: Array<string>, subcategoryId: Array<string>, cityId: number | string) => {
        const body = {
            categoryId: categoryId.toString(),
            salonIds: salonId,
            subcategoryId: subcategoryId,
            cityId: cityId
        };
        
        try {
            const response = await http.post(`/service/bounds`, body);
            const data = await response;
            return data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}
