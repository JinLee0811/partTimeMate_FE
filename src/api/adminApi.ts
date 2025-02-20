import api from "../utils/axiosInstance";
import { User } from "../types/user";

/** ✅ 전체 사용자 목록 가져오기 API */
export const fetchUsersApi = async (): Promise<User[]> => {
  const response = await api.get<{ data: User[] }>("/users"); // GET /users 엔드포인트 호출
  if (!response.data || !response.data.data) {
    throw new Error("Failed to fetch users data.");
  }
  return response.data.data;
};

/** ✅ 유저 정보 업데이트 API (어드민용, 특정 사용자) */
export const updateUserByIdApi = async (
  userId: string,
  updatedData: Partial<User>
): Promise<User> => {
  try {
    const response = await api.patch<{ data: User }>(`/users/${userId}`, updatedData);
    if (!response.data.data) {
      throw new Error("Invalid response from server.");
    }
    return response.data.data;
  } catch (error: any) {
    console.error("❌ Error updating user:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to update user data.");
  }
};

/** ✅ 유저 정보 삭제 API (어드민용, 특정 사용자) */
export const deleteUserByIdApi = async (userId: string): Promise<void> => {
  try {
    await api.delete(`/users/${userId}`);
  } catch (error: any) {
    console.error("❌ Error deleting user:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to delete user.");
  }
};
