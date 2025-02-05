import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

export default function Navbar() {
  return (
    <nav className='bg-white shadow'>
      {/* 1️⃣ Top Bar: 로그인 / 회원가입 */}
      <div className='flex justify-end items-center p-2 text-gray-500 text-sm max-w-7xl mx-auto'>
        <Link to='/login' className='hover:text-gray-700'>
          Login
        </Link>
        <span className='mx-2'>|</span>
        <Link to='/register' className='hover:text-gray-700'>
          Sign Up
        </Link>
      </div>

      {/* 2️⃣ Middle Bar: 로고 + 검색창 + 광고 */}
      <div className='flex justify-between items-center max-w-7xl mx-auto p-4'>
        {/* 로고 */}
        <Link to='/' className='flex items-center space-x-2'>
          <img src='/logo.svg' alt='Part-Time Mate Logo' className='h-10' />
        </Link>

        {/* 검색창 */}
        <div className='relative w-96'>
          <input
            type='text'
            placeholder='Search for jobs...'
            className='w-full p-3 border rounded-full pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400'
          />
          <button className='absolute right-3 top-1/2 transform -translate-y-1/2 bg-yellow-400 p-2 rounded-full'>
            <FaSearch className='text-black' />
          </button>
        </div>

        {/* 오른쪽 광고 (예제용) */}
        <div className='hidden md:block'>
          <img src='/ad-banner.png' alt='Promotion' className='h-12' />
        </div>
      </div>

      {/* 3️⃣ Bottom Bar: 네비게이션 + 버튼 */}
      <div className='flex justify-between items-center bg-white border-t py-3 max-w-7xl mx-auto'>
        {/* 네비게이션 메뉴 */}
        <div className='flex space-x-6 text-gray-800 font-semibold'>
          <button className='text-lg'>☰ All Menu</button>
          <Link to='/jobs' className='hover:text-blue-500'>
            Job Listings
          </Link>
          <Link to='/companies' className='hover:text-blue-500'>
            Companies
          </Link>
          <Link to='/candidates' className='hover:text-blue-500'>
            Candidates
          </Link>
          <Link to='/job-story' className='hover:text-blue-500'>
            Job Stories
          </Link>
          <Link to='/support' className='hover:text-blue-500'>
            Support
          </Link>
        </div>

        {/* 오른쪽 버튼 */}
        <div className='flex space-x-3'>
          <Link
            to='/resume'
            className='bg-yellow-400 px-4 py-2 rounded-full text-black font-semibold hover:bg-yellow-500'>
            Upload Resume
          </Link>
          <Link
            to='/post-job'
            className='bg-blue-500 px-4 py-2 rounded-full text-white font-semibold hover:bg-blue-600'>
            Post a Job
          </Link>
        </div>
      </div>
    </nav>
  );
}
