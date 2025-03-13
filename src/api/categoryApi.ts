import api from "../utils/axiosInstance";
import { Category, Subcategory } from "../types/category";

/** 전체 잡 카테고리 목록 가져오기 */
export const fetchCategoriesApi = async (): Promise<Category[]> => {
  const response = await api.get<{ data: Category[] }>("/job-categories");
  if (!response.data || !response.data.data) {
    throw new Error("Failed to fetch categories.");
  }
  return response.data.data;
};

/** 특정 카테고리의 하위 업직종 가져오기 */
export const fetchSubcategoriesApi = async (categoryId: number): Promise<Subcategory[]> => {
  try {
    const response = await api.get<{ data: { subCategories: Subcategory[] } }>(
      `/job-categories/${categoryId}/subcategories`
    );
    if (!response.data || !response.data.data) {
      return []; // 🔹 데이터가 없을 경우 빈 배열 반환
    }
    return response.data.data.subCategories;
  } catch (error) {
    console.error(`Error fetching subcategories for category ${categoryId}:`, error);
    return []; // 🔹 404 등의 에러가 발생하면 빈 배열 반환
  }
};

/** 새로운 잡 카테고리 생성 */
export const createCategoryApi = async (categoryName: string): Promise<Category> => {
  const response = await api.post<{ data: Category }>("/job-categories", {
    name: categoryName,
  });
  if (!response.data || !response.data.data) {
    throw new Error("Failed to create category.");
  }
  return response.data.data;
};

/** 특정 카테고리에 하위 업직종 추가 */
export const addSubcategoryApi = async (
  categoryId: number,
  subcategoryName: string
): Promise<Subcategory> => {
  if (!categoryId || !subcategoryName.trim()) {
    throw new Error("Invalid jobCategoryId or subcategory name.");
  }

  const response = await api.post<{ data: Subcategory }>("/job-categories/subcategory", {
    jobCategoryId: categoryId, // ✅ 필드명 변경
    name: subcategoryName.trim(),
  });

  if (!response.data || !response.data.data) {
    throw new Error("Failed to add subcategory.");
  }
  return response.data.data;
};

/** 카테고리 수정 */
export const updateCategoryApi = async (categoryId: number, newName: string): Promise<Category> => {
  const response = await api.patch<{ data: Category }>(`/job-categories/${categoryId}`, {
    name: newName,
  });

  if (!response.data || !response.data.data) {
    throw new Error("Failed to update category.");
  }
  return response.data.data;
};

/** 카테고리 삭제 */
export const deleteCategoryApi = async (categoryId: number): Promise<void> => {
  await api.delete(`/job-categories/${categoryId}`);
};

/** 특정 카테고리에서 하위 업직종 삭제 */
export const deleteSubcategoryApi = async (
  categoryId: number,
  subcategoryId: number
): Promise<void> => {
  await api.delete(`/job-categories/${categoryId}/subcategories/${subcategoryId}`);
};
