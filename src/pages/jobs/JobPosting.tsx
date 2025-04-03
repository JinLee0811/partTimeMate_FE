import React, { useState } from "react";
import StepProgress from "../../components/JobPosting/StepProgress";
import BasicInfo from "../../components/JobPosting/BasicInfo";
import JobDescription from "../../components/JobPosting/JobDescription";
import ApplicationMethod from "../../components/JobPosting/ApplicationMethod";
import PreviewModal from "./PreviewModal";
import useJobPostingStore from "../../store/jobPostingStore";
import { JobPostingData } from "../../types/jobPosting";

export default function JobPosting() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPreview, setShowPreview] = useState(false);
  const { formData, resetFormData } = useJobPostingStore();

  const steps = [
    { number: 1, title: "Basic Info" },
    { number: 2, title: "Description" },
    { number: 3, title: "Application" },
  ];

  const isLastStep = currentStep === steps.length;

  const validateBasicInfo = (data: JobPostingData): boolean => {
    return !!(
      data.title &&
      data.categoryId &&
      data.locationCategory &&
      data.location &&
      (data.isHourlyRateNegotiable || data.hourly_rate > 0) &&
      (data.isDaysNegotiable || (data.workDays && data.workDays.length > 0))
    );
  };

  const validateDescription = (data: JobPostingData): boolean => {
    return !!data.description; // 내용이 있는지만 확인
  };

  const validateApplicationMethod = (data: JobPostingData): boolean => {
    return !!(data.applicationMethods && data.applicationMethods.length > 0 && data.contactInfo);
  };

  const canProceedToNextStep = (): boolean => {
    if (!formData) return false;

    switch (currentStep) {
      case 1:
        return validateBasicInfo(formData);
      case 2:
        return validateDescription(formData);
      case 3:
        return validateApplicationMethod(formData);
      default:
        return false;
    }
  };

  const handleStepClick = (stepNumber: number) => {
    // 이전 단계들이 모두 유효한 경우에만 해당 스텝으로 이동 가능
    for (let i = 1; i < stepNumber; i++) {
      if (!canProceedToNextStep()) return;
    }
    setCurrentStep(stepNumber);
  };

  const handleNext = () => {
    if (canProceedToNextStep() && currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (!formData) return;

    try {
      // TODO: API 호출 구현
      const response = await fetch("/api/job-postings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit job posting");
      }

      // 성공 시 임시 저장 데이터 삭제 후 리다이렉트
      resetFormData();
      window.location.href = "/jobs";
    } catch (error) {
      console.error("Error submitting job posting:", error);
      alert("Failed to submit job posting. Please try again.");
    }
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
          onClick={handleBack}
          disabled={currentStep === 1}
          className={`px-4 py-2 text-sm font-medium rounded-md ${
            currentStep === 1
              ? "text-gray-400 bg-gray-100 cursor-not-allowed"
              : "text-gray-600 bg-white border border-gray-300 hover:bg-gray-50"
          }`}>
          Previous
        </button>

        <div className='flex items-center gap-4'>
          {isLastStep && (
            <button
              onClick={() => setShowPreview(true)}
              className='px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50'>
              Preview
            </button>
          )}

          {isLastStep ? (
            <button
              onClick={handleSubmit}
              disabled={!canProceedToNextStep()}
              className='px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed'>
              Submit
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={!canProceedToNextStep()}
              className='px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed'>
              Next
            </button>
          )}
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <PreviewModal isOpen={showPreview} onClose={() => setShowPreview(false)} data={formData} />
      )}
    </div>
  );
}
