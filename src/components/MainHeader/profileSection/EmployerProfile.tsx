import { FaClipboardList, FaBriefcase, FaUsers } from "react-icons/fa";
import UserProfileHeader from "./UserProfileHeader";
import UserProfileMenu from "./UserProfileMenu";
import LogoutButton from "./LogoutButton";

interface EmployerProfileProps {
  user: {
    username: string | null;
    role: "employer";
  };
  logout: () => void;
}

export default function EmployerProfile({ user, logout }: EmployerProfileProps) {
  return (
    <div className='bg-white p-6 border border-gray-200 rounded-lg text-center'>
      {/* 프로필 정보 */}
      <UserProfileHeader username={user.username} role='Employer' />

      {/* 아이콘 메뉴 */}
      <UserProfileMenu items={menuItems} />

      {/* 로그아웃 버튼 */}
      <LogoutButton logout={logout} />
    </div>
  );
}

/** 📌 고용주 전용 메뉴 */
const menuItems = [
  { label: "Post Job", icon: <FaClipboardList className='text-blue-500 text-2xl' /> },
  { label: "Manage Listings", icon: <FaBriefcase className='text-blue-500 text-2xl' /> },
  { label: "Applicants", icon: <FaUsers className='text-blue-500 text-2xl' /> },
];
