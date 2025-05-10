import { create } from "zustand";
import {
  fetchCategoriesApi,
  fetchSubcategoriesApi,
  createCategoryApi,
  addSubcategoryApi,
  updateCategoryApi,
  deleteCategoryApi,
  deleteSubcategoryApi,
  // 🔸 새로 추가할 API 함수 (서브카테고리 수정)
  updateSubcategoryApi,
} from "../api/categoryApi";
import { Category, Subcategory } from "../types/category";

interface CategoryStoreState {
  categories: Category[];
  subcategories: { [key: number]: Subcategory[] };
  /** 🔸 카테고리 전체 개수 */
  categoryCount: number;
  loading: boolean;
  error: string | null;

  /** 🔸 카테고리 & 소분류 데이터 불러오기 */
  fetchCategories: () => Promise<void>;

  /** 🔸 카테고리 생성 */
  createCategory: (categoryName: string) => Promise<void>;

  /** 🔸 소분류 추가 */
  addSubcategory: (categoryId: number, subcategoryName: string) => Promise<void>;

  /** 🔸 카테고리 이름 수정 */
  updateCategory: (categoryId: number, newName: string) => Promise<void>;

  /** 🔸 카테고리 삭제 */
  deleteCategory: (categoryId: number) => Promise<void>;

  /** 🔸 소분류 삭제 */
  deleteSubcategory: (subcategoryId: number) => Promise<void>;

  /** 🔸 소분류(하위 업직종) 이름 수정 */
  updateSubcategory: (subcategoryId: number, newName: string) => Promise<void>;
}

export const useCategoryStore = create<CategoryStoreState>((set, get) => ({
  categories: [],
  subcategories: {},
  categoryCount: 0,
  loading: false,
  error: null,

  // ==========================================
  // 카테고리 & 소분류 가져오기
  // ==========================================
  fetchCategories: async () => {
    set({ loading: true, error: null });
    try {
      const categories = await fetchCategoriesApi();
      const subcategoriesData: { [key: number]: Subcategory[] } = {};

      // 카테고리별로 소분류 동시 요청
      await Promise.all(
        categories.map(async (category) => {
          const subs = await fetchSubcategoriesApi(category.id);
          subcategoriesData[category.id] = subs;
        })
      );

      // 전체 카테고리 배열과 카테고리 개수, 소분류 데이터 저장
      set({
        categories,
        subcategories: subcategoriesData,
        categoryCount: categories.length,
      });
    } catch (err: any) {
      set({ error: err.message || "Failed to fetch categories." });
    } finally {
      set({ loading: false });
    }
  },

  // ==========================================
  // 카테고리 생성
  // ==========================================
  createCategory: async (categoryName) => {
    set({ loading: true });
    try {
      const newCategory = await createCategoryApi(categoryName);
      set((state) => ({
        categories: [...state.categories, newCategory],
        categoryCount: state.categoryCount + 1, // 카테고리 생성 시 카운트 증가
      }));
    } finally {
      set({ loading: false });
    }
  },

  // ==========================================
  // 소분류 추가
  // ==========================================
  addSubcategory: async (categoryId, subcategoryName) => {
    set({ loading: true });
    try {
      const newSubcategory = await addSubcategoryApi(categoryId, subcategoryName.trim());
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

  // ==========================================
  // 카테고리 수정
  // ==========================================
  updateCategory: async (categoryId, newName) => {
    set({ loading: true });
    try {
      const updatedCategory = await updateCategoryApi(categoryId, newName);
      set((state) => ({
        categories: state.categories.map((cat) => (cat.id === categoryId ? updatedCategory : cat)),
      }));
    } finally {
      set({ loading: false });
    }
  },

  // ==========================================
  // 카테고리 삭제
  // ==========================================
  deleteCategory: async (categoryId) => {
    set({ loading: true });
    try {
      await deleteCategoryApi(categoryId);
      set((state) => {
        // 해당 카테고리의 소분류도 함께 제거
        const { [categoryId]: _, ...restSubs } = state.subcategories;
        return {
          categories: state.categories.filter((cat) => cat.id !== categoryId),
          subcategories: restSubs,
          categoryCount: state.categoryCount - 1, // 카테고리 삭제 시 카운트 감소
        };
      });
    } finally {
      set({ loading: false });
    }
  },

  // ==========================================
  // 소분류 삭제
  // ==========================================
  deleteSubcategory: async (subcategoryId) => {
    set({ loading: true });
    try {
      // 서버에 DELETE /job-categories/subcategory/{subcategoryId} 요청
      await deleteSubcategoryApi(subcategoryId);

      // 내부 상태 업데이트: 해당 소분류가 속한 카테고리를 찾아 제거
      set((state) => {
        let foundCategoryId: number | null = null;
        for (const catId in state.subcategories) {
          const subList = state.subcategories[catId];
          if (subList.some((sub) => sub.id === subcategoryId)) {
            foundCategoryId = Number(catId);
            break;
          }
        }
        if (foundCategoryId === null) {
          return {};
        }
        return {
          subcategories: {
            ...state.subcategories,
            [foundCategoryId]: state.subcategories[foundCategoryId].filter(
              (sub) => sub.id !== subcategoryId
            ),
          },
        };
      });
    } catch (err) {
      console.error("Failed to delete subcategory", err);
    } finally {
      set({ loading: false });
    }
  },

  // ==========================================
  // 소분류(하위 업직종) 수정 - 이름만 변경
  // ==========================================
  updateSubcategory: async (subcategoryId, newName) => {
    set({ loading: true });
    try {
      // 상태에서 subcategoryId가 속한 카테고리 찾기
      let foundCategoryId: number | null = null;
      set((state) => {
        for (const catId in state.subcategories) {
          const subList = state.subcategories[catId];
          if (subList.some((s) => s.id === subcategoryId)) {
            foundCategoryId = Number(catId);
            break;
          }
        }
        return {};
      });
      if (foundCategoryId === null) {
        throw new Error("Subcategory not found in state");
      }

      // 서버 API 호출 시 foundCategoryId를 jobCategoryId로 전달
      const updatedSub = await updateSubcategoryApi(subcategoryId, newName.trim(), foundCategoryId);

      // 상태 업데이트: 해당 소분류만 업데이트
      set((state) => {
        const updatedSubs = state.subcategories[foundCategoryId!].map((s) =>
          s.id === subcategoryId ? updatedSub : s
        );
        return {
          subcategories: {
            ...state.subcategories,
            [foundCategoryId!]: updatedSubs,
          },
        };
      });
    } catch (err) {
      console.error("Failed to update subcategory", err);
      set({ error: "Failed to update subcategory" });
    } finally {
      set({ loading: false });
    }
  },
}));
