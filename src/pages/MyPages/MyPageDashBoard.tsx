import React from "react";
import { FaUser, FaFileAlt, FaHeart, FaBriefcase } from "react-icons/fa";
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import MyPageSidebar from "./MyPageSidebar";

export default function MyPageDashboard() {
  const { user } = useAuthStore();
  const location = useLocation();

  if (!user) return <Navigate to='/auth/login' />;

  const stats = [
    { icon: <FaFileAlt />, label: "My Resumes", count: 3, link: "/mypage/resume" },
    { icon: <FaHeart />, label: "Saved Jobs", count: 5, link: "/mypage/wishlist" },
    { icon: <FaBriefcase />, label: "Applications", count: 8, link: "/mypage/applications" },
  ];

  return (
    <div className='flex min-h-screen bg-gray-50'>
      {/* Sidebar */}
      <MyPageSidebar />

      {/* Main Content */}
      <div className='flex-1'>
        {location.pathname === "/mypage" ? (
          <div className='max-w-full px-2 py-4 sm:px-4 md:px-6 lg:px-8'>
            <div className='mb-4'>
              <h1 className='text-lg md:text-2xl font-bold text-gray-900'>MyPage Dashboard</h1>
              <p className='mt-1 text-xs md:text-sm text-gray-600'>
                Easily access your user settings, review your resumes, and check your favorite
                listings.
              </p>
            </div>

            {/* Stats Grid */}
            <div className='grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 mb-6'>
              {stats.map((stat) => (
                <Link
                  key={stat.label}
                  to={stat.link}
                  className='bg-white rounded-lg md:rounded-xl p-3 md:p-6 shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-1'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <p className='text-xs md:text-sm font-medium text-gray-500'>{stat.label}</p>
                      <p className='text-lg md:text-2xl font-bold text-gray-900 mt-0.5 md:mt-1'>
                        {stat.count}
                      </p>
                    </div>
                    <div className='w-8 h-8 md:w-12 md:h-12 bg-orange-50 rounded-full flex items-center justify-center text-orange-600 text-base md:text-xl'>
                      {stat.icon}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Quick Actions */}
            <div className='bg-white rounded-lg md:rounded-xl shadow-sm overflow-hidden'>
              <div className='px-4 md:px-6 py-2 md:py-4 border-b border-gray-100'>
                <h2 className='text-base md:text-lg font-semibold text-gray-900'>Quick Actions</h2>
              </div>
              <div className='p-4 md:p-6'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4'>
                  <Link
                    to='/mypage/settings'
                    className='group flex items-center gap-2 md:gap-4 p-3 md:p-4 rounded-lg md:rounded-xl border border-gray-100 hover:border-orange-200 hover:bg-orange-50 transition-all duration-200'>
                    <div className='w-8 h-8 md:w-10 md:h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 group-hover:bg-orange-200 transition-colors'>
                      <FaUser size={16} className='md:w-5 md:h-5' />
                    </div>
                    <div>
                      <h3 className='font-medium text-xs md:text-base text-gray-900'>
                        Update Profile
                      </h3>
                      <p className='text-[11px] md:text-sm text-gray-500'>
                        Edit your personal information
                      </p>
                    </div>
                  </Link>
                  <Link
                    to='/mypage/resume'
                    className='group flex items-center gap-2 md:gap-4 p-3 md:p-4 rounded-lg md:rounded-xl border border-gray-100 hover:border-orange-200 hover:bg-orange-50 transition-all duration-200'>
                    <div className='w-8 h-8 md:w-10 md:h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 group-hover:bg-orange-200 transition-colors'>
                      <FaFileAlt size={16} className='md:w-5 md:h-5' />
                    </div>
                    <div>
                      <h3 className='font-medium text-xs md:text-base text-gray-900'>
                        Manage Resumes
                      </h3>
                      <p className='text-[11px] md:text-sm text-gray-500'>
                        Upload or update your resumes
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
}
