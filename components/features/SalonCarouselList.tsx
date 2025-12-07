"use client";
import { useState, useEffect } from "react";
import { salons } from "@/api/salons";
import SalonCard from "../entities/cards/SalonCard";
import { CarouselList } from "../widgets/Carousel";
import FilterSideScroll from "../shared/ui/FilterSideScroll";
import { useCategories } from "@/components/shared/hooks/useCategories";
import { useCityStore } from "@/components/shared/stores/cityStore";

export default function SalonList() {
  const [salonsData, setSalonsData] = useState<any[]>([]);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const {categories, loading, error } = useCategories();
  const city = useCityStore((state) => state.city);
  
  const handleCategoryClick = (categoryId: number) => {
    setCategoryId(categoryId);
  };  
  useEffect(() => {
    if (categories.length > 0 && !categoryId) {
      setCategoryId(categories[0].id);
    }
  }, [categories, categoryId]);

  useEffect(() => {
    const fetchSalons = async () => {
      if (!categoryId || !city?.id) return;
      const salonsData = await salons.getSalons({
        categoryId: categoryId?.toString() || "", 
        sizeType: "FULL",
        cityId: city.id.toString()
      });
      setSalonsData(salonsData);
    };
    fetchSalons();
  }, [categoryId, city?.id]);

  return (
    <CarouselList
      title="Салоны"
      linkTo="#"
      data={salonsData}
      cardsPerPage={4}
      renderItem={(salon) => (
        <SalonCard salon={salon} />
      )}
      filterComponent={
      <FilterSideScroll 
      elements={categories}
      handleCategoryClick={handleCategoryClick} 
      activeCategoryId={categoryId}
      />}
    />
  );
}
