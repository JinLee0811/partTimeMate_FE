import JobCategoryList from "./JobCategoryList";
import AuthSection from "./AuthSection";
import { useAuthStore } from "../../store/useAuthStore";

export default function JobCategories() {
  const { isAuthenticated, user, logout } = useAuthStore();

  return (
    <div className='max-w-7xl mx-auto p-6 bg-white grid grid-cols-3 gap-6 mb-10'>
      {/* 왼쪽 섹션: 배너 + 카테고리 */}
      <div className='col-span-2 space-y-6'>
        {/* 배너 */}
        <div className='grid grid-cols-[2fr_1fr] gap-1 bg-white text-white rounded-lg'>
          <div className='flex m-1 justify-center items-center p-12 bg-white text-black border border-gray-200 rounded-lg'>
            <h2 className='text-xl font-bold'>Find the Best Part-time Jobs in Sydney!</h2>
          </div>
          <div className='flex m-1 justify-center items-center bg-white text-black border border-gray-200 rounded-lg'>
            <h2 className='text-xl font-bold'>Hot View!</h2>
          </div>
        </div>

        {/* 직업 카테고리 리스트 */}
        <JobCategoryList />
      </div>

      {/* 오른쪽 섹션: 로그인 여부에 따라 UI 변경 */}
      <AuthSection isLoggedIn={isAuthenticated} user={user?.role ? user : null} logout={logout} />
    </div>
  );
}
