import { category } from "@/api/category";
import {Breadcrumbs} from "@/components/shared/ui/Breadcrumbs";
import CategoryCard from "@/components/entities/cards/CategoryCard";


export default async function CategoryPage() {
  const categoryData = await category.getCategory({ level: "0" });
  const breadcrumbs = [
    { label: "Главная", href: "/" },
    { label: "Категории", href: "/category" },
  ];
  return (
    <div className="pageContainer">
      <div className="flex items-center justify-start w-full">
        <Breadcrumbs items={breadcrumbs} />
      </div>
      <h1 className="text-[32px] font-600 flex items-start w-full">Категории</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full px-4 sm:px-0">
        {categoryData.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}
