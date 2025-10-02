import { http } from "./core";
interface Country {
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
            console.log('data', data);
            return data;
        } catch (error) {
            console.error(error);
            return;
        }
    },
    getCountry: async (params: Record<string, string>): Promise<Country[]> => {
        const p = new URLSearchParams(params);
        try {
            const response = await http.get(`/country?${p.toString()}`);
            const data = await response;
            return data;
        } catch (error) {
            console.error(error);
            return [];
        }
    }
}
