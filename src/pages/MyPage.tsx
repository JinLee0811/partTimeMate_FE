import { useAuthStore } from "../store/useAuthStore";
import JobSeekerPage from "../components/MyPage/JobSeekerPage";
import EmployerPage from "../components/MyPage/EmployerPage";

export default function MyPage() {
  const { user } = useAuthStore();

  if (!user) return <div>Loading...</div>;

  return user.role === "jobseeker" ? <JobSeekerPage /> : <EmployerPage />;
}
