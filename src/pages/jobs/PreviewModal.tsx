import React from "react";
import { Dialog } from "@headlessui/react";
import { JobPostingData, WorkingHours, JobCategory, JobLocation } from "../../types/jobPosting";

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: JobPostingData | null;
}

const sampleData: JobPostingData = {
  title: "Sample Job Title",
  category: JobCategory.CAFE,
  location: JobLocation.SYDNEY_CBD,
  hourlyRate: 25.2,
  isHourlyRateNegotiable: false,
  workingHours: [
    { day: "Monday", isWorking: true, startTime: "09:00", endTime: "17:00" },
    { day: "Tuesday", isWorking: true, startTime: "09:00", endTime: "17:00" },
    { day: "Wednesday", isWorking: true, startTime: "09:00", endTime: "17:00" },
    { day: "Thursday", isWorking: true, startTime: "09:00", endTime: "17:00" },
    { day: "Friday", isWorking: true, startTime: "09:00", endTime: "17:00" },
    { day: "Saturday", isWorking: false, startTime: "09:00", endTime: "17:00" },
    { day: "Sunday", isWorking: false, startTime: "09:00", endTime: "17:00" },
  ],
  description:
    "<p>This is a sample job description. Please fill in the details about your job posting.</p><ul><li>Responsibilities</li><li>Requirements</li><li>Benefits</li></ul>",
  contact: "contact@example.com or 0400 000 000",
  deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
};

export default function PreviewModal({ isOpen, onClose, formData }: PreviewModalProps) {
  const displayData = formData || sampleData;

  const formatWorkingHours = (workingHours: WorkingHours[] = []) => {
    if (!Array.isArray(workingHours) || workingHours.length === 0) {
      return "Not specified";
    }

    const workingDays = workingHours.filter((day) => day && day.isWorking);
    if (workingDays.length === 0) return "Not specified";

    return workingDays.map((day) => `${day.day}: ${day.startTime} - ${day.endTime}`).join("\n");
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} className='relative z-50'>
      <div className='fixed inset-0 bg-black/30' aria-hidden='true' />

      <div className='fixed inset-0 flex items-center justify-center p-4'>
        <Dialog.Panel className='mx-auto max-w-2xl w-full bg-white rounded-xl shadow-2xl'>
          {/* Header */}
          <div className='px-6 py-4 border-b border-gray-200'>
            <Dialog.Title className='text-xl font-semibold text-gray-900'>
              {formData ? "Job Posting Preview" : "Sample Preview"}
            </Dialog.Title>
            {!formData && (
              <p className='mt-1 text-sm text-gray-500'>
                This is a sample preview. Fill in the form to see your actual job posting.
              </p>
            )}
          </div>

          {/* Content */}
          <div className='px-6 py-6 space-y-8 max-h-[calc(100vh-200px)] overflow-y-auto'>
            {/* Job Title and Category */}
            <div>
              <h2 className='text-2xl font-bold text-gray-900'>{displayData.title}</h2>
              <div className='mt-2 flex items-center gap-2 text-sm text-gray-600'>
                <span className='font-medium'>{displayData.category}</span>
                <span>•</span>
                <span>{displayData.location}</span>
              </div>
            </div>

            {/* Key Details */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-gray-50 rounded-lg'>
              {/* Hourly Rate */}
              <div>
                <h3 className='text-sm font-medium text-gray-500'>Hourly Rate</h3>
                <p className='mt-1 text-lg font-semibold text-gray-900'>
                  {displayData.isHourlyRateNegotiable
                    ? "Negotiable after interview"
                    : `$${displayData.hourlyRate} per hour`}
                </p>
              </div>

              {/* Working Hours */}
              <div>
                <h3 className='text-sm font-medium text-gray-500'>Working Hours</h3>
                <pre className='mt-1 text-sm text-gray-900 whitespace-pre-line'>
                  {formatWorkingHours(displayData.workingHours)}
                </pre>
              </div>
            </div>

            {/* Job Description */}
            <div>
              <h3 className='text-sm font-medium text-gray-500 mb-2'>Job Description</h3>
              <div
                className='prose prose-sm max-w-none'
                dangerouslySetInnerHTML={{ __html: displayData.description || "" }}
              />
            </div>

            {/* Application Details */}
            <div className='space-y-4'>
              {/* Contact Information */}
              <div>
                <h3 className='text-sm font-medium text-gray-500'>Contact Information</h3>
                <p className='mt-1 text-sm text-gray-900'>{displayData.contact}</p>
              </div>

              {/* Application Deadline */}
              {displayData.deadline && (
                <div>
                  <h3 className='text-sm font-medium text-gray-500'>Application Deadline</h3>
                  <p className='mt-1 text-sm text-gray-900'>
                    {new Date(displayData.deadline).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className='px-6 py-4 border-t border-gray-200 flex justify-end gap-3'>
            <button
              onClick={onClose}
              className='px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50'>
              Close
            </button>
            {formData && (
              <button
                onClick={onClose}
                className='px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700'>
                Submit
              </button>
            )}
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
