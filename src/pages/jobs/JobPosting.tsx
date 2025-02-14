import { useState } from "react";
import { Tab } from "@headlessui/react";
import InputField from "../../components/InputField";
import WorkConditions from "../../components/JobPosting/WorkConditions";
import WorkLocation from "../../components/JobPosting/WorkLocation";
import JobDescription from "../../components/JobPosting/JobDescription";
import ApplicationMethod from "../../components/JobPosting/ApplicationMethod";

const sections = [
  "Basic Info",
  "Work Conditions",
  "Work Location",
  "Job Description",
  "Application",
];

export default function JobPosting() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [formData, setFormData] = useState({
    title: "",
    companyName: "",
    companyLogo: null as File | null, // ✅ 회사 로고 추가
    salary: "",
    salaryType: "hourly", // 시급/일급/주급/월급 선택 가능
    workPeriod: "", // 기간 or 상시모집
    workHours: "",
    workDays: [],
    employmentType: "Part-time",
    benefits: "",
    workAddress: "",
    locationCoords: "",
    description: "",
    contactName: "",
    contactPhone: "",
  });

  // ✅ 입력값 핸들링
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ 이미지 파일 업로드 핸들링
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData((prev) => ({ ...prev, companyLogo: e.target.files![0] }));
    }
  };

  const handleNext = () => {
    if (selectedTab < sections.length - 1) {
      setSelectedTab((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (selectedTab > 0) {
      setSelectedTab((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    console.log("Submitting Job Post:", formData);
    alert("Job posting submitted successfully!");
  };

  return (
    <div className='max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6'>
      <h2 className='text-2xl font-bold mb-4 text-gray-800'>Job Posting</h2>

      <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
        <Tab.List className='flex space-x-2 border-b mb-4 overflow-x-auto'>
          {sections.map((section, index) => (
            <Tab
              key={index}
              className={({ selected }) =>
                `px-4 py-2 font-semibold border-b-2 whitespace-nowrap ${
                  selected ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500"
                }`
              }>
              {section}
            </Tab>
          ))}
        </Tab.List>

        <Tab.Panels>
          {/* 🔹 기본 정보 */}
          <Tab.Panel>
            <InputField
              label='Job Title *'
              name='title'
              value={formData.title}
              onChange={handleChange}
            />
            <InputField
              label='Company Name *'
              name='companyName'
              value={formData.companyName}
              onChange={handleChange}
            />

            {/* ✅ 회사 로고 업로드 */}
            <div className='mt-4'>
              <label className='block text-sm font-medium text-gray-700'>
                Company Logo (Optional)
              </label>
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
          </Tab.Panel>

          {/* 🔹 근무 조건 */}
          <Tab.Panel>
            <WorkConditions formData={formData} handleChange={handleChange} />
          </Tab.Panel>

          {/* 🔹 근무 지역 */}
          <Tab.Panel>
            <WorkLocation formData={formData} handleChange={handleChange} />
          </Tab.Panel>

          {/* 🔹 상세 설명 */}
          <Tab.Panel>
            <JobDescription formData={formData} handleChange={handleChange} />
          </Tab.Panel>

          {/* 🔹 지원 방법 */}
          <Tab.Panel>
            <ApplicationMethod formData={formData} handleChange={handleChange} />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>

      {/* 🔹 버튼 네비게이션 */}
      <div className='flex justify-between mt-6'>
        {selectedTab > 0 && (
          <button
            onClick={handleBack}
            className='bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500'>
            Back
          </button>
        )}
        {selectedTab < sections.length - 1 ? (
          <button
            onClick={handleNext}
            className='bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 ml-auto'>
            Continue
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className='bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 ml-auto'>
            Submit Job Posting
          </button>
        )}
      </div>
    </div>
  );
}
