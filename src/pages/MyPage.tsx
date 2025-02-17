import { useAuthStore } from "../store/useAuthStore";
import JobSeekerPage from "../components/MyPage/JobSeekerPage";
import EmployerPage from "../components/MyPage/EmployerPage";

export default function MyPage() {
  const { user } = useAuthStore();

  if (!user)
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <div className='animate-pulse w-40 h-40 bg-gray-300 rounded-full'></div>
      </div>
    );

  return (
    <div className='min-h-screen pt-5 flex justify-center bg-white'>
      <div className='w-full max-w-4xl bg-white rounded-lg p-10'>
        {user.role === "JOB_SEEKER" ? <JobSeekerPage /> : <EmployerPage />}
      </div>
    </div>
  );
}
