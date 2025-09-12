"use client";
import CategoryCard from "../entities/cards/CategoryCard";
import { CarouselList } from "../widgets/Carousel";
import { Category } from "@/api/category";

export default function CategoryCarouselList({ categoryData }: { categoryData: Category[] }) {
 
  return (
    <CarouselList
      title="Категории"
      linkTo="#"
      data={categoryData}
      cardsPerPage={4}
      renderItem={(category) => (
        <CategoryCard category={category} />
      )}
    />
  );
}
