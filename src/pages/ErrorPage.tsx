import { Link, useRouteError } from "react-router-dom";

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
      title: "404 - Page Not Found",
      message: "Sorry, the page you're looking for doesn't exist.",
    },
    403: {
      title: "403 - Access Denied",
      message: "You don't have permission to view this page.",
    },
    500: {
      title: "500 - Server Error",
      message: "Oops! Something went wrong on our side.",
    },
  };

  // ✅ 에러 코드가 없으면 기본값 설정
  const errorCode = error?.status || 404;
  const { title, message } = errorMessages[errorCode] || {
    title: "An Unexpected Error Occurred",
    message: "Something went wrong. Please try again later.",
  };

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center p-6'>
      <h1 className='text-4xl font-bold text-gray-800'>{title}</h1>
      <p className='text-lg text-gray-600 mt-3'>{message}</p>

      {/* 🔹 에러 코드 표시 */}
      {errorCode && <p className='text-gray-500 mt-2'>Error Code: {errorCode}</p>}

      {/* 🔹 홈으로 돌아가기 버튼 */}
      <Link
        to='/'
        className='mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition'>
        Go Back to Home
      </Link>
    </div>
  );
}
