import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { loginApi, logoutApi, refreshAccessTokenApi } from "../api/authApi";
import { fetchUserApi } from "../api/userApi"; // ✅ 유저 정보 가져오기 추가
import { User } from "../types/user";

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

      // ✅ 로그인 (유저 정보 가져오기 추가)
      login: async (email, password, role) => {
        const { accessToken, refreshToken } = await loginApi(email, password, role);

        // ✅ Access Token 저장
        set({ isAuthenticated: true, accessToken });
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        // ✅ 유저 정보 가져오기 & 저장
        try {
          const userData = await fetchUserApi();
          set({ user: userData });
        } catch (error) {
          console.error("❌ 로그인 후 유저 데이터 가져오기 실패:", error);
          set({ user: null });
        }
      },

      // ✅ 로그아웃
      logout: () => {
        logoutApi();
        set({ user: null, accessToken: null, isAuthenticated: false });
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      },

      // ✅ Access Token 갱신 (🔹 API 호출 후 상태 업데이트)
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

      // ✅ 유저 정보 설정
      setUser: (user) => set({ user }),

      // ✅ Access Token 업데이트 함수 추가
      setAccessToken: (token) => set({ accessToken: token }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage), // ✅ localStorage를 JSON 저장소로 변환하여 적용
    }
  )
);
