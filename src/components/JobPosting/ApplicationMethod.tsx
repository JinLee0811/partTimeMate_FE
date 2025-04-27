import React, { useState, useEffect } from "react";
import useJobPostingStore from "../../store/jobPostingStore";
import { ApplicationMethod } from "../../types/jobPosting";
import { Company } from "../../types/company";
import { fetchCompaniesApi } from "../../api/companyApi";
import Select from "react-select";

const inputClass =
  "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white text-gray-900 placeholder-gray-400 transition";
const labelClass = "block text-sm font-bold text-orange-600 mb-1";
const selectStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    minHeight: "44px",
    borderRadius: "0.5rem",
    borderColor: state.isFocused ? "#ff7f32" : "#e5e7eb",
    boxShadow: state.isFocused ? "0 0 0 2px #ffb380" : "none",
    fontSize: "1rem",
    fontWeight: 400,
    backgroundColor: "#fff",
    "&:hover": { borderColor: "#ff7f32" },
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#ffb380" : state.isFocused ? "#fff7ed" : "#fff",
    color: state.isSelected ? "#fff" : "#333",
    fontWeight: state.isSelected ? 600 : 400,
    fontSize: "1rem",
    ":active": { backgroundColor: "#ff7f32", color: "#fff" },
  }),
  menu: (provided: any) => ({
    ...provided,
    borderRadius: "0.75rem",
    boxShadow: "0 4px 24px 0 rgba(0,0,0,0.08)",
    zIndex: 20,
  }),
};

const applicationMethodOptions = Object.values(ApplicationMethod).map((v) => ({
  value: v,
  label: v,
}));

// 버튼 스타일
const methodButtonClass = (selected: boolean) =>
  `px-4 py-2 rounded-full border transition text-sm font-medium ${
    selected
      ? "bg-orange-100 border-orange-500 text-orange-700"
      : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
  }`;

// 회사 카드 스타일
const companyCardClass = (selected: boolean) =>
  `p-4 border rounded-xl shadow-sm transition-all text-left flex items-center space-x-3 cursor-pointer bg-white hover:shadow-md hover:border-orange-300 ${
    selected ? "border-orange-500 ring-2 ring-orange-200 bg-orange-50" : "border-gray-200"
  }`;

