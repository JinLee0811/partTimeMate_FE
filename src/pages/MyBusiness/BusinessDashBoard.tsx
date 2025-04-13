import React from "react";
import { FaBuilding, FaFileAlt, FaBriefcase } from "react-icons/fa";
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import MyBusinessSidebar from "./MyBusinessSidebar";

export default function BusinessDashBoard() {
  const { user } = useAuthStore();
  const location = useLocation();

  if (!user) return <Navigate to='/auth/login' />;

  const stats = [
    { icon: <FaBuilding />, label: "My Companies", count: 2, link: "/mybusiness/companylist" },
    { icon: <FaFileAlt />, label: "Active Jobs", count: 5, link: "/mybusiness/jobs" },
    {
      icon: <FaBriefcase />,
      label: "Total Applications",
      count: 15,
      link: "/mybusiness/applications",
    },
  ];

  return (
    <div className='flex min-h-screen bg-gray-50'>
      {/* Sidebar */}
      <MyBusinessSidebar />

      {/* Main Content */}
      <div className='flex-1'>
        {location.pathname === "/mybusiness" ? (
          <div className='max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8'>
            <div className='mb-8'>
              <h1 className='text-2xl font-bold text-gray-900'>Business Dashboard</h1>
              <p className='mt-2 text-sm text-gray-600'>
                Manage your companies, job postings, and review applications efficiently.
              </p>
            </div>

            {/* Stats Grid */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
              {stats.map((stat) => (
                <Link
                  key={stat.label}
                  to={stat.link}
                  className='bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-1'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <p className='text-sm font-medium text-gray-500'>{stat.label}</p>
                      <p className='text-2xl font-bold text-gray-900 mt-1'>{stat.count}</p>
                    </div>
                    <div className='w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center text-orange-600 text-xl'>
                      {stat.icon}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Quick Actions */}
            <div className='bg-white rounded-xl shadow-sm overflow-hidden'>
              <div className='px-6 py-4 border-b border-gray-100'>
                <h2 className='text-lg font-semibold text-gray-900'>Quick Actions</h2>
              </div>
              <div className='p-6'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <Link
                    to='/jobposting'
                    className='group flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-orange-200 hover:bg-orange-50 transition-all duration-200'>
                    <div className='w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 group-hover:bg-orange-200 transition-colors'>
                      <FaBriefcase />
                    </div>
                    <div>
                      <h3 className='font-medium text-gray-900'>Post a New Job</h3>
                      <p className='text-sm text-gray-500'>Create a new job posting</p>
                    </div>
                  </Link>
                  <Link
                    to='/mybusiness/company'
                    className='group flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-orange-200 hover:bg-orange-50 transition-all duration-200'>
                    <div className='w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 group-hover:bg-orange-200 transition-colors'>
                      <FaBuilding />
                    </div>
                    <div>
                      <h3 className='font-medium text-gray-900'>Register Company</h3>
                      <p className='text-sm text-gray-500'>Add a new company profile</p>
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
