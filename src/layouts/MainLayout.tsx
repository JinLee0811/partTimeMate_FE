import { Outlet } from "react-router-dom";
import Navbar from "../components/Nav/NavBar";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
