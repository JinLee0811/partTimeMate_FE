import React, { useState } from "react";
import StepProgress from "../../components/JobPosting/StepProgress";
import BasicInfo from "../../components/JobPosting/BasicInfo";
import JobDescription from "../../components/JobPosting/JobDescription";
import ApplicationMethod from "../../components/JobPosting/ApplicationMethod";
import PreviewModal from "./PreviewModal";
import { useJobPostingStore } from "../../store/jobPostingStore";

export default function JobPosting() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPreview, setShowPreview] = useState(false);
  const { formData } = useJobPostingStore();

  const steps = [
    { number: 1, title: "Basic Info" },
    { number: 2, title: "Description" },
    { number: 3, title: "Application" },
  ];

  const handleStepClick = (stepNumber: number) => {
    setCurrentStep(stepNumber);
  };

  const openPreviewModal = () => {
    setShowPreview(true);
  };

  const closePreviewModal = () => {
    setShowPreview(false);
  };

  return (
    <div className='max-w-4xl mx-auto px-4 py-8'>
      <h1 className='text-2xl font-bold mb-8'>Post a Job</h1>

      {/* Progress Bar */}
      <div className='mb-12'>
        <StepProgress steps={steps} currentStep={currentStep} onStepClick={handleStepClick} />
      </div>

      {/* Step Content */}
      <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8'>
        {currentStep === 1 && <BasicInfo />}
        {currentStep === 2 && <JobDescription />}
        {currentStep === 3 && <ApplicationMethod />}
      </div>

      {/* Navigation Buttons */}
      <div className='flex justify-between items-center'>
        <button
          onClick={() => setCurrentStep(currentStep - 1)}
          disabled={currentStep === 1}
          className={`px-6 py-2 rounded-lg ${
            currentStep === 1
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}>
          Back
        </button>
        <div className='flex gap-4'>
          <button
            onClick={openPreviewModal}
            className='px-6 py-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200'>
            Preview
          </button>
          {currentStep < 3 ? (
            <button
              onClick={() => setCurrentStep(currentStep + 1)}
              className='px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700'>
              Next
            </button>
          ) : (
            <button
              onClick={openPreviewModal}
              className='px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700'>
              Submit
            </button>
          )}
        </div>
      </div>

      {/* Preview Modal */}
      <PreviewModal
        isOpen={showPreview}
        onClose={closePreviewModal}
        formData={null} // 초기에는 null을 전달하여 샘플 데이터를 보여줍니다
      />
    </div>
  );
}
