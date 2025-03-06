import { Outlet } from "react-router-dom";
import AuthNavBar from "../components/Nav/AuthNavBar";

const AuthLayout = () => {
  return (
    <div className='flex flex-col min-h-screen max-w-screen-2xl mx-auto flex-1'>
      <AuthNavBar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
