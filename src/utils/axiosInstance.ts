import axios from "axios";
import { useAuthStore } from "../store/useAuthStore";

const api = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true, // ✅ HTTP-Only 쿠키 사용
});

// ✅ 요청 인터셉터 - Access Token 자동 추가
api.interceptors.request.use(
  (config) => {
    const { accessToken } = useAuthStore.getState(); // ✅ Zustand에서 토큰 가져오기
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
    const originalRequest = error.config;
    const { refreshAccessToken, logout, setAccessToken } = useAuthStore.getState(); // ✅ Zustand에서 상태 가져오기

    // ✅ 401 에러 && 이미 재시도한 요청이 아니면 실행
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // ✅ 재시도 여부 플래그 추가

      try {
        const newAccessToken = await refreshAccessToken(); // 🔄 새로운 Access Token 발급
        setAccessToken(newAccessToken); // ✅ Zustand 상태 업데이트

        // ✅ 새로운 Access Token을 사용하여 원래 요청 재시도
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api.request(originalRequest);
      } catch (refreshError) {
        console.error("❌ Token refresh failed", refreshError);
        logout(); // ❌ 토큰 갱신 실패 시 로그아웃
        return Promise.reject(refreshError); // ❌ 요청 중단
      }
    }

    return Promise.reject(error);
  }
);

export default api;
