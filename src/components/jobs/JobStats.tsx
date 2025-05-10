import React from "react";
import { Link } from "react-router-dom";
import { locations } from "../../Mockdata/locations";

const JobStats: React.FC = () => {
  // locations.ts 파일에서 지역 데이터를 가져와서 사용
  const regionNames = locations.map((region) => region.name);

  // 하드코딩된 지역 목록과 locations.ts 파일의 지역 목록을 합침
  const allRegions = [
    ...regionNames,
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
    "Castle Hill",
    "Cronulla",
    "Manly",
    "Surry Hills",
    "Rhodes",
    "All Sydney",
  ];

  return (
    <div className='flex justify-center pt-4 md:pt-7'>
      <div className='w-full max-w-md md:max-w-5xl bg-orange-50 p-4 md:p-6 rounded-lg flex flex-col md:flex-row items-center md:justify-between space-y-4 md:space-y-0'>
        {/* Total Jobs */}
        <div className='flex-1 text-center'>
          <p className='text-gray-700 font-medium text-sm md:text-base'>Total Jobs</p>
          <p className='text-orange-500 text-2xl md:text-3xl font-bold mb-2'>135,971</p>
        </div>

        <div className='w-full h-px my-2 bg-gray-200 md:hidden'></div>
        <div className='w-px mr-6 h-24 bg-gray-300 hidden md:block'></div>

        {/* Jobs by Region (칩형) */}
        <div className='flex-[2] w-full'>
          <p className='font-bold text-gray-800 text-center md:text-left text-sm md:text-base mb-2'>
            Jobs by Region
          </p>
          {/* 모바일: 칩형, 데스크탑: 그리드 */}
          <div className='flex flex-wrap gap-2 justify-center md:hidden'>
            {allRegions.map((region) => (
              <Link
                key={region}
                to={`/jobs/filtered?location=${region.toLowerCase().replace(/\s+/g, "-")}`}
                className='px-3 py-1 rounded-full bg-white text-gray-700 text-xs font-medium shadow border border-orange-100 hover:bg-orange-100 hover:text-orange-600 transition'>
                {region}
              </Link>
            ))}
          </div>
          <div className='hidden md:grid grid-cols-4 lg:grid-cols-5 gap-2 md:gap-4 text-gray-700 text-xs md:text-sm mt-2 text-center md:text-left'>
            {allRegions.map((region) => (
              <Link
                key={region}
                to={`/jobs/filtered?location=${region.toLowerCase().replace(/\s+/g, "-")}`}
                className='cursor-pointer hover:text-orange-500'>
                {region}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobStats;
