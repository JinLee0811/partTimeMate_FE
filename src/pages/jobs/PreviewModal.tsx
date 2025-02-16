// PreviewModal.tsx
import React from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { JobPostingData } from "../../types/jobPosting";

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: JobPostingData;
}

export default function PreviewModal({ isOpen, onClose, formData }: PreviewModalProps) {
  // 회사 로고 표시 (File 타입이라고 가정)
  const companyLogoUrl = formData.companyLogo ? URL.createObjectURL(formData.companyLogo) : null;

  // 시급 표시
  const salaryText = formData.salaryNegotiable
    ? "면접 후 협의"
    : formData.salary
      ? `시급 ${formData.salary}원`
      : "시급 협의";

  // 근무 기간 (예: "6개월 ~ 1년" 형태로 가정)
  const periodStart = formData.workPeriod.startDate
    ? new Date(formData.workPeriod.startDate).toLocaleDateString()
    : "";
  const periodEnd = formData.workPeriod.endDate
    ? new Date(formData.workPeriod.endDate).toLocaleDateString()
    : "";
  const periodText = periodStart && periodEnd ? `${periodStart} ~ ${periodEnd}` : "기간 협의";

  // 근무 요일
  const daysText = formData.workDays.length > 0 ? formData.workDays.join(", ") : "요일 협의";

  // 근무 시간
  const timeStart = formData.workHours.start
    ? new Date(formData.workHours.start).toLocaleTimeString()
    : "";
  const timeEnd = formData.workHours.end
    ? new Date(formData.workHours.end).toLocaleTimeString()
    : "";
  const hoursText = timeStart && timeEnd ? `${timeStart} ~ ${timeEnd}` : "시간 협의";

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className='fixed inset-0 z-50 flex items-center justify-center'>
      {/* 반투명 배경 */}
      <div className='fixed inset-0 bg-black opacity-30' aria-hidden='true' />

      {/* 모달 컨테이너 */}
      <DialogPanel className='mx-auto max-w-3xl w-full max-h-[90vh] overflow-y-auto rounded-lg bg-white p-6 z-10'>
        <DialogTitle className='text-2xl font-bold mb-4 border-b pb-2'>
          Preview Job Posting
        </DialogTitle>

        {/* 상단 헤더 영역: 회사명, 타이틀, 로고 */}
        <div className='flex items-start justify-between mb-6'>
          <div>
            {/* 회사명 */}
            <h3 className='text-xl font-bold text-gray-800'>
              {formData.companyName || "회사명 미입력"}
            </h3>
            {/* 잡 타이틀 */}
            <p className='text-base text-gray-600 mt-1'>{formData.title || "채용 공고 제목"}</p>
          </div>
          {/* 회사 로고 (선택) */}
          {companyLogoUrl && (
            <img
              src={companyLogoUrl}
              alt='Company Logo'
              className='w-16 h-16 object-cover rounded-md border'
            />
          )}
        </div>

        {/* 시급/근무기간/근무요일/근무시간 간단 표기 */}
        <div className='flex flex-wrap gap-4 mb-6'>
          {/* 시급 */}
          <div className='flex items-center space-x-2'>
            <div className='font-semibold text-gray-700'>시급</div>
            <div className='text-gray-900'>{salaryText}</div>
          </div>
          {/* 근무 기간 */}
          <div className='flex items-center space-x-2'>
            <div className='font-semibold text-gray-700'>기간</div>
            <div className='text-gray-900'>{periodText}</div>
          </div>
          {/* 근무 요일 */}
          <div className='flex items-center space-x-2'>
            <div className='font-semibold text-gray-700'>요일</div>
            <div className='text-gray-900'>{daysText}</div>
          </div>
          {/* 근무 시간 */}
          <div className='flex items-center space-x-2'>
            <div className='font-semibold text-gray-700'>시간</div>
            <div className='text-gray-900'>{hoursText}</div>
          </div>
        </div>

        {/* 구분선 */}
        <hr className='mb-6' />

        {/* 세부 정보 */}
        <div className='space-y-4'>
          {/* Job Category */}
          <div>
            <p className='font-semibold text-gray-700'>Job Category</p>
            <p>{formData.jobCategory || "미입력"}</p>
          </div>
          {/* Employment Type */}
          <div>
            <p className='font-semibold text-gray-700'>Employment Type</p>
            <p>{formData.employmentType || "미입력"}</p>
          </div>
          {/* Benefits */}
          <div>
            <p className='font-semibold text-gray-700'>Benefits</p>
            <p>{formData.benefits.length > 0 ? formData.benefits.join(", ") : "미입력"}</p>
          </div>
          {/* Additional Address / Work Address */}
          <div>
            <p className='font-semibold text-gray-700'>Additional Address</p>
            <p>{formData.addressDetail || "미입력"}</p>
          </div>
          <div>
            <p className='font-semibold text-gray-700'>Work Address</p>
            <p>{formData.workAddress || "미입력"}</p>
          </div>
          {/* Description */}
          <div>
            <p className='font-semibold text-gray-700'>Description</p>
            <p>{formData.description || "미입력"}</p>
          </div>
          {/* Contact Info */}
          <div>
            <p className='font-semibold text-gray-700'>Contact Name</p>
            <p>{formData.contactName || "미입력"}</p>
          </div>
          <div>
            <p className='font-semibold text-gray-700'>Contact Phone</p>
            <p>{formData.contactPhone || "미입력"}</p>
          </div>
          <div>
            <p className='font-semibold text-gray-700'>Contact Email</p>
            <p>{formData.contactEmail || "미입력"}</p>
          </div>
          <div>
            <p className='font-semibold text-gray-700'>Application Method</p>
            <p>{formData.applicationMethod || "미입력"}</p>
          </div>
        </div>

        <div className='mt-8 flex justify-end'>
          <button
            onClick={onClose}
            className='bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500'>
            Close
          </button>
        </div>
      </DialogPanel>
    </Dialog>
  );
}
