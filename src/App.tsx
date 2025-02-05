import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [rotate, setRotate] = useState(false);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-black text-white text-center'>
      {/* 메인 제목 */}
      <h1 className='text-5xl font-bold mb-3 animate-fade-in'>React + TS + Tailwind CSS</h1>
      <h2 className='text-3xl font-bold mb-6 animate-fade-in'>Easy Build Template</h2>

      {/* 로고 섹션 */}
      <div className='flex space-x-6 items-center'>
        <img
          src={viteLogo}
          alt='Vite Logo'
          className={`h-24 w-24 transition-transform duration-500 ${
            rotate ? "rotate-180 scale-110" : ""
          }`}
          onMouseEnter={() => setRotate(true)}
          onMouseLeave={() => setRotate(false)}
        />
        <img src={reactLogo} alt='React Logo' className='h-24 w-24 animate-spin-slow' />
      </div>

      {/* 만든 사람 정보 */}
      <h2 className='mt-10 text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500'>
        Made by Jin Lee
      </h2>

      {/* 버튼 그룹 */}
      <div className='mt-6 flex space-x-4'>
        {/* 포트폴리오 버튼 */}
        <a
          href='https://jin-lee-portfolio.vercel.app/'
          target='_blank'
          rel='noopener noreferrer'
          className='px-6 py-3 text-lg font-semibold bg-blue-500 hover:bg-blue-600 rounded-lg shadow-md transition duration-300 transform hover:scale-105'>
          See Jin's Website 🚀
        </a>

        {/* GitHub 코드 보기 버튼 */}
        <a
          href='https://github.com/JinLee0811/React-Ts-Vite-TailwindCSS-template'
          target='_blank'
          rel='noopener noreferrer'
          className='px-6 py-3 text-lg font-semibold bg-gray-800 hover:bg-gray-700 rounded-lg shadow-md transition duration-300 transform hover:scale-105'>
          View Code 💻
        </a>
      </div>

      {/* 하단 텍스트 */}
      <p className='text-lg mt-6 text-gray-300 animate-fade-in'>
        🚀 Ready to build with Vite + React + Tailwind!
      </p>
    </div>
  );
}

export default App;
