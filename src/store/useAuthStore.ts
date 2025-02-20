import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { loginApi, logoutApi, refreshAccessTokenApi } from "../api/authApi";
import { fetchUserApi } from "../api/userApi";
import { User } from "../types/user";
import { useJobPostingStore } from "../store/jobPostingStore";

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: User["role"]) => Promise<void>;
  logout: () => void;
  refreshAccessToken: () => Promise<string>;
  setUser: (user: User | null) => void;
  setAccessToken: (token: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: localStorage.getItem("accessToken") || null,
      isAuthenticated: !!localStorage.getItem("accessToken"),

      // ✅ 로그인
      login: async (email, password, role) => {
        const { accessToken, refreshToken } = await loginApi(email, password, role);

        set({ isAuthenticated: true, accessToken });
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        try {
          const userData = await fetchUserApi();
          set({ user: userData });
        } catch (error) {
          console.error("❌ 로그인 후 유저 데이터 가져오기 실패:", error);
          set({ user: null });
        }
      },

      // ✅ 로그아웃 (🚀 `navigate`를 직접 사용하지 않음)
      logout: () => {
        logoutApi();
        set({ user: null, accessToken: null, isAuthenticated: false });
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        useJobPostingStore.getState().resetFormData();
      },

      // ✅ Access Token 갱신 (🚀 `navigate`를 직접 사용하지 않음)
      refreshAccessToken: async (): Promise<string> => {
        try {
          const newAccessToken = await refreshAccessTokenApi();
          set({ accessToken: newAccessToken });
          localStorage.setItem("accessToken", newAccessToken);
          return newAccessToken;
        } catch (error) {
          console.error("❌ Token refresh failed", error);
          get().logout();
          throw new Error("Failed to refresh access token.");
        }
      },

      setUser: (user) => set({ user }),
      setAccessToken: (token) => set({ accessToken: token }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
