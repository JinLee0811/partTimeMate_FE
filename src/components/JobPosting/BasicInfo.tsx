import React from "react";
import { useJobPostingStore } from "../../store/jobPostingStore";

export default function BasicInfo() {
  const { formData, setFormData } = useJobPostingStore();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ [name]: value });
  };

  const employmentTypes = [
    "Part-time",
    "Full-time",
    "Contract",
    "Freelance",
    "Temporary",
    "Internship",
  ];

  return (
    <div className='space-y-6'>
      {/* ✅ 상단 섹션 제목 및 설명 */}
      <div className='bg-gray-100 p-4 rounded-lg'>
        <h2 className='text-xl font-bold text-blue-600'>Basic Information</h2>
        <p className='text-gray-600 text-sm mt-1'>Who’s your ideal Part-time Mate?</p>
      </div>

      {/* 공고 제목 */}
      <div>
        <label className='block text-lg font-bold text-gray-800'>
          Posting Title <span className='text-red-500'>*</span>
        </label>
        <input
          type='text'
          name='title'
          value={formData.title}
          onChange={handleChange}
          placeholder='Enter job title'
          className='w-full mt-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500'
        />
      </div>

      {/* 업직종 선택 */}
      <div>
        <label className='block text-lg font-bold text-gray-800'>
          Job Category <span className='text-red-500'>*</span>
        </label>
        <div className='flex gap-2 mt-1'>
          <input
            type='text'
            name='jobCategory'
            value={formData.jobCategory}
            onChange={handleChange}
            placeholder='Search or select a category'
            className='flex-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500'
          />
          <button className='px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100'>
            Select
          </button>
          <button className='px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100'>
            Reset
          </button>
        </div>
      </div>

      {/* 고용 형태 */}
      <div>
        <label className='block text-lg font-bold text-gray-800'>
          Employment Type <span className='text-red-500'>*</span>
        </label>
        <div className='flex flex-wrap gap-2 mt-1'>
          {employmentTypes.map((type) => (
            <label
              key={type}
              className={`px-4 py-2 border rounded-md cursor-pointer ${
                formData.employmentType === type
                  ? "bg-blue-600 text-white"
                  : "border-gray-300 text-gray-700 hover:bg-gray-100"
              }`}>
              <input
                type='checkbox'
                name='employmentType'
                value={type}
                checked={formData.employmentType === type}
                onChange={() => setFormData({ employmentType: type })}
                className='hidden'
              />
              {type}
            </label>
          ))}
        </div>
      </div>

      {/* 모집 인원 */}
      <div>
        <label className='block text-lg font-bold text-gray-800'>
          Number of Hires <span className='text-red-500'>*</span>
        </label>
        <div className='flex items-center gap-4 mt-1'>
          {["Less than 10", "1 person", "Less than 100", "Custom"].map((option, index) => (
            <label key={index} className='flex items-center gap-2 cursor-pointer'>
              <input
                type='radio'
                name='hiringCount'
                value={option}
                checked={formData.hiringCount === option}
                onChange={handleChange}
                className='w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300'
              />
              {option}
            </label>
          ))}
          {formData.hiringCount === "Custom" && (
            <input
              type='number'
              name='customHiringCount'
              placeholder='Enter number'
              className='w-36 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500'
            />
          )}
        </div>
      </div>
    </div>
  );
}
