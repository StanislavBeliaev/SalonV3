import { banner } from "@/api/banner";
import { category } from "@/api/category";
import BannerSlider from "@/components/features/BannerSlide";
import CategoryCarouselList from "@/components/features/CategoryCarouselList";
import SalonCarouselList from "@/components/features/SalonCarouselList";
import ServiceCarouselList from "@/components/features/ServiceCarouselList";
import { service } from "@/api/service";
import Banner from "@/components/features/Banner";
import { SyncWithLocalStorage } from "@/components/features/LocalStorage";
import { geo } from "@/api/geo";

export default async function Home() {
  const [bannerData, categoryData, servicesDataPopular, servicesDataNew, chosenCity] =
    await Promise.all([
      banner.getBanner(),
      category.getCategory({ level: "0" }),
      service.getServices({
        size: "10",
        sortBy: "POPULARITY",
        sizeType: "STANDARD",
      }),
      service.getServices({
        size: "10",
        sortBy: "NEWNESS",
        sizeType: "STANDARD",
      }),
      geo.getChosenCity(),
    ]);
  return (
    <div className="flex flex-col items-center w-full gap-10 pb-42">
      <SyncWithLocalStorage data={chosenCity} storageKey="chosenCity" />
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
