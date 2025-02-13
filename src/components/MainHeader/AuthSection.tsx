import JobSeekerProfile from "./profileSection/JobSeekerProfile";
import EmployerProfile from "./profileSection/EmployerProfile";
import LoginSection from "./LoginSection";
import { AuthProps } from "../../types/auth"; // ✅ AuthProps 불러오기

export default function AuthContainer({ isAuthenticated, user, logout }: AuthProps) {
  if (!isAuthenticated || !user) return <LoginSection />;

  return user.role === "JOB_SEEKER" ? (
    <JobSeekerProfile user={user} logout={logout} />
  ) : (
    <EmployerProfile user={user} logout={logout} />
  );
}
