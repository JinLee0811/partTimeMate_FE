import { useState } from "react";
import Modal from "../../../components/Modal";
import JobDetailModal from "./JobDetail";
import { FaEye, FaTrash, FaSearch } from "react-icons/fa";

const jobPostings = [
  {
    id: 1,
    title: "Barista Needed",
    company: "Cafe Blue",
    location: "Sydney",
    status: "Active",
    postedDate: "2024-03-15",
    applications: 12,
  },
  {
    id: 2,
    title: "Retail Assistant",
    company: "Nike Store",
    location: "Melbourne",
    status: "Closed",
    postedDate: "2024-03-10",
    applications: 8,
  },
];

export default function JobManagement() {
  const [jobs, setJobs] = useState(jobPostings);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const openModal = (job: any) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleDelete = (jobId: number) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      setJobs(jobs.filter((job) => job.id !== jobId));
    }
  };

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='max-w-7xl mx-auto'>
      <div className='mb-8'>
        <h1 className='text-2xl font-bold text-gray-900'>Job Postings Management</h1>
        <p className='mt-2 text-sm text-gray-600'>
          Monitor and manage all job postings across the platform
        </p>
      </div>

      <div className='bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden'>
        <div className='p-6 border-b border-gray-100'>
          <div className='flex flex-col md:flex-row md:items-center md:justify-between'>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <FaSearch className='text-gray-400' />
              </div>
              <input
                type='text'
                placeholder='Search jobs...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='pl-10 pr-4 py-2 w-full md:w-64 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200'
              />
            </div>
          </div>
        </div>

        <div className='overflow-x-auto'>
          <table className='min-w-full divide-y divide-gray-100'>
            <thead className='bg-gray-50'>
              <tr>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>
                  Title
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>
                  Company
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>
                  Location
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>
                  Status
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>
                  Posted Date
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>
                  Applications
                </th>
                <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-100'>
              {filteredJobs.map((job) => (
                <tr key={job.id} className='hover:bg-gray-50 transition-colors duration-150'>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm font-medium text-gray-900'>{job.title}</div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm text-gray-900'>{job.company}</div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm text-gray-900'>{job.location}</div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        job.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}>
                      {job.status}
                    </span>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm text-gray-900'>{job.postedDate}</div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm text-gray-900'>{job.applications} applicants</div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                    <div className='flex justify-end space-x-2'>
                      <button
                        onClick={() => openModal(job)}
                        className='text-orange-600 hover:text-orange-800 p-1.5 rounded-lg hover:bg-orange-50 transition-colors duration-200'>
                        <FaEye />
                      </button>
                      <button
                        onClick={() => handleDelete(job.id)}
                        className='text-red-600 hover:text-red-800 p-1.5 rounded-lg hover:bg-red-50 transition-colors duration-200'>
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedJob && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <JobDetailModal job={selectedJob} onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}
