import React, { useState } from "react";
import StepProgress from "../../components/JobPosting/StepProgress";
import BasicInfo from "../../components/JobPosting/BasicInfo";
import JobDescription from "../../components/JobPosting/JobDescription";
import ApplicationMethod from "../../components/JobPosting/ApplicationMethod";
import PreviewModal from "./PreviewModal";
import useJobPostingStore from "../../store/jobPostingStore";
import { JobPostingData } from "../../types/jobPosting";
import AdditionalInfo from "../../components/JobPosting/AdditionalInfo";

export default function JobPosting() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPreview, setShowPreview] = useState(false);
  const { formData, resetFormData } = useJobPostingStore();

  const steps = [
    { number: 1, title: "Basic Info" },
    { number: 2, title: "Description" },
    { number: 3, title: "Additional Info" },
    { number: 4, title: "Application" },
  ];

  const isLastStep = currentStep === steps.length;

  const validateBasicInfo = (data: JobPostingData | null): boolean => {
    if (!data) return false;
    return !!(
      data.title &&
      data.subcategoryId &&
      data.address &&
      typeof data.latitude === "number" &&
      typeof data.longitude === "number" &&
      (data.isHourlyRateNegotiable || (data.hourlyRate && data.hourlyRate.trim() !== "")) &&
      data.workPeriods &&
      data.workPeriods.length > 0 &&
      data.workDays &&
      data.workDays.length > 0 &&
      data.workHours &&
      data.workHours.length > 0
    );
  };

  const validateDescription = (data: JobPostingData | null): boolean => {
    if (!data) return false;
    return !!data.description;
  };

  const validateAdditionalInfo = (data: JobPostingData | null): boolean => {
    if (!data) return false;
    return !!(
      (data.employmentTypes && data.employmentTypes.length > 0) ||
      (data.preferredLanguages && data.preferredLanguages.length > 0) ||
      (data.additionalOptions && data.additionalOptions.length > 0)
    );
  };

  const validateApplicationMethod = (data: JobPostingData | null): boolean => {
    if (!data) return false;
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
        return validateAdditionalInfo(formData);
      case 4:
        return validateApplicationMethod(formData);
      default:
        return false;
    }
  };

  // 모든 스텝이 유효한지 체크하는 함수
  const allStepsValid = () => {
    if (!formData) return false;
    return (
      validateBasicInfo(formData) &&
      validateDescription(formData) &&
      validateAdditionalInfo(formData) &&
      validateApplicationMethod(formData)
    );
  };

  const handleStepClick = (stepNumber: number) => {
    // 모든 항목이 다 채워졌으면 자유롭게 이동
    if (allStepsValid()) {
      setCurrentStep(stepNumber);
      return;
    }
    // 아니면 기존처럼 이전 단계까지 유효해야 이동
    if (stepNumber <= currentStep) {
      setCurrentStep(stepNumber);
      return;
    }
    // 앞으로 이동 시, 이전 단계들만 유효하면 이동
    for (let i = 1; i < stepNumber; i++) {
      switch (i) {
        case 1:
          if (!validateBasicInfo(formData)) return;
          break;
        case 2:
          if (!validateDescription(formData)) return;
          break;
        case 3:
          if (!validateAdditionalInfo(formData)) return;
          break;
        case 4:
          if (!validateApplicationMethod(formData)) return;
          break;
        default:
          break;
      }
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
    <div className='max-w-6xl mx-auto px-4 py-8'>
      <h1 className='text-2xl font-bold mb-8 text-gray-800'>Post a Job</h1>

      <div className='flex flex-col md:flex-row gap-8'>
        {/* Sidebar with Progress */}
        <div className='md:w-1/4 lg:w-1/5'>
          <div className='bg-white rounded-xl shadow-md border border-gray-200 p-6 sticky top-8'>
            <StepProgress steps={steps} currentStep={currentStep} onStepClick={handleStepClick} />
          </div>
        </div>

        {/* Main Content */}
        <div className='md:w-3/4 lg:w-4/5'>
          {/* Step Content */}
          <div className='bg-white rounded-xl shadow-md border border-gray-200 p-8 mb-8'>
            {currentStep === 1 && <BasicInfo />}
            {currentStep === 2 && <JobDescription />}
            {currentStep === 3 && <AdditionalInfo />}
            {currentStep === 4 && <ApplicationMethod />}
          </div>

          {/* Navigation Buttons */}
          <div className='flex justify-between items-center'>
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              className={`px-5 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 ${
                currentStep === 1
                  ? "text-gray-400 bg-gray-100 cursor-not-allowed"
                  : "text-gray-600 bg-white border border-gray-300 hover:bg-gray-50 shadow-sm"
              }`}>
              Previous
            </button>

            <div className='flex items-center gap-4'>
              {isLastStep && (
                <button
                  onClick={() => setShowPreview(true)}
                  className='px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 shadow-sm transition-colors duration-200'>
                  Preview
                </button>
              )}

              {isLastStep ? (
                <button
                  onClick={handleSubmit}
                  disabled={!canProceedToNextStep()}
                  className='px-5 py-2.5 text-sm font-medium text-white bg-orange-600 rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-md transition-colors duration-200'>
                  Submit
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  disabled={!canProceedToNextStep()}
                  className='px-5 py-2.5 text-sm font-medium text-white bg-orange-600 rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-md transition-colors duration-200'>
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <PreviewModal isOpen={showPreview} onClose={() => setShowPreview(false)} data={formData} />
      )}
    </div>
  );
}
