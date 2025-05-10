import {
  FaTimes,
  FaUser,
  FaEnvelope,
  FaBriefcase,
  FaLanguage,
  FaCalendarAlt,
} from "react-icons/fa";

interface UserDetailProps {
  user: any;
  onClose: () => void;
}

export default function UserDetail({ user, onClose }: UserDetailProps) {
  return (
    <div className='p-6 bg-white rounded-lg'>
      <div className='flex justify-between items-center mb-6 border-b pb-2'>
        <h2 className='text-xl font-bold text-gray-800'>User Details</h2>
        <button onClick={onClose} className='p-2 hover:bg-gray-100 rounded-full transition-colors'>
          <FaTimes className='text-gray-500' />
        </button>
      </div>

      <div className='space-y-4'>
        <div className='flex items-center space-x-3'>
          <div className='w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center'>
            <FaUser className='text-blue-500' />
          </div>
          <div>
            <p className='text-sm text-gray-500'>Name</p>
            <p className='font-medium'>{`${user.firstName} ${user.lastName}`}</p>
          </div>
        </div>

        <div className='flex items-center space-x-3'>
          <div className='w-10 h-10 bg-green-100 rounded-full flex items-center justify-center'>
            <FaEnvelope className='text-green-500' />
          </div>
          <div>
            <p className='text-sm text-gray-500'>Email</p>
            <p className='font-medium'>{user.email}</p>
          </div>
        </div>

        <div className='flex items-center space-x-3'>
          <div className='w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center'>
            <FaBriefcase className='text-purple-500' />
          </div>
          <div>
            <p className='text-sm text-gray-500'>Role</p>
            <p className='font-medium'>{user.role}</p>
          </div>
        </div>

        <div className='flex items-center space-x-3'>
          <div className='w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center'>
            <FaLanguage className='text-yellow-500' />
          </div>
          <div>
            <p className='text-sm text-gray-500'>Preferred Language</p>
            <p className='font-medium'>{user.preferredLanguage}</p>
          </div>
        </div>

        <div className='flex items-center space-x-3'>
          <div className='w-10 h-10 bg-red-100 rounded-full flex items-center justify-center'>
            <FaCalendarAlt className='text-red-500' />
          </div>
          <div>
            <p className='text-sm text-gray-500'>Member Since</p>
            <p className='font-medium'>{new Date(user.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
