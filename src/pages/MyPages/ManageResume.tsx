import React, { useState } from "react";
import { FaFileAlt, FaUpload, FaEdit, FaTrash, FaDownload, FaPlus } from "react-icons/fa";

export default function ManageResume() {
  const [resumes, setResumes] = useState([
    {
      id: 1,
      title: "Software Developer Resume",
      lastModified: "2024-03-15",
      status: "active",
    },
    {
      id: 2,
      title: "Web Developer Resume",
      lastModified: "2024-03-10",
      status: "active",
    },
  ]);

  return (
    <div className='flex-1 bg-gray-50'>
      <div className='max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='mb-8'>
          <h1 className='text-2xl font-bold text-gray-900'>Manage Resumes</h1>
          <p className='mt-2 text-sm text-gray-600'>
            Upload, create, and manage your resumes to apply for jobs efficiently.
          </p>
        </div>

        {/* Action Buttons */}
        <div className='mb-6 flex gap-4'>
          <button className='flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors'>
            <FaPlus className='mr-2' />
            Create New Resume
          </button>
          <button className='flex items-center px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors'>
            <FaUpload className='mr-2' />
            Upload Resume
          </button>
        </div>

        {/* Resumes Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {resumes.map((resume) => (
            <div
              key={resume.id}
              className='bg-white rounded-xl p-6 border border-gray-200 hover:border-orange-200 transition-colors'>
              <div className='flex items-start justify-between'>
                <div className='flex items-center'>
                  <div className='w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600'>
                    <FaFileAlt />
                  </div>
                  <div className='ml-4'>
                    <h3 className='text-lg font-medium text-gray-900'>{resume.title}</h3>
                    <p className='text-sm text-gray-500'>Last modified: {resume.lastModified}</p>
                  </div>
                </div>
              </div>

              <div className='mt-6 flex items-center gap-4'>
                <button className='flex items-center px-3 py-2 text-sm text-gray-700 hover:text-orange-600 transition-colors'>
                  <FaEdit className='mr-2' />
                  Edit
                </button>
                <button className='flex items-center px-3 py-2 text-sm text-gray-700 hover:text-orange-600 transition-colors'>
                  <FaDownload className='mr-2' />
                  Download
                </button>
                <button className='flex items-center px-3 py-2 text-sm text-red-600 hover:text-red-700 transition-colors ml-auto'>
                  <FaTrash className='mr-2' />
                  Delete
                </button>
              </div>
            </div>
          ))}

          {/* Add Resume Card */}
          <div className='bg-gray-50 rounded-xl p-6 border border-dashed border-gray-300 hover:border-orange-300 transition-colors flex flex-col items-center justify-center text-center cursor-pointer'>
            <div className='w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 mb-4'>
              <FaPlus />
            </div>
            <h3 className='text-lg font-medium text-gray-900'>Add New Resume</h3>
            <p className='mt-2 text-sm text-gray-500'>
              Create a new resume or upload an existing one
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
