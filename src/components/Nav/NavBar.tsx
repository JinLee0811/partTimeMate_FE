import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useAuthStore } from "../../store/useAuthStore";
import { useUser } from "../../hooks/useUser"; // ✅ 유저 정보 가져오기 훅
import NavItem from "./NavItem";

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuthStore();
  const { isLoading } = useUser(); // ✅ React Query에서 user 정보 가져오기

  return (
    <nav className='bg-white relative shadow-md'>
      {/* 1️⃣ Top Bar: 로그인 / 회원가입 */}
      <div className='flex justify-end mr-5 items-center p-2 text-gray-500 text-sm max-w-8xl mx-auto'>
        {isLoading ? (
          <span>Loading...</span>
        ) : isAuthenticated && user ? (
          <>
            <span className='mr-2'>Welcome, {user.lastName}!</span>
            <span className='mx-2 text-gray-400'>|</span>
            <button onClick={logout} className='hover:text-red-500 ml-2'>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to='/auth/login' className='hover:text-gray-700'>
              Login
            </Link>
            <span className='mx-2 text-gray-400'>|</span>
            <Link to='/auth/register' className='hover:text-gray-700'>
              Sign Up
            </Link>
          </>
        )}
      </div>

      {/* 2️⃣ Middle Bar: 로고 + 검색창 + 광고 */}
      <div className='flex justify-between items-center max-w-8xl mx-auto p-4'>
        <Link to='/' className='flex items-center space-x-2'>
          <img src='/mainLogo.png' alt='Part-Time Mate Logo' className='ml-10 h-16' />
        </Link>

        {/* 검색창 */}
        <div className='relative w-2/5'>
          <input
            type='text'
            placeholder='Search for jobs...'
            className='w-full p-3 border border-gray-400 rounded-full pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400'
          />
          <button className='absolute right-3 top-1/2 transform -translate-y-1/2 bg-yellow-400 p-2 rounded-full'>
            <FaSearch className='text-black' />
          </button>
        </div>

        {/* 광고 자리 */}
        <div className='hidden md:block mr-5'>
          <div className='bg-gray-800 p-8 w-40 rounded-lg flex justify-center text-white'>
            AD Here!
          </div>
        </div>
      </div>

      {/* 3️⃣ Bottom Bar: 네비게이션 + 버튼 */}
      <div className='relative'>
        <div className='flex justify-between items-center bg-white border-y py-4 px-10 w-auto mx-auto'>
          {/* 네비게이션 메뉴 */}
          <div className='flex space-x-6 font-semibold relative ml-10'>
            <NavItem label='Job Listings' path='/jobs' menuKey='jobs' />
            <NavItem label='Branded Jobs' path='/brands' menuKey='brands' />
            <NavItem label='Talent Pool' path='/candidates' menuKey='candidates' />
            {isAuthenticated && user && (
              <>
                {user.role === "JOB_SEEKER" && (
                  <NavItem label='My Page' path='/mypage' menuKey='mypage' />
                )}
                {user.role === "BUSINESS" && (
                  <NavItem label='My Business' path='/mybusiness' menuKey='mybusiness' />
                )}
                {user.role === "ADMIN" && (
                  <>
                    <NavItem label='My Page' path='/mypage' menuKey='mypage' />
                    <NavItem label='My Business' path='/mybusiness' menuKey='mybusiness' />
                    <NavItem label='Admin' path='/admin' menuKey='admin' />
                  </>
                )}
              </>
            )}
          </div>

          {/* 오른쪽 버튼 */}
          <div className='flex space-x-3 mr-5'>
            {user?.role === "JOB_SEEKER" && (
              <Link
                to='/resume'
                className='bg-yellow-300 px-4 py-2 rounded-full flex justify-center items-center text-black font-bold text-m'>
                Upload Resume
              </Link>
            )}
            {user?.role === "BUSINESS" && (
              <Link
                to='/jobposting'
                className='bg-blue-500 px-4 py-3 rounded-full text-white font-bold flex justify-center items-center text-m'>
                Post a Job
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
