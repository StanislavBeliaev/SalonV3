import { category } from "@/api/category";
import { BreadcrumbsSection } from "@/components/features/Breadcrumbs";
import PageTitle from "@/components/widgets/PageTitle";
import CategoryGrid from "@/components/widgets/CategoryGrid";

interface CategoryPageProps {
  params: Promise<{ id: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { id } = await params;
  
  const categoryData = await category.getCategory({
    level: "1",
    parentId: id,
  });
  
  const subCategoryName = categoryData[0]?.parentName || "Категория";
  const breadcrumbs = [
    { label: "Главная", href: "/" },
    { label: "Категории", href: "/category" },
    { label: subCategoryName, href: `/category/${id}` },
  ];
  return (
    <div className="pageContainer">
      <BreadcrumbsSection items={breadcrumbs} />
      <PageTitle title={subCategoryName}/>
      {categoryData.length > 0 && (
        <CategoryGrid categories={categoryData} parentId={Number(id)} />
      )}
    </div>
  );
}
