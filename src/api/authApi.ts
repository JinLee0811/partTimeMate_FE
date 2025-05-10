// authApi.ts
import api from "../utils/axiosInstance";
import { User, UserRole } from "../types/user";
import { SignUpData } from "../types/auth";

/** 회원가입 API */
export const registerApi = async (userData: SignUpData) => {
  const response = await api.post("/auth/signup", userData);

  // 서버가 2xx 범위, 특히 201을 주면 성공으로 본다 가정
  // 만약 201이 아닌 경우 throw
  if (response.status !== 201) {
    throw new Error(response.data.message || "Registration failed.");
  }

  // 서버가 반환하는 실제 유저 정보는 response.data.data 안에 존재
  return response.data.data;
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
