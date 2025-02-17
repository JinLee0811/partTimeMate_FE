import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { User } from "../types/user";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: User["role"]; // ✅ 특정 역할을 요구하는 경우
}

export default function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuthStore();

  // ✅ 로그인하지 않은 경우 로그인 페이지로 리디렉트
  if (!isAuthenticated) {
    return <Navigate to='/auth/login' replace />;
  }

  // ✅ "ADMIN" 사용자는 모든 페이지 접근 가능하도록 허용
  if (user?.role === "ADMIN") {
    return <>{children}</>;
  }

  // ✅ 특정 역할이 필요하지만 현재 사용자의 역할이 맞지 않으면 메인 페이지로 리디렉트
  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to='/' replace />;
  }

  return <>{children}</>;
}
