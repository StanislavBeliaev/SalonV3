export interface Category {
  id: number;
  name: string;
  smallPhoto: string;
  level: number;
  parentId: number;
  parentName: string;
  salonsCount: number;
  tags: string;
}
export const category = {
  getCategory: async (params: Record<string, string>): Promise<Category[]> => {
    const p = new URLSearchParams(params);
    try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category?${p.toString()}`);
    const data = await response.json();
    return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}