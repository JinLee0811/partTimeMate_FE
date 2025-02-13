import { FaUserEdit } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { User } from "../../../types/user"; // ✅ User 타입 가져오기

/** ✅ Props 타입 정의 */
interface UserProfileHeaderProps {
  user: User | null;
}

export default function UserProfileHeader({ user }: UserProfileHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className='flex justify-center items-center gap-4 p-4'>
      {/* 프로필 이미지 */}
      <CgProfile className='bg-white text-5xl text-gray-500' />

      {/* 유저 정보 */}
      <div>
        <h3 className='font-bold text-lg text-gray-900'>
          {user ? `${user.lastName} ${user.firstName}` : "Guest"}
        </h3>

        {/* Edit Profile 버튼 (기존 스타일 유지) */}
        {user && (
          <p
            onClick={() => navigate("/mypage")}
            className='text-sm text-gray-500 hover:underline cursor-pointer flex items-center gap-1 mt-1'>
            <FaUserEdit className='text-gray-500 text-xs' /> Edit Profile
          </p>
        )}
      </div>
    </div>
  );
}
