"use client";
import CategoryCard from "@/components/entities/cards/CategoryCard";
import { CarouselList } from "@/components/widgets/Carousel";
import { Category } from "@/api/category";
import { getCategoryUrl } from "@/components/shared/utils/getCategoryUrl";

interface CategoryCarouselListProps {
  categoryData: Category[];
  parentId?: number;
}

export default function CategoryCarouselList({ 
  categoryData,
  parentId 
}: CategoryCarouselListProps) {
  return (
    <CarouselList
      title="Категории"
      linkTo="#"
      data={categoryData}
      cardsPerPage={4}
      renderItem={(category) => {
        const href = getCategoryUrl(
          category.id, 
          category.level, 
          parentId || category.parentId
        );
        
        return (
          <CategoryCard 
            category={category} 
            href={href} 
          />
        );
      }}
    />
  );
}
