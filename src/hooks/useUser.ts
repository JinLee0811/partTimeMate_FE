import { useQuery } from "@tanstack/react-query";
import { fetchUserApi } from "../api/userApi";
import { useAuthStore } from "../store/useAuthStore";
import { User } from "../types/user"; // ✅ User 타입 가져오기

export const useUser = () => {
  const { accessToken, setUser } = useAuthStore();

  return useQuery<User, Error>({
    queryKey: ["user", accessToken], // ✅ accessToken 변경 시 자동 refetch
    queryFn: fetchUserApi, // ✅ 올바른 User 타입 반환
    enabled: !!accessToken, // ✅ 로그인 상태일 때만 실행
    onSuccess: (data: User) => setUser(data), // ✅ Zustand에 유저 정보 저장
    onError: () => setUser(null), // ✅ 에러 발생 시 Zustand의 user를 null로 설정
  });
};
