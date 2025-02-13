import { create } from "zustand";
import { loginApi, fetchUserApi, refreshAccessTokenApi, logoutApi, updateUserApi } from "./authApi";
import { AuthState } from "../types/auth"; // ✅ auth 타입 불러오기
import { User } from "../types/user"; // ✅ 유저 타입 불러오기

/** ✅ Zustand Store */
export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: !!localStorage.getItem("accessToken"),
  accessToken: localStorage.getItem("accessToken") || null,
  refreshToken: localStorage.getItem("refreshToken") || null,
  user: null,

  // ✅ 로그인
  login: async (email, password, role) => {
    try {
      const loginRole = role === "ADMIN" ? "ADMIN" : role; // ADMIN이면 role 무시
      const { accessToken, refreshToken } = await loginApi(email, password, loginRole);

      set({ isAuthenticated: true, accessToken, refreshToken });
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      await useAuthStore.getState().fetchUser(); // 🔄 유저 정보 가져오기
    } catch (error: any) {
      console.error("❌ Login Error:", error.message);
      throw new Error(error.message || "Login failed. Please try again.");
    }
  },

  // ✅ 유저 정보 가져오기
  fetchUser: async () => {
    try {
      const userData = await fetchUserApi();
      set({ user: userData });
    } catch (error) {
      console.error("❌ Failed to fetch user:", error);
      set({ user: null });
    }
  },

  // ✅ 유저 정보 업데이트
  updateUser: async (updatedData: Partial<User>) => {
    try {
      const updatedUser = await updateUserApi(updatedData);

      if (!updatedUser) {
        throw new Error("No user data returned from API.");
      }

      set({ user: updatedUser }); // ✅ 유저 정보 업데이트
    } catch (error: any) {
      console.error("❌ Failed to update user:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "User update failed. Please try again.");
    }
  },

  // ✅ 로그아웃
  logout: () => {
    logoutApi();
    set({ isAuthenticated: false, accessToken: null, refreshToken: null, user: null });
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    if (location.pathname !== "/") {
      window.location.href = "/";
    }
  },

  // ✅ Access Token 갱신
  refreshAccessToken: async (): Promise<string> => {
    try {
      const newAccessToken = await refreshAccessTokenApi();
      set({ accessToken: newAccessToken });
      localStorage.setItem("accessToken", newAccessToken);

      await useAuthStore.getState().fetchUser(); // 🔄 유저 정보 다시 가져오기
      return newAccessToken; // ✅ 반환값 추가
    } catch (error) {
      console.error("❌ Token refresh failed", error);
      useAuthStore.getState().logout();
      throw new Error("Failed to refresh access token."); // ✅ 예외 처리
    }
  },
}));
