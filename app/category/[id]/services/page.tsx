import { category } from "@/api/category";
import { service } from "@/api/service";
import { salons } from "@/api/salons";
import { BreadcrumbsSection } from "@/components/features/Breadcrumbs";
import { ServicesFilter } from "@/components/features/services-filters/ui/ServicesFilter";
import { ServicesGrid } from "@/components/widgets/services/ServicesGrid";
import PageTitle from "@/components/widgets/PageTitle";
import { cookies } from "next/headers";

export default async function ServicesPage({ 
    params, 
    searchParams 
}: { 
    params: Promise<{ id: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const { id } = await params;
    const sp = await searchParams;
    const cookieStore = await cookies();
    const cityId = cookieStore.get('City_id')?.value || "1";
    
    let subCategoryIds: number[] = [];
    const rawSubCat = sp.subcategoryId;
    if (rawSubCat) {
        if (Array.isArray(rawSubCat)) {
            subCategoryIds = rawSubCat.map(Number).filter(n => !isNaN(n));
        } else {
            const num = Number(rawSubCat);
            if (!isNaN(num)) subCategoryIds = [num];
        }
    }

    let salonIds: number[] = [];
    const rawSalonIds = sp.salonId;
    if (rawSalonIds) {
         if (Array.isArray(rawSalonIds)) {
             salonIds = rawSalonIds.map(Number).filter(n => !isNaN(n));
         } else {
             const num = Number(rawSalonIds);
             if (!isNaN(num)) salonIds = [num];
         }
    }

    const queryParams: Record<string, any> = {
        categoryId: id,
        size: "16",
        sizeType: "STANDARD",
        cityId: cityId,
        sortBy: sp.sortBy || "POPULARITY",
    };

    if (subCategoryIds.length > 0) {
        queryParams.subcategoryId = subCategoryIds;
    }
    if (salonIds.length > 0) {
        queryParams.salonId = salonIds;
    }
    if (sp.minPrice) queryParams.minPrice = sp.minPrice;
    if (sp.maxPrice) queryParams.maxPrice = sp.maxPrice;

    const [categoryData, servicesData, boundsData, salonsData] = await Promise.all([
        category.getCategory({
            level: "1",
            parentId: id,
        }),
        service.getServices(queryParams),
        service.getBounds(Number(id),salonIds.map(String), subCategoryIds.map(String), cityId),
        salons.getSalons({categoryId: id, cityId: cityId}),
    ]);
    const subCategoryName = categoryData[0]?.parentName || "Категория";
    const breadcrumbs = [
        { label: "Главная", href: "/" },
        { label: "Категории", href: "/category" },
        { label: subCategoryName, href: `/category/${id}` },
    ];

    return (
        <div className="pageContainer">
            <BreadcrumbsSection items={breadcrumbs} />
            <PageTitle title={subCategoryName} buttonType="map" buttonText="Смотреть в режиме карты" />
            <div className="flex justify-between w-full gap-4">
                <aside className="w-1/4">
                    <ServicesFilter 
                        categories={categoryData} 
                        bounds={boundsData} 
                        salons={salonsData}
                    />
                </aside>
                <div className="flex-1">
                    <ServicesGrid services={servicesData} />
                </div>
            </div>
        </div>
    );
}
