import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { mockTalentApi } from "../../mocks/talentData";
import { TalentProfile } from "../../types/talent";
import {
  FaMapMarkerAlt,
  FaClock,
  FaDollarSign,
  FaEnvelope,
  FaPhone,
  FaLinkedin,
  FaGithub,
  FaGraduationCap,
  FaBriefcase,
} from "react-icons/fa";

export default function TalentDetail() {
  const { id } = useParams<{ id: string }>();
  const [talent, setTalent] = useState<TalentProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTalent = async () => {
      if (!id) return;
      try {
        const data = await mockTalentApi.getTalentById(id);
        setTalent(data);
      } catch (err) {
        setError("Failed to load talent profile");
      } finally {
        setLoading(false);
      }
    };

    fetchTalent();
  }, [id]);

  if (loading) return <div className='flex justify-center items-center h-96'>Loading...</div>;
  if (error) return <div className='text-red-500 text-center'>{error}</div>;
  if (!talent) return <div className='text-center py-12'>Talent not found</div>;

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
      {/* 프로필 헤더 */}
      <div className='bg-white rounded-lg shadow-md p-8 mb-8'>
        <div className='flex flex-col md:flex-row items-start md:items-center'>
          <img
            src={talent.profileImage || "https://via.placeholder.com/200"}
            alt={`${talent.firstName} ${talent.lastName}`}
            className='w-32 h-32 rounded-full object-cover mb-4 md:mb-0 md:mr-8'
          />
          <div className='flex-1'>
            <h1 className='text-3xl font-bold text-gray-900'>
              {talent.firstName} {talent.lastName}
            </h1>
            <p className='text-xl text-gray-600 mt-2'>{talent.title}</p>
            <div className='flex flex-wrap gap-4 mt-4'>
              <div className='flex items-center text-gray-600'>
                <FaMapMarkerAlt className='w-5 h-5 mr-2' />
                <span>{talent.location}</span>
              </div>
              <div className='flex items-center text-gray-600'>
                <FaClock className='w-5 h-5 mr-2' />
                <span>{talent.availability.join(", ")}</span>
              </div>
              {talent.hourlyRate && (
                <div className='flex items-center text-gray-600'>
                  <FaDollarSign className='w-5 h-5 mr-2' />
                  <span>${talent.hourlyRate}/hour</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        {/* 왼쪽 컬럼 */}
        <div className='lg:col-span-2 space-y-8'>
          {/* 자기소개 */}
          <section className='bg-white rounded-lg shadow-md p-6'>
            <h2 className='text-2xl font-semibold mb-4'>About Me</h2>
            <p className='text-gray-700 whitespace-pre-wrap'>{talent.summary}</p>
          </section>

          {/* 경력 */}
          <section className='bg-white rounded-lg shadow-md p-6'>
            <h2 className='text-2xl font-semibold mb-4'>Work Experience</h2>
            <div className='space-y-6'>
              {talent.workExperience.map((exp, index) => (
                <div key={index} className='border-l-4 border-blue-500 pl-4'>
                  <div className='flex items-center mb-2'>
                    <FaBriefcase className='w-5 h-5 text-blue-500 mr-2' />
                    <h3 className='text-lg font-semibold'>{exp.title}</h3>
                  </div>
                  <p className='text-gray-600'>{exp.company}</p>
                  <p className='text-gray-500 text-sm'>
                    {exp.startDate} - {exp.endDate || "Present"}
                  </p>
                  <p className='text-gray-700 mt-2'>{exp.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 학력 */}
          <section className='bg-white rounded-lg shadow-md p-6'>
            <h2 className='text-2xl font-semibold mb-4'>Education</h2>
            <div className='space-y-6'>
              {talent.education.map((edu, index) => (
                <div key={index} className='border-l-4 border-green-500 pl-4'>
                  <div className='flex items-center mb-2'>
                    <FaGraduationCap className='w-5 h-5 text-green-500 mr-2' />
                    <h3 className='text-lg font-semibold'>{edu.degree}</h3>
                  </div>
                  <p className='text-gray-600'>{edu.school}</p>
                  <p className='text-gray-500 text-sm'>
                    {edu.startDate} - {edu.endDate || "Present"}
                  </p>
                  {edu.description && <p className='text-gray-700 mt-2'>{edu.description}</p>}
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* 오른쪽 사이드바 */}
        <div className='space-y-8'>
          {/* 연락처 정보 */}
          <section className='bg-white rounded-lg shadow-md p-6'>
            <h2 className='text-2xl font-semibold mb-4'>Contact Information</h2>
            <div className='space-y-4'>
              <div className='flex items-center'>
                <FaEnvelope className='w-5 h-5 text-gray-500 mr-3' />
                <a href={`mailto:${talent.email}`} className='text-blue-600 hover:underline'>
                  {talent.email}
                </a>
              </div>
              {talent.phone && (
                <div className='flex items-center'>
                  <FaPhone className='w-5 h-5 text-gray-500 mr-3' />
                  <a href={`tel:${talent.phone}`} className='text-blue-600 hover:underline'>
                    {talent.phone}
                  </a>
                </div>
              )}
              {talent.linkedin && (
                <div className='flex items-center'>
                  <FaLinkedin className='w-5 h-5 text-gray-500 mr-3' />
                  <a
                    href={talent.linkedin}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-blue-600 hover:underline'>
                    LinkedIn Profile
                  </a>
                </div>
              )}
              {talent.github && (
                <div className='flex items-center'>
                  <FaGithub className='w-5 h-5 text-gray-500 mr-3' />
                  <a
                    href={talent.github}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-blue-600 hover:underline'>
                    GitHub Profile
                  </a>
                </div>
              )}
            </div>
          </section>

          {/* 스킬 */}
          <section className='bg-white rounded-lg shadow-md p-6'>
            <h2 className='text-2xl font-semibold mb-4'>Skills</h2>
            <div className='flex flex-wrap gap-2'>
              {talent.skills.map((skill) => (
                <span
                  key={skill.id}
                  className='px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm'>
                  {skill.name}
                </span>
              ))}
            </div>
          </section>

          {/* 선호 산업 */}
          <section className='bg-white rounded-lg shadow-md p-6'>
            <h2 className='text-2xl font-semibold mb-4'>Preferred Industries</h2>
            <div className='flex flex-wrap gap-2'>
              {talent.preferredIndustries.map((industry, index) => (
                <span
                  key={index}
                  className='px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm'>
                  {industry}
                </span>
              ))}
            </div>
          </section>

          {/* 선호 지역 */}
          <section className='bg-white rounded-lg shadow-md p-6'>
            <h2 className='text-2xl font-semibold mb-4'>Preferred Locations</h2>
            <div className='flex flex-wrap gap-2'>
              {talent.preferredLocations.map((location, index) => (
                <span
                  key={index}
                  className='px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm'>
                  {location}
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
