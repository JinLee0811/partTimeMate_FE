// axiosInstance.ts
import axios from "axios";
import { refreshAccessTokenApi } from "../api/authApi";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // CORS 요청에 쿠키 포함
});

// 요청 인터셉터
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken"); // accessToken으로 키 이름 변경
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 401 에러이고 재시도하지 않은 요청인 경우
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // 기존 authApi의 refreshAccessTokenApi 사용
        const newAccessToken = await refreshAccessTokenApi();

        // 새 토큰 저장
        localStorage.setItem("accessToken", newAccessToken);

        // 원래 요청의 헤더 업데이트
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // 원래 요청 재시도
        return api(originalRequest);
      } catch (refreshError) {
        // 리프레시 토큰도 만료된 경우
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login"; // 로그인 페이지로 리다이렉트
        return Promise.reject(refreshError);
      }
    }

    // 다른 에러 처리
    if (error.response) {
      console.error("API Error Response:", {
        status: error.response.status,
        data: error.response.data,
      });
    } else if (error.request) {
      console.error("API Request Error:", error.request);
    } else {
      console.error("API Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
