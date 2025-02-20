import { useState } from "react";
import StepProgress from "../../components/JobPosting/StepProgress";
import BasicInfo from "../../components/JobPosting/BasicInfo";
import WorkConditions from "../../components/JobPosting/WorkConditions";
import WorkLocation from "../../components/JobPosting/WorkLocation";
import JobDescription from "../../components/JobPosting/JobDescription";
import ApplicationMethod from "../../components/JobPosting/ApplicationMethod";
import PreviewModal from "./PreviewModal";
import { useJobPostingStore } from "../../store/jobPostingStore";

const steps = [
  "Basic Infomation",
  "Work Conditions",
  "Work Location",
  "Job Description",
  "Application",
];

export default function JobPosting() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(false);

  const { formData } = useJobPostingStore();

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  // ✅ 새로 추가된 함수: 스텝 아이콘 클릭 시 해당 단계로 이동
  const handleStepClick = (stepIndex: number) => {
    setCurrentStep(stepIndex);
  };

  // 모달 열기/닫기
  const openPreviewModal = () => setIsPreviewOpen(true);
  const closePreviewModal = () => setIsPreviewOpen(false);

  return (
    <div className='max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6'>
      <h2 className='text-2xl font-bold mb-6 text-gray-900'>Job Posting</h2>

      {/* 진행 바 (Step Progress) */}
      <StepProgress
        steps={steps}
        currentStep={currentStep}
        onStepClick={handleStepClick} // 추가
      />

      <div className='mt-6'>
        {currentStep === 0 && <BasicInfo />}
        {currentStep === 1 && <WorkConditions />}
        {currentStep === 2 && <WorkLocation />}
        {currentStep === 3 && <JobDescription />}
        {currentStep === 4 && <ApplicationMethod />}
      </div>

      {/* 하단 네비게이션 버튼 */}
      <div className='flex justify-between items-center mt-6'>
        {currentStep > 0 && (
          <button
            onClick={handleBack}
            className='bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400'>
            Back
          </button>
        )}
        {currentStep < steps.length - 1 ? (
          <button
            onClick={handleNext}
            className='bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 ml-auto'>
            Next Step
          </button>
        ) : (
          <div className='flex items-center space-x-3'>
            <button
              onClick={openPreviewModal}
              className='bg-yellow-300 text-black px-4 py-2 rounded-md hover:bg-yellow-300 ml-auto'>
              Preview
            </button>
            <button className='bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 ml-auto'>
              Submit Job Posting
            </button>
          </div>
        )}
      </div>

      {/* 미리보기 모달 */}
      <PreviewModal isOpen={isPreviewOpen} onClose={closePreviewModal} formData={formData} />
    </div>
  );
}
