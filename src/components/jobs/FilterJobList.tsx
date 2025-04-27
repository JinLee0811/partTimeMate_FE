import { Link } from "react-router-dom";

const JobList = () => {
  const displayedJobs = jobs_en.slice(0, 20); // 첫 20개 공고만 표시

  return (
    <div className='flex justify-center'>
      <section className='w-full max-w-md md:max-w-5xl mt-2 py-6 md:py-14 px-2 md:px-7 bg-white'>
        <div className='flex justify-between items-center'>
          <h2 className='text-lg md:text-2xl font-bold mb-2 md:mb-6'>Newest Job List</h2>
          <Link to='/jobs' className='text-xs md:text-sm text-gray-500 mb-2 md:mb-6'>
            <h3 className='text-xs md:text-sm text-gray-500 hover:text-gray-700'>View All</h3>
          </Link>
        </div>

        {/* 리스트 헤더 */}
        <div className='hidden md:grid bg-gray-100 font-semibold text-gray-700 grid-cols-[1fr_3fr_1fr_1fr_1fr] px-5 py-3 rounded-md'>
          <span>Location</span>
          <span>Job Title / Company</span>
          <span>Salary</span>
          <span>Hours</span>
          <span>Posted</span>
        </div>

        {/* 모바일 헤더 */}
        <div className='grid md:hidden grid-cols-2 gap-2 text-xs font-semibold text-gray-700 px-2 py-2'>
          <span>Location</span>
          <span>Job / Company</span>
        </div>

        {/* 채용 공고 리스트 */}
        <div className='divide-y divide-gray-200 md:divide-gray-300'>
          {displayedJobs.map((job) => (
            <Link
              to={`/jobs/${job.id}`}
              key={job.id}
              className='grid grid-cols-2 md:grid-cols-[1fr_3fr_1fr_1fr_1fr] px-2 md:px-5 py-3 md:py-4 items-center hover:bg-gray-50 transition text-xs md:text-base'>
              {/* 지역 */}
              <span className='text-gray-700 font-medium'>{job.location}</span>

              {/* 채용 공고 제목 및 회사명 */}
              <div>
                <h3 className='font-bold text-gray-800'>{job.title}</h3>
                <p className='text-gray-600'>{job.company}</p>
                {/* 모바일에서만 급여 */}
                <span className='block md:hidden text-orange-500 font-semibold mt-1'>
                  {job.salary}
                </span>
              </div>

              {/* 급여 (데스크탑만) */}
              <span className='hidden md:block text-gray-800 font-medium'>
                {job.salary} <span className='text-gray-500 text-xs'>{job.payType}</span>
              </span>

              {/* 근무 시간 (데스크탑만) */}
              <span className='hidden md:block text-gray-700'>{job.hours || "TBD"}</span>

              {/* 등록일 (데스크탑만) */}
              <span className='hidden md:block text-blue-500 text-sm'>{job.posted}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default JobList;

const jobs_en = [
  {
    id: "1",
    location: "Sydney CBD",
    title: "Part-time Barista",
    company: "Starbucks",
    salary: "$25/hr",
    payType: "Hourly",
    hours: "8:00-14:00",
    posted: "2 hours ago",
  },
  {
    id: "2",
    location: "Parramatta",
    title: "Retail Assistant",
    company: "Uniqlo",
    salary: "$23/hr",
    payType: "Hourly",
    hours: "9:00-17:00",
    posted: "5 hours ago",
  },
  {
    id: "3",
    location: "Chatswood",
    title: "Kitchen Hand",
    company: "Sushi Train",
    salary: "$24/hr",
    payType: "Hourly",
    hours: "Flexible",
    posted: "1 day ago",
  },
  {
    id: "4",
    location: "North Sydney",
    title: "Delivery Driver",
    company: "Uber Eats",
    salary: "$30/hr",
    payType: "Per Delivery",
    hours: "Flexible",
    posted: "3 days ago",
  },
];
