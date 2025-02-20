import React from "react";

interface StepProgressProps {
  steps: string[];
  currentStep: number;
  onStepClick?: (stepIndex: number) => void; // 클릭 핸들러 (선택적)
}

const StepProgress: React.FC<StepProgressProps> = ({ steps, currentStep, onStepClick }) => {
  return (
    <div className='flex items-center justify-between w-full relative'>
      {steps.map((step, index) => {
        // 이미 완료했거나 현재 진행중인 단계라면 클릭 가능
        const isClickable = index <= currentStep;

        return (
          <div
            key={index}
            className='relative flex flex-col items-center flex-1'
            // isClickable이면 onClick 설정
            onClick={() => {
              if (isClickable && onStepClick) {
                onStepClick(index);
              }
            }}
            // 클릭 가능/불가능 시 마우스 포인터 스타일 달리하기
            style={{ cursor: isClickable ? "pointer" : "default" }}>
            {/* 진행 바 (왼쪽에서 오른쪽으로) */}
            {index > 0 && (
              <div
                className={`absolute top-1/4 right-20 w-full h-[3px] -translate-y-1/2 ${
                  index <= currentStep ? "bg-blue-600" : "bg-gray-300"
                }`}></div>
            )}

            {/* 단계 아이콘 */}
            <div
              className={`relative z-10 w-8 h-8 flex items-center justify-center rounded-full text-white font-bold ${
                index <= currentStep ? "bg-blue-600" : "bg-gray-300"
              }`}>
              {index + 1}
            </div>

            {/* 단계 텍스트 */}
            <span
              className={`mt-2 text-sm ${
                index <= currentStep ? "text-blue-600 font-medium" : "text-gray-400"
              }`}>
              {step}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default StepProgress;
