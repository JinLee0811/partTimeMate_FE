import React, { useState, useEffect } from "react";
import useJobPostingStore from "../../store/jobPostingStore";
import { ApplicationMethod } from "../../types/jobPosting";
import { Company } from "../../types/company";
import { fetchCompaniesApi } from "../../api/companyApi";

const ApplicationMethodComponent: React.FC = () => {
  const { formData, updateFormData } = useJobPostingStore();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCompanies = async () => {
      try {
        setLoading(true);
        const response = await fetchCompaniesApi(1);
        setCompanies(response.companies);
      } catch (err) {
        setError("Failed to load companies");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadCompanies();
  }, []);

  const handleMethodToggle = (method: ApplicationMethod) => {
    const currentMethods = formData?.applicationMethods || [];
    const newMethods = currentMethods.includes(method)
      ? currentMethods.filter((m) => m !== method)
      : [...currentMethods, method];
    updateFormData({ applicationMethods: newMethods });
  };

  const handleCompanySelect = (company: Company) => {
    updateFormData({
      companyId: company.id,
      company: company,
      contactInfo: `${company.contactEmail}\n${company.contactPhone}`,
    });
  };

  const handleDeadlineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFormData({ deadline: e.target.value });
  };

  return (
    <div className='space-y-6'>
      {/* Company Selection */}
      <div className='space-y-4'>
        <label className='block text-sm font-medium text-gray-700'>Select Company</label>
        {loading ? (
          <p>Loading companies...</p>
        ) : error ? (
          <p className='text-red-500'>{error}</p>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {companies.map((company) => (
              <button
                key={company.id}
                onClick={() => handleCompanySelect(company)}
                className={`p-4 border rounded-lg text-left transition-all ${
                  formData?.companyId === company.id
                    ? "border-orange-500 bg-orange-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}>
                <div className='flex items-center space-x-3'>
                  {company.logoUrl && (
                    <img
                      src={company.logoUrl}
                      alt={company.name}
                      className='w-10 h-10 rounded-full object-cover'
                    />
                  )}
                  <div>
                    <h3 className='font-medium'>{company.name}</h3>
                    <p className='text-sm text-gray-600'>{company.ceoName}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Application Methods */}
      <div className='space-y-4'>
        <label className='block text-sm font-medium text-gray-700'>Application Methods</label>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {Object.values(ApplicationMethod).map((method) => (
            <button
              key={method}
              onClick={() => handleMethodToggle(method)}
              className={`p-4 border rounded-lg text-left transition-all ${
                formData?.applicationMethods?.includes(method)
                  ? "border-orange-500 bg-orange-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}>
              <div className='flex items-center justify-between'>
                <span>{method}</span>
                {formData?.applicationMethods?.includes(method) && (
                  <span className='text-orange-500'>✓</span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Contact Information */}
      {formData?.company && (
        <div className='space-y-4'>
          <label className='block text-sm font-medium text-gray-700'>Contact Information</label>
          <div className='p-4 bg-gray-50 rounded-lg'>
            <div className='space-y-2'>
              <div className='flex items-center space-x-2'>
                <span className='text-gray-600'>Email:</span>
                <span>{formData.company.contactEmail}</span>
              </div>
              <div className='flex items-center space-x-2'>
                <span className='text-gray-600'>Phone:</span>
                <span>{formData.company.contactPhone}</span>
              </div>
              {formData.company.website && (
                <div className='flex items-center space-x-2'>
                  <span className='text-gray-600'>Website:</span>
                  <a
                    href={formData.company.website}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-orange-500 hover:underline'>
                    {formData.company.website}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Application Deadline */}
      <div className='space-y-4'>
        <label className='block text-sm font-medium text-gray-700'>Application Deadline</label>
        <input
          type='date'
          value={formData?.deadline || ""}
          onChange={handleDeadlineChange}
          className='w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500'
          min={new Date().toISOString().split("T")[0]}
        />
      </div>
    </div>
  );
};

export default ApplicationMethodComponent;
