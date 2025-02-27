import { useAuthStore } from "../../store/useAuthStore";
import JobSeekerPage from "../../components/MyPage/JobSeekerPage";
import EmployerPage from "../../components/MyPage/EmployerPage";

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
    <div>
      <div className='flex items-center bg-white'>
        <div className='w-full max-w-4xl bg-gray-100 rounded-lg p-10'>
          <JobSeekerPage />
        </div>
      </div>
    </div>
  );
}
