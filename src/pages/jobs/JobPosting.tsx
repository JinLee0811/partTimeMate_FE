import { useState } from "react";
import { TabGroup, TabList, Tab, TabPanels, TabPanel, Dialog } from "@headlessui/react";
import { useJobPostingStore } from "../../store/jobPostingStore";
import BasicInfo from "../../components/JobPosting/BasicInfo";
import WorkConditions from "../../components/JobPosting/WorkConditions";
import WorkLocation from "../../components/JobPosting/WorkLocation";
import JobDescription from "../../components/JobPosting/JobDescription";
import ApplicationMethod from "../../components/JobPosting/ApplicationMethod";
import PreviewModal from "./PreviewModal";

const sections = [
  "Basic Info",
  "Work Conditions",
  "Work Location",
  "Job Description",
  "Application",
];

export default function JobPosting() {
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(false);

  const { formData, setFormData } = useJobPostingStore();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ [name]: value });
  };

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
  };

  // 모달 열기/닫기
  const openPreviewModal = () => setIsPreviewOpen(true);
  const closePreviewModal = () => setIsPreviewOpen(false);

  return (
    <div className='max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6'>
      <h2 className='text-2xl font-bold mb-4 text-gray-800'>Job Posting</h2>

      <TabGroup selectedIndex={selectedTab} onChange={setSelectedTab}>
        <TabList className='flex space-x-2 border-b mb-4 overflow-x-auto'>
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
        </TabList>

        <TabPanels>
          <TabPanel>
            <BasicInfo />
          </TabPanel>
          <TabPanel>
            <WorkConditions />
          </TabPanel>
          <TabPanel>
            <WorkLocation />
          </TabPanel>
          <TabPanel>
            <JobDescription />
          </TabPanel>
          <TabPanel>
            <ApplicationMethod />
          </TabPanel>
        </TabPanels>
      </TabGroup>

      {/* 버튼 네비게이션 */}
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
              onClick={openPreviewModal}
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

      {/* Preview Modal (별도 컴포넌트) */}
      <PreviewModal isOpen={isPreviewOpen} onClose={closePreviewModal} formData={formData} />
    </div>
  );
}
