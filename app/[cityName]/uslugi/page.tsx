import { Metadata } from "next";
import { category } from "@/api/category";
import { BreadcrumbsSection } from "@/components/features/Breadcrumbs";
import PageTitle from "@/components/widgets/PageTitle";
import CategoryGrid from "@/components/widgets/CategoryGrid";

export const metadata: Metadata = {
  title: "Категории",
};

export default async function CategoryPage() {
  const categoryData = await category.getCategory({ level: "0" });
  const breadcrumbs = [
    { label: "Главная", href: "/" },
    { label: "Категории", href: "/category" },
  ];
  return (
    <div className="pageContainer">
      <BreadcrumbsSection items={breadcrumbs} />
      <PageTitle title="Категории" showButton={false}/>
      {categoryData.length > 0 && (
        <CategoryGrid categories={categoryData} />
      )}
    </div>
  );
}
