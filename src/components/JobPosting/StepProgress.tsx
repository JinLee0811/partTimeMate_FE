import React from "react";

interface Step {
  number: number;
  title: string;
}

interface StepProgressProps {
  steps: Step[];
  currentStep: number;
  onStepClick: (stepNumber: number) => void;
}

export default function StepProgress({ steps, currentStep, onStepClick }: StepProgressProps) {
  return (
    <div className='relative'>
      {/* Progress Line */}
      <div className='absolute top-5 left-0 w-full h-0.5 bg-gray-200'>
        <div
          className='absolute h-full bg-blue-600 transition-all duration-300'
          style={{
            width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
          }}
        />
      </div>

      {/* Steps */}
      <div className='relative flex justify-between'>
        {steps.map((step) => (
          <button
            key={step.number}
            onClick={() => onStepClick(step.number)}
            className='flex flex-col items-center'
            disabled={step.number > currentStep}>
            {/* Step Circle */}
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors duration-300 ${
                step.number === currentStep
                  ? "border-blue-600 bg-blue-600 text-white"
                  : step.number < currentStep
                    ? "border-blue-600 bg-white text-blue-600"
                    : "border-gray-300 bg-white text-gray-300"
              }`}>
              {step.number}
            </div>

            {/* Step Title */}
            <span
              className={`mt-2 text-sm font-medium ${
                step.number === currentStep
                  ? "text-blue-600"
                  : step.number < currentStep
                    ? "text-gray-600"
                    : "text-gray-400"
              }`}>
              {step.title}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
