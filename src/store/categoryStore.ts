import { create } from "zustand";
import { fetchCategoriesApi, fetchSubcategoriesApi } from "../api/categoryApi";
import { Category } from "../types/category";

interface CategoryStoreState {
  categories: Category[];
  loading: boolean;
  error: string | null;
  fetchCategories: () => Promise<void>;
}

const useCategoryStore = create<CategoryStoreState>((set) => ({
  categories: [],
  loading: false,
  error: null,
  fetchCategories: async () => {
    try {
      set({ loading: true, error: null });
      const categories = await fetchCategoriesApi();

      // 각 카테고리의 하위 카테고리를 병렬로 가져옵니다
      const categoriesWithSubcategories = await Promise.all(
        categories.map(async (category) => {
          const subcategories = await fetchSubcategoriesApi(category.id);
          return {
            ...category,
            subcategories,
          };
        })
      );

      set({
        categories: categoriesWithSubcategories,
        loading: false,
        error: null,
      });
    } catch (error) {
      console.error("Error fetching categories:", error);
      set({
        loading: false,
        error: "Failed to fetch categories. Please try again later.",
        categories: [], // 에러 발생 시 카테고리 목록 초기화
      });
    }
  },
}));

export default useCategoryStore;
