import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import MyPageSidebar from "./MyPageSidebar";

export default function MyPageHome() {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated || !user) {
    return <Navigate to='/auth/login' />;
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-[1600px] mx-auto'>
        <div className='flex'>
          {/* Sidebar */}
          <MyPageSidebar />

          {/* Main Content */}
          <main className='flex-1'>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
