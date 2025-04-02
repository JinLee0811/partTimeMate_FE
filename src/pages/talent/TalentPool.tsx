import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { mockTalentApi } from "../../mocks/talentData";
import { TalentProfile } from "../../types/talent";
import { FaMapMarkerAlt, FaClock, FaDollarSign, FaStar } from "react-icons/fa";

export default function TalentPool() {
  const [talents, setTalents] = useState<TalentProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>([]);

  useEffect(() => {
    const fetchTalents = async () => {
      try {
        const data = await mockTalentApi.getAllTalents();
        setTalents(data);
      } catch (err) {
        setError("Failed to load talents");
      } finally {
        setLoading(false);
      }
    };

    fetchTalents();
  }, []);

  // 필터링된 인재 목록
  const filteredTalents = talents.filter((talent) => {
    const matchesSearch =
      talent.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      talent.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      talent.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      talent.skills.some((skill) => skill.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesIndustries =
      selectedIndustries.length === 0 ||
      talent.preferredIndustries.some((industry) => selectedIndustries.includes(industry));

    const matchesAvailability =
      selectedAvailability.length === 0 ||
      talent.availability.some((avail) => selectedAvailability.includes(avail));

    return matchesSearch && matchesIndustries && matchesAvailability;
  });

  // 모든 산업 분야 목록 (중복 제거)
  const allIndustries = Array.from(
    new Set(talents.flatMap((talent) => talent.preferredIndustries))
  ).sort();

  // 모든 가용성 타입 목록 (중복 제거)
  const allAvailability = Array.from(
    new Set(talents.flatMap((talent) => talent.availability))
  ).sort();

  if (loading) return <div className='flex justify-center items-center h-96'>Loading...</div>;
  if (error) return <div className='text-red-500 text-center'>{error}</div>;

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
      {/* 헤더 섹션 */}
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-gray-900'>Talent Pool</h1>
        <p className='mt-2 text-gray-600'>
          Find the perfect talent for your business from our pool of qualified candidates
        </p>
      </div>

      {/* 검색 및 필터 섹션 */}
      <div className='mb-8 space-y-4'>
        {/* 검색 바 */}
        <div className='flex gap-4'>
          <input
            type='text'
            placeholder='Search by name, skills, or title...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent'
          />
        </div>

        {/* 필터 */}
        <div className='flex flex-wrap gap-4'>
          {/* 산업 필터 */}
          <div className='flex-1 min-w-[200px]'>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Industry</label>
            <select
              multiple
              value={selectedIndustries}
              onChange={(e) => {
                const values = Array.from(e.target.selectedOptions, (option) => option.value);
                setSelectedIndustries(values);
              }}
              className='w-full p-2 border border-gray-300 rounded-md'>
              {allIndustries.map((industry) => (
                <option key={industry} value={industry}>
                  {industry}
                </option>
              ))}
            </select>
          </div>

          {/* 가용성 필터 */}
          <div className='flex-1 min-w-[200px]'>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Availability</label>
            <select
              multiple
              value={selectedAvailability}
              onChange={(e) => {
                const values = Array.from(e.target.selectedOptions, (option) => option.value);
                setSelectedAvailability(values);
              }}
              className='w-full p-2 border border-gray-300 rounded-md'>
              {allAvailability.map((avail) => (
                <option key={avail} value={avail}>
                  {avail}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* 인재 목록 */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {filteredTalents.map((talent) => (
          <Link
            key={talent.id}
            to={`/talent/${talent.id}`}
            className='block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200'>
            <div className='p-6'>
              {/* Featured 배지 */}
              {talent.featured && (
                <div className='absolute top-4 right-4'>
                  <FaStar className='text-yellow-400 w-6 h-6' />
                </div>
              )}

              {/* 프로필 헤더 */}
              <div className='flex items-center mb-4'>
                <img
                  src={talent.profileImage || "https://via.placeholder.com/100"}
                  alt={`${talent.firstName} ${talent.lastName}`}
                  className='w-16 h-16 rounded-full object-cover mr-4'
                />
                <div>
                  <h3 className='text-lg font-semibold text-gray-900'>
                    {talent.firstName} {talent.lastName}
                  </h3>
                  <p className='text-gray-600'>{talent.title}</p>
                </div>
              </div>

              {/* 주요 정보 */}
              <div className='space-y-2 mb-4'>
                <div className='flex items-center text-gray-600'>
                  <FaMapMarkerAlt className='w-4 h-4 mr-2' />
                  <span>{talent.location}</span>
                </div>
                <div className='flex items-center text-gray-600'>
                  <FaClock className='w-4 h-4 mr-2' />
                  <span>{talent.availability.join(", ")}</span>
                </div>
                {talent.hourlyRate && (
                  <div className='flex items-center text-gray-600'>
                    <FaDollarSign className='w-4 h-4 mr-2' />
                    <span>${talent.hourlyRate}/hour</span>
                  </div>
                )}
              </div>

              {/* 스킬 */}
              <div className='flex flex-wrap gap-2'>
                {talent.skills.map((skill) => (
                  <span
                    key={skill.id}
                    className='px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full'>
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* 결과가 없을 때 */}
      {filteredTalents.length === 0 && (
        <div className='text-center py-12'>
          <p className='text-gray-500'>No talents found matching your criteria</p>
        </div>
      )}
    </div>
  );
}
