import { cookies } from "next/headers";
import { geo } from "@/api/geo";

export async function getCitySlug(): Promise<string | null> {
  const cookieStore = await cookies();

  const citySlug =
    cookieStore.get("city_slug")?.value || cookieStore.get("slug")?.value;

  if (citySlug) {
    return citySlug;
  }

  const cityName =
    cookieStore.get("city_name")?.value || cookieStore.get("name")?.value;

  if (cityName) {
    try {
      const cityData = await geo.getChosenCity(cityName, false);
      if (cityData?.slug) {
        return cityData.slug;
      }
    } catch (error) {
      console.error("Error fetching city slug:", error);
    }
  }

  try {
    const cityNameByIp = await geo.getCityByIp();
    if (cityNameByIp) {
      const cityData = await geo.getChosenCity(cityNameByIp, false);
      if (cityData?.slug) {
        return cityData.slug;
      }
    }
  } catch (error) {
    console.error("Error getting city by IP:", error);
  }

  return null;
}
