import React from "react";
import { FaUser, FaLock, FaTrash } from "react-icons/fa";

interface MyPageTabsProps {
  activeTab: "personal" | "password" | "settings" | "delete";
  setActiveTab: (tab: "personal" | "password" | "settings" | "delete") => void;
  isEmployer: boolean;
}

export default function MyPageTabs({ activeTab, setActiveTab, isEmployer }: MyPageTabsProps) {
  const tabs = [
    {
      id: "personal",
      label: "Personal Information",
      icon: <FaUser className='w-4 h-4' />,
    },
    {
      id: "password",
      label: "Password Change",
      icon: <FaLock className='w-4 h-4' />,
    },
    {
      id: "delete",
      label: "Account Deletion",
      icon: <FaTrash className='w-4 h-4' />,
    },
  ];

  return (
    <div className='border-b border-gray-200'>
      <nav className='flex space-x-8' aria-label='Settings'>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`
              group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm
              ${
                activeTab === tab.id
                  ? "border-orange-500 text-orange-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }
              focus:outline-none transition-colors duration-200
            `}>
            <span
              className={`
              mr-2 transition-colors duration-200
              ${activeTab === tab.id ? "text-orange-500" : "text-gray-400 group-hover:text-gray-500"}
            `}>
              {tab.icon}
            </span>
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
