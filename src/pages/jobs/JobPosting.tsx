import { useState } from "react";
import { Tab } from "@headlessui/react";
import WorkConditions from "../../components/JobPosting/WorkConditions";
import WorkLocation from "../../components/JobPosting/WorkLocation";
import JobDescription from "../../components/JobPosting/JobDescription";
import ApplicationMethod from "../../components/JobPosting/ApplicationMethod";
import BasicInfo from "../../components/JobPosting/BasicInfo";
import { useJobPostingStore } from "../../store/jobPostingStore";

const sections = [
  "Basic Info",
  "Work Conditions",
  "Work Location",
  "Job Description",
  "Application",
];

const workDayOptions = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
  "To be discussed",
];

const employmentTypes = [
  "Part-time",
  "Contract",
  "Temporary",
  "Casual",
  "To be discussed after interview",
];

const applicationMethods = [
  "Email",
  "Mobile",
  "Direct Visit",
  "Text then Visit",
  "Phone Call then Visit",
];

export default function JobPosting() {
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [benefitsList, setBenefitsList] = useState<string[]>([
    "Flexible Hours",
    "Paid Leave",
    "Meal Allowance",
    "Bonus",
    "Insurance",
  ]);

  // 전역 상태 사용: formData와 setFormData를 store에서 가져옴
  const { formData, setFormData } = useJobPostingStore();

  // ✅ 입력값 핸들링 (input, textarea, select)
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ [name]: value });
  };

  // ✅ 이미지 파일 업로드 핸들링
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData({ companyLogo: e.target.files[0] });
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
    // 서버 전송 로직 구현 가능 (예: API 호출)
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
            <BasicInfo
              formData={formData}
              handleChange={handleChange}
              handleFileChange={handleFileChange}
            />
          </Tab.Panel>

          {/* 🔹 근무 조건 */}
          <Tab.Panel>
            <WorkConditions
              formData={formData}
              setFormData={setFormData}
              handleChange={handleChange}
              benefitsList={benefitsList}
              setBenefitsList={setBenefitsList}
              employmentTypes={employmentTypes}
              workDayOptions={workDayOptions}
            />
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
            <ApplicationMethod
              formData={formData}
              handleChange={handleChange}
              applicationMethods={applicationMethods}
            />
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
          <div className='flex items-center space-x-3'>
            <button
              onClick={handleSubmit}
              className='bg-yellow-300 text-black px-4 py-2 rounded-md hover:bg-yellow-300 ml-auto'>
              Preview
            </button>
            <button
              onClick={handleSubmit}
              className='bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 ml-auto'>
              Submit Job Posting
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
