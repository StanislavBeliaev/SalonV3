import { useState, useEffect } from "react";
import { category, Category } from "@/api/category";
import { useCityStore } from "@/components/shared/stores/cityStore";

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const city = useCityStore((state) => state.city);

  useEffect(() => {
    const fetchCategory = async () => {
      if (!city?.id) return;
      
      setLoading(true);
      setError(null);
      const categoryData = await category.getCategory({ 
        level: "0",
        cityId: city.id.toString()
      });
      setCategories(categoryData);
      if (categoryData.length === 0) {
        setError("Категории не найдены");
      }
      setLoading(false);
    };
    fetchCategory();
  }, [city?.id]);
  return { categories, loading, error };
};
