import { banner } from "@/api/banner";
import { category } from "@/api/category";
import BannerSlider from "@/components/features/BannerSlide";
import CategoryCarouselList from "@/components/features/CategoryCarouselList";
import SalonCarouselList from "@/components/features/SalonCarouselList";
import ServiceCarouselList from "@/components/features/ServiceCarouselList";
import { Suspense } from "react";
import { service } from "@/api/service";
import Banner from "@/components/features/Banner";

export default async function Home() {
  const bannerData = await banner.getBanner();
  const categoryData = await category.getCategory({ level: "0" });
  const servicesDataPopular = await service.getServices({
    size: "10",
    sortBy: "POPULARITY",
    sizeType: "STANDARD",
  });
  const servicesDataNew = await service.getServices({
    size: "10",
    sortBy: "NEWNESS",
    sizeType: "STANDARD",
  });
  return (
    <div className="flex flex-col items-center w-full gap-10 pb-42">
      
      <Suspense fallback={<div>Loading...</div>}>
        <BannerSlider banners={bannerData} />
      </Suspense>

      <SalonCarouselList />

      <Suspense fallback={<div>Loading...</div>}>
        <CategoryCarouselList categoryData={categoryData} />
      </Suspense>

      <Suspense fallback={<div>Loading...</div>}>
        <ServiceCarouselList servicesData={servicesDataPopular} title="Популярные услуги" />
      </Suspense>

      <Suspense fallback={<div>Loading...</div>}>
        <ServiceCarouselList servicesData={servicesDataNew} title="Новые услуги" />
      </Suspense>

        <Banner />

    </div>
  );
}
