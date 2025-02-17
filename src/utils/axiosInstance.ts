// axiosInstance.ts
import axios from "axios";
import { useAuthStore } from "../store/useAuthStore";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const api = axios.create({
  baseURL: SERVER_URL,
  withCredentials: true, // HTTP-Only 쿠키 사용
});

// 요청 인터셉터: access token 자동 추가 (Zustand에서 가져옴)
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

// 응답 인터셉터: 401 에러(액세스 토큰 만료) 발생 시 자동으로 리프레시 토큰으로 갱신
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const { refreshAccessToken, logout, setAccessToken } = useAuthStore.getState();

    // 401 에러 && 재시도한 적이 없는 요청이면
    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Zustand에 등록된 refreshAccessToken 함수를 통해 새 access token 발급받기
        const newAccessToken = await refreshAccessToken();
        setAccessToken(newAccessToken);

        // 새 access token을 헤더에 업데이트하고 원래 요청 재시도
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api.request(originalRequest);
      } catch (refreshError) {
        console.error("❌ Token refresh failed:", refreshError);
        logout(); // 토큰 갱신 실패 시 로그아웃 처리
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
