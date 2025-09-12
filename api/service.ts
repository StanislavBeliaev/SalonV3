export interface Service {
    arrayBounds: Array<number>;
    ascending: boolean;
    categoryId: number;
    cityId: number;
    date: string;
    deleted: boolean;
    hidden: boolean;
    masterId: number;
    maxPrice: number;
    minPrice: number;
    page: number;
    promocodeId: number;
    salonId: Array<number>;
    serviceId: number;
    size: number;
    sizeType: "SMALLEST" | "SMALL" | "STANDARD" | "FULL";
    sortBy: "PRICE" | "DURATION" | "POPULARITY" | "NEWNESS" | "DISTANCE";
    subcategoryId: Array<number>;
    tags: Array<string>;
    timeHour: number;
    timeMinute: number;
    timeNano: number;
    timeSecond: number;
    userLat: number;
    userLng: number;
}
export const service = {
    getServices: async (params: Record<string, string>): Promise<Service[]> => {
        const p = new URLSearchParams(params);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/service/selection?${p.toString()}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
            return [];
        }
    }
}