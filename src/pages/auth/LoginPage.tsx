import { useState } from "react";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"jobseeker" | "employer">("jobseeker");

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 pb-10'>
      {/* Main Container */}
      <div className='bg-white shadow-lg rounded-lg w-full max-w-4xl flex'>
        {/* Left Panel - Login Form */}
        <div className='w-4/5 p-8'>
          <h2 className='text-lg font-semibold text-gray-800'>Log in to access our services.</h2>
          <p className='text-sm text-gray-500'>
            If you are not a member yet,{" "}
            <Link to={"/auth/register"}>
              <span className='text-blue-500 cursor-pointer hover:underline'>Sign up here</span>.
            </Link>
          </p>

          {/* Tabs */}
          <div className='flex mt-5 border-b'>
            <button
              className={`w-1/2 py-2 text-center font-medium ${
                activeTab === "jobseeker" ? "border-b-2 border-black text-black" : "text-gray-400"
              }`}
              onClick={() => setActiveTab("jobseeker")}>
              Job Seeker
              <p className='text-sm text-gray-500'>(Finding Job)</p>
            </button>
            <button
              className={`w-1/2 py-2 text-center font-medium ${
                activeTab === "employer" ? "border-b-2 border-black text-black" : "text-gray-400"
              }`}
              onClick={() => setActiveTab("employer")}>
              Company
              <p className='text-sm text-gray-500'>(Finding Part-timer)</p>
            </button>
          </div>

          {/* Login Form */}
          <div className='mt-5'>
            <input
              type='text'
              placeholder='Username or Email'
              className='w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400'
            />
            <input
              type='password'
              placeholder='Password'
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

            <button className='w-full mt-5 p-3 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition'>
              Log In
            </button>
          </div>

          {/* Social Login */}
          <div className='mt-5'>
            <p className='text-center text-sm text-gray-500'>Or sign in with</p>
            <div className='flex justify-center gap-4 mt-3'>
              <button className='bg-white border flex items-center px-4 py-2 rounded-md shadow hover:bg-gray-100'>
                <img
                  src='https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'
                  alt='Google'
                  className='w-5 h-5 mr-2'
                />
                Google
              </button>
              <button className='bg-white border flex items-center px-4 py-2 rounded-md shadow hover:bg-gray-100'>
                <img
                  src='https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'
                  alt='Google'
                  className='w-5 h-5 mr-2'
                />
                Google
              </button>
            </div>
          </div>
        </div>

        {/* Right Panel - Additional Features */}
        <div className='w-1/2 bg-white border border-l-gray-400 p-6 flex flex-col text-center justify-center'>
          <h3 className='text-lg font-semibold text-blue-600'>Exclusive Benefits</h3>
          {activeTab === "jobseeker" ? (
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

export default Login;
