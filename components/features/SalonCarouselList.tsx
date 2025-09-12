"use client";
import { useState, useEffect } from "react";
import { salons } from "@/api/salons";
import SalonCard from "../entities/cards/SalonCard";
import { CarouselList } from "../widgets/Carousel";
import FilterSideScroll from "../shared/ui/FilterSideScroll";
import { category } from "@/api/category";

export default function SalonList() {
  const [salonsData, setSalonsData] = useState<any[]>([]);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [elements, setElements] = useState<any[]>([]);

  const handleCategoryClick = (categoryId: number) => {
    setCategoryId(categoryId);
  };
  const fetchCategory = async () => {
    const categoryData = await category.getCategory({level: "0"});
    setElements(categoryData);
    if (categoryData.length > 0) {
      handleCategoryClick(categoryData[0].id);
    }
  };
  const fetchSalons = async () => {
    if (categoryId) {
    const salonsData = await salons.getSalons({categoryId: categoryId?.toString() || ""});
      setSalonsData(salonsData);
    }
  };
  useEffect(() => {
    fetchCategory();
  }, []);

  useEffect(() => {
    fetchSalons();
  }, [categoryId]);

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
      elements={elements}
      handleCategoryClick={handleCategoryClick} 
      activeCategoryId={categoryId}
      />}
    />
  );
}
