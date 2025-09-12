interface Banner {
    id: number,
    photoUri: string,
    uri: string
}
export const banner = {
    async getBanner(): Promise<Banner[]> {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/banners`)
            const data = await response.json()
            return data
        } catch (error) {
            console.error(error)
            return []
        }
    }
}