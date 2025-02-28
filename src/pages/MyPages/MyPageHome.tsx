import React, { useEffect } from "react";
import { FaUserCog, FaFileAlt, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAdminStore } from "../../store/useAdminStore";

// DashboardCard 컴포넌트 (count는 선택사항)
type DashboardCardProps = {
  title: string;
  count?: number;
  icon: JSX.Element;
  link: string;
};

const DashboardCard = ({ title, count, icon, link }: DashboardCardProps) => (
  <Link
    to={link}
    className='bg-white p-6 shadow rounded-lg flex items-center space-x-4 hover:bg-gray-100 transition'>
    <div className='text-3xl text-blue-500'>{icon}</div>
    <div>
      <h3 className='text-lg font-semibold'>{title}</h3>
      {count !== undefined && <p className='text-gray-500'>{count} items</p>}
    </div>
  </Link>
);

export default function MyPageDashboard() {
  // 실제 데이터가 있다면 해당 스토어나 API를 통해 가져오세요.
  // 여기서는 예시로 useAdminStore의 fetchUsers를 사용합니다.
  const { fetchUsers } = useAdminStore();

  useEffect(() => {
    fetchUsers(1);
  }, [fetchUsers]);

  return (
    <div className='min-h-screen pt-5 bg-white'>
      <h2 className='text-2xl font-bold mb-4'>MyPage Dashboard</h2>
      <p className='text-gray-600 mb-6'>
        Easily access your user settings, review your resumes, and check your favorite listings.
      </p>

      {/* 바로가기 배너 */}
      <div className='grid grid-cols-3 gap-6'>
        <DashboardCard title='User Settings' icon={<FaUserCog />} link='/mypage/user' />
        <DashboardCard
          title='My Resumes'
          count={3} // 실제 레주메 개수로 대체
          icon={<FaFileAlt />}
          link='/mypage/resumes'
        />
        <DashboardCard
          title='My Favorites'
          count={5} // 실제 찜한 목록 개수로 대체
          icon={<FaHeart />}
          link='/mypage/favorites'
        />
      </div>
    </div>
  );
}
