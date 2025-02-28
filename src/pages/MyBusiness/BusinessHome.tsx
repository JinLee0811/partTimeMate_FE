import React, { useEffect } from "react";
import { FaUsers, FaBriefcase, FaThList, FaPlusCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAdminStore } from "../../store/useAdminStore";

// DashboardCard 컴포넌트 (count는 선택적으로 표시)
const DashboardCard = ({
  title,
  count,
  icon,
  link,
}: {
  title: string;
  count?: number;
  icon: JSX.Element;
  link: string;
}) => (
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

export default function AdminHome() {
  const { totalCount, fetchUsers } = useAdminStore();

  useEffect(() => {
    fetchUsers(1);
  }, [fetchUsers]);

  return (
    <div className='min-h-screen pt-5 bg-white'>
      <h2 className='text-2xl font-bold mb-4'>Business Dashboard</h2>
      <p className='text-gray-600 mb-6'>
        Welcome to your business dashboard. Here you can view the total number of registered
        companies, check your posted job listings, see the total number of applicants, and quickly
        access company registration.
      </p>

      {/* Shortcut Banner */}
      <div className='grid grid-cols-4 gap-6'>
        <DashboardCard
          title='Total Companies'
          count={totalCount}
          icon={<FaUsers />}
          link='/admin/users'
        />
        <DashboardCard title='Job Listings' count={45} icon={<FaBriefcase />} link='/admin/jobs' />
        <DashboardCard
          title='Total Applicants'
          count={8}
          icon={<FaThList />}
          link='/admin/applicants'
        />
        <DashboardCard
          title='Company Registration'
          icon={<FaPlusCircle />}
          link='/admin/company-registration'
        />
      </div>
    </div>
  );
}
