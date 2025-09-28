import { http } from "./core";

export const geo = {
    getChosenCity: async (): Promise<void> => {
        try {
            const response = await http.get(`/city/chosen`);
            const data = await response;
            console.log('data', data);
            return data;
        } catch (error) {
            console.error(error);
            return;
        }
    }
}
