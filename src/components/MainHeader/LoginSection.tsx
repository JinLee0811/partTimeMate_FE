import { Link } from "react-router-dom";

export default function LoginSection() {
  return (
    <div>
      <div className='bg-white p-6 border border-gray-200 rounded-lg'>
        <h3 className='font-bold text-lg mb-4'>Login</h3>

        {/* 로그인 선택 섹션 */}
        <div className='flex justify-between items-center px-4 py-6'>
          {/* 개인회원 */}
          <Link
            to='/auth/login?role=JOB_SEEKER' // ✅ 쿼리스트링 추가
            className='flex flex-col items-center w-1/2 group border-r border-gray-300'>
            <div className='relative'>
              {/* 아이콘 */}
              <div className='w-16 h-16 bg-gray-200 rounded-full flex justify-center items-center'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  className='w-10 h-10 text-gray-600'>
                  <path
                    fillRule='evenodd'
                    d='M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653ZM6.145 17.812A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z'
                    clipRule='evenodd'
                  />
                </svg>
              </div>
              {/* 화살표 아이콘 */}
              <div className='absolute -bottom-2 -right-2 bg-yellow-400 w-6 h-6 flex justify-center items-center rounded-full'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='2'
                  stroke='white'
                  className='w-4 h-4'>
                  <path strokeLinecap='round' strokeLinejoin='round' d='M9 5l7 7-7 7' />
                </svg>
              </div>
            </div>
            <p className='mt-3 text-lg font-semibold text-gray-800'>Job Seeker</p>
            <p className='text-sm text-gray-500'>Job Search</p>
          </Link>

          {/* 기업회원 */}
          <Link
            to='/auth/login?role=BUSINESS' // ✅ 쿼리스트링 추가
            className='flex flex-col items-center w-1/2 group'>
            <div className='relative'>
              {/* 아이콘 */}
              <div className='w-16 h-16 bg-gray-200 rounded-full flex justify-center items-center'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  className='w-10 h-10 text-gray-600'>
                  <path
                    fillRule='evenodd'
                    d='M3 2.25a.75.75 0 0 0 0 1.5v16.5h-.75a.75.75 0 0 0 0 1.5H15v-18a.75.75 0 0 0 0-1.5H3ZM6.75 19.5v-2.25a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-.75.75h-3a.75.75 0 0 1-.75-.75ZM6 6.75A.75.75 0 0 1 6.75 6h.75a.75.75 0 0 1 0 1.5h-.75A.75.75 0 0 1 6 6.75ZM6.75 9a.75.75 0 0 0 0 1.5h.75a.75.75 0 0 0 0-1.5h-.75ZM6 12.75a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 0 1.5h-.75a.75.75 0 0 1-.75-.75ZM10.5 6a.75.75 0 0 0 0 1.5h.75a.75.75 0 0 0 0-1.5h-.75Zm-.75 3.75A.75.75 0 0 1 10.5 9h.75a.75.75 0 0 1 0 1.5h-.75a.75.75 0 0 1-.75-.75ZM10.5 12a.75.75 0 0 0 0 1.5h.75a.75.75 0 0 0 0-1.5h-.75ZM16.5 6.75v15h5.25a.75.75 0 0 0 0-1.5H21v-12a.75.75 0 0 0 0-1.5h-4.5Zm1.5 4.5a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75v-.008Zm.75 2.25a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75v-.008a.75.75 0 0 0-.75-.75h-.008ZM18 17.25a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75v-.008Z'
                    clipRule='evenodd'
                  />
                </svg>
              </div>

              {/* 화살표 아이콘 */}
              <div className='absolute -bottom-2 -right-2 bg-blue-500 w-6 h-6 flex justify-center items-center rounded-full'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='2'
                  stroke='white'
                  className='w-4 h-4'>
                  <path strokeLinecap='round' strokeLinejoin='round' d='M9 5l7 7-7 7' />
                </svg>
              </div>
            </div>
            <p className='mt-3 text-lg font-semibold text-gray-800'>Company</p>
            <p className='text-sm text-gray-500'>Hire Part-timers</p>
          </Link>
        </div>

        {/* 하단 링크 */}
        <div className='border-t pt-2 mt-2 text-sm text-gray-500 flex justify-center space-x-4'>
          <Link to='/auth/register' className='hover:text-gray-600'>
            New Register
          </Link>
          <span>|</span>
          <Link to='/find-id' className='hover:text-gray-600'>
            Find ID
          </Link>
          <span>|</span>
          <Link to='/find-password' className='hover:text-gray-600'>
            Forgot Password?
          </Link>
        </div>
      </div>
      <div className='flex mt-4 justify-center items-center h-32 p-6 bg-yellow-300 text-white rounded-lg'>
        <h2 className='text-xl font-bold'>ADD HERE</h2>
      </div>
    </div>
  );
}
