import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCompanyStore } from "../../store/useCompanyStore";
import { FaBuilding, FaUser, FaGlobe, FaEnvelope, FaImage } from "react-icons/fa";

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
    <div className='max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-sm'>
      <div className='space-y-6'>
        {/* Company Name */}
        <div className='relative'>
          <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
            <FaBuilding className='h-5 w-5 text-orange-500' />
          </div>
          <input
            type='text'
            name='name'
            value={formData.name}
            onChange={handleChange}
            placeholder='Enter company name'
            required
            className='block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200'
          />
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {/* CEO Name */}
          <div className='relative'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <FaUser className='h-5 w-5 text-orange-500' />
            </div>
            <input
              type='text'
              name='ceo'
              value={formData.ceo}
              onChange={handleChange}
              placeholder="Enter CEO's name"
              className='block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200'
            />
          </div>

          {/* Website */}
          <div className='relative'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <FaGlobe className='h-5 w-5 text-orange-500' />
            </div>
            <input
              type='url'
              name='website'
              value={formData.website}
              onChange={handleChange}
              placeholder='https://yourcompany.com'
              className='block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200'
            />
          </div>

          {/* Company Email */}
          <div className='relative'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <FaEnvelope className='h-5 w-5 text-orange-500' />
            </div>
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              placeholder='Enter contact email'
              required
              className='block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200'
            />
          </div>

          {/* Company Logo Upload */}
          <div className='relative col-span-full'>
            <div className='flex items-center space-x-4'>
              <div className='flex-shrink-0'>
                {logoPreview ? (
                  <img
                    src={logoPreview}
                    alt='Company Logo Preview'
                    className='w-24 h-24 object-cover rounded-xl border border-gray-200'
                  />
                ) : (
                  <div className='w-24 h-24 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-center'>
                    <FaImage className='h-8 w-8 text-gray-300' />
                  </div>
                )}
              </div>
              <div className='flex-grow'>
                <label className='block text-sm font-medium text-gray-700 mb-2'>Company Logo</label>
                <input
                  type='file'
                  accept='image/*'
                  onChange={handleFileChange}
                  className='block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-600 hover:file:bg-orange-100 transition-all duration-200'
                />
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className='flex justify-end pt-6'>
          <button
            className='px-6 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 focus:ring-4 focus:ring-orange-200 transition-all duration-200 font-medium'
            onClick={handleSubmit}>
            Save Company Settings
          </button>
        </div>
      </div>
    </div>
  );
}
