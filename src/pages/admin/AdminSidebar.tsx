import { Link, useLocation } from "react-router-dom";
import { FaUsers, FaBriefcase, FaThList, FaHome } from "react-icons/fa";

export default function AdminSidebar() {
  const location = useLocation();

  return (
    <div className='w-72 bg-white shadow-xl h-screen sticky top-0'>
      {/* Admin Header */}
      <div className='p-6 border-b border-gray-100'>
        <div className='flex items-center space-x-4'>
          <div className='w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center'>
            <span className='text-orange-600 text-xl font-semibold'>A</span>
          </div>
          <div>
            <h2 className='text-lg font-bold text-gray-900'>Admin Panel</h2>
            <p className='text-sm text-gray-500'>System Management</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className='p-4'>
        <ul className='space-y-2'>
          <SidebarItem
            to='/admin'
            icon={<FaHome />}
            label='Dashboard'
            currentPath={location.pathname}
          />
          <SidebarItem
            to='/admin/users'
            icon={<FaUsers />}
            label='User Management'
            currentPath={location.pathname}
          />
          <SidebarItem
            to='/admin/jobs'
            icon={<FaBriefcase />}
            label='Job Management'
            currentPath={location.pathname}
          />
          <SidebarItem
            to='/admin/categories'
            icon={<FaThList />}
            label='Category Management'
            currentPath={location.pathname}
          />
        </ul>
      </nav>
    </div>
  );
}

const SidebarItem = ({
  to,
  icon,
  label,
  currentPath,
}: {
  to: string;
  icon: JSX.Element;
  label: string;
  currentPath: string;
}) => {
  const isActive = currentPath === to || (to !== "/admin" && currentPath.startsWith(to));

  return (
    <li>
      <Link
        to={to}
        className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200
          ${
            isActive
              ? "bg-orange-50 text-orange-600"
              : "text-gray-600 hover:bg-orange-50 hover:text-orange-600"
          }`}>
        <span className='text-lg'>{icon}</span>
        <span className='font-medium'>{label}</span>
      </Link>
    </li>
  );
};
