import AdminSidebar from "./AdminSidebar";
import { Outlet } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div className='flex h-screen'>
      {/* 왼쪽 사이드바 */}
      <AdminSidebar />

      {/* 메인 콘텐츠 영역 */}
      <div className='flex-1 p-6 bg-gray-100'>
        <Outlet /> {/* 각 페이지의 콘텐츠가 여기에 표시됨 */}
      </div>
    </div>
  );
}
