import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBuilding, FaCog, FaList, FaClipboardList } from "react-icons/fa";
import { useAuthStore } from "../../store/useAuthStore";

export default function MyBusinessSidebar() {
  const location = useLocation();
  const { user } = useAuthStore();

  const navItems = [
    { path: "/mybusiness", label: "Dashboard", icon: <FaList /> },
    { path: "/mybusiness/usersetting", label: "User Setting", icon: <FaCog /> },
    { path: "/mybusiness/companylist", label: "Company List", icon: <FaBuilding /> },
    { path: "/mybusiness/postings", label: "Posting List", icon: <FaClipboardList /> },
  ];

  const isActiveRoute = (path: string) => {
    if (path === "/mybusiness") {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className='w-64 bg-white shadow-lg h-screen sticky top-0'>
      {/* Profile Section */}
      <div className='p-6 border-b border-gray-100'>
        <div className='flex items-center space-x-4'>
          <div className='w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center'>
            <span className='text-orange-600 text-xl font-semibold'>
              {user?.firstName?.[0] || "B"}
            </span>
          </div>
          <div>
            <h2 className='text-sm font-semibold text-gray-900'>
              {user?.firstName || "Business User"}
            </h2>
            <p className='text-xs text-gray-500'>{user?.email}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className='p-4'>
        <ul className='space-y-2'>
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200
                  ${
                    isActiveRoute(item.path)
                      ? "bg-orange-50 text-orange-600"
                      : "text-gray-600 hover:bg-orange-50 hover:text-orange-600"
                  }`}>
                <span className='text-lg'>{item.icon}</span>
                <span className='font-medium'>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
