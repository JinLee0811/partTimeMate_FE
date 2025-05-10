import { Link, useLocation } from "react-router-dom";

export default function AuthNavBar() {
  const location = useLocation(); // 현재 경로 가져오기

  // 로그인 페이지에서는 Home / QNA / FAQ 메뉴 표시
  const isLoginPage = location.pathname === "/auth/login";

  return (
    <nav className='flex justify-between items-center w-full max-w-5xl mx-auto p-5 bg-white border-b border-gray-100 md:p-5 md:border-0'>
      {/* 왼쪽 로고 */}
      <Link to='/' className='flex items-center'>
        <img src='/mainLogo.png' alt='Part-Time Mate Logo' className='h-10 md:ml-10 md:h-16' />
      </Link>

      {/* 오른쪽 네비게이션 */}
      <div className='hidden sm:flex space-x-4'>
        {isLoginPage ? (
          <>
            <Link to='/' className='text-gray-600 hover:text-blue-500 transition'>
              Home
            </Link>
            <Link to='/auth/register' className='text-gray-600 hover:text-blue-500 transition'>
              Sign Up
            </Link>
            <Link to='/qna' className='text-gray-600 hover:text-blue-500 transition'>
              Q&A
            </Link>
            <Link to='/faq' className='text-gray-600 hover:text-blue-500 transition'>
              FAQ
            </Link>
          </>
        ) : (
          <>
            <Link to='/' className='text-gray-600 hover:text-blue-500 transition'>
              Home
            </Link>
            <Link to='/auth/login' className='text-gray-600 hover:text-blue-500 transition'>
              Login
            </Link>
            <Link to='/auth/register' className='text-gray-600 hover:text-blue-500 transition'>
              Sign Up
            </Link>
          </>
        )}
      </div>
      {/* 모바일 메뉴 (햄버거) */}
      <div className='sm:hidden'>{/* 필요시 햄버거 메뉴 구현 가능, 우선 메뉴 숨김 */}</div>
    </nav>
  );
}
