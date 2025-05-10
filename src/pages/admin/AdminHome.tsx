import React, { useEffect } from "react";
import { FaUsers, FaBriefcase, FaThList } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAdminStore } from "../../store/useAdminStore";
import { useCategoryStore } from "../../store/useCategoryStore";

// DashboardCard 컴포넌트
const DashboardCard = ({
  title,
  count,
  icon,
  link,
}: {
  title: string;
  count: number;
  icon: JSX.Element;
  link: string;
}) => (
  <Link
    to={link}
    className='bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100'>
    <div className='flex items-center justify-between'>
      <div>
        <h3 className='text-lg font-semibold text-gray-900'>{title}</h3>
        <p className='text-3xl font-bold text-orange-600 mt-2'>{count}</p>
        <p className='text-sm text-gray-500 mt-1'>Total Items</p>
      </div>
      <div className='w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-orange-500'>
        {icon}
      </div>
    </div>
  </Link>
);

export default function AdminHome() {
  // 1) 유저 총 갯수와 fetchUsers를 AdminStore에서 가져옴
  const { totalCount, fetchUsers } = useAdminStore();

  // 2) 카테고리 총 갯수와 fetchCategories를 CategoryStore에서 가져옴
  const { categoryCount, fetchCategories } = useCategoryStore();

  // 3) 마운트 시점에 유저와 카테고리 목록 불러오기
  useEffect(() => {
    fetchUsers(1); // 필요하다면 페이지 번호 인자
  }, [fetchUsers]);

  useEffect(() => {
    fetchCategories(); // 1) page 매개변수가 필요 없다면 그냥 호출
  }, [fetchCategories]);

  return (
    <div>
      <div className='mb-8'>
        <h1 className='text-2xl font-bold text-gray-900'>Admin Dashboard</h1>
        <p className='mt-2 text-sm text-gray-600'>Monitor and manage your platform's key metrics</p>
      </div>

      {/* Stats Overview */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <DashboardCard
          title='Total Users'
          count={totalCount}
          icon={<FaUsers className='w-6 h-6' />}
          link='/admin/users'
        />
        <DashboardCard
          title='Active Jobs'
          count={45}
          icon={<FaBriefcase className='w-6 h-6' />}
          link='/admin/jobs'
        />
        <DashboardCard
          title='Categories'
          count={categoryCount}
          icon={<FaThList className='w-6 h-6' />}
          link='/admin/categories'
        />
      </div>

      {/* Recent Activity Section */}
      <div className='mt-12'>
        <h2 className='text-xl font-semibold text-gray-900 mb-6'>Recent Activity</h2>
        <div className='bg-white rounded-2xl shadow-sm border border-gray-100 p-6'>
          <div className='space-y-4'>
            {/* 여기에 최근 활동 내역을 추가할 수 있습니다 */}
            <p className='text-gray-500 text-center py-4'>No recent activities</p>
          </div>
        </div>
      </div>
    </div>
  );
}
