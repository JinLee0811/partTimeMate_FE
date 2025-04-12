import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { useAuthStore } from "../../store/useAuthStore";
import { useUser } from "../../hooks/useUser";
import { locations } from "../../data/locations";

// locations.ts 파일에서 지역 데이터를 가져와서 사용
const SYDNEY_AREAS = locations.map((region) => ({
  name: region.name,
  jobs: Math.floor(Math.random() * 300) + 50, // 임의의 일자리 수 생성
}));

export default function MainHeader() {
  const { isAuthenticated, user, logout } = useAuthStore();
  const { isLoading } = useUser();

  return (
    <main className='bg-gradient-to-b from-white to-gray-50'>
      <div className='max-w-7xl mx-auto px-4 py-12'>
        <div className='text-center mb-16'>
          <h1 className='text-4xl font-bold text-gray-900 mb-2'>Part-Time Jobs in Sydney</h1>
          <div className='h-1 w-24 bg-albamon mx-auto mb-4'></div>
          <p className='text-gray-600 text-lg'>
            Explore the latest part-time opportunities in your preferred area
          </p>
        </div>

        {/* Sydney Areas Grid */}
        <div className='max-w-6xl mx-auto'>
          <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4'>
            {SYDNEY_AREAS.map((area) => (
              <Link
                key={area.name}
                to={`/jobs/filtered?location=${area.name.toLowerCase().replace(/\s+/g, "-")}`}
                className='group bg-white p-5 rounded-lg border border-gray-200 hover:border-albamon hover:shadow-md transition-all'>
                <div className='space-y-3'>
                  <h3 className='font-semibold text-gray-900 group-hover:text-albamon'>
                    {area.name}
                  </h3>
                  <div className='flex items-center gap-2'>
                    <FaMapMarkerAlt className='text-albamon' />
                    <span className='text-sm font-medium text-albamon-light'>
                      {area.jobs}+ jobs
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className='mt-12 flex justify-center gap-8 text-center text-sm text-gray-600'>
          <div className='flex items-center gap-2'>
            <FaMapMarkerAlt className='text-albamon' />
            <span>{SYDNEY_AREAS.length} Areas in Sydney</span>
          </div>
          <div className='flex items-center gap-2'>
            <FaClock className='text-albamon' />
            <span>Updated hourly</span>
          </div>
        </div>
      </div>
    </main>
  );
}
