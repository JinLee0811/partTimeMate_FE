import { useQuery } from "@tanstack/react-query";
import { fetchUserApi } from "../api/userApi";
import { useAuthStore } from "../store/useAuthStore";
import { User } from "../types/user";

export const useUser = () => {
  const { accessToken, setUser } = useAuthStore();

  return useQuery<User | null, Error>({
    queryKey: ["user", accessToken], // ✅ accessToken 변경 시 자동 refetch
    queryFn: fetchUserApi,
    enabled: !!accessToken, // ✅ 로그인 상태일 때만 실행
    onSuccess: (data) => {
      if (data) {
        setUser(data); // ✅ Zustand에 유저 정보 저장
      }
    },
    onError: () => setUser(null), // ✅ 에러 발생 시 Zustand의 user를 초기화
  });
};
