import { useAuthStore } from "../../store/useAuthStore";
import UserInfoForm from "../../components/MyPage/UserInfoEdit";

export default function UserSetting() {
  const { user } = useAuthStore();

  if (!user)
    return (
      <div className='min-h-screen flex justify-center items-center bg-gray-50'>
        <div className='animate-pulse w-40 h-40 bg-gray-200 rounded-full' />
      </div>
    );

  return (
    <div className='flex-1 bg-gray-50'>
      <div className='max-w-full px-2 py-4 sm:px-4 md:px-6 lg:px-8'>
        <div className='mb-4'>
          <h2 className='text-lg md:text-2xl font-bold text-gray-900'>User Setting</h2>
          <p className='mt-1 text-xs md:text-sm text-gray-600'>
            Manage users, jobs, and categories efficiently.
          </p>
        </div>
        <div className='bg-white rounded-lg md:rounded-xl shadow-sm p-2 md:p-6'>
          <UserInfoForm />
        </div>
      </div>
    </div>
  );
}
