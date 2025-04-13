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
      <div className='absolute left-5 top-0 h-full w-0.5 bg-gray-200'>
        <div
          className='absolute w-full bg-orange-500 transition-all duration-300'
          style={{
            height: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
          }}
        />
      </div>

      {/* Steps */}
      <div className='relative flex flex-col space-y-8'>
        {steps.map((step) => (
          <button
            key={step.number}
            onClick={() => onStepClick(step.number)}
            className='flex items-center'
            disabled={step.number > currentStep}>
            {/* Step Circle */}
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors duration-300 ${
                step.number === currentStep
                  ? "border-orange-600 bg-orange-600 text-white"
                  : step.number < currentStep
                    ? "border-orange-600 bg-white text-orange-600"
                    : "border-gray-300 bg-white text-gray-300"
              }`}>
              {step.number}
            </div>

            {/* Step Title */}
            <span
              className={`ml-4 text-sm font-medium ${
                step.number === currentStep
                  ? "text-orange-600"
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
