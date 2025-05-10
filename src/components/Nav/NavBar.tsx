import { Link } from "react-router-dom";
import { FaSearch, FaChevronUp, FaUser } from "react-icons/fa";
import { useAuthStore } from "../../store/useAuthStore";
import { useUser } from "../../hooks/useUser";
import { useState, useEffect, useRef } from "react";

type UserRole = "ADMIN" | "JOB_SEEKER" | "BUSINESS";

export default function NavBar() {
  const { isAuthenticated, user, logout } = useAuthStore();
  const { isLoading } = useUser();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentView, setCurrentView] = useState<UserRole>((user?.role as UserRole) || "ADMIN");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleViewChange = (newView: UserRole) => {
    setCurrentView(newView);
    setIsDropdownOpen(false);
  };

  const navigationLinks = [
    { to: "/", label: "Home" },
    { to: "/jobs", label: "Search Jobs" },
  ];

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

  const roleButtonsConfig: Record<UserRole, Array<{ to: string; label: string }>> = {
    ADMIN: [
      { to: "/admin/users", label: "User Management" },
      { to: "/admin/jobs", label: "Job Management" },
    ],
    JOB_SEEKER: [
      { to: "/mypage/resume", label: "Upload Resume" },
      { to: "/mypage/applications", label: "My Applications" },
    ],
    BUSINESS: [
      { to: "/jobposting", label: "Post a Job" },
      { to: "/mybusiness/company", label: "Register Company" },
    ],
  };

  const renderNavigationLinks = () =>
    navigationLinks.map((link) => (
      <Link key={link.to} to={link.to} className='font-medium hover:text-albamon'>
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
                    ? "bg-orange-50 text-albamon"
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
            className='block px-4 py-2 text-sm text-gray-700 hover:bg-albamon-light'
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
          className='w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-albamon-light'>
          Logout
        </button>
      </>
    );
  };

  const renderUserDropdown = () => (
    <div className='relative' ref={dropdownRef}>
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className='flex items-center gap-2 px-3 py-1.5 text-gray-700 hover:text-gray-900 text-sm font-medium border rounded-full'>
        <FaUser className='text-gray-500' />
        <span>{user?.lastName || "User"}</span>
        <FaChevronUp
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

  const renderLoadingState = () => (
    <div className='flex items-center gap-2'>
      <div className='w-8 h-8 rounded-full bg-gray-200 animate-pulse'></div>
      <div className='w-16 h-4 bg-gray-200 rounded animate-pulse'></div>
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
        className='px-4 py-2 border border-albamon rounded-md text-albamon hover:border-albamon-dark hover:text-albamon-dark text-sm font-medium'>
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
        to='/mypage/resume'
        className='px-4 py-2 border border-albamon rounded-md text-albamon hover:border-albamon-dark hover:text-albamon-dark text-sm font-medium'>
        Upload Resume
      </Link>
      <Link
        to='/auth/login'
        className='px-4 py-2 border border-albamon rounded-md text-albamon hover:border-albamon-dark hover:text-albamon-dark text-sm font-medium'>
        Post a Job
      </Link>
    </div>
  );

  return (
    <div className='w-full'>
      {/* Main Header */}
      <div className='bg-white'>
        <div className='max-w-7xl mx-auto px-4 py-2 md:py-4 mt-2'>
          <div className='flex items-center justify-between'>
            {/* Logo */}
            <Link to='/' className='flex-shrink-0'>
              <img src='/mainLogo.png' alt='Part-Time Mate' className='h-10 md:h-14' />
            </Link>
            {/* Search Bar (모바일 숨김) */}
            <div className='hidden md:block w-[450px]'>
              <div className='relative'>
                <input
                  type='text'
                  placeholder='Search for jobs in Sydney...'
                  className='w-full py-2.5 px-5 pr-12 border-2 border-albamon rounded-full focus:outline-none focus:ring-2 focus:ring-albamon'
                />
                <button className='absolute right-4 top-1/2 -translate-y-1/2 text-albamon hover:text-albamon-dark'>
                  <FaSearch className='text-lg' />
                </button>
              </div>
            </div>
            {/* Promo (모바일 숨김) */}
            <div className='hidden md:flex flex-col items-end gap-1 text-sm'>
              <span className='text-albamon-dark font-medium'>
                Find Your Perfect Part-Time Job!
              </span>
              <span className='text-gray-600'>Over 1,000+ New Jobs Every Day</span>
            </div>
            {/* 모바일 햄버거 */}
            <div className='md:hidden'>
              <button
                className='p-2 rounded hover:bg-gray-100'
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}>
                <svg
                  width='24'
                  height='24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'>
                  <line x1='3' y1='12' x2='21' y2='12' />
                  <line x1='3' y1='6' x2='21' y2='6' />
                  <line x1='3' y1='18' x2='21' y2='18' />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Navigation Menu */}
      <div className='bg-white border-b'>
        <div className='max-w-7xl mx-auto px-4'>
          <div className='flex items-center justify-between py-3'>
            {/* Main Categories */}
            <div className='flex items-center gap-6 md:gap-8 text-sm md:text-base'>
              {renderNavigationLinks()}
            </div>
            {/* Action Buttons & Auth (모바일 숨김) */}
            <div className='hidden md:flex items-center gap-3'>
              {isLoading ? (
                renderLoadingState()
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
      {/* 모바일 메뉴 오버레이 */}
      {isMobileMenuOpen && (
        <div className='fixed inset-0 z-50 bg-black bg-opacity-40 flex'>
          <div className='w-4/5 max-w-xs bg-white h-full shadow-lg p-0 flex flex-col'>
            {/* 상단: 로고와 닫기 버튼 */}
            <div className='flex items-center justify-between px-4 py-3 border-b border-gray-100'>
              <Link to='/' onClick={() => setIsMobileMenuOpen(false)}>
                <img src='/mainLogo.png' alt='Part-Time Mate' className='h-8' />
              </Link>
              <button className='p-2' onClick={() => setIsMobileMenuOpen(false)}>
                <span className='text-2xl'>&times;</span>
              </button>
            </div>
            {/* 메뉴 항목 */}
            <nav className='flex flex-col gap-1 px-4 py-4'>{renderNavigationLinks()}</nav>
            <hr className='my-2' />
            {/* 버튼 영역: 가로 스크롤 */}
            <div className='flex flex-col gap-1 px-4 pb-4'>
              {isAuthenticated && user ? (
                <>
                  {/* effectiveRole 기준 메뉴 항목 */}
                  {(() => {
                    const effectiveRole = user.role === "ADMIN" ? currentView : user.role;
                    return (dropdownConfig[effectiveRole as UserRole] || []).map((item) => (
                      <Link
                        key={item.label}
                        to={item.to!}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className='block px-2 py-2 text-gray-700 rounded hover:bg-orange-50 font-medium'>
                        {item.label}
                      </Link>
                    ));
                  })()}
                  {/* 어드민 뷰 전환 버튼 */}
                  {user.role === "ADMIN" && (
                    <div className='mt-2'>
                      <div className='text-xs font-medium text-gray-500 mb-1 px-2'>SWITCH VIEW</div>
                      <div className='flex flex-col gap-1'>
                        {["ADMIN", "JOB_SEEKER", "BUSINESS"].map((role) => (
                          <button
                            key={role}
                            onClick={() => {
                              handleViewChange(role as UserRole);
                            }}
                            className={`w-full text-left px-2 py-1 text-sm rounded ${
                              currentView === role
                                ? "bg-orange-50 text-albamon"
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
                  )}
                  <button
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className='block w-full text-left px-2 py-2 mt-2 text-red-600 rounded hover:bg-orange-50 font-medium'>
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to='/auth/login'
                    onClick={() => setIsMobileMenuOpen(false)}
                    className='text-gray-700 font-medium py-2'>
                    Login
                  </Link>
                  <Link
                    to='/auth/register'
                    onClick={() => setIsMobileMenuOpen(false)}
                    className='text-gray-700 font-medium py-2'>
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
          {/* 오버레이 클릭 시 닫힘 */}
          <div className='flex-1' onClick={() => setIsMobileMenuOpen(false)} />
        </div>
      )}
    </div>
  );
}
