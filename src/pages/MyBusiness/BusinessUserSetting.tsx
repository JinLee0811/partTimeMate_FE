import { useAuthStore } from "../../store/useAuthStore";
import UserInfoForm from "../../components/MyPage/UserInfoEdit";

export default function BusinessUserSetting() {
  const { user } = useAuthStore();

  if (!user)
    return (
      <div className='flex items-center justify-center min-h-[400px]'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500'></div>
      </div>
    );

  return (
    <div className='max-w-3xl mx-auto p-6'>
      <div className='flex justify-between items-center mb-8'>
        <div>
          <h1 className='text-2xl font-bold text-gray-900'>Business User Settings</h1>
          <p className='text-gray-600 mt-2'>
            Manage your business account settings and preferences.
          </p>
        </div>
      </div>

      <div className='bg-white rounded-2xl shadow-sm'>
        <UserInfoForm />
      </div>
    </div>
  );
}
