import { useState, useEffect } from "react";
import { category, Category } from "@/api/category";

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategory = async () => {
      setLoading(true);
      setError(null);
      const categoryData = await category.getCategory({ level: "0" });
      setCategories(categoryData);
      if (categoryData.length === 0) {
        setError("Категории не найдены");
      }
      setLoading(false);
    };
    fetchCategory();
  }, []);
  return { categories, loading, error };
};
