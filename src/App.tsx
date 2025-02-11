import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import Home from "./pages/Home";
import JobBoard from "./pages/jobs/JobBoard";
import JobDetail from "./pages/jobs/JobDetail";
import Login from "./pages/auth/LoginPage";
import Register from "./pages/auth/Register";
import SignUpBusiness from "./pages/auth/SignUpBusiness";
import SignUpUser from "./pages/auth/SignUpUser";
import Brands from "./pages/brands/Brands";

export default function App() {
  return (
    <Routes>
      {/* 일반 페이지 (Navbar 포함) */}
      <Route element={<MainLayout />}>
        <Route path='/' element={<Home />} />
        <Route path='/jobs' element={<JobBoard />} />
        <Route path='/jobs/:id' element={<JobDetail />} />
        <Route path='/brands' element={<Brands />} />
      </Route>

      {/* 로그인 및 회원가입 페이지 */}
      <Route element={<AuthLayout />}>
        <Route path='/auth/login' element={<Login />} />
        <Route path='/auth/register' element={<Register />} />
        <Route path='/auth/signup/user' element={<SignUpUser />} />
        <Route path='/auth/signup/business' element={<SignUpBusiness />} />
      </Route>
    </Routes>
  );
}
