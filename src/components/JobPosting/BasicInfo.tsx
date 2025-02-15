// BasicInfo.tsx
import React from "react";
import PostingInputField from "./PostingInputField";

interface BasicInfoProps {
  formData: {
    title: string;
    companyName: string;
    jobCategory: string;
    companyLogo: File | null;
  };
  // onChange 핸들러는 <input> | <select> 모두 처리할 수 있도록 유니온 타입
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;

  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function BasicInfo({ formData, handleChange, handleFileChange }: BasicInfoProps) {
  const jobCategories = [
    "Cafe",
    "Restaurant",
    "Food Service",
    "Delivery",
    "Retail",
    "Hospitality",
    "Office Administration",
    "Information Technology",
    "Finance",
    "Marketing",
    "Sales",
    "Healthcare",
    "Education",
    "Manufacturing",
    "Construction",
    "Transportation",
    "Real Estate",
    "Entertainment",
    "Customer Service",
    "Logistics",
    "Engineering",
    "Consulting",
    "Freelance",
  ];

  return (
    <div className='space-y-4'>
      <h3 className='text-lg font-semibold text-gray-700'>Basic Info</h3>

      {/* Job Title */}
      <PostingInputField
        label='Job Title'
        name='title'
        value={formData.title}
        onChange={handleChange}
        placeholder='Enter the job title'
        required
      />

      {/* Company Name */}
      <PostingInputField
        label='Company Name'
        name='companyName'
        value={formData.companyName}
        onChange={handleChange}
        placeholder='Enter the company name'
        required
      />

      {/* 잡 카테고리 선택 (select) */}
      <div>
        <label className='block text-sm font-medium text-gray-700'>
          Job Category <span className='text-red-500 ml-1'>*</span>
        </label>
        <select
          name='jobCategory'
          value={formData.jobCategory}
          onChange={handleChange}
          className='w-full p-2 border border-gray-300 rounded-md'
          required>
          <option value=''>Select Job Category</option>
          {jobCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* 회사 로고 업로드 */}
      <div className='mt-4'>
        <label className='block text-sm font-medium text-gray-700'>Company Logo (Optional)</label>
        <input
          type='file'
          accept='image/*'
          onChange={handleFileChange}
          className='mt-1 p-2 text-sm border border-gray-300 rounded-md w-full'
        />
        {formData.companyLogo && (
          <div className='mt-2'>
            <img
              src={URL.createObjectURL(formData.companyLogo)}
              alt='Company Logo Preview'
              className='w-20 h-20 object-cover rounded-md border'
            />
          </div>
        )}
      </div>
    </div>
  );
}
