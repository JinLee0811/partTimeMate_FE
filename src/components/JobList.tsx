import { Link } from "react-router-dom";
import { jobs_en } from "../Mockdata/data"; // 데이터 가져오기

const JobList = () => {
  // 첫 25개 공고만 가져오기
  const displayedJobs = jobs_en.slice(0, 20);

  return (
    <div className='w-full max-w-7xl mx-auto px-1 md:px-2 py-6 md:py-12'>
      <section className='py-6 md:py-10 px-2 md:px-7 w-auto mx-auto bg-slate-100'>
        <h2 className='text-lg md:text-2xl font-bold mb-4 md:mb-6'>New Part-Time Job Listings</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-2 md:gap-3 px-1 md:px-4 py-2 md:py-3'>
          {displayedJobs.map((job) => (
            <Link to={`/jobs/${job.id}`} key={job.id} className='job-card'>
              <div className='bg-white rounded-lg shadow-md p-3 md:p-4 hover:shadow-lg transition'>
                {/* 회사 로고 (임시) */}
                <div className='h-16 md:h-24 flex items-center justify-center bg-gray-100 rounded-lg mb-3 md:mb-4'>
                  <span className='text-base md:text-lg font-semibold text-gray-700'>
                    {job.company[0]}
                  </span>
                </div>

                {/* 채용 공고 제목 */}
                <h3 className='text-sm md:text-md font-bold text-gray-800'>{job.title}</h3>
                <p className='text-xs md:text-sm text-gray-600'>{job.company}</p>

                {/* 위치 & 급여 */}
                <div className='text-xs text-gray-500 mt-1 md:mt-2'>
                  📍 {job.location} | 💰 {job.salary}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default JobList;
