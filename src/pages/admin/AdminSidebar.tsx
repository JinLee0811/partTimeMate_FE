import { Link } from "react-router-dom";
import { FaUsers, FaBriefcase, FaThList, FaHome } from "react-icons/fa";

export default function AdminSidebar() {
  return (
    <div className='w-64 bg-white border-r shadow-lg h-screen p-4'>
      <h2 className='text-xl font-bold text-gray-800 mb-6'>Admin Panel</h2>
      <ul className='space-y-4'>
        <SidebarItem to='/admin' icon={<FaHome />} label='Dashboard' />
        <SidebarItem to='/admin/users' icon={<FaUsers />} label='User Management' />
        <SidebarItem to='/admin/jobs' icon={<FaBriefcase />} label='Job Management' />
        <SidebarItem to='/admin/categories' icon={<FaThList />} label='Category Management' />
      </ul>
    </div>
  );
}

const SidebarItem = ({ to, icon, label }: { to: string; icon: JSX.Element; label: string }) => (
  <li>
    <Link to={to} className='flex items-center p-3 text-gray-700 hover:bg-gray-200 rounded-md'>
      <span className='mr-3 text-lg'>{icon}</span>
      {label}
    </Link>
  </li>
);
