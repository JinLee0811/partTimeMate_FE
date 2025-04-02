import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { User } from "../types/user";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: User["role"] | User["role"][]; // 단일 역할 또는 역할 배열 허용
}

export default function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuthStore();

  // ✅ 로그인하지 않은 경우 로그인 페이지로 리디렉트
  if (!isAuthenticated) {
    return <Navigate to='/auth/login' replace />;
  }

  // ✅ 특정 역할이 필요한 경우 체크
  if (requiredRole) {
    // user.role이 없는 경우 접근 거부
    if (!user?.role) {
      return <Navigate to='/' replace />;
    }

    // 배열인 경우 하나라도 일치하면 접근 허용
    if (Array.isArray(requiredRole)) {
      if (!requiredRole.includes(user.role)) {
        return <Navigate to='/' replace />;
      }
    }
    // 단일 역할인 경우 정확히 일치해야 접근 허용
    else if (user.role !== requiredRole) {
      return <Navigate to='/' replace />;
    }
  }

  return <>{children}</>;
}
