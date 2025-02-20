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

  console.log("Work Hours", formData.workHours);

  // 근무요일
  const daysText =
    formData.workDays.length > 0 ? formData.workDays.join(", ") : "Days to be discussed";

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
      <DialogPanel className='mx-auto max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-lg bg-gray-200 p-10 z-10'>
        <DialogTitle className='text-2xl font-bold mb-4 border-b pb-2'>
          Preview Job Posting
        </DialogTitle>

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
              <span className='text-sm text-gray-500 font-semibold '>
                {formData.salaryType} Wage
              </span>
              <span className='text-gray-900'>{salaryText || "To Be Discussed"}</span>
            </div>

            {/* Work Duration */}
            <div className='flex flex-col items-start'>
              <span className='text-sm text-gray-500 font-semibold'>Duration</span>
              <span className='text-gray-900'>{formData.workPeriod || "Flexible"}</span>
            </div>

            {/* Work Days */}
            <div className='flex flex-col items-start'>
              <span className='text-sm text-gray-500 font-semibold'>Work Days</span>
              <span className='text-gray-900'>{daysText || "To Be Discussed"}</span>
            </div>

            {/* Work Hours */}
            <div className='flex flex-col items-start'>
              <span className='text-sm text-gray-500 font-semibold'>Work Hours</span>
              <span className='text-gray-900'>{formData.workHours || "Flexible"}</span>
            </div>
          </div>
        </div>

        {/* 근무조건 */}
        <div className='bg-white p-6 shadow-md rounded-lg space-y-6 max-w-4xl mx-auto mb-6'>
          <h2 className='text-xl font-bold text-gray-800'>Work Condition</h2>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700'>
            <div className='space-y-4'>
              {/* 급여 */}
              <div>
                <span className='block text-sm text-gray-500 mb-1'>Wage</span>
                <div className='flex items-baseline space-x-2'>
                  <span className='text-xl font-bold text-gray-800'>
                    Hourly {salaryText || "To Be Discussed"}
                  </span>
                  <span className='text-sm text-gray-500'>(Negotiable, may vary by contract)</span>
                </div>
                <div className='text-sm text-gray-500 mt-1'>
                  2025 Minimum Wage approximately $25.20 per hour (AUS)
                  <span className='ml-1 text-green-600 font-semibold'>Display</span>
                </div>
              </div>

              {/* 근무기간 */}
              <div>
                <span className='block text-sm text-gray-500 mb-1'>Duration</span>
                <div className='text-base text-gray-800 font-semibold'>
                  {formData.workPeriod || "Flexible"}
                </div>
              </div>

              {/* 근무시간 */}
              <div>
                <span className='block text-sm text-gray-500 mb-1'>Work Hours</span>
                <div className='text-base text-gray-800 font-semibold'>
                  {formData.workPeriod || "Flexible"}
                </div>
              </div>
            </div>

            <div className='space-y-4'>
              {/* 모집직종 */}
              <div>
                <span className='block text-sm text-gray-500 mb-1'>Job Category</span>
                <div className='text-base text-gray-800 font-semibold'>
                  {formData.jobCategory || "Not specified"}
                </div>
              </div>

              {/* 근무요일 */}
              <div>
                <span className='block text-sm text-gray-500 mb-1'>Work Days</span>
                <div className='text-base text-gray-800 font-semibold'>
                  {daysText || "Flexible"}
                </div>
              </div>

              {/* 고용형태 */}
              <div>
                <span className='block text-sm text-gray-500 mb-1'>Employment Type</span>
                <div className='text-base text-gray-800 font-semibold'>
                  {formData.employmentType || "Not specified"}
                </div>
              </div>
              {/* 혜택 */}
              <div>
                <span className='block text-sm text-gray-500 mb-1'>Benefits</span>
                <div className='text-base text-gray-800 font-semibold'>
                  {formData.benefits && formData.benefits.length > 0
                    ? formData.benefits.join(", ")
                    : "Not specified"}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 근무지 정보 */}
        <div className='bg-white p-6 shadow-md rounded-lg space-y-6 mx-auto mb-6'>
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
        </div>

        {/* 세부 정보 */}
        <div className='bg-white p-6 shadow-md rounded-lg space-y-6 mx-auto mb-6'>
          {/* Description */}
          <h2 className='text-xl font-bold text-gray-800'>Description</h2>
          <div
            className='prose max-w-none mt-10'
            dangerouslySetInnerHTML={{ __html: formData.description || "<p>Not specified</p>" }}
          />
        </div>
        {/* 지원 정보 */}
        <div className='bg-white p-6 shadow-md rounded-lg space-y-6 mx-auto mb-6'>
          <div className='flex items-center justify-between'>
            <h2 className='text-xl font-bold text-gray-800'>Application Method</h2>
          </div>

          <div className='grid grid-cols-2 gap-4 text-sm text-gray-700'>
            {/* Contact Name */}
            <div>
              <span className='block text-gray-500'>Contact Name</span>
              <span className='text-gray-800'>{formData.contactName || "N/A"}</span>
            </div>

            {/* Phone */}
            <div>
              <span className='block text-gray-500'>Phone</span>
              <span className='text-gray-800'>{formData.contactPhone || "N/A"}</span>
            </div>

            {/* HR */}
            <div>
              <span className='block text-gray-500'>HR</span>
              <span className='text-gray-800'>{formData.contactName || "N/A"}</span>
            </div>

            {/* Email */}
            <div>
              <span className='block text-gray-500'>Email</span>
              <span className='text-gray-800'>{formData.contactEmail || "N/A"}</span>
            </div>
          </div>
        </div>

        {/* 기업정보 */}
        <div className='bg-white p-6 shadow-md rounded-lg space-y-6 mx-auto mb-6'>
          <div className='flex items-center justify-between'>
            <h2 className='text-xl font-bold text-gray-800'>Company Information</h2>
          </div>

          <div className='grid grid-cols-2 gap-4 text-sm text-gray-700'>
            {/* Company Address */}
            <div>
              <span className='block text-gray-500'>Company Address</span>
              <span className='text-gray-800'>
                {formData.workAddress || "No address"} <br />
                {formData.addressDetail || ""}
              </span>
            </div>

            {/* CEO */}
            <div>
              <span className='block text-gray-500'>CEO</span>
              <span className='text-gray-800'>Unknown</span>
            </div>

            {/* Phone */}
            <div>
              <span className='block text-gray-500'>Phone</span>
              <span className='text-gray-800'>{formData.contactPhone || "N/A"}</span>
            </div>

            {/* Email */}
            <div>
              <span className='block text-gray-500'>Website</span>
              <span className='text-gray-800'>{formData.contactEmail || "N/A"}</span>
            </div>
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
