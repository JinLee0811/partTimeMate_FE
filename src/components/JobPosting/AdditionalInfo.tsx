import React from "react";
import useJobPostingStore from "../../store/jobPostingStore";

const labelClass = "block text-sm font-bold text-orange-600 mb-1";

const employmentTypeOptions = ["Part-time", "Casual", "Contract", "Temporary", "Seasonal"];

const preferredLanguageOptions = [
  "Korean Friendly",
  "Chinese Friendly",
  "Japanese Friendly",
  "Vietnamese Friendly",
  "Thai Friendly",
  "Nepalese Friendly",
  "Indian Friendly",
  "Filipino Friendly",
  "English Only",
];

const additionalOptionsOptions = [
  "Weekend Shifts",
  "Night Shifts",
  "Flexible Hours",
  "No Experience Required",
  "Training Provided",
  "RSA Required",
  "Meals Provided",
  "Transport Allowance",
  "Uniform Provided",
  "Immediate Start",
  "Student Friendly",
  "Working Holiday Friendly",
  "Other",
];

const buttonClass = (selected: boolean) =>
  `px-4 py-2 rounded-full border transition text-sm font-medium ${
    selected
      ? "bg-orange-100 border-orange-500 text-orange-700"
      : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
  }`;

const AdditionalInfo: React.FC = () => {
  const { formData, updateFormData } = useJobPostingStore();

  // 버튼 토글 핸들러
  const handleToggle = (
    key: "employmentTypes" | "preferredLanguages" | "additionalOptions",
    value: string
  ) => {
    const selected = formData?.[key] || [];
    updateFormData({
      [key]: selected.includes(value)
        ? selected.filter((v: string) => v !== value)
        : [...selected, value],
    });
  };

  return (
    <div className='space-y-6'>
      {/* Employment Type */}
      <div>
        <label className={labelClass}>Employment Type</label>
        <div className='flex flex-wrap gap-2'>
          {employmentTypeOptions.map((type) => (
            <button
              key={type}
              type='button'
              onClick={() => handleToggle("employmentTypes", type)}
              className={buttonClass(!!formData?.employmentTypes?.includes(type))}>
              {type}
            </button>
          ))}
        </div>
      </div>
      {/* Preferred Language */}
      <div>
        <label className={labelClass}>Preferred Language</label>
        <div className='flex flex-wrap gap-2'>
          {preferredLanguageOptions.map((lang) => (
            <button
              key={lang}
              type='button'
              onClick={() => handleToggle("preferredLanguages", lang)}
              className={buttonClass(!!formData?.preferredLanguages?.includes(lang))}>
              {lang}
            </button>
          ))}
        </div>
      </div>
      {/* Additional Options */}
      <div>
        <label className={labelClass}>Additional Options</label>
        <div className='flex flex-wrap gap-2'>
          {additionalOptionsOptions.map((opt) => (
            <button
              key={opt}
              type='button'
              onClick={() => handleToggle("additionalOptions", opt)}
              className={buttonClass(!!formData?.additionalOptions?.includes(opt))}>
              {opt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdditionalInfo;
