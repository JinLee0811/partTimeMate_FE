import { Link } from "react-router-dom";

const JobList = () => {
  const displayedJobs = jobs_en.slice(0, 20); // 첫 20개 공고만 표시

  return (
    <section className='mt-2 py-14 px-7 w-10/12 mx-auto bg-white'>
      <h2 className='text-2xl font-bold mb-6'>Newest Job List</h2>

      {/* 리스트 헤더 */}
      <div className='bg-gray-100 font-semibold text-gray-700 grid grid-cols-[1fr_3fr_1fr_1fr_1fr] px-5 py-3 rounded-md'>
        <span>Location</span>
        <span>Job Title / Company</span>
        <span>Salary</span>
        <span>Hours</span>
        <span>Posted</span>
      </div>

      {/* 채용 공고 리스트 */}
      <div className='divide-y divide-gray-300'>
        {displayedJobs.map((job) => (
          <Link
            to={`/jobs/${job.id}`}
            key={job.id}
            className='grid grid-cols-[1fr_3fr_1fr_1fr_1fr] px-5 py-4 items-center hover:bg-gray-50 transition'>
            {/* 지역 */}
            <span className='text-gray-700 font-medium'>{job.location}</span>

            {/* 채용 공고 제목 및 회사명 */}
            <div>
              <h3 className='text-md font-bold text-gray-800'>{job.title}</h3>
              <p className='text-sm text-gray-600'>{job.company}</p>
            </div>

            {/* 급여 */}
            <span className='text-gray-800 font-medium'>
              {job.salary} <span className='text-gray-500 text-xs'>{job.payType}</span>
            </span>

            {/* 근무 시간 */}
            <span className='text-gray-700'>{job.hours || "TBD"}</span>

            {/* 등록일 */}
            <span className='text-blue-500 text-sm'>{job.posted}</span>
          </Link>
        ))}
      </div>
    </section>
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