const ApplicationMethodComponent: React.FC = () => {
  const { formData, updateFormData } = useJobPostingStore();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [manualInput, setManualInput] = useState(false);
  const [inputError, setInputError] = useState("");

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

  const handleCompanySelect = (company: Company) => {
    setManualInput(false);
    updateFormData({
      companyId: company.id,
      contact: company.ceoName,
      phone: company.contactPhone,
      email: company.contactEmail,
    });
  };

  const handleManualInput = () => {
    setManualInput(true);
    updateFormData({ companyId: undefined });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  // 어플리케이션 메서드 다중 선택 핸들러
  const handleMethodButton = (value: ApplicationMethod) => {
    const selected: ApplicationMethod[] = formData?.applicationMethods || [];
    updateFormData({
      applicationMethods: selected.includes(value)
        ? selected.filter((v) => v !== value)
        : [...selected, value],
    });
  };

  const handleDeadlineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 'YYYY-MM-DD' -> 'DD-MM-YYYY'
    const val = e.target.value;
    if (!val) return updateFormData({ deadline: "" });
    const [yyyy, mm, dd] = val.split("-");
    updateFormData({ deadline: `${dd}-${mm}-${yyyy}` });
  };

  // 직접입력 시 필수 입력값 체크
  const validateManualInput = () => {
    if (!formData?.contact || !formData?.phone || !formData?.email) {
      setInputError("Contact, Phone, Email 모두 입력해 주세요.");
      return false;
    }
    setInputError("");
    return true;
  };

  // 미리보기용
  const previewContact = manualInput
    ? {
        contact: formData?.contact,
        phone: formData?.phone,
        email: formData?.email,
      }
    : null;

  return (
    <div className='space-y-6'>
      {/* Company Selection */}
      <div className='space-y-4'>
        <label className={labelClass}>Select Company</label>
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
                className={companyCardClass(formData?.companyId === company.id)}>
                {company.logoUrl && (
                  <img
                    src={company.logoUrl}
                    alt={company.name}
                    className='w-12 h-12 rounded-full object-cover border border-gray-200 shadow-sm'
                  />
                )}
                <div>
                  <h3 className='font-semibold text-base'>{company.name}</h3>
                  <p className='text-sm text-gray-600'>{company.ceoName}</p>
                </div>
              </button>
            ))}
            <button onClick={handleManualInput} className={companyCardClass(manualInput)}>
              <div>
                <h3 className='font-semibold text-orange-600'>
                  No company registered? Enter manually
                </h3>
                <p className='text-sm text-gray-500'>Enter contact, phone, and email manually</p>
              </div>
            </button>
          </div>
        )}
      </div>

      {/* Company Info Preview */}
      {formData?.companyId && !manualInput && (
        <div className='space-y-2 p-4 bg-gray-50 rounded-lg'>
          <div className='text-gray-700 font-bold mb-1'>Company Information</div>
          {(() => {
            const company = companies.find((c) => c.id === formData.companyId);
            if (!company) return null;
            return (
              <>
                <div className='text-sm text-gray-700'>Name: {company.name}</div>
                <div className='text-sm text-gray-700'>CEO: {company.ceoName}</div>
                <div className='text-sm text-gray-700'>Email: {company.contactEmail}</div>
                <div className='text-sm text-gray-700'>Phone: {company.contactPhone}</div>
                {company.website && (
                  <div className='text-sm text-gray-700'>
                    Website:{" "}
                    <a
                      href={company.website}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-orange-500 hover:underline'>
                      {company.website}
                    </a>
                  </div>
                )}
              </>
            );
          })()}
        </div>
      )}

      {/* Manual Input Form */}
      {manualInput && (
        <div className='space-y-4'>
          <label className={labelClass}>Contact Name</label>
          <input
            name='contact'
            type='text'
            value={formData?.contact || ""}
            onChange={handleInputChange}
            className={inputClass}
            placeholder='Enter contact name'
            required
          />
          <label className={labelClass}>Phone</label>
          <input
            name='phone'
            type='text'
            value={formData?.phone || ""}
            onChange={handleInputChange}
            className={inputClass}
            placeholder='Enter phone number'
            required
          />
          <label className={labelClass}>Email</label>
          <input
            name='email'
            type='email'
            value={formData?.email || ""}
            onChange={handleInputChange}
            className={inputClass}
            placeholder='Enter email address'
            required
          />
          {inputError && <p className='text-red-500 text-sm'>{inputError}</p>}
        </div>
      )}

      {/* Application Method - 다중 선택형 */}
      <div className='space-y-4'>
        <label className={labelClass}>Application Method</label>
        <div className='flex flex-wrap gap-2'>
          {applicationMethodOptions.map((opt) => (
            <button
              key={opt.value}
              type='button'
              onClick={() => handleMethodButton(opt.value)}
              className={methodButtonClass(!!formData?.applicationMethods?.includes(opt.value))}>
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Manual Input Preview */}
      {manualInput && (
        <div className='space-y-2 p-4 bg-gray-50 rounded-lg'>
          <div className='text-gray-700 font-bold mb-1'>Contact Information Preview</div>
          <div className='text-sm text-gray-700'>Contact: {previewContact?.contact || "-"}</div>
          <div className='text-sm text-gray-700'>Phone: {previewContact?.phone || "-"}</div>
          <div className='text-sm text-gray-700'>Email: {previewContact?.email || "-"}</div>
        </div>
      )}

      {/* Deadline */}
      <div className='space-y-4'>
        <label className={labelClass}>Application Deadline</label>
        <input
          type='date'
          value={(() => {
            if (!formData?.deadline) return "";
            // 'DD-MM-YYYY' -> 'YYYY-MM-DD'
            const [dd, mm, yyyy] = formData.deadline.split("-");
            return `${yyyy}-${mm}-${dd}`;
          })()}
          onChange={handleDeadlineChange}
          className={inputClass}
          min={new Date().toISOString().split("T")[0]}
        />
      </div>
    </div>
  );
};

export default ApplicationMethodComponent;
