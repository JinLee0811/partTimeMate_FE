import { FaUsers, FaBriefcase, FaThList } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function AdminHome() {
  return (
    <div>
      <h2 className='text-2xl font-bold mb-4'>Admin Dashboard</h2>
      <p className='text-gray-600 mb-6'>Manage users, jobs, and categories efficiently.</p>

      {/* 🔹 요약 카드 */}
      <div className='grid grid-cols-3 gap-6'>
        <DashboardCard title='Total Users' count={128} icon={<FaUsers />} link='/admin/users' />
        <DashboardCard
          title='Total Job Posts'
          count={45}
          icon={<FaBriefcase />}
          link='/admin/jobs'
        />
        <DashboardCard title='Categories' count={8} icon={<FaThList />} link='/admin/categories' />
      </div>
    </div>
  );
}

/** 📌 대시보드 카드 컴포넌트 */
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
