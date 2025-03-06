import { Outlet } from "react-router-dom";
import Navbar from "../components/Nav/NavBar";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <div className='flex flex-col min-h-screen max-w-screen-2xl mx-auto flex-1'>
      <Navbar />
      <main className=''>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
