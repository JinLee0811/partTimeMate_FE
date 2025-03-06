import { Link } from "react-router-dom";
import { FaUsers, FaBriefcase, FaThList, FaHome } from "react-icons/fa";
import { useAuthStore } from "../../store/useAuthStore";

export default function MyPageSidebar() {
  const { user } = useAuthStore();

  const sidebarItems = [
    {
      to: "/mybusiness",
      icon: <FaHome />,
      label: "Dashboard",
      roles: ["JOB_SEEKER", "BUSINESS", "ADMIN"],
    },
    {
      to: "/mybusiness/user",
      icon: <FaUsers />,
      label: "User Setting",
      roles: ["JOB_SEEKER", "BUSINESS", "ADMIN"],
    },
    {
      to: "/mybusiness/company",
      icon: <FaBriefcase />,
      label: "Company Registration",
      roles: ["BUSINESS", "ADMIN"],
    },
    {
      to: "/mybusiness/companylist",
      icon: <FaThList />,
      label: "Set up Company",
      roles: ["BUSINESS", "ADMIN"],
    },
  ];

  return (
    <div className='w-68 bg-white border-r shadow-lg h-screen p-7'>
      <h2 className='text-xl font-bold text-gray-800 mb-6'>My Page</h2>
      <ul className='space-y-4'>
        {sidebarItems
          .filter((item) => item.roles.includes(user.role))
          .map((item) => (
            <SidebarItem key={item.to} to={item.to} icon={item.icon} label={item.label} />
          ))}
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
