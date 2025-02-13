import { FaSignOutAlt } from "react-icons/fa";

interface LogoutButtonProps {
  logout: () => void;
}

export default function LogoutButton({ logout }: LogoutButtonProps) {
  return (
    <button
      onClick={logout}
      className='mt-6 flex items-center justify-center w-full py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100 transition'>
      <FaSignOutAlt className='mr-2' /> Log Out
    </button>
  );
}
