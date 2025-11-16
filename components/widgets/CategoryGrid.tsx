import { Category } from "@/api/category";
import CategoryCard from "@/components/entities/cards/CategoryCard";
import { getCategoryUrl } from "@/components/shared/utils/getCategoryUrl";

interface CategoryGridProps {
  categories: Category[];
  className?: string;
  parentId?: number;
}

export default function CategoryGrid({ 
  categories, 
  className = "",
  parentId
}: CategoryGridProps) {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full px-4 sm:px-0 ${className}`}>
      {categories.map((category) => {
        const href = getCategoryUrl(category.id, category.level, parentId || category.parentId);   
        return (
          <CategoryCard 
            key={category.id} 
            category={category} 
            href={href}
          />
        );
      })}
    </div>
  );
}

