import { FaFileAlt, FaEye, FaPaperPlane, FaClock, FaStar, FaComments } from "react-icons/fa";
import UserProfileHeader from "./UserProfileHeader";
import UserProfileMenu from "./UserProfileMenu";
import LogoutButton from "./LogoutButton";
import { User } from "../../../types/user"; // ✅ User 타입 가져오기

/** ✅ Props 타입 정의 */
interface JobSeekerProfileProps {
  user: User;
  logout: () => void;
}

export default function JobSeekerProfile({ user, logout }: JobSeekerProfileProps) {
  return (
    <div className='bg-white p-6 border border-gray-200 rounded-lg text-center'>
      {/* 프로필 정보 */}
      <UserProfileHeader user={user} />

      {/* 아이콘 메뉴 */}
      <UserProfileMenu items={menuItems} />

      {/* 로그아웃 버튼 */}
      <LogoutButton logout={logout} />
    </div>
  );
}

/** 📌 아이콘 메뉴 목록 */
const menuItems = [
  { label: "Resume", icon: <FaFileAlt className='text-yellow-500 text-2xl' />, path: "/resume" },
  {
    label: "Viewed Resumes",
    icon: <FaEye className='text-yellow-500 text-2xl' />,
    path: "/viewed-resumes",
  },
  {
    label: "Application Status",
    icon: <FaPaperPlane className='text-yellow-500 text-2xl' />,
    path: "/applications",
  },
  {
    label: "Recently Viewed",
    icon: <FaClock className='text-gray-500 text-2xl' />,
    path: "/recently-viewed",
  },
  {
    label: "Saved Jobs",
    icon: <FaStar className='text-yellow-500 text-2xl' />,
    path: "/saved-jobs",
  },
  {
    label: "Chat & Support",
    icon: <FaComments className='text-yellow-500 text-2xl' />,
    path: "/chat",
    badge: 3,
  },
];
