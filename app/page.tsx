import { redirect } from "next/navigation";
import { getCitySlug } from "@/components/shared/utils/getCitySlug";

export default async function Home() {
  const citySlug = await getCitySlug();
  
  if (citySlug) {
    redirect(`/${citySlug}`);
  }

  return null;
}
