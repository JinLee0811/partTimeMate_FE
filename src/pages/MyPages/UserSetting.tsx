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
      <div className='max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8'>
        <div className='mb-8'>
          <h2 className='text-2xl font-bold text-gray-900'>User Setting</h2>
          <p className='mt-2 text-sm text-gray-600'>
            Manage users, jobs, and categories efficiently.
          </p>
        </div>
        <div className='bg-white rounded-xl shadow-sm'>
          <UserInfoForm />
        </div>
      </div>
    </div>
  );
}
