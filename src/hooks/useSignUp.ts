import { useState } from "react";
import { useNavigate } from "react-router-dom"; // React Router 사용
import axios from "axios";

interface SignUpData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: "JOB_SEEKER" | "BUSINESS"; // ✅ role을 동적으로 받도록 설정
  preferredLanguage?: string;
  business_name?: string;
  business_address?: string;
  phoneNumber?: string;
}

export function useSignUp() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // 🔹 네비게이션 훅 추가

  // 비밀번호 유효성 검사 함수
  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/;
    return passwordRegex.test(password);
  };

  const signUp = async (data: SignUpData, confirmPassword: string) => {
    setLoading(true);
    setError("");

    // ✅ 프론트에서 비밀번호 검증
    if (!validatePassword(data.password)) {
      setError(
        "Password must be 8-32 characters long and contain letters, numbers, and special characters."
      );
      setLoading(false);
      return;
    }

    if (data.password !== confirmPassword) {
      setError("Passwords do not match!");
      setLoading(false);
      return;
    }

    try {
      // ✅ API 요청 보내기
      const response = await axios.post("http://localhost:4000/auth/signup", {
        ...data,
      });

      alert("✅ Registration successful! Please log in."); // 🔹 회원가입 성공 시 알림 추가
      navigate("/auth/login"); // 🔹 성공하면 로그인 페이지로 이동
      return response.data;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Signup failed. Please try again.");
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return { signUp, loading, error };
}
