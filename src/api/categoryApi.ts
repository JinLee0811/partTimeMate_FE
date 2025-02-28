// src/api/categoryApi.ts
import api from "../utils/axiosInstance";
import { Category } from "../types/category";

interface CategoriesResponse {
  categories: Category[];
  totalCount: number;
  totalPage: number;
  page: number;
}

/** 전체 잡 카테고리 목록 가져오기 (페이지네이션 적용) */
export const fetchCategoriesApi = async (page: number = 1): Promise<CategoriesResponse> => {
  const response = await api.get<{ data: CategoriesResponse }>("/job-postings/category", {
    params: { page },
  });
  if (!response.data || !response.data.data) {
    throw new Error("Failed to fetch categories.");
  }
  return response.data.data;
};

/** 새로운 잡 카테고리 생성 (예: { name: "Software Development" }) */
export const createCategoryApi = async (data: Partial<Category>): Promise<Category> => {
  const response = await api.post<{ data: Category }>("/job-postings/category", data);
  if (!response.data || !response.data.data) {
    throw new Error("Failed to create category.");
  }
  return response.data.data;
};

/** 잡 카테고리 정보 수정 */
export const updateCategoryApi = async (
  categoryId: number,
  updatedData: Partial<Category>
): Promise<Category> => {
  const response = await api.patch<{ data: Category }>(
    `/job-postings/category/${categoryId}`,
    updatedData
  );
  if (!response.data || !response.data.data) {
    throw new Error("Failed to update category.");
  }
  return response.data.data;
};

/** 잡 카테고리 삭제 */
export const deleteCategoryApi = async (categoryId: number): Promise<void> => {
  await api.delete(`/job-postings/category/${categoryId}`);
};
