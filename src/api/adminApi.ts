import api from "../utils/axiosInstance";
import { User } from "../types/user";

interface UsersResponse {
  users: User[];
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

/** ✅ 전체 사용자 목록 가져오기 API (페이지네이션 적용)
 *  기본 페이지 번호로 1을 전달합니다.
 */
export const fetchUsersApi = async (page: number = 1): Promise<UsersResponse> => {
  const role = getCurrentUserRole();
  const params = {
    page,
    ...(role === "ADMIN" && { role: "ADMIN" }),
  };
  const response = await api.get<{ data: UsersResponse }>("/users", { params });
  if (!response.data || !response.data.data) {
    throw new Error("Failed to fetch users data.");
  }
  return response.data.data;
};

export const updateUserByIdApi = async (
  userId: string,
  updatedData: Partial<User>
): Promise<User> => {
  try {
    const role = getCurrentUserRole();
    const params = role === "ADMIN" ? { role: "ADMIN" } : {};
    const response = await api.patch<{ data: User }>(`/users/${userId}`, updatedData, { params });
    if (!response.data.data) {
      throw new Error("Invalid response from server.");
    }
    return response.data.data;
  } catch (error: any) {
    console.error("❌ Error updating user:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to update user data.");
  }
};

export const deleteUserByIdApi = async (userId: string): Promise<void> => {
  try {
    const role = getCurrentUserRole();
    const params = role === "ADMIN" ? { role: "ADMIN" } : {};
    await api.delete(`/users/${userId}`, { params });
  } catch (error: any) {
    console.error("❌ Error deleting user:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to delete user.");
  }
};
