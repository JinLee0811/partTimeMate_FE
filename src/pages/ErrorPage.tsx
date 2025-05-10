import { Link, useRouteError } from "react-router-dom";
import mainLogo from "../assets/mainLogo.png";

interface RouteError {
  status?: number;
  statusText?: string;
  message?: string;
}

export default function ErrorPage() {
  const error = useRouteError() as RouteError;

  // ✅ 에러 코드에 따른 메시지
  const errorMessages: Record<number, { title: string; message: string }> = {
    404: {
      title: "Oops! Page Not Found",
      message: "The page you're looking for seems to have wandered off.",
    },
    403: {
      title: "Access Denied",
      message: "Sorry, you don't have permission to view this page.",
    },
    500: {
      title: "Server Error",
      message: "Our server is taking a short break. Please try again later.",
    },
  };

  // ✅ 에러 코드가 없으면 기본값 설정
  const errorCode = error?.status || 404;
  const { title, message } = errorMessages[errorCode] || {
    title: "Unexpected Error",
    message: "Something went wrong. Let's try that again.",
  };

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-orange-50 to-white p-6'>
      {/* Logo Section */}
      <div className='mb-8'>
        <img src={mainLogo} alt='Part-Time Mate Logo' className='h-24 w-auto' />
      </div>

      {/* Error Content */}
      <div className='text-center max-w-lg'>
        <h1 className='text-4xl font-bold text-orange-600 mb-2'>{title}</h1>
        <p className='text-lg text-gray-600 mb-4'>{message}</p>

        {/* Error Code Badge */}
        <div className='inline-block bg-orange-100 text-orange-800 px-4 py-2 rounded-full font-medium text-sm mb-8'>
          Error {errorCode}
        </div>

        {/* Navigation Buttons */}
        <div className='space-y-4'>
          <Link
            to='/'
            className='block w-full px-6 py-3 bg-orange-600 text-white font-semibold rounded-xl shadow-lg hover:bg-orange-700 transition-all duration-200 transform hover:-translate-y-1'>
            Return to Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className='block w-full px-6 py-3 bg-white text-orange-600 font-semibold rounded-xl border-2 border-orange-200 hover:bg-orange-50 transition-all duration-200'>
            Go Back
          </button>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className='absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-500 to-orange-600' />
    </div>
  );
}
