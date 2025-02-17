import { Outlet } from "react-router-dom";
import AuthNavBar from "../components/Nav/AuthNavBar";

const AuthLayout = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <AuthNavBar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
