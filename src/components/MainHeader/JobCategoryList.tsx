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

// 🗂️ 카테고리 데이터 정의
const jobCategories = {
  locations: [
    "Sydney CBD",
    "North Sydney",
    "Parramatta",
    "Chatswood",
    "Bondi",
    "Newtown",
    "Blacktown",
    "Penrith",
    "Liverpool",
    "Strathfield",
    "Burwood",
    "Hurstville",
    "Bankstown",
    "Macquarie Park",
  ],
  types: [
    { icon: <FaTrain className='text-blue-500 mr-2' />, label: "Near Train Stations" },
    { icon: <FaClock className='text-yellow-500 mr-2' />, label: "Short Shifts" },
    { icon: <FaCalendarAlt className='text-red-500 mr-2' />, label: "Temporary Jobs" },
    { icon: <FaBolt className='text-orange-500 mr-2' />, label: "Urgent Hiring" },
    { icon: <FaHeadset className='text-purple-500 mr-2' />, label: "Call Center" },
    { icon: <FaGraduationCap className='text-green-500 mr-2' />, label: "Student Jobs" },
  ],
  audiences: [
    { icon: <FaUserTie className='text-black mr-2' />, label: "Professionals" },
    { icon: <FaGlobe className='text-blue-500 mr-2' />, label: "International Students" },
    { icon: <FaGraduationCap className='text-gray-700 mr-2' />, label: "University Students" },
    { icon: <FaHome className='text-pink-500 mr-2' />, label: "Parents" },
    { icon: <FaWheelchair className='text-yellow-500 mr-2' />, label: "Disability Support" },
  ],
};

export default function JobCategoryList() {
  return (
    <div className='grid grid-cols-3 gap-4 p-4 border border-gray-200 rounded-lg'>
      {/* 📍 지역별 직업 (스크롤 추가) */}
      <div className='bg-white p-4 rounded-lg max-h-64 overflow-y-auto scrollbar'>
        <h3 className='font-bold text-lg mb-3'>Jobs by Location</h3>
        <ul className='text-gray-700 space-y-2'>
          {jobCategories.locations.map((location) => (
            <li key={location}>
              <button className='hover:text-gray-500'>{location}</button>
            </li>
          ))}
        </ul>
      </div>

      {/* 🏷️ 직업 유형 */}
      <div className='bg-white pl-10 border-l p-4'>
        <h3 className='font-bold text-lg mb-3'>Jobs by Type</h3>
        <ul className='text-gray-700 space-y-2'>
          {jobCategories.types.map((type, index) => (
            <li key={index} className='flex items-center'>
              {type.icon} <button className='hover:text-gray-500'>{type.label}</button>
            </li>
          ))}
        </ul>
      </div>

      {/* 🎯 타겟 대상 */}
      <div className='bg-white pl-10 border-l p-4 '>
        <h3 className='font-bold text-lg mb-3'>Jobs by Audience</h3>
        <ul className='text-gray-700 space-y-2'>
          {jobCategories.audiences.map((audience, index) => (
            <li key={index} className='flex items-center'>
              {audience.icon} <button className='hover:text-gray-500'>{audience.label}</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
