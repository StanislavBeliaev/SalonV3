import { category } from "@/api/category";
import { service, Service } from "@/api/service";
import { BreadcrumbsSection } from "@/components/features/Breadcrumbs";
import PageTitle from "@/components/widgets/PageTitle";
import { cookies } from "next/headers";
import ServiceCard from "@/components/entities/cards/ServiceCard";

export default async function ServicesPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const cookieStore = await cookies();
    const cityId = cookieStore.get('City_id')?.value || 1;
    const [categoryData, servicesData] = await Promise.all([
        category.getCategory({
            level: "1",
            parentId: id,
        }),
        service.getServices({
            categoryId: id,
            size: "10",
            sizeType: "STANDARD",
            cityId: cityId as string,
        }),
    ]);
    const subCategoryName = categoryData[0]?.parentName || "Категория";
    const breadcrumbs = [
        { label: "Главная", href: "/" },
        { label: "Категории", href: "/category" },
        { label: subCategoryName, href: `/category/${id}` },
      ];
  return(
    <div className="pageContainer">
        <BreadcrumbsSection items={breadcrumbs} />
        <PageTitle title={subCategoryName} buttonType="map" buttonText="Смотреть в режиме карты" />
        <div className="flex justify-between w-full">
            <div className="w-1/4">
                <h2 className="text-fs16 font-700">Сортировка</h2>
            </div>
            <div className="grid grid-cols-2 gap-2">
                 {servicesData.map((item: Service) => (
                    <div key={item.serviceId}>
                        <ServiceCard service={item} />
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}