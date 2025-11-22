"use client";
import { Category } from "@/api/category";
import { Salon } from "@/api/salons";
import { Checkbox, CheckboxGroup, Slider } from "@heroui/react";
import SelectComponent from "@/components/shared/ui/Select";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface ServicesFilterProps {
    categories: Category[];
    bounds: {
        minPrice: number;
        maxPrice: number;
    } | null;
    salons: Salon[];
}

export const ServicesFilter = ({ categories, bounds, salons }: ServicesFilterProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const initialSubCategoryIds = searchParams.getAll("subcategoryId");
    const initialSalonIds = searchParams.getAll("salonId");
    
    const urlSortBy = searchParams.get("sortBy");
    const urlAscending = searchParams.get("ascending");
    let currentSort = "POPULARITY";
    
    if (urlSortBy === "PRICE") {
        currentSort = urlAscending === "true" ? "PRICE_ASC" : "PRICE_DESC";
    } else if (urlSortBy) {
        currentSort = urlSortBy;
    }
    
    const [selectedCategories, setSelectedCategories] = useState<string[]>(initialSubCategoryIds);
    const [selectedSalons, setSelectedSalons] = useState<string[]>(initialSalonIds);
    const [priceRange, setPriceRange] = useState<number[]>([
        bounds?.minPrice || 0,
        bounds?.maxPrice || 1000
    ]);
    const [showAllSalons, setShowAllSalons] = useState(false);

    const sortOptions = [
        { key: "POPULARITY", label: "По популярности", ascending: false },
        { key: "NEWNESS", label: "По новизне", ascending: false },
        { key: "PRICE_ASC", label: "Сначала дешевые", ascending: true },
        { key: "PRICE_DESC", label: "Сначала дорогие", ascending: false },
    ];

    useEffect(() => {
        if (bounds) {
             const urlMin = searchParams.get("minPrice");
             const urlMax = searchParams.get("maxPrice");
             
             let minPrice = bounds.minPrice;
             let maxPrice = bounds.maxPrice;
             
             if (urlMin) {
                 const parsedMin = Number(urlMin);
                 minPrice = (parsedMin >= bounds.minPrice && parsedMin <= bounds.maxPrice) 
                     ? parsedMin 
                     : bounds.minPrice;
             }
             
             if (urlMax) {
                 const parsedMax = Number(urlMax);
                 maxPrice = (parsedMax >= bounds.minPrice && parsedMax <= bounds.maxPrice && parsedMax >= minPrice) 
                     ? parsedMax 
                     : bounds.maxPrice;
             }
             
             setPriceRange([minPrice, maxPrice]);
        }
    }, [bounds, searchParams]);

    const handleCategoryChange = (values: string[]) => {
        setSelectedCategories(values);
        const sortOption = sortOptions.find(option => option.key === currentSort);
        updateUrl(values, selectedSalons, null, currentSort, sortOption?.ascending || false);
    };

    const handlePriceChange = (value: number | number[]) => {
        if (Array.isArray(value)) {
            setPriceRange(value);
        }
    };

    const handlePriceCommit = (value: number | number[]) => {
        if (Array.isArray(value)) {
             const sortOption = sortOptions.find(option => option.key === currentSort);
             updateUrl(selectedCategories, selectedSalons, value, currentSort, sortOption?.ascending || false);
        }
    }

    const handleSortChange = (value: string) => {
        updateUrl(selectedCategories, selectedSalons, priceRange, value, sortOptions.find(option => option.key === value)?.ascending || false);
    };

    const handleSalonChange = (values: string[]) => {
        setSelectedSalons(values);
        const sortOption = sortOptions.find(option => option.key === currentSort);
        updateUrl(selectedCategories, values, null, currentSort, sortOption?.ascending || false);
    };

    const updateUrl = (categories: string[], salons: string[], price: number[] | null, sort: string, ascending: boolean = false) => {
        const params = new URLSearchParams(searchParams.toString());
        
        params.delete("subcategoryId");
        categories.forEach(id => params.append("subcategoryId", id));

        params.delete("salonId");
        salons.forEach(id => params.append("salonId", id));

        if (price) {
            params.set("minPrice", price[0].toString());
            params.set("maxPrice", price[1].toString());
        } else {
            params.delete("minPrice");
            params.delete("maxPrice");
        }
        
        const isPriceSort = sort === "PRICE_ASC" || sort === "PRICE_DESC";
        
        if (isPriceSort) {
            params.set("sortBy", "PRICE");
            params.set("ascending", ascending.toString());
        } else {
            params.delete("ascending");
            params.set("sortBy", sort);
        }
        
        params.delete("page");
        
        router.push(`?${params.toString()}`, { scroll: false });
    };

    if (!categories.length && !bounds && !salons.length) return null;

    return (
        <div className="flex flex-col gap-6 p-4 bg-white rounded-lg shadow-[0_0_10px_rgba(0,0,0,0.1)]">
            <div>
                <h3 className="text-lg font-semibold mb-4">Сортировка</h3>
                <SelectComponent 
                    options={sortOptions} 
                    defaultValue={currentSort} 
                    onSelectionChange={handleSortChange}
                    className="w-full"
                />
            </div>

            <div>
                <h3 className="text-lg font-semibold mb-4">Категории</h3>
                <CheckboxGroup
                    value={selectedCategories}
                    onValueChange={handleCategoryChange}
                    color="primary"
                >
                    {categories.map((cat) => (
                        <Checkbox key={cat.id} value={cat.id.toString()}>
                            {cat.name}
                        </Checkbox>
                    ))}
                </CheckboxGroup>
            </div>

            {bounds && typeof bounds.minPrice === 'number' && typeof bounds.maxPrice === 'number' && bounds.maxPrice > bounds.minPrice && (
                <div>
                    <h3 className="text-lg font-semibold mb-4">Цена</h3>
                    <Slider 
                        step={1}
                        minValue={bounds.minPrice}
                        maxValue={bounds.maxPrice}
                        value={priceRange}
                        size="sm"
                        onChange={handlePriceChange}
                        onChangeEnd={handlePriceCommit}
                        formatOptions={{style: "currency", currency: "RUB"}}
                        className="max-w-md"
                    />
                    <div className="flex justify-between mt-2 text-sm text-gray-500">
                        <span>{priceRange[0]} ₽</span>
                        <span>{priceRange[1]} ₽</span>
                    </div>
                </div>
            )}
            {salons && salons.length > 0 && (
                <div>
                <h3 className="text-lg font-semibold mb-4">Салоны</h3>
                <div className={showAllSalons ? "max-h-78 overflow-y-auto" : ""}>
                    <CheckboxGroup
                        value={selectedSalons}
                        onValueChange={handleSalonChange}
                        color="primary"
                    >
                        {(showAllSalons ? salons : salons.slice(0, 10)).map((salon) => (
                            <Checkbox key={salon.id} value={salon.id?.toString() || ""}>
                                {salon.name || "Салон не найден"}
                            </Checkbox>
                        ))}
                    </CheckboxGroup>
                </div>
                {salons.length > 10 && (
                    <button
                        onClick={() => setShowAllSalons(!showAllSalons)}
                        className="mt-2 text-sm text-primary hover:underline"
                    >
                        {showAllSalons ? "Скрыть" : "Показать все"}
                    </button>
                )}
                </div>
            )}
        </div>
    );
};
