// authApi.ts
import api from "../utils/axiosInstance";
import { User, UserRole } from "../types/user";
import { SignUpData } from "../types/auth";

/** 회원가입 API */
export const registerApi = async (userData: SignUpData): Promise<User> => {
  const response = await api.post("/auth/signup", userData);

  if (!response.data.success) {
    throw new Error(response.data.message || "Registration failed.");
  }

  return response.data.user; // 회원가입 성공 시 user 데이터 반환
};

/** 로그인 API */
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

/** 리프레시 토큰으로 Access Token 갱신 */
// 리프레시 토큰은 보통 localStorage나 auth store에 저장됩니다.
export const refreshAccessTokenApi = async (): Promise<string> => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) throw new Error("No refresh token available");

  const response = await api.post("/auth/refresh-token", { refreshToken });
  if (!response.data.accessToken) throw new Error("Failed to refresh access token.");

  return response.data.accessToken;
};

/** 로그아웃 API */
export const logoutApi = async (): Promise<void> => {
  await api.post("/auth/logout").catch(() => null);
};
