import api from "../utils/axiosInstance";
import { User } from "../types/user";

/** ✅ 유저 정보 가져오기 API */
export const fetchUserApi = async (): Promise<User> => {
  const response = await api.get<{ data: User }>("/users/me");

  if (!response.data || !response.data.data) {
    throw new Error("Failed to fetch user data.");
  }

  return response.data.data; // `data`의 타입을 확실히 보장
};

/** ✅ 유저 정보 업데이트 API */
export const updateUserApi = async (updatedData: Partial<User>): Promise<User> => {
  try {
    const response = await api.patch("/users/me", updatedData);

    console.log("🔍 Update API Response:", response.data); // 응답 데이터 확인

    if (!response.data.data) {
      throw new Error("Invalid response from server.");
    }

    return response.data.data; // 서버 응답에서 user 정보만 반환
  } catch (error: any) {
    console.error("❌ API Error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to update user data.");
  }
};

/** ✅ 패스워드 변경 API */
export const updatePasswordApi = async (password: string): Promise<User> => {
  try {
    const response = await api.patch<{ data: User }>("/users/me", { password });

    console.log("🔍 Password Update API Response:", response.data);

    if (!response.data.data) {
      throw new Error("Invalid response from server.");
    }

    return response.data.data; // 서버 응답에서 user 정보 반환
  } catch (error: any) {
    console.error("❌ API Error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to update password.");
  }
};
