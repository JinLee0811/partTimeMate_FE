import axios from "axios";
import { useAuthStore } from "../store/useAuthStore";

const api = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true, // ✅ 리프레시 토큰은 httpOnly 쿠키에 저장됨
});

// ✅ 요청 인터셉터 - Access Token 자동 추가
api.interceptors.request.use(
  (config) => {
    const { accessToken } = useAuthStore.getState();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ 응답 인터셉터 - Access Token 만료 시 자동 갱신
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const { refreshAccessToken } = useAuthStore.getState();
      try {
        await refreshAccessToken(); // 새 Access Token 발급
        return api.request(error.config); // 요청 재시도
      } catch {
        return Promise.reject(error); // 갱신 실패 시 로그아웃
      }
    }
    return Promise.reject(error);
  }
);

export default api;
