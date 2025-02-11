import JobSeekerProfile from "./profileSection/JobSeekerProfile";
import EmployerProfile from "./profileSection/EmployerProfile";
import LoginSection from "./LoginSection";

interface JobSeekerUser {
  username: string | null;
  role: "jobseeker";
}

interface EmployerUser {
  username: string | null;
  role: "employer";
}

interface AuthContainerProps {
  isLoggedIn: boolean;
  user: JobSeekerUser | EmployerUser | null;
  logout: () => void;
}

export default function AuthContainer({ isLoggedIn, user, logout }: AuthContainerProps) {
  if (!isLoggedIn || !user) return <LoginSection />;

  return user.role === "jobseeker" ? (
    <JobSeekerProfile user={user} logout={logout} />
  ) : (
    <EmployerProfile user={user} logout={logout} />
  );
}
