import JobCategoryList from "./JobCategoryList";
import AuthSection from "./AuthSection";
import { useAuthStore } from "../../store/useAuthStore";
import { AuthProps } from "../../types/auth"; // ✅ AuthProps 가져오기

export default function JobCategories() {
  const { isAuthenticated, user, logout }: AuthProps = useAuthStore();

  return (
    <div className='max-w-8xl mx-auto p-6 bg-white grid grid-cols-[3fr_1fr] gap-5 mb-10'>
      {/* 왼쪽 섹션: 배너 + 카테고리 */}
      <div className='space-y-2'>
        {/* 배너 */}
        <div className='grid grid-cols-[1fr_2fr] gap-2 bg-white text-white rounded-lg'>
          <div className='flex justify-center items-center p-14 bg-white text-black border border-gray-200 rounded-lg'>
            <h2 className='text-xl font-bold'>Hot View!</h2>
          </div>
          <div className='flex justify-center items-center bg-yellow-300 text-black border border-gray-200 rounded-lg'>
            <h2 className='text-xl font-bold '>Find the Best Part-time Jobs in Sydney!</h2>
          </div>
        </div>

        {/* 직업 카테고리 리스트 */}
        <JobCategoryList />
      </div>

      {/* 오른쪽 섹션: 로그인 여부에 따라 UI 변경 */}
      <div>
        <AuthSection isAuthenticated={isAuthenticated} user={user} logout={logout} />
      </div>
    </div>
  );
}
