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
    className='bg-white p-6 shadow rounded-lg flex items-center space-x-4 hover:bg-gray-100 transition'>
    <div className='text-3xl text-blue-500'>{icon}</div>
    <div>
      <h3 className='text-lg font-semibold'>{title}</h3>
      <p className='text-gray-500'>{count} items</p>
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
      <h2 className='text-2xl font-bold mb-4'>Admin Dashboard</h2>
      <p className='text-gray-600 mb-6'>Manage users, jobs, and categories efficiently.</p>

      {/* 요약 카드 */}
      <div className='grid grid-cols-3 gap-6'>
        <DashboardCard
          title='Total Users'
          count={totalCount}
          icon={<FaUsers />}
          link='/admin/users'
        />
        <DashboardCard
          title='Total Job Posts'
          count={45}
          icon={<FaBriefcase />}
          link='/admin/jobs'
        />
        <DashboardCard
          title='Categories'
          count={categoryCount}
          icon={<FaThList />}
          link='/admin/categories'
        />
      </div>
    </div>
  );
}
