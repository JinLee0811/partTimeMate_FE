import { create } from "zustand";
import api from "../utils/axiosInstance"; // ✅ Axios 인터셉터 적용

/** 📌 백엔드에서 받는 유저 role 타입 */
type BackendRole = "JOB_SEEKER" | "BUSINESS";

/** 📌 프론트에서 사용하는 유저 role 타입 */
type FrontendRole = "jobseeker" | "employer";

/** 📌 유저 정보 인터페이스 */
interface User {
  username: string;
  role: FrontendRole;
}

/** 📌 Zustand 상태 인터페이스 */
interface AuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  login: (email: string, password: string, role: FrontendRole) => Promise<void>;
  logout: () => void;
  refreshAccessToken: () => Promise<void>;
}

/** 📌 백엔드에서 받은 role을 프론트에서 사용하는 값으로 변환 */
const mapBackendRoleToFrontend = (backendRole: BackendRole): FrontendRole => {
  return backendRole === "JOB_SEEKER" ? "jobseeker" : "employer";
};

/** ✅ Zustand Store */
export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  accessToken: localStorage.getItem("accessToken") || null,
  refreshToken: localStorage.getItem("refreshToken") || null,
  user: null,

  // ✅ 로그인
  login: async (email, password, role) => {
    try {
      const response = await api.post("/auth/login", { email, password, role });

      if (!response.data.accessToken) {
        throw new Error(response.data.message || "Login failed. Please check your credentials.");
      }

      const mappedRole = mapBackendRoleToFrontend(response.data.role as BackendRole);

      set({
        isAuthenticated: true,
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
        user: { username: response.data.username, role: mappedRole },
      });

      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Login failed. Please try again.");
    }
  },

  // ✅ 로그아웃
  logout: () => {
    api.post("/auth/logout").catch(() => null); // 실패해도 무시
    set({ isAuthenticated: false, accessToken: null, refreshToken: null, user: null });
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  },

  // ✅ Access Token 갱신 (리프레시 토큰 요청)
  refreshAccessToken: async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) throw new Error("No refresh token available");

      const response = await api.post("/auth/refresh-token", { refreshToken });

      set({ accessToken: response.data.accessToken });
      localStorage.setItem("accessToken", response.data.accessToken);
    } catch (error) {
      console.error("Token refresh failed", error);
      set({ isAuthenticated: false, accessToken: null, refreshToken: null, user: null });
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    }
  },
}));
