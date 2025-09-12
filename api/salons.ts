interface Salon {
    categoryId: null | number;
}
export const salons = {
  getSalons: async (params: Record<string, string>): Promise<Salon[]> => {
    const p = new URLSearchParams(params);
    try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/salon?${p.toString()}`);
    const data = await response.json();
    return data.content;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}