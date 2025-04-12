import React, { useState } from "react";
import {
  FaHeart,
  FaMapMarkerAlt,
  FaClock,
  FaDollarSign,
  FaExternalLinkAlt,
  FaTrash,
} from "react-icons/fa";

export default function MyWishlist() {
  const [savedJobs, setSavedJobs] = useState([
    {
      id: 1,
      companyName: "Tech Solutions Inc.",
      position: "Part-time Web Developer",
      location: "Sydney CBD",
      salary: "$30-35/hour",
      workingHours: "15-20 hrs/week",
      postedDate: "2024-03-15",
    },
    {
      id: 2,
      companyName: "Digital Creatives",
      position: "Junior Graphic Designer",
      location: "Melbourne",
      salary: "$25-30/hour",
      workingHours: "20 hrs/week",
      postedDate: "2024-03-14",
    },
    {
      id: 3,
      companyName: "Coffee House",
      position: "Barista",
      location: "Brisbane",
      salary: "$28/hour",
      workingHours: "15 hrs/week",
      postedDate: "2024-03-13",
    },
  ]);

  return (
    <div className='flex-1 bg-gray-50'>
      <div className='max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='mb-8'>
          <h1 className='text-2xl font-bold text-gray-900'>Saved Jobs</h1>
          <p className='mt-2 text-sm text-gray-600'>
            Keep track of your favorite job opportunities and apply when you're ready.
          </p>
        </div>

        {/* Saved Jobs List */}
        <div className='space-y-4'>
          {savedJobs.map((job) => (
            <div
              key={job.id}
              className='bg-white rounded-xl p-6 border border-gray-200 hover:border-orange-200 transition-colors'>
              <div className='flex items-start justify-between'>
                <div>
                  <h3 className='text-lg font-medium text-gray-900'>{job.position}</h3>
                  <p className='text-base text-gray-600 mt-1'>{job.companyName}</p>

                  <div className='mt-4 grid grid-cols-2 gap-4'>
                    <div className='flex items-center text-sm text-gray-500'>
                      <FaMapMarkerAlt className='mr-2 text-gray-400' />
                      {job.location}
                    </div>
                    <div className='flex items-center text-sm text-gray-500'>
                      <FaClock className='mr-2 text-gray-400' />
                      {job.workingHours}
                    </div>
                    <div className='flex items-center text-sm text-gray-500'>
                      <FaDollarSign className='mr-2 text-gray-400' />
                      {job.salary}
                    </div>
                    <div className='flex items-center text-sm text-gray-500'>
                      <FaHeart className='mr-2 text-orange-500' />
                      Saved on {job.postedDate}
                    </div>
                  </div>
                </div>
              </div>

              <div className='mt-6 flex items-center justify-between border-t border-gray-100 pt-4'>
                <button className='flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors'>
                  <FaExternalLinkAlt className='mr-2' />
                  View Details
                </button>
                <button className='flex items-center px-4 py-2 text-red-600 hover:text-red-700 transition-colors'>
                  <FaTrash className='mr-2' />
                  Remove
                </button>
              </div>
            </div>
          ))}

          {savedJobs.length === 0 && (
            <div className='text-center py-12'>
              <div className='w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                <FaHeart className='text-2xl text-orange-600' />
              </div>
              <h3 className='text-lg font-medium text-gray-900'>No saved jobs yet</h3>
              <p className='mt-2 text-sm text-gray-500'>
                Start saving jobs you're interested in by clicking the heart icon on job listings.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
