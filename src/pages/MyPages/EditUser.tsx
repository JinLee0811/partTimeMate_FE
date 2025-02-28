import { useAuthStore } from "../../store/useAuthStore";
import UserInfoForm from "../../components/MyPage/UserInfoEdit";

export default function MyPage() {
  const { user } = useAuthStore();

  if (!user)
    return (
      <div>
        <div className='flex justify-center items-center'>
          <div className='animate-pulse w-40 h-40 bg-gray-100 rounded-full'></div>
        </div>
      </div>
    );

  return (
    <div className='min-h-screen pt-5 bg-white'>
      <h2 className='text-2xl font-bold mb-4'>User Setting</h2>
      <p className='text-gray-600'>Manage users, jobs, and categories efficiently.</p>
      <div className='max-w-4xl bg-white rounded-lg p-10'>
        <UserInfoForm />
      </div>
    </div>
  );
}
