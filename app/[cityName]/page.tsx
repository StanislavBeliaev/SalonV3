import { Metadata } from "next";
import { banner } from "@/api/banner";
import { category } from "@/api/category";
import BannerSlider from "@/components/features/BannerSlide";
import CategoryCarouselList from "@/components/features/CategoryCarouselList";
import SalonCarouselList from "@/components/features/SalonCarouselList";
import ServiceCarouselList from "@/components/features/ServiceCarouselList";
import { service } from "@/api/service";
import Banner from "@/components/features/Banner";
import { cookies } from 'next/headers';
import { geo } from "@/api/geo";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Главная",
};

export default async function CityHomePage({ 
  params 
}: { 
  params: Promise<{ cityName: string }> 
}) {
  const { cityName } = await params;
  const decodedCityName = decodeURIComponent(cityName);
  const cookieStore = await cookies();
  
  let cityId = cookieStore.get('City_id')?.value || "1";
  
  try {
    const cityData = await geo.getChosenCity(decodedCityName, false);
    
    if (cityData && cityData.id) {
      cityId = cityData.id.toString();
    } else {
      redirect('/');
    }
  } catch (error) {
    console.error('Error fetching city:', error);
    redirect('/');
  }

  const [bannerData, categoryData, servicesDataPopular, servicesDataNew,] =
    await Promise.all([
      banner.getBanner(Number(cityId)),
      category.getCategory({ level: "0", cityId: cityId }),
      service.getSelectionServices({
        size: "10",
        sortBy: "POPULARITY",
        sizeType: "STANDARD",
        cityId: cityId,
      }),
      service.getSelectionServices({
        size: "10",
        sortBy: "NEWNESS",
        sizeType: "STANDARD",
        cityId: cityId,
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

