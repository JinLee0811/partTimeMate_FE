import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { registerApi } from "../api/authApi"; // ✅ API 호출 함수
import { useAuthStore } from "../store/useAuthStore"; // ✅ Zustand 연동
import { User } from "../types/user"; // ✅ User 타입 가져오기
import { SignUpData } from "../types/auth"; // ✅ SignUpData 타입 가져오기

// 🔹 `confirmPassword` 포함한 요청 타입 (단, API 호출 시에는 제외)
interface SignUpRequest extends SignUpData {
  confirmPassword: string;
}

export function useSignUp() {
  const navigate = useNavigate();
  const { setUser } = useAuthStore();

  // ✅ React Query의 useMutation 사용
  const mutation = useMutation<User, Error, SignUpRequest>({
    mutationFn: async ({ confirmPassword, ...data }) => {
      if (!validatePassword(data.password)) {
        throw new Error(
          "Password must be 8-32 characters long and contain letters, numbers, and special characters."
        );
      }
      if (data.password !== confirmPassword) {
        throw new Error("Passwords do not match!");
      }

      // 🔹 confirmPassword를 제외하고 서버로 보냄
      return registerApi(data);
    },
    onSuccess: () => {
      // 서버에서 응답으로 userData를 주더라도, 여기서는 굳이 저장할 필요 없음
      alert("✅ Registration successful! Please log in.");
      navigate("/auth/login"); // 회원가입 후 로그인 페이지로 이동
    },
    onError: (error) => {
      alert("Signup failed. Please try again.");
    },
  });

  return { signUp: mutation.mutate, ...mutation };
}

// ✅ 대문자, 소문자, 숫자, 특수문자가 각각 하나 이상 포함 & 8~32자
const validatePassword = (password: string) => {
  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/;
  return passwordRegex.test(password);
};
