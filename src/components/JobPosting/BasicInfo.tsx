import React, { useState } from "react";
import { useJobPostingStore } from "../../store/jobPostingStore";
import { JobCategory, JobLocation } from "../../types/jobPosting";

interface WorkingHours {
  day: string;
  isWorking: boolean;
  startTime: string;
  endTime: string;
}

export default function BasicInfo() {
  const { formData, updateFormData } = useJobPostingStore();
  const [isHourlyRateNegotiable, setIsHourlyRateNegotiable] = useState(false);
  const [workingHours, setWorkingHours] = useState<WorkingHours[]>([
    { day: "Monday", isWorking: false, startTime: "09:00", endTime: "17:00" },
    { day: "Tuesday", isWorking: false, startTime: "09:00", endTime: "17:00" },
    { day: "Wednesday", isWorking: false, startTime: "09:00", endTime: "17:00" },
    { day: "Thursday", isWorking: false, startTime: "09:00", endTime: "17:00" },
    { day: "Friday", isWorking: false, startTime: "09:00", endTime: "17:00" },
    { day: "Saturday", isWorking: false, startTime: "09:00", endTime: "17:00" },
    { day: "Sunday", isWorking: false, startTime: "09:00", endTime: "17:00" },
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  const handleWorkingHoursChange = (
    index: number,
    field: keyof WorkingHours,
    value: string | boolean
  ) => {
    const newWorkingHours = [...workingHours];
    newWorkingHours[index] = { ...newWorkingHours[index], [field]: value };
    setWorkingHours(newWorkingHours);
    updateFormData({ workingHours: newWorkingHours });
  };

  const handleHourlyRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isHourlyRateNegotiable) {
      updateFormData({ hourlyRate: "Negotiable after interview" });
    } else {
      updateFormData({ hourlyRate: e.target.value });
    }
  };

  return (
    <div className='space-y-6'>
      {/* Job Title */}
      <div>
        <label htmlFor='title' className='block text-sm font-medium text-gray-700'>
          Job Title <span className='text-red-500'>*</span>
        </label>
        <input
          type='text'
          id='title'
          name='title'
          value={formData?.title || ""}
          onChange={handleInputChange}
          className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none'
          placeholder='Enter job title'
          required
        />
      </div>

      {/* Job Category */}
      <div>
        <label htmlFor='category' className='block text-sm font-medium text-gray-700'>
          Category <span className='text-red-500'>*</span>
        </label>
        <select
          id='category'
          name='category'
          value={formData?.category || ""}
          onChange={handleInputChange}
          className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none'
          required>
          <option value=''>Select a category</option>
          {Object.values(JobCategory).map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Location */}
      <div>
        <label htmlFor='location' className='block text-sm font-medium text-gray-700'>
          Location <span className='text-red-500'>*</span>
        </label>
        <select
          id='location'
          name='location'
          value={formData?.location || ""}
          onChange={handleInputChange}
          className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none'
          required>
          <option value=''>Select a location</option>
          {Object.values(JobLocation).map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
      </div>

      {/* Hourly Rate */}
      <div>
        <label className='block text-sm font-medium text-gray-700'>
          Hourly Rate <span className='text-red-500'>*</span>
        </label>
        <div className='mt-1 space-y-2'>
          <div className='flex items-center'>
            <input
              type='checkbox'
              id='negotiable'
              checked={isHourlyRateNegotiable}
              onChange={(e) => setIsHourlyRateNegotiable(e.target.checked)}
              className='mr-2'
            />
            <label htmlFor='negotiable' className='text-sm text-gray-600'>
              Negotiable after interview
            </label>
          </div>
          {!isHourlyRateNegotiable && (
            <div className='flex items-center'>
              <span className='text-gray-500 mr-2'>$</span>
              <input
                type='number'
                name='hourlyRate'
                value={formData?.hourlyRate || ""}
                onChange={handleHourlyRateChange}
                className='block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none'
                placeholder='Enter hourly rate'
                min='0'
                step='0.01'
              />
              <span className='text-gray-500 ml-2'>per hour</span>
            </div>
          )}
        </div>
      </div>

      {/* Working Hours */}
      <div>
        <label className='block text-sm font-medium text-gray-700 mb-2'>
          Working Hours <span className='text-red-500'>*</span>
        </label>
        <div className='space-y-3 border rounded-lg p-4'>
          {workingHours.map((day, index) => (
            <div key={day.day} className='flex items-center space-x-4'>
              <div className='w-28'>
                <input
                  type='checkbox'
                  id={`working-${day.day}`}
                  checked={day.isWorking}
                  onChange={(e) => handleWorkingHoursChange(index, "isWorking", e.target.checked)}
                  className='mr-2'
                />
                <label htmlFor={`working-${day.day}`} className='text-sm'>
                  {day.day}
                </label>
              </div>
              {day.isWorking && (
                <div className='flex items-center space-x-2'>
                  <input
                    type='time'
                    value={day.startTime}
                    onChange={(e) => handleWorkingHoursChange(index, "startTime", e.target.value)}
                    className='rounded-md border border-gray-300 px-2 py-1 text-sm'
                  />
                  <span>to</span>
                  <input
                    type='time'
                    value={day.endTime}
                    onChange={(e) => handleWorkingHoursChange(index, "endTime", e.target.value)}
                    className='rounded-md border border-gray-300 px-2 py-1 text-sm'
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
