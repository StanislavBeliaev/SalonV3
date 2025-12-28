import { Metadata } from "next";
import { category } from "@/api/category";
import { service } from "@/api/service";
import { salons } from "@/api/salons";
import { ServicesPageContent } from "@/components/widgets/services/ServicesPageContent";
import { getCityId } from "@/components/shared/utils/getCityId";

export async function generateMetadata({ params }: { params: Promise<{ cityName: string, servicesname: string }> }): Promise<Metadata> {
  const { servicesname } = await params;
  const cityIdNumber = await getCityId();
  const cityId = cityIdNumber.toString();
  
  const parentCategoryData = await category.getCategory({
    level: "0",
    cityId: cityId,
  });
  
  const parentCategory = parentCategoryData.find(cat => cat.slug === servicesname);
  const categoryName = parentCategory?.name || "Услуги";
  
  return {
    title: `Услуги - ${categoryName}`,
  };
}
const getSubCategoryIds = (rawSubCat: string | string[] | undefined) => {
    let subCategoryIds: number[] = [];
    if (rawSubCat) {
        if (Array.isArray(rawSubCat)) {
            subCategoryIds = rawSubCat.map(Number).filter(n => !isNaN(n));
        } else {
            const num = Number(rawSubCat);
            if (!isNaN(num)) subCategoryIds = [num];
        }
    }
    return subCategoryIds;
}

export default async function ServicesPage({ 
    params, 
    searchParams 
}: { 
    params: Promise<{ cityName: string, servicesname: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const { servicesname } = await params;
    const sp = await searchParams;
    const cityIdNumber = await getCityId();
    const cityId = cityIdNumber.toString();

    let subCategoryIds: number[] = getSubCategoryIds(sp.subcategoryId);

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

    const parentCategoryData = await category.getCategory({
        level: "0",
        cityId: cityId,
    });

    const parentCategory = parentCategoryData.find(cat => cat.slug === servicesname);
    if (!parentCategory) {
        console.log('Category not found', servicesname);
    }

    const categoryId = parentCategory?.id.toString() || "";
    const currentPage = sp.page ? Number(sp.page) : 0;
    
    const queryParams: Record<string, any> = {
        categoryId: categoryId,
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

    const [categoryData, servicesData] = await Promise.all([
        category.getCategory({
            level: "1",
            parentId: categoryId,
        }),
        service.getServices(queryParams),
    ]);
    
    const [boundsData, salonsData] = await Promise.all([
        service.getBounds(categoryId, salonIds.map(String), subCategoryIds.map(String)),
        salons.getSalons({slugId: servicesname, cityId: cityId}),
    ]);
    const subCategoryName = categoryData[0]?.parentName || "Категория";
    const breadcrumbs = [
        { label: "Главная", href: "/" },
        { label: "Категории", href: "/category" },
        { label: subCategoryName, href: `/category/${servicesname}` },
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
