"use client";
import CategoryCard from "@/components/entities/cards/CategoryCard";
import { CarouselList } from "@/components/widgets/Carousel";
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
