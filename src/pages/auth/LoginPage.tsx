import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { FaGoogle, FaFacebookF, FaApple } from "react-icons/fa";

const Login: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const roleFromURL = searchParams.get("role") as "JOB_SEEKER" | "BUSINESS" | null;
  const [activeTab, setActiveTab] = useState<"JOB_SEEKER" | "BUSINESS">("JOB_SEEKER");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (roleFromURL) {
      setActiveTab(roleFromURL);
    }
  }, [roleFromURL]);

  const handleLogin = async () => {
    setLoading(true);
    setErrorMessage(null);

    try {
      await login(email, password, activeTab); // ✅ 백엔드가 요구하는 role 전송
      navigate("/"); // ✅ 로그인 성공 시 홈으로 이동
    } catch (err: any) {
      setErrorMessage(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 pb-10'>
      <div className='bg-white shadow-lg rounded-lg w-full max-w-4xl flex flex-col md:flex-row'>
        {/* 🏷️ Left Panel - Login Form */}
        <div className='w-full md:w-3/5 p-8'>
          <h2 className='text-lg font-semibold text-gray-800'>Log in to access our services.</h2>
          <p className='text-sm text-gray-500'>
            If you are not a member yet,{" "}
            <Link to={"/auth/register"} className='text-blue-500 cursor-pointer hover:underline'>
              Sign up here
            </Link>
            .
          </p>

          {/* 🔹 Role Selection Tabs */}
          <div className='flex mt-5 border-b'>
            <button
              className={`w-1/2 py-2 text-center font-medium ${
                activeTab === "JOB_SEEKER" ? "border-b-2 border-black text-black" : "text-gray-400"
              }`}
              onClick={() => setActiveTab("JOB_SEEKER")}>
              Job Seeker
              <p className='text-sm text-gray-500'>(Finding Job)</p>
            </button>
            <button
              className={`w-1/2 py-2 text-center font-medium ${
                activeTab === "BUSINESS" ? "border-b-2 border-black text-black" : "text-gray-400"
              }`}
              onClick={() => setActiveTab("BUSINESS")}>
              Employer
              <p className='text-sm text-gray-500'>(Hiring Staff)</p>
            </button>
          </div>

          {/* 🔹 Login Form */}
          <div className='mt-5'>
            <input
              type='email'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400'
            />
            <input
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full p-3 border border-gray-300 rounded-md mt-3 focus:ring-2 focus:ring-blue-400'
            />

            <div className='flex items-center justify-between mt-3'>
              <label className='flex items-center text-sm text-gray-500'>
                <input type='checkbox' className='mr-2' /> Remember Me
              </label>
              <span className='text-sm text-blue-500 cursor-pointer hover:underline'>
                Forgot Password?
              </span>
            </div>

            {/* ✅ 로그인 에러 메시지 표시 */}
            {errorMessage && <p className='text-red-500 text-sm mt-3'>{errorMessage}</p>}

            <button
              onClick={handleLogin}
              disabled={loading}
              className={`w-full mt-5 p-3 rounded-md font-semibold transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}>
              {loading ? "Logging in..." : "Log In"}
            </button>
          </div>

          {/* 🔹 Social Login */}
          <div className='mt-6 text-center'>
            <p className='text-sm text-gray-500 mb-3'>Or log in with</p>
            <div className='flex justify-center gap-4'>
              <SocialLoginButton icon={<FaGoogle />} text='Google' />
              <SocialLoginButton icon={<FaFacebookF />} text='Facebook' />
              <SocialLoginButton icon={<FaApple />} text='Apple' />
            </div>
          </div>
        </div>

        {/* 🏷️ Right Panel - Additional Features */}
        <div className='hidden md:flex w-2/5 bg-white border border-l-gray-400 p-6 flex-col text-center justify-center'>
          <h3 className='text-lg font-semibold text-blue-600'>Exclusive Benefits</h3>
          {activeTab === "JOB_SEEKER" ? (
            <ul className='mt-3 text-sm text-gray-600 space-y-3'>
              <li>🔹 One-click job applications</li>
              <li>🔹 Smart job recommendations</li>
              <li>🔹 Free job support & consulting</li>
            </ul>
          ) : (
            <ul className='mt-3 text-sm text-gray-600 space-y-3'>
              <li>🔹 AI-assisted job postings</li>
              <li>🔹 Free job ads & discount coupons</li>
              <li>🔹 Resume & hiring solutions</li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

/** 🔹 Social Login Button Component */
const SocialLoginButton = ({ icon, text }: { icon: JSX.Element; text: string }) => (
  <button className='flex items-center gap-2 bg-white border px-4 py-2 rounded-md shadow hover:bg-gray-100'>
    {icon}
    <span className='text-sm font-medium'>{text}</span>
  </button>
);

export default Login;
