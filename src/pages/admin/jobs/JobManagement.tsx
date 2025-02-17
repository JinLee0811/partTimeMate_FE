import Table from "../../../components/Table";
import Modal from "../../../components/Modal";
import { useState } from "react";
import JobDetailModal from "../jobs/JobDetail";

const jobPostings = [
  { id: 1, title: "Barista Needed", company: "Cafe Blue", location: "Sydney", status: "Open" },
  {
    id: 2,
    title: "Retail Assistant",
    company: "Nike Store",
    location: "Melbourne",
    status: "Closed",
  },
];

export default function JobManagement() {
  const [jobs, setJobs] = useState(jobPostings);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ✅ 모달 열기 (상세 보기)
  const openModal = (job: any) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleDelete = (jobId: number) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      setJobs(jobs.filter((job) => job.id !== jobId));
    }
  };

  return (
    <div>
      <h2 className='text-2xl font-bold mb-4'>Job Postings Management</h2>
      <Table
        columns={["ID", "Title", "Company", "Location", "Status", "Actions"]}
        data={jobs.map((job) => [
          job.id,
          job.title,
          job.company,
          job.location,
          job.status,
          <div key={job.id} className='flex gap-3'>
            <button onClick={() => openModal(job)} className='text-blue-500'>
              View
            </button>
            <button onClick={() => handleDelete(job.id)} className='text-red-500'>
              Delete
            </button>
          </div>,
        ])}
      />

      {/* ✅ 모달 (상세 보기) */}
      {selectedJob && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <JobDetailModal job={selectedJob} />
        </Modal>
      )}
    </div>
  );
}
