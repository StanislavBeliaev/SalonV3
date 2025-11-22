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
    const currentSort = searchParams.get("sortBy") || "POPULARITY";
    
    const [selectedCategories, setSelectedCategories] = useState<string[]>(initialSubCategoryIds);
    const [selectedSalons, setSelectedSalons] = useState<string[]>(initialSalonIds);
    const [priceRange, setPriceRange] = useState<number[]>([
        bounds?.minPrice || 0,
        bounds?.maxPrice || 1000
    ]);

    const sortOptions = [
        { key: "POPULARITY", label: "По популярности" },
        { key: "NEWNESS", label: "По новизне" },
        { key: "PRICE_ASC", label: "Сначала дешевые" },
        { key: "PRICE_DESC", label: "Сначала дорогие" },
    ];

    useEffect(() => {
        if (bounds) {
             const urlMin = searchParams.get("minPrice");
             const urlMax = searchParams.get("maxPrice");
             setPriceRange([
                 urlMin ? Number(urlMin) : bounds.minPrice,
                 urlMax ? Number(urlMax) : bounds.maxPrice
             ]);
        }
    }, [bounds, searchParams]);

    const handleCategoryChange = (values: string[]) => {
        setSelectedCategories(values);
        updateUrl(values, selectedSalons, priceRange, currentSort);
    };

    const handlePriceChange = (value: number | number[]) => {
        if (Array.isArray(value)) {
            setPriceRange(value);
        }
    };

    const handlePriceCommit = (value: number | number[]) => {
        if (Array.isArray(value)) {
             updateUrl(selectedCategories, selectedSalons, value, currentSort);
        }
    }

    const handleSortChange = (value: string) => {
        updateUrl(selectedCategories, selectedSalons, priceRange, value);
    };

    const handleSalonChange = (values: string[]) => {
        setSelectedSalons(values);
        updateUrl(selectedCategories, values, priceRange, currentSort);
    };

    const updateUrl = (categories: string[], salons: string[], price: number[], sort: string) => {
        const params = new URLSearchParams(searchParams.toString());
        
        params.delete("subcategoryId");
        categories.forEach(id => params.append("subcategoryId", id));

        params.delete("salonId");
        salons.forEach(id => params.append("salonId", id));

        params.set("minPrice", price[0].toString());
        params.set("maxPrice", price[1].toString());
        params.set("sortBy", sort);
        
        router.push(`?${params.toString()}`, { scroll: false });
    };

    if (!categories.length && !bounds && !salons.length) return null;

    return (
        <div className="flex flex-col gap-6 p-4 bg-white rounded-lg shadow-sm">
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
                <CheckboxGroup
                    value={selectedSalons}
                    onValueChange={handleSalonChange}
                    color="primary"
                >
                    {salons.map((salon) => (
                        <Checkbox key={salon.id} value={salon.id?.toString() || ""}>
                            {salon.name || "Салон не найден"}
                        </Checkbox>
                    ))}
                </CheckboxGroup>
                </div>
            )}
        </div>
    );
};
