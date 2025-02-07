import { Link } from "react-router-dom";
import { jobs_en } from "../data/data"; // 데이터 가져오기

const JobList = () => {
  // 첫 25개 공고만 가져오기
  const displayedJobs = jobs_en.slice(0, 20);

  return (
    <section className='py-10 px-7 w-auto mx-auto bg-slate-100'>
      <h2 className='text-2xl font-bold mb-6'>Featured Job Listings</h2>
      <div className='grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-4 sm:grid-cols-2 gap-3 px-4 py-3'>
        {displayedJobs.map((job) => (
          <Link to={`/jobs/${job.id}`} key={job.id} className='job-card'>
            <div className='bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition'>
              {/* 회사 로고 (임시) */}
              <div className='h-24 flex items-center justify-center bg-gray-100 rounded-lg mb-4'>
                <span className='text-lg font-semibold text-gray-700'>{job.company[0]}</span>
              </div>

              {/* 채용 공고 제목 */}
              <h3 className='text-md font-bold text-gray-800'>{job.title}</h3>
              <p className='text-sm text-gray-600'>{job.company}</p>

              {/* 위치 & 급여 */}
              <div className='text-xs text-gray-500 mt-2'>
                📍 {job.location} | 💰 {job.salary}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default JobList;
