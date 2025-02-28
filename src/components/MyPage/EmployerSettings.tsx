import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCompanyStore } from "../../store/useCompanyStore";

export default function EmployerSettings() {
  // 회사 폼 상태와 액션을 가져옵니다.
  const { formData, setFormData, createCompany } = useCompanyStore();
  const [logoPreview, setLogoPreview] = useState<string | null>(formData.logoUrl || null);
  const navigate = useNavigate();

  // 기본 입력값 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ [name]: value });
  };

  // 로고 업로드 핸들러
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const fileURL = URL.createObjectURL(file);
      setLogoPreview(fileURL);
      setFormData({ logoUrl: fileURL });
    }
  };

  // 폼 저장(회사 등록) 버튼 핸들러
  const handleSubmit = async () => {
    try {
      await createCompany();
      alert("Company created successfully!");

      // 폼 상태 초기화
      setFormData({
        name: "",
        ceo: "",
        website: "",
        email: "",
        logoUrl: "",
        description: "",
      });

      // "/mybusiness/companylist"로 이동
      navigate("/mybusiness/companylist");
    } catch (error) {
      alert("Error creating company. Please try again.");
    }
  };

  return (
    <div>
      <div className='grid grid-cols-2 gap-4'>
        {/* Company Name (전체 폭 사용) */}
        <div className='col-span-2'>
          <label className='block text-sm font-medium text-gray-700'>Company Name *</label>
          <input
            type='text'
            name='name'
            value={formData.name}
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

        {/* Company Logo Upload (전체 폭 사용) */}
        <div className='col-span-2'>
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
