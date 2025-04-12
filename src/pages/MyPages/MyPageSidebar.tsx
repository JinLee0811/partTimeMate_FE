import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaUser, FaCog, FaFileAlt, FaHeart, FaTachometerAlt } from "react-icons/fa";

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
    { path: "/mypage/wishlist", label: "My Wishlist", icon: <FaHeart /> },
  ];

  const isActiveRoute = (path: string) => {
    if (path === "/mypage") {
      return location.pathname === "/mypage";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className='w-64 min-h-screen bg-white border-r border-gray-100'>
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
  );
}
