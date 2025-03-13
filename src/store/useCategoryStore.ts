import { create } from "zustand";
import {
  fetchCategoriesApi,
  fetchSubcategoriesApi,
  createCategoryApi,
  addSubcategoryApi,
} from "../api/categoryApi";
import { Category, Subcategory } from "../types/category";

interface CategoryStoreState {
  categories: Category[];
  subcategories: { [key: number]: Subcategory[] };
  loading: boolean;
  error: string | null;
  fetchCategories: () => Promise<void>;
  createCategory: (categoryName: string) => Promise<void>;
  addSubcategory: (categoryId: number, subcategoryName: string) => Promise<void>;
}

export const useCategoryStore = create<CategoryStoreState>((set, get) => ({
  categories: [],
  subcategories: {},
  loading: false,
  error: null,

  fetchCategories: async () => {
    set({ loading: true, error: null });
    try {
      const categories = await fetchCategoriesApi();
      const subcategoriesData: { [key: number]: Subcategory[] } = {};

      // 🔹 각 카테고리별 하위 업직종 가져오기 (동시에 요청)
      await Promise.all(
        categories.map(async (category) => {
          const subs = await fetchSubcategoriesApi(category.id);
          subcategoriesData[category.id] = subs;
        })
      );

      set({ categories, subcategories: subcategoriesData });
    } catch (err: any) {
      set({ error: err.message || "Failed to fetch categories." });
    } finally {
      set({ loading: false });
    }
  },

  createCategory: async (categoryName) => {
    set({ loading: true });
    try {
      const newCategory = await createCategoryApi(categoryName);
      set((state) => ({
        categories: [...state.categories, newCategory],
      }));
    } finally {
      set({ loading: false });
    }
  },

  addSubcategory: async (categoryId, subcategoryName) => {
    set({ loading: true });
    try {
      const newSubcategory = await addSubcategoryApi(Number(categoryId), subcategoryName.trim()); // ✅ jobCategoryId로 변경
      set((state) => ({
        subcategories: {
          ...state.subcategories,
          [categoryId]: [...(state.subcategories[categoryId] || []), newSubcategory],
        },
      }));
    } finally {
      set({ loading: false });
    }
  },
}));
