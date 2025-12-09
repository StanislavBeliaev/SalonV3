import { Metadata } from "next";
import { banner } from "@/api/banner";
import { category } from "@/api/category";
import BannerSlider from "@/components/features/BannerSlide";
import CategoryCarouselList from "@/components/features/CategoryCarouselList";
import SalonCarouselList from "@/components/features/SalonCarouselList";
import ServiceCarouselList from "@/components/features/ServiceCarouselList";
import { service } from "@/api/service";
import Banner from "@/components/features/Banner";

export const metadata: Metadata = {
  title: "Главная",
};

export default async function CityHomePage() {
  const [bannerData, categoryData, servicesDataPopular, servicesDataNew] =
    await Promise.all([
      banner.getBanner(),
      category.getCategory({ level: "0" }),
      service.getSelectionServices({
        size: "10",
        sortBy: "POPULARITY",
        sizeType: "STANDARD",
      }),
      service.getSelectionServices({
        size: "10",
        sortBy: "NEWNESS",
        sizeType: "STANDARD",
      }),
    ]);
    
  return (
    <div className="pageContainer">
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

