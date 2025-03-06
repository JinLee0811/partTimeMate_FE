import { FaClipboardList, FaBriefcase, FaUsers } from "react-icons/fa";
import UserProfileHeader from "./UserProfileHeader";
import UserProfileMenu from "./UserProfileMenu";
import LogoutButton from "./LogoutButton";
import { User } from "../../../types/user"; // ✅ User 타입 가져오기

/** ✅ Props 타입 정의 */
interface EmployerProfileProps {
  user: User;
  logout: () => void;
}

export default function EmployerProfile({ user, logout }: EmployerProfileProps) {
  return (
    <div className='bg-white p-6 border border-gray-200 rounded-lg text-center'>
      {/* 프로필 정보 */}
      <UserProfileHeader user={user} />

      {/* 아이콘 메뉴 */}
      <UserProfileMenu items={menuItems} />

      {/* 로그아웃 버튼 */}
      <div className='mt-36'>
        <LogoutButton logout={logout} />
      </div>
    </div>
  );
}

/** 📌 고용주 전용 메뉴 */
const menuItems = [
  {
    label: "Post Job",
    icon: <FaClipboardList className='text-blue-500 text-2xl' />,
    path: "/jobposting",
  },
  {
    label: "Manage Listings",
    icon: <FaBriefcase className='text-blue-500 text-2xl' />,
    path: "/mybusiness",
  },
  {
    label: "Applicants",
    icon: <FaUsers className='text-blue-500 text-2xl' />,
    path: "/mybusiness",
  },
];
