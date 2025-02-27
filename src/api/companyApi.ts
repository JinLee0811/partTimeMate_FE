import api from "../utils/axiosInstance";
import { Company } from "../types/company";

interface CompaniesResponse {
  companies: Company[];
  totalCount: number;
  totalPage: number;
  page: number;
}

// 현재 로그인한 사용자의 role을 가져오는 헬퍼 함수
const getCurrentUserRole = (): string | null => {
  const storedUser = localStorage.getItem("currentUser");
  if (storedUser) {
    const user = JSON.parse(storedUser);
    return user.role;
  }
  return null;
};

/** ✅ 회사 등록 API */
export const createCompanyApi = async (newData: Partial<Company>): Promise<Company> => {
  try {
    // 필요한 경우 role
    // const role = getCurrentUserRole();
    // const params = role === "ADMIN" ? { role: "ADMIN" } : {};

    const response = await api.post<{ data: Company }>("/company", newData /*, { params }*/);
    if (!response.data?.data) {
      throw new Error("Invalid response from server.");
    }
    return response.data.data;
  } catch (error: any) {
    console.error("❌ Error creating company:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to create company.");
  }
};

/** ✅ 전체 회사 목록 가져오기 API (페이지네이션 적용)
 *  기본 페이지 번호로 1을 전달합니다.
 */
export const fetchCompaniesApi = async (page: number = 1): Promise<CompaniesResponse> => {
  const role = getCurrentUserRole();
  const params = {
    page,
    ...(role === "ADMIN" && { role: "ADMIN" }),
  };
  const response = await api.get<{ data: CompaniesResponse }>("/company", { params });
  if (!response.data || !response.data.data) {
    throw new Error("Failed to fetch companies data.");
  }
  return response.data.data;
};

/** ✅ 회사 정보 수정 API
 *  특정 회사의 정보를 수정합니다.
 */
export const updateCompanyByIdApi = async (
  companyId: string,
  updatedData: Partial<Company>
): Promise<Company> => {
  try {
    const role = getCurrentUserRole();
    const params = role === "ADMIN" ? { role: "ADMIN" } : {};
    const response = await api.patch<{ data: Company }>(`/company/${companyId}`, updatedData, {
      params,
    });
    if (!response.data.data) {
      throw new Error("Invalid response from server.");
    }
    return response.data.data;
  } catch (error: any) {
    console.error("❌ Error updating company:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to update company data.");
  }
};

/** ✅ 회사 삭제 API
 *  특정 회사를 삭제합니다.
 */
export const deleteCompanyByIdApi = async (companyId: string): Promise<void> => {
  try {
    const role = getCurrentUserRole();
    const params = role === "ADMIN" ? { role: "ADMIN" } : {};
    await api.delete(`/company/${companyId}`, { params });
  } catch (error: any) {
    console.error("❌ Error deleting company:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to delete company.");
  }
};
