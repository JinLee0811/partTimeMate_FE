import { create } from "zustand";
import {
  fetchCategoriesApi,
  createCategoryApi,
  updateCategoryApi,
  deleteCategoryApi,
} from "../api/categoryApi";
import { Category } from "../types/category";

interface CategoriesResponse {
  categories: Category[];
  totalCount: number;
  totalPage: number;
  page: number;
}

interface CategoryStoreState {
  categories: Category[];
  totalCount: number;
  totalPage: number;
  currentPage: number;
  loading: boolean;
  error: string | null;
  fetchCategories: (page?: number) => Promise<void>;
  createCategory: (data: Partial<Category>) => Promise<void>;
  updateCategory: (categoryId: number, updatedData: Partial<Category>) => Promise<void>;
  deleteCategory: (categoryId: number) => Promise<void>;
}

export const useCategoryStore = create<CategoryStoreState>((set, get) => ({
  categories: [],
  totalCount: 0,
  totalPage: 1,
  currentPage: 1,
  loading: false,
  error: null,

  fetchCategories: async (page: number = 1) => {
    set({ loading: true, error: null });
    try {
      const response: CategoriesResponse = await fetchCategoriesApi(page);
      set({
        categories: response.categories,
        totalCount: response.totalCount ?? response.categories.length, // totalCount가 없으면 categories.length로 대체
        totalPage: response.totalPage || 1,
        currentPage: response.page,
      });
    } catch (err: any) {
      set({ error: err.message || "Failed to fetch categories." });
    } finally {
      set({ loading: false });
    }
  },

  createCategory: async (data: Partial<Category>) => {
    set({ loading: true, error: null });
    try {
      const newCategory = await createCategoryApi(data);
      set((state) => ({
        categories: [...state.categories, newCategory],
      }));
    } catch (err: any) {
      set({ error: err.message || "Failed to create category." });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  updateCategory: async (categoryId: number, updatedData: Partial<Category>) => {
    set({ loading: true, error: null });
    try {
      const updatedCategory = await updateCategoryApi(categoryId, updatedData);
      set((state) => ({
        categories: state.categories.map((category) =>
          category.id === updatedCategory.id ? updatedCategory : category
        ),
      }));
    } catch (err: any) {
      set({ error: err.message || "Failed to update category." });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  deleteCategory: async (categoryId: number) => {
    set({ loading: true, error: null });
    try {
      await deleteCategoryApi(categoryId);
      set((state) => ({
        categories: state.categories.filter((category) => category.id !== categoryId),
      }));
    } catch (err: any) {
      set({ error: err.message || "Failed to delete category." });
      throw err;
    } finally {
      set({ loading: false });
    }
  },
}));
