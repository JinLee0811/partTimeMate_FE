import React from "react";
import PostingInputField from "./PostingInputField";
import { useJobPostingStore } from "../../store/jobPostingStore";

const applicationMethods = [
  "Email",
  "Mobile",
  "Direct Visit",
  "Text then Visit",
  "Phone Call then Visit",
];

export default function ApplicationMethod() {
  const { formData, setFormData } = useJobPostingStore();

  // 모든 인풋 변경은 글로벌 스토어를 업데이트합니다.
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ [name]: value });
  };

  // Application Method 버튼 클릭 시, 해당 값을 글로벌 상태에 업데이트합니다.
  const handleApplicationMethodSelect = (method: string) => {
    setFormData({ applicationMethod: method });
  };

  return (
    <div className='space-y-4'>
      <div>
        <label className='block text-sm font-medium text-gray-700 mb-2'>Application Method *</label>
        <div className='flex flex-wrap gap-2'>
          {applicationMethods.map((method) => (
            <button
              key={method}
              type='button'
              onClick={() => handleApplicationMethodSelect(method)}
              className={`px-4 py-2 rounded-full border transition-colors ${
                formData.applicationMethod === method
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
              }`}>
              {method}
            </button>
          ))}
        </div>
      </div>
      <PostingInputField
        label='Contact Name *'
        name='contactName'
        value={formData.contactName}
        onChange={handleChange}
        required
      />
      <PostingInputField
        label='Contact Phone *'
        name='contactPhone'
        value={formData.contactPhone}
        onChange={handleChange}
        required
      />
      <PostingInputField
        label='Contact Email *'
        name='contactEmail'
        value={formData.contactEmail}
        onChange={handleChange}
        required
      />
    </div>
  );
}
