"use client";
import { useCityStore } from "../stores/cityStore";
export function getCategoryUrl(
  categorySlug: string,
): string {
  const city = useCityStore((state) => state.city);
  return `/${city?.slug}/${categorySlug}`;
}

