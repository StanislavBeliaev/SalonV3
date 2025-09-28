import { http } from "./core";
interface Banner {
    id: number,
    photoUri: string,
    uri: string
}
export const banner = {
    async getBanner(): Promise<Banner[]> {
        try {
            const response = await http.get(`/banners`)
            const data = await response;
            return data
        } catch (error) {
            console.error(error)
            return []
        }
    }
}