import AdminSidebar from "./AdminSidebar";
import { Outlet } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div className='flex min-h-screen bg-gray-50'>
      {/* 사이드바 */}
      <AdminSidebar />

      {/* 메인 콘텐츠 영역 */}
      <div className='flex-1 py-8 px-6'>
        <div className='max-w-7xl mx-auto'>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
