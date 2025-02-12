import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useAuthStore } from "../../store/useAuthStore";
import NavItem from "./NavItem";

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuthStore();

  return (
    <nav className='bg-white relative'>
      {/* 1️⃣ Top Bar: 로그인 / 회원가입 */}
      <div className='flex justify-end items-center p-2 text-gray-500 text-sm max-w-7xl mx-auto'>
        {isAuthenticated ? (
          <>
            <span className='mr-2'>Welcome, {user?.role}!</span>
            {console.log(user)}
            <button onClick={logout} className='hover:text-red-500'>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to='/auth/login' className='hover:text-gray-700'>
              Login
            </Link>
            <span className='mx-2'>|</span>
            <Link to='/auth/register' className='hover:text-gray-700'>
              Sign Up
            </Link>
          </>
        )}
      </div>

      {/* 2️⃣ Middle Bar: 로고 + 검색창 + 광고 */}
      <div className='flex justify-between items-center max-w-7xl mx-auto p-4'>
        <Link to='/' className='flex items-center space-x-2'>
          <img src='/logo.svg' alt='Part-Time Mate Logo' className='h-10' />
        </Link>

        {/* 검색창 */}
        <div className='relative w-96'>
          <input
            type='text'
            placeholder='Search for jobs...'
            className='w-full p-3 border m-auto rounded-full pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400'
          />
          <button className='absolute right-3 top-1/2 transform -translate-y-1/2 bg-yellow-400 p-2 rounded-full'>
            <FaSearch className='text-black' />
          </button>
        </div>

        {/* 광고 자리 */}
        <div className='hidden md:block'>
          <img src='/ad-banner.png' alt='Promotion' className='h-12' />
        </div>
      </div>

      {/* 3️⃣ Bottom Bar: 네비게이션 + 버튼 */}
      <div className='relative'>
        <div className='flex justify-between items-center bg-white border-y py-4 px-10 w-auto mx-auto'>
          {/* 네비게이션 메뉴 */}
          <div className='flex space-x-6 font-semibold relative'>
            <NavItem label='Job Listings' path='/jobs' menuKey='jobs' />
            <NavItem label='Branded Jobs' path='/brands' menuKey='brands' />
            <NavItem label='Talent Pool' path='/candidates' menuKey='candidates' />
          </div>

          {/* 오른쪽 버튼 */}
          <div className='flex space-x-3'>
            {user?.role === "jobseeker" ? (
              <Link
                to='/resume'
                className='bg-yellow-400 px-4 py-2 rounded-full text-black font-semibold hover:bg-yellow-500'>
                Upload Resume
              </Link>
            ) : (
              <Link
                to='/post-job'
                className='bg-blue-500 px-4 py-2 rounded-full text-white font-semibold hover:bg-blue-600'>
                Post a Job
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
