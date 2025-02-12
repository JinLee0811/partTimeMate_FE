import { create } from "zustand";
import api from "../utils/axiosInstance"; // ✅ Axios 인터셉터 적용

/** 📌 백엔드에서 받는 유저 role 타입 */
type BackendRole = "JOB_SEEKER" | "BUSINESS";

/** 📌 프론트에서 사용하는 유저 role 타입 */
type FrontendRole = "jobseeker" | "employer";

/** 📌 유저 정보 인터페이스 */
interface User {
  firstName: string;
  lastName: string;
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

/** 📌 프론트에서 백엔드로 보낼 role을 변환 */
const mapFrontendRoleToBackend = (frontendRole: FrontendRole): BackendRole => {
  return frontendRole === "jobseeker" ? "JOB_SEEKER" : "BUSINESS";
};

/** ✅ Zustand Store */
export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: localStorage.getItem("accessToken") !== null, // ✅ 새로고침 시 로그인 유지
  accessToken: localStorage.getItem("accessToken") || null,
  refreshToken: localStorage.getItem("refreshToken") || null,
  user: JSON.parse(localStorage.getItem("user") || "null"), // ✅ 유저 정보 저장

  // ✅ 로그인
  login: async (email, password, role) => {
    try {
      const backendRole = mapFrontendRoleToBackend(role); // ✅ 프론트 role을 백엔드 형식으로 변환

      const response = await api.post("/auth/login", { email, password, role: backendRole });

      if (!response.data.accessToken || !response.data.refreshToken) {
        throw new Error(response.data.message || "Login failed. Invalid response from server.");
      }

      const mappedRole = mapBackendRoleToFrontend(response.data.role as BackendRole);
      const userData = {
        firstName: response.data.first_name,
        lastName: response.data.last_name,
        role: mappedRole,
      };

      set({
        isAuthenticated: true,
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
        user: userData,
      });

      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      localStorage.setItem("user", JSON.stringify(userData)); // ✅ 유저 정보 저장
    } catch (error: any) {
      console.error("❌ Login Error:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Login failed. Please try again.");
    }
  },

  // ✅ 로그아웃
  logout: () => {
    api.post("/auth/logout").catch(() => null); // 실패해도 무시
    set({ isAuthenticated: false, accessToken: null, refreshToken: null, user: null });
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user"); // ✅ 유저 정보 삭제
  },

  // ✅ Access Token 갱신 (리프레시 토큰 요청)
  refreshAccessToken: async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");

      if (!refreshToken) {
        console.warn("⚠ No refresh token found. Logging out...");
        set({ isAuthenticated: false, accessToken: null, refreshToken: null, user: null });
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
        return;
      }

      const response = await api.post("/auth/refresh-token", { refreshToken });

      if (!response.data.accessToken) {
        throw new Error("Failed to refresh access token.");
      }

      set({ accessToken: response.data.accessToken });
      localStorage.setItem("accessToken", response.data.accessToken);
    } catch (error) {
      console.error("❌ Token refresh failed", error);
      set({ isAuthenticated: false, accessToken: null, refreshToken: null, user: null });
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
    }
  },
}));
