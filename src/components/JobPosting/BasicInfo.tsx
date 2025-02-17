import React from "react";
import PostingInputField from "./PostingInputField";
import { useJobPostingStore } from "../../store/jobPostingStore";

export default function BasicInfo() {
  // 글로벌 스토어에서 formData와 setFormData를 직접 가져옴
  const { formData, setFormData } = useJobPostingStore();

  // 글로벌 상태를 업데이트하는 handleChange 함수
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    // setFormData는 Partial 객체만 받으므로, 함수 인자가 아닌 객체를 직접 전달
    setFormData({ [name]: value });
  };

  // 파일 업로드 핸들러
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const fileURL = URL.createObjectURL(file);

      setFormData({ companyLogo: fileURL });
      // 이제 store에는 문자열(URL)만 저장
    }
  };

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
              src={formData.companyLogo as string}
              alt='Company Logo Preview'
              className='w-20 h-20 object-cover rounded-md border'
            />
          </div>
        )}
      </div>
    </div>
  );
}
