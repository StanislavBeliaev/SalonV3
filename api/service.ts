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
    getServices: async (params: Record<string, any>): Promise<{ content: Service[], totalPages: number, totalElements: number, number: number }> => {
        const p = createSearchParams(params);
        try {
            const response = await http.get(`/service/page?${p.toString()}`);
            const data = await response;
            return {
                content: data.content || [],
                totalPages: data.totalPages || 0,
                totalElements: data.totalElements || 0,
                number: data.number || 0
            };
        } catch (error) {
            console.error(error);
            return { content: [], totalPages: 0, totalElements: 0, number: 0 };
        }
    },
    getBounds: async (categoryId: string, salonId: Array<string>, subcategoryId: Array<string>, cityId: number | string) => {
        const body = {
            categoryId: categoryId,
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
