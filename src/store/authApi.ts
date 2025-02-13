import api from "../utils/axiosInstance";
import { User, UserRole } from "../types/user"; // ✅ 타입 불러오기

/** ✅ 회원가입 API */
export const registerApi = async (userData: Omit<User, "id" | "createdAt">) => {
  const response = await api.post("/auth/register", userData);

  if (!response.data.success) {
    throw new Error(response.data.message || "Registration failed.");
  }

  return response.data;
};

/** ✅ 로그인 API */
export const loginApi = async (email: string, password: string, role: UserRole) => {
  const response = await api.post("/auth/login", { email, password, role });

  if (!response.data.accessToken || !response.data.refreshToken) {
    throw new Error(response.data.message || "Login failed. Invalid response from server.");
  }

  return {
    accessToken: response.data.accessToken,
    refreshToken: response.data.refreshToken,
  };
};

/** ✅ 유저 정보 가져오기 API */
export const fetchUserApi = async (): Promise<User> => {
  const response = await api.get("/users/me");

  if (!response.data.data) {
    throw new Error("Failed to fetch user data.");
  }

  return response.data.data;
};

/** ✅ 유저 정보 업데이트 API */
export const updateUserApi = async (updatedData: Partial<User>): Promise<User> => {
  try {
    const response = await api.patch("/users/me", updatedData);

    console.log("🔍 Update API Response:", response.data); // 응답 데이터 확인

    if (!response.data || !response.data.user) {
      throw new Error("Invalid response from server.");
    }

    return response.data.user; // 서버 응답에서 user 정보만 반환
  } catch (error: any) {
    console.error("❌ API Error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to update user data.");
  }
};

/** ✅ 리프레시 토큰으로 Access Token 갱신 */
export const refreshAccessTokenApi = async (): Promise<string> => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) throw new Error("No refresh token available");

  const response = await api.post("/auth/refresh-token", { refreshToken });
  if (!response.data.accessToken) throw new Error("Failed to refresh access token.");

  return response.data.accessToken;
};

/** ✅ 로그아웃 API */
export const logoutApi = async (): Promise<void> => {
  await api.post("/auth/logout").catch(() => null);
};
