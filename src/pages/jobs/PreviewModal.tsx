import React from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { GoogleMap, MarkerF } from "@react-google-maps/api";
import { JobPostingData } from "../../types/jobPosting";

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: JobPostingData;
}

export default function PreviewModal({ isOpen, onClose, formData }: PreviewModalProps) {
  // companyLogo가 문자열(URL)로 저장되었다고 가정
  const companyLogoUrl = typeof formData.companyLogo === "string" ? formData.companyLogo : null;

  // 급여 표시
  const salaryText = formData.salaryNegotiable
    ? "Negotiable during interview"
    : formData.salary
      ? `$${formData.salary}`
      : "To be discussed";

  // 근무기간
  const periodStart = formData.workPeriod.startDate
    ? new Date(formData.workPeriod.startDate).toLocaleDateString()
    : "";
  const periodEnd = formData.workPeriod.endDate
    ? new Date(formData.workPeriod.endDate).toLocaleDateString()
    : "";
  const periodText =
    periodStart && periodEnd ? `${periodStart} ~ ${periodEnd}` : "Duration negotiable";

  // 근무요일
  const daysText =
    formData.workDays.length > 0 ? formData.workDays.join(", ") : "Days to be discussed";

  // 근무시간
  const timeStart = formData.workHours.start
    ? new Date(formData.workHours.start).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
    : "";
  const timeEnd = formData.workHours.end
    ? new Date(formData.workHours.end).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
    : "";
  const hoursText = timeStart && timeEnd ? `${timeStart} - ${timeEnd}` : "To be discussed";

  // locationCoords에서 lat, lng 파싱
  let latLng = null;
  if (formData.locationCoords) {
    const coords = formData.locationCoords.split(",");
    if (coords.length === 2) {
      const lat = parseFloat(coords[0]);
      const lng = parseFloat(coords[1]);
      if (!isNaN(lat) && !isNaN(lng)) {
        latLng = { lat, lng };
      }
    }
  }

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

        {/* 근무지 정보 */}
        <section className='mb-6'>
          <h3 className='text-lg font-bold mb-2'>Work Location</h3>
          <p className='text-sm text-gray-700'>
            {formData.workAddress
              ? `${formData.workAddress} ${formData.addressDetail || ""}`
              : "No address provided"}
          </p>
          {/* 지도 표시 (위치가 있을 때만) */}
          <div className='mt-3 w-full h-64 rounded-md overflow-hidden'>
            {latLng ? (
              <GoogleMap center={latLng} zoom={14} mapContainerClassName='w-full h-full border'>
                <MarkerF position={latLng} />
              </GoogleMap>
            ) : (
              <div className='flex items-center justify-center w-full h-full bg-gray-100 text-gray-500'>
                No map data
              </div>
            )}
          </div>
        </section>

        {/* Header Section: Company Name, Job Title, and Logo */}
        <div className='p-6 bg-white shadow-md rounded-lg mb-6'>
          <div className='flex items-start justify-between mb-6'>
            <div>
              <h3 className='text-xl font-bold text-gray-800'>
                {formData.companyName || "Company Name Not Provided"}
              </h3>
              <p className='text-base text-gray-600 mt-1'>
                {formData.title || "Job Title Not Specified"}
              </p>
            </div>
            {companyLogoUrl && (
              <img
                src={companyLogoUrl}
                alt='Company Logo'
                className='w-16 h-16 object-cover rounded-md border border-gray-300'
              />
            )}
          </div>

          {/* Job Info Summary Section */}
          <div className='grid grid-cols-2 sm:grid-cols-4 gap-4 text-gray-700'>
            {/* Hourly Wage */}
            <div className='flex flex-col items-start'>
              <span className='text-sm font-semibold'>Hourly Wage</span>
              <span className='text-gray-900'>{salaryText || "To Be Discussed"}</span>
            </div>

            {/* Work Duration */}
            <div className='flex flex-col items-start'>
              <span className='text-sm font-semibold'>Duration</span>
              <span className='text-gray-900'>{periodText || "Flexible"}</span>
            </div>

            {/* Work Days */}
            <div className='flex flex-col items-start'>
              <span className='text-sm font-semibold'>Work Days</span>
              <span className='text-gray-900'>{daysText || "To Be Discussed"}</span>
            </div>

            {/* Work Hours */}
            <div className='flex flex-col items-start'>
              <span className='text-sm font-semibold'>Work Hours</span>
              <span className='text-gray-900'>{hoursText || "Flexible"}</span>
            </div>
          </div>
        </div>

        {/* 근무조건 (하드코딩 예시) */}
        <div className='bg-white p-6 rounded-md shadow-md space-y-6 max-w-4xl mx-auto mb-6'>
          <h2 className='text-xl font-bold text-gray-800'>Work Condition</h2>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700'>
            <div className='space-y-4'>
              {/* 급여 */}
              <div>
                <span className='block text-sm text-gray-500 mb-1'>Wage</span>
                <div className='flex items-baseline space-x-2'>
                  <span className='text-xl font-bold text-gray-800'>Hourly 10,100 KRW</span>
                  <span className='text-sm text-gray-500'>(Negotiable, may vary by contract)</span>
                </div>
                <div className='text-sm text-gray-500 mt-1'>
                  2025 Minimum Wage 10,090 KRW
                  <span className='ml-1 text-green-600 font-semibold'>Display</span>
                </div>
              </div>

              {/* 근무기간 */}
              <div>
                <span className='block text-sm text-gray-500 mb-1'>Duration</span>
                <div className='text-base text-gray-800 font-semibold'>6 months ~ 1 year</div>
                <div className='text-sm text-gray-500'>(Negotiable)</div>
              </div>

              {/* 근무시간 */}
              <div>
                <span className='block text-sm text-gray-500 mb-1'>Work Hours</span>
                <div className='text-base text-gray-800 font-semibold'>To be discussed</div>
              </div>
            </div>

            <div className='space-y-4'>
              {/* 모집직종 */}
              <div>
                <span className='block text-sm text-gray-500 mb-1'>Job Category</span>
                <div className='text-base text-gray-800 font-semibold'>
                  Cafe, Store Management, Sales, Barista
                </div>
              </div>

              {/* 근무요일 */}
              <div>
                <span className='block text-sm text-gray-500 mb-1'>Work Days</span>
                <div className='text-base text-gray-800 font-semibold'>Days Negotiable</div>
              </div>

              {/* 고용형태 */}
              <div>
                <span className='block text-sm text-gray-500 mb-1'>Employment Type</span>
                <div className='text-base text-gray-800 font-semibold'>Part-time, Freelance</div>
              </div>
            </div>
          </div>
        </div>

        {/* 지원방법 */}
        <div className='max-w-4xl mx-auto space-y-6 mb-6'>
          <div className='bg-white p-6 rounded-md shadow-md'>
            <h2 className='text-xl font-bold text-gray-800'>Application Method</h2>
            <div className='mt-3 text-sm text-gray-700'>
              {/* Example: Online Application */}
              {formData.applicationMethod || "Online Application"}
            </div>
          </div>
        </div>

        {/* 기업정보 */}
        <div className='max-w-4xl mx-auto space-y-6 mb-6'>
          <div className='bg-white p-6 rounded-md shadow-md space-y-4'>
            <div className='flex items-center justify-between'>
              <h2 className='text-xl font-bold text-gray-800'>Company Information</h2>
              <button className='border border-gray-300 px-3 py-1 rounded-md text-sm text-gray-700 hover:bg-gray-100'>
                View Company
              </button>
            </div>
            <hr className='my-2' />

            <div className='grid grid-cols-2 gap-4 text-sm text-gray-700'>
              {/* Company Address */}
              <div>
                <span className='block text-gray-500'>Company Address</span>
                <span className='text-gray-800'>
                  {formData.workAddress || "No address"} <br />
                  {formData.addressDetail || ""}
                </span>
              </div>

              {/* Business Type */}
              <div>
                <span className='block text-gray-500'>Business Type</span>
                <span className='text-gray-800'>{formData.jobCategory || "Not specified"}</span>
              </div>

              {/* Contact Name */}
              <div>
                <span className='block text-gray-500'>Contact Name</span>
                <span className='text-gray-800'>{formData.contactName || "N/A"}</span>
              </div>

              {/* Position */}
              <div>
                <span className='block text-gray-500'>Position</span>
                <span className='text-gray-800'>Staff</span>
              </div>

              {/* Phone */}
              <div>
                <span className='block text-gray-500'>Phone</span>
                <span className='text-gray-800'>{formData.contactPhone || "N/A"}</span>
              </div>

              {/* CEO */}
              <div>
                <span className='block text-gray-500'>CEO</span>
                <span className='text-gray-800'>Unknown</span>
              </div>

              {/* Email */}
              <div>
                <span className='block text-gray-500'>Email</span>
                <span className='text-gray-800'>{formData.contactEmail || "N/A"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 세부 정보 */}
        <div className='space-y-4'>
          {/* Benefits */}
          <div>
            <p className='font-semibold text-gray-700'>Benefits</p>
            <p>
              {formData.benefits && formData.benefits.length > 0
                ? formData.benefits.join(", ")
                : "Not specified"}
            </p>
          </div>

          {/* Description */}
          <div>
            <p className='font-semibold text-gray-700'>Description</p>
            <p>{formData.description || "Not specified"}</p>
          </div>
        </div>

        {/* 닫기 버튼 */}
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
