// App.tsx
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LoadScript, Libraries } from "@react-google-maps/api";
import { useUser } from "./hooks/useUser";
import ProtectedRoute from "./utils/ProtectedRoute";
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
import BusinessUserSetting from "./pages/MyBusiness/BusinessUserSetting";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminHome from "./pages/admin/AdminHome";
import UserManagement from "./pages/admin/users/UserManagement";
import JobManagement from "./pages/admin/jobs/JobManagement";
import CategoryManagement from "./pages/admin/categories/CategoryManagement";
import CategoryDetail from "./pages/admin/categories/CategoryForm";
import JobPosting from "./pages/jobPosting/JobPosting";
import ErrorPage from "./pages/ErrorPage";
import BusinessDashBoard from "./pages/MyBusiness/BusinessDashBoard";
import MyPageDashboard from "./pages/MyPages/MyPageDashBoard";
import CompanyManagement from "./pages/MyBusiness/CompanyManagement";
import CompanyList from "./pages/MyBusiness/CompanyList";
import BusinessHome from "./pages/MyBusiness/BusinessHome";
import MyPageHome from "./pages/MyPages/MyPageHome";
import TalentPool from "./pages/talent/TalentPool";
import TalentDetail from "./pages/talent/TalentDetail";
import JobFilteredBoard from "./pages/jobs/JobFilteredBoard";
import UserSetting from "./pages/MyPages/UserSetting";
import ManageResume from "./pages/MyPages/ManageResume";
import MyWishlist from "./pages/MyPages/MyWishlist";
import MyApplications from "./pages/MyPages/MyApplications";
import PostingList from "./pages/MyBusiness/PostingList";
const queryClient = new QueryClient();

const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "";

const libraries: Libraries = ["places"];

export default function App() {
  useUser(); // ✅ 유저 상태 관리 (Zustand + React Query 통합)

  return (
    <QueryClientProvider client={queryClient}>
      <LoadScript
        googleMapsApiKey={googleMapsApiKey}
        libraries={libraries}
        language='en'
        loadingElement={<div>Loading...</div>}>
        <Routes>
          {/* 메인 레이아웃 적용 */}
          <Route element={<MainLayout />}>
            <Route path='/' element={<Home />} />
            <Route path='/jobs' element={<JobBoard />} />
            <Route path='/jobs/filtered' element={<JobFilteredBoard />} />
            {/* <Route path='/brands' element={<Brands />} /> */}

            {/* 보호된 페이지 (로그인 필수, Admin 가능) */}
            <Route
              path='/mybusiness'
              element={
                <ProtectedRoute>
                  <BusinessDashBoard />
                </ProtectedRoute>
              }>
              <Route index element={<BusinessHome />} />
              <Route path='usersetting' element={<BusinessUserSetting />} />
              <Route path='company' element={<CompanyManagement />} />
              <Route path='companylist' element={<CompanyList />} />
              <Route path='postings' element={<PostingList />} />
            </Route>
            {/* 보호된 페이지 (로그인 필수, Admin 가능) */}
            <Route
              path='/mypage'
              element={
                <ProtectedRoute>
                  <MyPageDashboard />
                </ProtectedRoute>
              }>
              <Route index element={<MyPageHome />} />
              <Route path='usersetting' element={<UserSetting />} />
              <Route path='resume' element={<ManageResume />} />
              <Route path='wishlist' element={<MyWishlist />} />
              <Route path='applications' element={<MyApplications />} />
            </Route>

            {/* Job Posting (Business or Admin만 가능) */}
            <Route
              path='/jobposting'
              element={
                <ProtectedRoute requiredRole={["BUSINESS", "ADMIN"]}>
                  <JobPosting />
                </ProtectedRoute>
              }
            />

            {/* Job Detail */}
            <Route path='/jobs/:id' element={<JobDetail />} />

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

            {/* Talent Pool Routes */}
            <Route path='/talent' element={<TalentPool />} />
            <Route path='/talent/:id' element={<TalentDetail />} />
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
      </LoadScript>
    </QueryClientProvider>
  );
}
