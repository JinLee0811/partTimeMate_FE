import { useParams } from "react-router-dom";
import { jobs_en } from "../../data/data";

const JobDetail = () => {
  const { id } = useParams<{ id: string }>();
  const job = jobs_en.find((job) => job.id === id);

  if (!job) return <p className='text-center text-red-500'>Job not found!</p>;

  return (
    <div className='max-w-4xl mx-auto py-10 px-6 bg-white shadow-md rounded-lg'>
      <h1 className='text-3xl font-bold'>{job.title}</h1>
      <p className='text-lg text-gray-600'>{job.company}</p>

      <div className='mt-4 text-gray-700'>
        <p>
          <strong>📍 Location:</strong> {job.location}
        </p>
        <p>
          <strong>💰 Salary:</strong> {job.salary}
        </p>
        <p>
          <strong>🕒 Work Hours:</strong> {job.workHours}
        </p>
        <p>
          <strong>📅 Duration:</strong> {job.duration}
        </p>
      </div>

      <h2 className='text-xl font-bold mt-6'>Job Description</h2>
      <p className='text-gray-700'>{job.description}</p>

      <h2 className='text-xl font-bold mt-6'>Requirements</h2>
      <ul className='list-disc list-inside text-gray-700'>
        {job.requirements.map((req, index) => (
          <li key={index}>{req}</li>
        ))}
      </ul>

      <h2 className='text-xl font-bold mt-6'>Contact</h2>
      <p className='text-gray-700'>📧 {job.contact.email || "N/A"}</p>
      <p className='text-gray-700'>📞 {job.contact.phone || "N/A"}</p>
    </div>
  );
};

export default JobDetail;
