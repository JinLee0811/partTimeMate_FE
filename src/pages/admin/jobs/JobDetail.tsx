interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  status: string;
}

interface JobDetailModalProps {
  job: Job;
  onClose: () => void;
}

export default function JobDetailModal({ job }: JobDetailModalProps) {
  return (
    <div className='p-6 bg-white rounded-lg shadow-lg'>
      <h2 className='text-xl font-bold mb-4'>Job Details</h2>
      <div className='space-y-3'>
        <p>
          <strong>ID:</strong> {job.id}
        </p>
        <p>
          <strong>Title:</strong> {job.title}
        </p>
        <p>
          <strong>Company:</strong> {job.company}
        </p>
        <p>
          <strong>Location:</strong> {job.location}
        </p>
        <p>
          <strong>Status:</strong> {job.status}
        </p>
      </div>
      <div className='mt-4 flex justify-end'></div>
    </div>
  );
}
