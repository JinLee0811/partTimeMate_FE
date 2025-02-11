import React from "react";

const JobStats: React.FC = () => {
  return (
    <div className='flex justify-center mt-6'>
      <div className='w-full max-w-5xl bg-orange-50 p-6 rounded-lg flex flex-col sm:flex-row items-center sm:justify-between space-y-6 sm:space-y-0'>
        {/* Total Jobs */}
        <div className='flex-1 text-center'>
          <p className='text-gray-700 font-medium'>Total Jobs</p>
          <p className='text-orange-500 text-3xl font-bold'>135,971</p>
        </div>

        <div className='w-px mr-10 h-32 bg-gray-300 hidden sm:block'></div>

        {/* Jobs by Region (Expanded) */}
        <div className='flex-[2]'>
          <p className='font-bold text-gray-800 text-center sm:text-left'>Jobs by Region</p>
          <div className='grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-4 text-gray-700 text-sm mt-2 text-center sm:text-left'>
            {[
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
              "Castle Hill",
              "Cronulla",
              "Manly",
              "Surry Hills",
              "Rhodes",
              "All Sydney",
            ].map((region) => (
              <span key={region} className='cursor-pointer hover:text-orange-500'>
                {region}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobStats;
