// src/pages/EmployerSettings.tsx (혹은 적절한 위치)
import { useState } from "react";
import { useCompanyStore } from "../../store/useCompanyStore";

export default function EmployerSettings() {
  // 회사 폼 상태와 액션을 가져옵니다.
  const { formData, setFormData, createCompany } = useCompanyStore();

  // 로고 미리보기 상태
  const [logoPreview, setLogoPreview] = useState<string | null>(formData.logoUrl || null);

  // 기본 입력값 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    // store의 formData 갱신
    setFormData({ [name]: value });
  };

  // 로고 업로드 핸들러
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const fileURL = URL.createObjectURL(file);
      setLogoPreview(fileURL);

      // 실제 업로드가 아니라 미리보기만 하는 경우,
      // 스토어에는 임시로 파일 경로(URL)만 저장
      setFormData({ logoUrl: fileURL });
    }
  };

  // 폼 저장(회사 등록) 버튼 핸들러
  const handleSubmit = async () => {
    try {
      // 회사 등록 API 호출
      await createCompany();
      alert("Company created successfully!");
      // 이후 폼 초기화 or 페이지 이동 등 원하는 동작 수행
    } catch (error) {
      alert("Error creating company. Please try again.");
    }
  };

  return (
    <div className='p-6 bg-white rounded-lg shadow-md max-w-2xl mx-auto'>
      <h3 className='text-2xl font-bold text-gray-800 mb-4'>Register Company</h3>
      <p className='text-sm text-gray-600 mb-6'>
        Manage your company information and hiring preferences.
      </p>

      <div className='space-y-4'>
        {/* Company Name */}
        <div>
          <label className='block text-sm font-medium text-gray-700'>Company Name *</label>
          <input
            type='text'
            name='companyName'
            value={formData.companyName}
            onChange={handleChange}
            placeholder='Enter company name'
            required
            className='w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500'
          />
        </div>

        {/* CEO Name */}
        <div>
          <label className='block text-sm font-medium text-gray-700'>CEO Name</label>
          <input
            type='text'
            name='ceo'
            value={formData.ceo}
            onChange={handleChange}
            placeholder="Enter CEO's name"
            className='w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500'
          />
        </div>

        {/* Website */}
        <div>
          <label className='block text-sm font-medium text-gray-700'>Company Website</label>
          <input
            type='url'
            name='website'
            value={formData.website}
            onChange={handleChange}
            placeholder='https://yourcompany.com'
            className='w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500'
          />
        </div>

        {/* Company Email */}
        <div>
          <label className='block text-sm font-medium text-gray-700'>Contact Email *</label>
          <input
            type='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            placeholder='Enter contact email'
            required
            className='w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500'
          />
        </div>

        {/* Phone Number */}
        <div>
          <label className='block text-sm font-medium text-gray-700'>Phone Number</label>
          <input
            type='tel'
            name='phone'
            value={formData.phone}
            onChange={handleChange}
            placeholder='Enter phone number'
            className='w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500'
          />
        </div>

        {/* Company Logo Upload */}
        <div>
          <label className='block text-sm font-medium text-gray-700'>Company Logo</label>
          <input
            type='file'
            accept='image/*'
            onChange={handleFileChange}
            className='mt-1 p-2 text-sm border border-gray-300 rounded-md w-full'
          />
          {logoPreview && (
            <div className='mt-3'>
              <img
                src={logoPreview}
                alt='Company Logo Preview'
                className='w-24 h-24 object-cover rounded-md border border-gray-300'
              />
            </div>
          )}
        </div>

        {/* Description */}
        <div>
          <label className='block text-sm font-medium text-gray-700'>Company Description</label>
          <textarea
            name='description'
            value={formData.description}
            onChange={handleChange}
            placeholder='Provide a short company description'
            rows={3}
            className='w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500'
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className='mt-6 flex justify-end'>
        <button
          className='bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700'
          onClick={handleSubmit}>
          Save Settings
        </button>
      </div>
    </div>
  );
}
