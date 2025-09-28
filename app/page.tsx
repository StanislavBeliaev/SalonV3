import { banner } from "@/api/banner";
import { category } from "@/api/category";
import BannerSlider from "@/components/features/BannerSlide";
import CategoryCarouselList from "@/components/features/CategoryCarouselList";
import SalonCarouselList from "@/components/features/SalonCarouselList";
import ServiceCarouselList from "@/components/features/ServiceCarouselList";
import { service } from "@/api/service";
import Banner from "@/components/features/Banner";
import { SyncWithLocalStorage } from "@/components/features/LocalStorage";
import { cookies } from 'next/headers';

export default async function Home() {
  const cookieStore = await cookies();
  const cityId = cookieStore.get('City_id')?.value || 1;
  const [bannerData, categoryData, servicesDataPopular, servicesDataNew,] =
    await Promise.all([
      banner.getBanner(cityId as number),
      category.getCategory({ level: "0", cityId: cityId as string }),
      service.getServices({
        size: "10",
        sortBy: "POPULARITY",
        sizeType: "STANDARD",
        cityId: cityId as string,
      }),
      service.getServices({
        size: "10",
        sortBy: "NEWNESS",
        sizeType: "STANDARD",
        cityId: cityId as string,
      }),
    ]);
  return (
    <div className="flex flex-col items-center w-full gap-10 pb-42">
      <SyncWithLocalStorage />
      <BannerSlider banners={bannerData} />
      <SalonCarouselList />
      <CategoryCarouselList categoryData={categoryData} />
      <ServiceCarouselList
        servicesData={servicesDataPopular}
        title="Популярные услуги"
      />
      <ServiceCarouselList
        servicesData={servicesDataNew}
        title="Новые услуги"
      />
      <Banner />
    </div>
  );
}
