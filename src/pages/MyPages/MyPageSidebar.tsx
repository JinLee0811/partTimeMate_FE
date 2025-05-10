import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaUser, FaCog, FaFileAlt, FaHeart, FaTachometerAlt, FaBriefcase } from "react-icons/fa";

interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
}

export default function MyPageSidebar() {
  const location = useLocation();

  const navItems: NavItem[] = [
    { path: "/mypage", label: "Dashboard", icon: <FaTachometerAlt /> },
    { path: "/mypage/usersetting", label: "User Setting", icon: <FaCog /> },
    { path: "/mypage/resume", label: "Manage Resume", icon: <FaFileAlt /> },
    { path: "/mypage/applications", label: "My Applications", icon: <FaBriefcase /> },
    { path: "/mypage/wishlist", label: "My Wishlist", icon: <FaHeart /> },
  ];

  const isActiveRoute = (path: string) => {
    if (path === "/mypage") {
      return location.pathname === "/mypage";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* 데스크탑: 기존 사이드바 */}
      <div className='hidden md:block w-64 min-h-screen bg-white border-r border-gray-100'>
        {/* User Profile Section */}
        <div className='p-6 border-b border-gray-100'>
          <div className='flex flex-col items-center'>
            <div className='w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4'>
              <FaUser className='w-8 h-8 text-gray-400' />
            </div>
            <h2 className='text-lg font-semibold text-gray-800'>My Page</h2>
            <p className='text-sm text-gray-500 mt-1'>Welcome back!</p>
          </div>
        </div>
        {/* Navigation Menu */}
        <nav className='p-4'>
          <ul className='space-y-2'>
            {navItems.map((item) => {
              const isActive = isActiveRoute(item.path);
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                      ${isActive ? "bg-orange-50 text-orange-600" : "text-gray-600 hover:bg-gray-50"}
                    `}>
                    <span className={`text-lg ${isActive ? "text-orange-600" : "text-gray-400"}`}>
                      {item.icon}
                    </span>
                    <span className='font-medium'>{item.label}</span>
                    {isActive && (
                      <span className='ml-auto w-1.5 h-1.5 rounded-full bg-orange-600'></span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* 모바일: 하단 탭바 */}
      <div className='fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 flex justify-between items-center h-12 md:hidden'>
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className='flex flex-col items-center flex-1 justify-center h-full min-w-0'>
            <span
              className={`w-5 h-5 flex items-center justify-center ${isActiveRoute(item.path) ? "text-orange-600" : "text-gray-400"}`}>
              {React.cloneElement(item.icon as React.ReactElement, { size: 20 })}
            </span>
            <span
              className={
                isActiveRoute(item.path)
                  ? "text-[10px] text-orange-600 font-semibold leading-tight mt-0.5"
                  : "text-[10px] text-gray-500 leading-tight mt-0.5"
              }>
              {item.label.replace("My ", "")}
            </span>
          </Link>
        ))}
      </div>
    </>
  );
}
