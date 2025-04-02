import React from "react";
import { useJobPostingStore } from "../../store/jobPostingStore";

export default function ApplicationMethod() {
  const { formData, updateFormData } = useJobPostingStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  return (
    <div className='space-y-8'>
      {/* Section Header */}
      <div className='border-b border-gray-200 pb-4'>
        <h3 className='text-lg font-semibold text-gray-900'>Application Details</h3>
        <p className='mt-1 text-sm text-gray-500'>
          Provide contact information and application deadline for potential candidates.
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {/* Contact Information */}
        <div>
          <label htmlFor='contact' className='block text-sm font-medium text-gray-700 mb-1'>
            Contact Information <span className='text-red-500'>*</span>
          </label>
          <input
            type='text'
            id='contact'
            name='contact'
            value={formData?.contact || ""}
            onChange={handleChange}
            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            placeholder='Phone number or email address'
          />
          <p className='mt-1 text-xs text-gray-500'>This will be visible to all applicants</p>
        </div>

        {/* Application Deadline */}
        <div>
          <label htmlFor='deadline' className='block text-sm font-medium text-gray-700 mb-1'>
            Application Deadline
          </label>
          <input
            type='date'
            id='deadline'
            name='deadline'
            value={
              formData?.deadline ? new Date(formData.deadline).toISOString().split("T")[0] : ""
            }
            onChange={handleChange}
            min={new Date().toISOString().split("T")[0]}
            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
          />
          <p className='mt-1 text-xs text-gray-500'>Leave blank if there's no specific deadline</p>
        </div>
      </div>

      {/* Help Text */}
      <div className='mt-6 bg-yellow-50 p-4 rounded-lg'>
        <h4 className='text-sm font-medium text-yellow-800 mb-2'>Important Notice</h4>
        <p className='text-sm text-yellow-700'>
          Make sure to respond to applications promptly and keep your contact information up to
          date. Regular communication with applicants helps maintain a professional image.
        </p>
      </div>
    </div>
  );
}
