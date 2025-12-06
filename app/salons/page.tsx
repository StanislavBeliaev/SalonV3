import { Metadata } from "next";
import { category } from "@/api/category";
import { salons } from "@/api/salons";
import { SalonsPageContent } from "@/components/widgets/salons/SalonsPageContent";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Салоны",
};

export default async function SalonsPage({ 
    searchParams 
}: { 
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const sp = await searchParams;
    const cookieStore = await cookies();
    const cityId = cookieStore.get('City_id')?.value || "1";
    
    let categoryIds: number[] = [];
    const rawCategoryIds = sp.categoryId;
    if (rawCategoryIds) {
        if (Array.isArray(rawCategoryIds)) {
            categoryIds = rawCategoryIds.map(Number).filter(n => !isNaN(n));
        } else {
            const num = Number(rawCategoryIds);
            if (!isNaN(num)) categoryIds = [num];
        }
    }

    const currentPage = sp.page ? Number(sp.page) : 0;
    
    const queryParams: Record<string, any> = {
        size: "16",
        sizeType: "STANDARD",
        cityId: cityId,
        page: currentPage,
    };

    const sortBy = sp.sortBy || "POPULARITY";
    queryParams.sortBy = sortBy;

    if (categoryIds.length > 0) {
        queryParams.categoryId = categoryIds;
    }

    const [categoriesData, salonsData] = await Promise.all([
        category.getCategory({ level: "0" }),
        salons.getSalonsWithPagination(queryParams),
    ]);

    const breadcrumbs = [
        { label: "Главная", href: "/" },
        { label: "Салоны", href: "/salons" },
    ];

    return (
        <div className="animate-fade-in">
        <SalonsPageContent
            categoriesData={categoriesData}
            salonsData={salonsData}
            breadcrumbs={breadcrumbs}
        />
        </div>
    );
}

