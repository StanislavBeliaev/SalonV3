"use client";
import { Category } from "@/api/category";
import { Checkbox, CheckboxGroup } from "@heroui/react";
import SelectComponent from "@/components/shared/ui/Select";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

interface SalonsFilterProps {
    categories: Category[];
}

export const SalonsFilter = ({ categories }: SalonsFilterProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const initialCategoryIds = searchParams.getAll("categoryId");
    
    const urlSortBy = searchParams.get("sortBy");
    let currentSort = "POPULARITY";
    
    if (urlSortBy) {
        currentSort = urlSortBy;
    }
    
    const [selectedCategories, setSelectedCategories] = useState<string[]>(initialCategoryIds);

    const sortOptions = [
        { key: "POPULARITY", label: "По популярности" },
        { key: "NEWNESS", label: "По новизне" },
        { key: "RATING", label: "По рейтингу" },
    ];

    const handleCategoryChange = (values: string[]) => {
        setSelectedCategories(values);
        updateUrl(values, currentSort);
    };

    const handleSortChange = (value: string) => {
        updateUrl(selectedCategories, value);
    };

    const updateUrl = (categories: string[], sort: string) => {
        const params = new URLSearchParams(searchParams.toString());
        
        params.delete("categoryId");
        categories.forEach(id => params.append("categoryId", id));

        params.set("sortBy", sort);
        
        params.delete("page");
        
        router.push(`?${params.toString()}`, { scroll: false });
    };

    if (!categories.length) return null;

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
        </div>
    );
};

