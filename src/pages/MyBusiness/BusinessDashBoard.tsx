import { useAuthStore } from "../../store/useAuthStore";
import MyPageSidebar from "./MyBusinessSidebar";
import { Outlet, Navigate } from "react-router-dom";

export default function MyPageDashboard() {
  const { user } = useAuthStore();

  if (!user) return <Navigate to='/auth/login' />; // 로그인 안 한 유저 차단

  return (
    <div className='flex h-screen'>
      <MyPageSidebar />

      {/* 잡시커가 Employer 전용 페이지에 접근하면 대시보드로 리디렉션 */}
      {user.role === "JOB_SEEKER" && window.location.pathname.includes("business") ? (
        <Navigate to='/mypage' />
      ) : (
        <div className='flex-1 p-6 bg-white'>
          <Outlet />
        </div>
      )}
    </div>
  );
}
