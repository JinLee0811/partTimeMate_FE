import React, { useState } from "react";
import {
  FaBriefcase,
  FaBuilding,
  FaMapMarkerAlt,
  FaClock,
  FaDollarSign,
  FaCheckCircle,
  FaTimesCircle,
  FaSpinner,
} from "react-icons/fa";

export default function MyApplications() {
  const [applications] = useState([
    {
      id: 1,
      jobTitle: "Part-time Web Developer",
      company: "Tech Solutions Inc.",
      location: "Sydney CBD",
      salary: "$30-35/hour",
      workingHours: "15-20 hrs/week",
      appliedDate: "2024-03-15",
      status: "pending",
    },
    {
      id: 2,
      jobTitle: "Junior Graphic Designer",
      company: "Digital Creatives",
      location: "Melbourne",
      salary: "$25-30/hour",
      workingHours: "20 hrs/week",
      appliedDate: "2024-03-14",
      status: "accepted",
    },
    {
      id: 3,
      jobTitle: "Barista",
      company: "Coffee House",
      location: "Brisbane",
      salary: "$28/hour",
      workingHours: "15 hrs/week",
      appliedDate: "2024-03-13",
      status: "rejected",
    },
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <span className='flex items-center gap-2 text-yellow-600 bg-yellow-50 px-3 py-1 rounded-full text-sm font-medium'>
            <FaSpinner className='animate-spin' />
            Under Review
          </span>
        );
      case "accepted":
        return (
          <span className='flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1 rounded-full text-sm font-medium'>
            <FaCheckCircle />
            Accepted
          </span>
        );
      case "rejected":
        return (
          <span className='flex items-center gap-2 text-red-600 bg-red-50 px-3 py-1 rounded-full text-sm font-medium'>
            <FaTimesCircle />
            Not Selected
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className='flex-1 bg-gray-50'>
      <div className='max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='mb-8'>
          <h1 className='text-2xl font-bold text-gray-900'>My Applications</h1>
          <p className='mt-2 text-sm text-gray-600'>
            Track the status of your job applications and follow up on opportunities.
          </p>
        </div>

        {/* Applications List */}
        <div className='space-y-4'>
          {applications.map((application) => (
            <div
              key={application.id}
              className='bg-white rounded-xl p-6 border border-gray-200 hover:border-orange-200 transition-colors'>
              <div className='flex items-start justify-between'>
                <div>
                  <h3 className='text-lg font-medium text-gray-900'>{application.jobTitle}</h3>
                  <div className='flex items-center gap-2 mt-1'>
                    <FaBuilding className='text-gray-400' />
                    <p className='text-base text-gray-600'>{application.company}</p>
                  </div>

                  <div className='mt-4 grid grid-cols-2 gap-4'>
                    <div className='flex items-center text-sm text-gray-500'>
                      <FaMapMarkerAlt className='mr-2 text-gray-400' />
                      {application.location}
                    </div>
                    <div className='flex items-center text-sm text-gray-500'>
                      <FaClock className='mr-2 text-gray-400' />
                      {application.workingHours}
                    </div>
                    <div className='flex items-center text-sm text-gray-500'>
                      <FaDollarSign className='mr-2 text-gray-400' />
                      {application.salary}
                    </div>
                    <div className='flex items-center text-sm text-gray-500'>
                      <FaBriefcase className='mr-2 text-gray-400' />
                      Applied on {application.appliedDate}
                    </div>
                  </div>
                </div>
                <div>{getStatusBadge(application.status)}</div>
              </div>

              <div className='mt-6 flex items-center justify-end border-t border-gray-100 pt-4'>
                <button className='px-4 py-2 text-sm text-orange-600 hover:text-orange-700 font-medium'>
                  View Details
                </button>
              </div>
            </div>
          ))}

          {applications.length === 0 && (
            <div className='text-center py-12'>
              <div className='w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                <FaBriefcase className='text-2xl text-orange-600' />
              </div>
              <h3 className='text-lg font-medium text-gray-900'>No applications yet</h3>
              <p className='mt-2 text-sm text-gray-500'>
                Start applying for jobs to track your applications here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
