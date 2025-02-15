import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useUser } from "./hooks/useUser";
import ProtectedRoute from "./utils/ProtectedRoute"; // ✅ 보호된 경로 추가
import MainLayout from "./layouts/MainLayout";
import MapLayout from "./layouts/MapLayout"; // 새로 만든 MapLayout
import AuthLayout from "./layouts/AuthLayout";
import Home from "./pages/Home";
import JobBoard from "./pages/jobs/JobBoard";
import JobDetail from "./pages/jobs/JobDetail";
import Login from "./pages/auth/LoginPage";
import Register from "./pages/auth/Register";
import SignUpBusiness from "./pages/auth/SignUpBusiness";
import SignUpUser from "./pages/auth/SignUpUser";
import Brands from "./pages/brands/Brands";
import Mypage from "./pages/MyPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminHome from "./pages/admin/AdminHome";
import UserManagement from "./pages/admin/users/UserManagement";
import JobManagement from "./pages/admin/jobs/JobManagement";
import CategoryManagement from "./pages/admin/categories/CategoryManagement";
import CategoryDetail from "./pages/admin/categories/CategoryForm";
import JobPosting from "./pages/jobs/JobPosting";
import ErrorPage from "./pages/ErrorPage"; // ✅ 404 및 기타 에러 페이지

const queryClient = new QueryClient();

export default function App() {
  useUser(); // ✅ 유저 상태 관리 (Zustand + React Query 통합)

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        {/* 메인 레이아웃 적용 */}
        <Route element={<MainLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/jobs' element={<JobBoard />} />
          <Route path='/brands' element={<Brands />} />

          {/* 보호된 페이지 (로그인 필수, Admin 가능) */}
          <Route
            path='/mypage'
            element={
              <ProtectedRoute>
                <Mypage />
              </ProtectedRoute>
            }
          />

          {/* 구글 맵 API가 필요한 페이지들을 MapLayout으로 감싸기 */}
          <Route element={<MapLayout />}>
            {/* Job Posting (Business or Admin만 가능) */}
            <Route
              path='/jobposting'
              element={
                <ProtectedRoute requiredRole='BUSINESS'>
                  <JobPosting />
                </ProtectedRoute>
              }
            />
            {/* Job Detail */}
            <Route path='/jobs/:id' element={<JobDetail />} />
          </Route>

          {/* Admin 전용 페이지 */}
          <Route
            path='/admin'
            element={
              <ProtectedRoute requiredRole='ADMIN'>
                <AdminDashboard />
              </ProtectedRoute>
            }>
            <Route index element={<AdminHome />} />
            <Route path='users' element={<UserManagement />} />
            <Route path='jobs' element={<JobManagement />} />
            <Route path='categories' element={<CategoryManagement />} />
            <Route path='categories/:id' element={<CategoryDetail />} />
          </Route>
        </Route>

        {/* 로그인 및 회원가입 */}
        <Route element={<AuthLayout />}>
          <Route path='/auth/login' element={<Login />} />
          <Route path='/auth/register' element={<Register />} />
          <Route path='/auth/signup/user' element={<SignUpUser />} />
          <Route path='/auth/signup/business' element={<SignUpBusiness />} />
        </Route>

        {/* 404 에러 처리 */}
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </QueryClientProvider>
  );
}
