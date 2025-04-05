import { Link } from "react-router-dom";
import { FaSearch, FaChevronDown, FaUser } from "react-icons/fa";
import { useAuthStore } from "../../store/useAuthStore";
import { useUser } from "../../hooks/useUser"; // ✅ 유저 정보 가져오기 훅
import { useState } from "react";

type UserRole = "ADMIN" | "JOB_SEEKER" | "BUSINESS";

export default function NavBar() {
  const { isAuthenticated, user, logout } = useAuthStore();
  const { isLoading } = useUser(); // ✅ React Query에서 user 정보 가져오기
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentView, setCurrentView] = useState<UserRole>((user?.role as UserRole) || "ADMIN");

  const handleViewChange = (newView: UserRole) => {
    setCurrentView(newView);
    setIsDropdownOpen(false);
  };

  // 네비게이션 링크 배열
  const navigationLinks = [
    { to: "/", label: "Home" },
    { to: "/jobs", label: "Search Jobs" },
  ];

  // 드롭다운 메뉴 아이템 설정 (역할별)
  const dropdownConfig: Record<UserRole, Array<{ to?: string; label: string }>> = {
    ADMIN: [
      { to: "/jobs/applications", label: "My Applications" },
      { to: "/mypage", label: "My Page" },
      { to: "/mybusiness", label: "My Business" },
      { to: "/admin", label: "Admin" },
    ],
    JOB_SEEKER: [
      { to: "/jobs/applications", label: "My Applications" },
      { to: "/mypage", label: "My Page" },
    ],
    BUSINESS: [{ to: "/mybusiness", label: "My Business" }],
  };

  // 역할별 상단 액션 버튼 설정
  const roleButtonsConfig: Record<UserRole, Array<{ to: string; label: string }>> = {
    ADMIN: [
      { to: "/admin/users", label: "User Management" },
      { to: "/admin/jobs", label: "Job Management" },
    ],
    JOB_SEEKER: [
      { to: "/resume", label: "Upload Resume" },
      { to: "/jobs/applications", label: "My Applications" },
    ],
    BUSINESS: [
      { to: "/jobposting", label: "Post a Job" },
      { to: "/company/register", label: "Register Company" },
    ],
  };

  const renderNavigationLinks = () =>
    navigationLinks.map((link) => (
      <Link key={link.to} to={link.to} className='font-medium hover:text-yellow-600'>
        {link.label}
      </Link>
    ));

  const renderAdminViewSelector = () => {
    if (user?.role !== "ADMIN") return null;
    const views: UserRole[] = ["ADMIN", "JOB_SEEKER", "BUSINESS"];

    return (
      <>
        <div className='border-t border-gray-100 my-1'></div>
        <div className='px-4 py-2'>
          <div className='text-xs font-medium text-gray-500 mb-1'>SWITCH VIEW</div>
          <div className='space-y-1'>
            {views.map((role) => (
              <button
                key={role}
                onClick={() => handleViewChange(role)}
                className={`w-full text-left px-2 py-1 text-sm rounded ${
                  currentView === role
                    ? "bg-orange-50 text-orange-600"
                    : "text-gray-700 hover:bg-gray-50"
                }`}>
                {role === "ADMIN"
                  ? "Admin View"
                  : role === "JOB_SEEKER"
                    ? "Job Seeker View"
                    : "Business View"}
              </button>
            ))}
          </div>
        </div>
      </>
    );
  };

  const renderUserDropdownItems = () => {
    if (!user) return null;
    const items = dropdownConfig[user.role as UserRole] || [];
    return (
      <>
        {items.map((item) => (
          <Link
            key={item.label}
            to={item.to!}
            className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50'
            onClick={() => setIsDropdownOpen(false)}>
            {item.label}
          </Link>
        ))}
        {user.role === "ADMIN" && renderAdminViewSelector()}
        <div className='border-t border-gray-100 my-1'></div>
        <button
          onClick={() => {
            logout();
            setIsDropdownOpen(false);
          }}
          className='w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50'>
          Logout
        </button>
      </>
    );
  };

  const renderUserDropdown = () => (
    <div className='relative'>
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className='flex items-center gap-2 px-3 py-1.5 text-gray-700 hover:text-gray-900 text-sm font-medium border rounded-full'>
        <FaUser className='text-gray-500' />
        <span>{user?.lastName || "User"}</span>
        <FaChevronDown
          className={`text-gray-500 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
        />
      </button>
      {isDropdownOpen && (
        <div className='absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50'>
          {renderUserDropdownItems()}
        </div>
      )}
    </div>
  );

  const renderRoleSpecificButtons = () => {
    if (!user) return null;
    const effectiveRole = user.role === "ADMIN" ? currentView : user.role;
    const buttons = roleButtonsConfig[effectiveRole as UserRole] || [];
    return buttons.map((button) => (
      <Link
        key={button.to}
        to={button.to}
        className='px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:border-gray-400 hover:text-gray-900 text-sm font-medium'>
        {button.label}
      </Link>
    ));
  };

  const renderActionButtons = () => (
    <div className='flex items-center gap-2'>
      <Link
        to='/auth/login'
        className='px-4 py-1.5 text-gray-700 hover:text-gray-900 text-sm font-medium'>
        Login
      </Link>
      <Link
        to='/auth/register'
        className='px-4 py-1.5 text-gray-700 hover:text-gray-900 text-sm font-medium'>
        Sign Up
      </Link>
      <Link
        to='/jobposting'
        className='px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:border-gray-400 hover:text-gray-900 text-sm font-medium'>
        Upload Resume
      </Link>
      <Link
        to='/company/register'
        className='px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:border-gray-400 hover:text-gray-900 text-sm font-medium'>
        Post a Job
      </Link>
    </div>
  );

  return (
    <div className='w-full'>
      {/* Main Header */}
      <div className='bg-white'>
        <div className='max-w-7xl mx-auto px-4 py-4 mt-2'>
          <div className='flex items-center justify-between'>
            {/* Logo */}
            <Link to='/' className='flex-shrink-0'>
              <img src='/mainLogo.png' alt='Part-Time Mate' className='h-14' />
            </Link>
            {/* Search Bar */}
            <div className='w-[450px]'>
              <div className='relative'>
                <input
                  type='text'
                  placeholder='Search for jobs in Sydney...'
                  className='w-full py-2.5 px-5 pr-12 border-2 border-orange-500 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400'
                />
                <button className='absolute right-4 top-1/2 -translate-y-1/2 text-orange-500 hover:text-orange-600'>
                  <FaSearch className='text-lg' />
                </button>
              </div>
            </div>
            {/* Promo */}
            <div className='flex flex-col items-end gap-1 text-sm'>
              <span className='text-orange-500 font-medium'>Find Your Perfect Part-Time Job!</span>
              <span className='text-gray-600'>Over 1,000+ New Jobs Every Day</span>
            </div>
          </div>
        </div>
      </div>
      {/* Navigation Menu */}
      <div className='bg-white border-b'>
        <div className='max-w-7xl mx-auto px-4'>
          <div className='flex items-center justify-between py-3'>
            {/* Main Categories */}
            <div className='flex items-center gap-8'>{renderNavigationLinks()}</div>
            {/* Action Buttons & Auth */}
            <div className='flex items-center gap-3'>
              {isLoading ? (
                <span>Loading...</span>
              ) : isAuthenticated && user ? (
                <>
                  {renderRoleSpecificButtons()}
                  <div className='w-px h-4 bg-gray-300' />
                  {renderUserDropdown()}
                </>
              ) : (
                renderActionButtons()
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
