import { Link } from "react-router-dom";
import {
  FaTrain,
  FaClock,
  FaCalendarAlt,
  FaBolt,
  FaHeadset,
  FaGraduationCap,
  FaGlobe,
  FaWheelchair,
  FaUserTie,
  FaHome,
} from "react-icons/fa";

export default function JobCategories() {
  return (
    <div className='max-w-7xl mx-auto p-6 bg-white grid grid-cols-3 gap-6 mb-10'>
      {/* 🔹 Left Section (Job Categories) */}
      <div className='col-span-2 space-y-6'>
        {/* Featured Banner */}
        <div className='grid grid-cols-[2fr_1fr] gap-1 bg-white text-white rounded-lg'>
          <div className='flex m-1 justify-center items-center p-12 bg-blue-500 text-white rounded-lg'>
            <h2 className='text-xl font-bold'>Find the Best Part-time Jobs in Sydney!</h2>
          </div>
          <div className='flex m-1 justify-center items-center bg-blue-500 text-white rounded-lg'>
            <h2 className='text-xl font-bold'>Hot View!</h2>
          </div>
        </div>

        {/* Job Categories */}
        <div className='grid grid-cols-3 gap-3'>
          {/* Location-based Jobs */}
          <div className='bg-gray-100 p-4 rounded-lg'>
            <h3 className='font-bold text-lg mb-3'>Jobs by Location</h3>
            <p className='text-gray-700'>
              Sydney CBD, North Sydney, Parramatta, Chatswood, Bondi, Newtown, Blacktown, Penrith,
              Liverpool...
            </p>
          </div>

          {/* Job Types */}
          <div className='bg-gray-100 p-4 rounded-lg'>
            <h3 className='font-bold text-lg mb-3'>Jobs by Type</h3>
            <ul className='grid grid-cols-2 gap-2 text-gray-700'>
              <li className='flex items-center'>
                <FaTrain className='text-blue-500 mr-2' /> Near Train Stations
              </li>
              <li className='flex items-center'>
                <FaClock className='text-yellow-500 mr-2' /> Short Shifts
              </li>
              <li className='flex items-center'>
                <FaCalendarAlt className='text-red-500 mr-2' /> Temporary Jobs
              </li>
              <li className='flex items-center'>
                <FaBolt className='text-orange-500 mr-2' /> Urgent Hiring
              </li>
              <li className='flex items-center'>
                <FaHeadset className='text-purple-500 mr-2' /> Call Center
              </li>
              <li className='flex items-center'>
                <FaGraduationCap className='text-green-500 mr-2' /> Student Jobs
              </li>
            </ul>
          </div>

          {/* Jobs by Audience */}
          <div className='bg-gray-100 p-4 rounded-lg'>
            <h3 className='font-bold text-lg mb-3'>Jobs by Audience</h3>
            <ul className='grid grid-cols-2 gap-2 text-gray-700'>
              <li className='flex items-center'>
                <FaUserTie className='text-black mr-2' /> Professionals
              </li>
              <li className='flex items-center'>
                <FaGlobe className='text-blue-500 mr-2' /> International Students
              </li>
              <li className='flex items-center'>
                <FaGraduationCap className='text-gray-700 mr-2' /> University Students
              </li>
              <li className='flex items-center'>
                <FaHome className='text-pink-500 mr-2' /> Parents
              </li>
              <li className='flex items-center'>
                <FaWheelchair className='text-yellow-500 mr-2' /> Disability Support
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 🔹 Right Section (Login + Ads) */}
      <div className='col-span-1 space-y-6'>
        {/* Login Section */}
        <div className='bg-white p-6 border rounded-lg shadow'>
          <h3 className='font-bold text-lg'>Login</h3>
          <div className='flex justify-between mt-5'>
            <Link to='/login' className='flex items-center'>
              <img src='/user-icon.png' alt='User Icon' className='h-10' />
              <span className='ml-2'>Job Seekers</span>
            </Link>
            <Link to='/employers' className='flex items-center'>
              <img src='/company-icon.png' alt='Company Icon' className='h-10' />
              <span className='ml-2'>Employers</span>
            </Link>
          </div>
          <div className='flex justify-between mt-3 text-sm text-gray-600'>
            <Link to='/register' className='hover:text-blue-500'>
              Sign Up
            </Link>
            <Link to='/forgot-password' className='hover:text-blue-500'>
              Forgot Password?
            </Link>
          </div>
        </div>

        {/* Support Center */}
        <div className='bg-yellow-200 p-4 border rounded-lg shadow'>
          <h3 className='font-bold text-lg'>Work Rights Support</h3>
          <p className='text-gray-700 text-sm mt-2'>
            Get help with workplace issues and your work rights in Australia.
          </p>
        </div>

        {/* Ads */}
        <div className='bg-orange-400 p-4 border rounded-lg shadow text-white font-bold text-lg text-center'>
          <p>
            We're hiring! Join <span className='underline'>Aussie Burger</span> now!
          </p>
        </div>
      </div>

      {/* Featured Companies */}
      {/* <div className='col-span-3 flex overflow-x-auto space-x-4 mt-6 p-4 border-t'>
        <img src='/company1.png' alt='Company 1' className='h-12' />
        <img src='/company2.png' alt='Company 2' className='h-12' />
        <img src='/company3.png' alt='Company 3' className='h-12' />
        <img src='/company4.png' alt='Company 4' className='h-12' />
        <img src='/company5.png' alt='Company 5' className='h-12' />
      </div> */}
    </div>
  );
}
