import { category } from "@/api/category";
import { service } from "@/api/service";
import { salons } from "@/api/salons";
import { ServicesPageContent } from "@/components/widgets/services/ServicesPageContent";
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

    const currentPage = sp.page ? Number(sp.page) : 0;
    
    const queryParams: Record<string, any> = {
        categoryId: id,
        size: "16",
        sizeType: "STANDARD",
        cityId: cityId,
        page: currentPage,
    };

    const sortBy = sp.sortBy || "POPULARITY";
    queryParams.sortBy = sortBy;
    
    if (sortBy === "PRICE" && sp.ascending !== undefined) {
        const ascendingValue = Array.isArray(sp.ascending) ? sp.ascending[0] : sp.ascending;
        queryParams.ascending = ascendingValue === "true";
    }

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
        service.getBounds(Number(id), salonIds.map(String), subCategoryIds.map(String), cityId),
        salons.getSalons({categoryId: id, cityId: cityId}),
    ]);
    const subCategoryName = categoryData[0]?.parentName || "Категория";
    const breadcrumbs = [
        { label: "Главная", href: "/" },
        { label: "Категории", href: "/category" },
        { label: subCategoryName, href: `/category/${id}` },
    ];

    return (
        <ServicesPageContent
            categoryData={categoryData}
            servicesData={servicesData}
            boundsData={boundsData}
            salonsData={salonsData}
            subCategoryName={subCategoryName}
            breadcrumbs={breadcrumbs}
        />
    );
}
