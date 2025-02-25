import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { GoogleMap, MarkerF } from "@react-google-maps/api";
import { JobPostingData } from "../../types/jobPosting";
import { FaMoneyBillWave, FaCalendarAlt, FaClock, FaRegCalendarCheck } from "react-icons/fa";
import { RiMoneyDollarCircleFill } from "react-icons/ri";

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: JobPostingData;
}

export default function PreviewModal({ isOpen, onClose, formData }: PreviewModalProps) {
  // companyLogo가 문자열(URL)로 저장되었다고 가정
  if (!isOpen || !formData) return null;
  const companyLogoUrl = typeof formData.companyLogo === "string" ? formData.companyLogo : null;

  // 급여 표시
  const salaryText = formData.salaryNegotiable
    ? "Negotiable during interview"
    : formData.salary
      ? `$${formData.salary}`
      : "To be discussed";

  const dayAbbreviations = {
    Monday: "Mon",
    Tuesday: "Tue",
    Wednesday: "Wed",
    Thursday: "Thu",
    Friday: "Fri",
    Saturday: "Sat",
    Sunday: "Sun",
  };

  const daysText =
    formData.workDays.length > 0
      ? formData.workDays.map((day) => dayAbbreviations[day] || day).join(", ")
      : "Days to be discussed";

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

  let workTimeText = "To be discussed";

  if (typeof formData.workTime === "object") {
    const { start, end } = formData.workTime;
    if (start && end) {
      const startDate = new Date(start);
      const endDate = new Date(end);

      // 예: 24시간 형식 "17:00"
      const options = { hour: "2-digit", minute: "2-digit", hour12: false };

      const startStr = startDate.toLocaleTimeString("en-GB", options);
      const endStr = endDate.toLocaleTimeString("en-GB", options);

      workTimeText = `${startStr} ~ ${endStr}`;
    }
  }

  console.log(formData.workTime);

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className='fixed inset-0 z-50 flex items-center justify-center'>
      {/* 반투명 배경 */}
      <div className='fixed inset-0 bg-black opacity-30' aria-hidden='true' />

      {/* 모달 컨테이너 */}
      <DialogPanel className='mx-auto max-w-5xl w-full max-h-[90vh] overflow-y-auto rounded-lg bg-gray-200 p-10 z-10'>
        <DialogTitle className='text-2xl font-bold mb-4 border-b pb-2'>
          Preview Job Posting
        </DialogTitle>

        {/* Header Section: Company Name, Job Title, and Logo */}
        <div className='bg-white p-10 shadow-md rounded-lg space-y-6 mx-auto mb-6'>
          {/* 상단: 회사명, 공고 제목, 로고 */}
          <div className='flex items-start justify-between mb-6'>
            <div>
              <h3 className='text-m text-gray-800'>
                {formData.companyName || "Company Name Not Provided"}
              </h3>
              <h1 className='text-xl font-bold text-gray-800 mt-1'>
                {formData.title || "Job Title Not Specified"}
              </h1>
            </div>
            {companyLogoUrl && (
              <img
                src={companyLogoUrl}
                alt='Company Logo'
                className='w-16 h-16 object-cover rounded-md border border-gray-300'
              />
            )}
          </div>

          {/* 하단: 급여, 기간, 근무요일, 근무시간 요약 */}
          <div className='grid grid-cols-4 sm:grid-cols-4 gap-1 text-gray-700'>
            {/* 1) 시급 (Wage) */}
            <div className='flex items-center space-x-3'>
              {/* 원형 아이콘 배경 */}
              <div className='w-14 h-14 flex items-center justify-center rounded-full bg-[#F5F6F7]'>
                <RiMoneyDollarCircleFill className='text-yellow-400 w-10 h-10' />
              </div>
              {/* 텍스트 영역 */}
              <div>
                <div className='text-base font-semibold text-yellow-400'>{formData.salaryType}</div>
                <div className='text-sm font-bold text-yellow-400'>${formData.salary}</div>
              </div>
            </div>
            {/* 2) 기간 */}
            <div className='flex items-center space-x-3'>
              <div className='w-14 h-14 flex items-center justify-center rounded-full bg-[#F5F6F7]'>
                <FaRegCalendarCheck className='text-gray-500 w-6 h-6' />
              </div>
              <div>
                <div className='text-sm font-bold text-gray-600'>Duration</div>
                <div className='text-base font-semibold text-gray-800'>
                  {formData.workPeriod || "Flexible"}
                </div>
              </div>
            </div>

            {/* 3) 근무요일 */}
            <div className='flex items-center space-x-3'>
              <div className='w-14 h-14 flex items-center justify-center rounded-full bg-[#F5F6F7]'>
                <FaCalendarAlt className='text-gray-500 w-6 h-6' />
              </div>
              <div>
                <div className='text-sm font-bold text-gray-600'>Work Days</div>
                <div className='text-base font-semibold text-gray-800'>
                  {daysText || "To Be Discussed"}
                </div>
              </div>
            </div>

            {/* 4) 근무시간 */}
            <div className='flex items-center space-x-3'>
              <div className='w-14 h-14 flex items-center justify-center rounded-full bg-[#F5F6F7]'>
                <FaClock className='text-gray-500 w-6 h-6' />
              </div>
              <div>
                <div className='text-sm font-bold text-gray-600'>Work Hours</div>
                <div className='text-base font-semibold text-gray-800'>
                  {formData.workHours || "Flexible"}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 근무조건 */}
        <div className='bg-white p-10 shadow-md rounded-lg space-y-6 mx-auto mb-6'>
          <h2 className='text-2xl font-bold text-gray-800'>Work Condition</h2>

          <div className='grid grid-cols-2 md:grid-cols-2 gap-6 text-gray-700'>
            <div className='space-y-4'>
              {/* 급여 */}
              <div>
                <span className='block text-sm text-gray-500 mb-1'>Wage</span>
                <div className='flex items-baseline space-x-2'>
                  <span className='text-xl font-bold text-gray-800'>
                    {formData.salaryType} {salaryText || "To Be Discussed"}
                  </span>
                  <span className='text-sm text-gray-500'>(Negotiable)</span>
                </div>
                <div className='text-sm text-gray-500 mt-1'>
                  2025 Minimum Wage approximately $25.20 per hour
                </div>
              </div>

              {/* 근무기간 */}
              <div>
                <span className='block text-base font-semibold text-gray-500 mb-1'>Duration</span>
                <div className='text-base text-gray-800 font-base'>
                  {formData.workPeriod || "Flexible"}
                </div>
              </div>

              {/* 근무시간 */}
              <div>
                <span className='block text-base font-semibold text-gray-500 mb-1'>Work Time</span>
                <div className='text-base text-gray-800 font-base'>
                  {workTimeText || "Flexible"}
                </div>
              </div>
            </div>

            <div className='space-y-4 justify-self-center'>
              {/* 모집직종 */}
              <div>
                <span className='block text-base font-semibold text-gray-500 mb-1'>
                  Job Category
                </span>
                <div className='text-base text-gray-800 font-base'>
                  {formData.jobCategory || "Not specified"}
                </div>
              </div>

              {/* 근무요일 */}
              <div>
                <span className='block text-base font-semibold text-gray-500 mb-1'>Work Days</span>
                <div className='text-base text-gray-800 font-base'>{daysText || "Flexible"}</div>
              </div>

              {/* 고용형태 */}
              <div>
                <span className='block text-base font-semibold text-gray-500 mb-1'>
                  Employment Type
                </span>
                <div className='text-base text-gray-800 font-base'>
                  {formData.employmentType || "Not specified"}
                </div>
              </div>
              {/* 혜택 */}
              <div>
                <span className='block text-base font-semibold text-gray-500 mb-1'>Benefits</span>
                <div className='text-base text-gray-800 font-base'>
                  {formData.benefits && formData.benefits.length > 0
                    ? formData.benefits.join(", ")
                    : "Not specified"}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 근무지 정보 */}
        <div className='bg-white p-10 shadow-md rounded-lg space-y-6 mx-auto mb-6'>
          <h3 className='mb-6 text-2xl font-bold text-gray-800'>Work Location</h3>
          <div className='grid grid-cols-2 gap-5 text-gray-700'>
            <div className='space-y-4'>
              <div className='mb-2 '>
                <span className='text-base text-gray-500 mb-1 font-semibold'>Company Name </span>
                <div className='text-base text-gray-800 font-base'>
                  {formData.companyName || "unknown"}
                </div>
              </div>
              <div className='mb-2 '>
                <span className='text-base text-gray-500 mb-1 font-semibold'>Work Address </span>
                <div className='text-base text-gray-800 font-semibold'>
                  {formData.workAddress
                    ? `${formData.workAddress} (${formData.addressDetail || ""})`
                    : "No address provided"}
                </div>
              </div>
            </div>
            <div className='space-y-4 justify-self-center'>
              <div className='mb-2'>
                <span className='text-base text-gray-500 mb-1 font-semibold'>Work Location </span>
                <div className='text-base text-gray-800 font-base'>
                  {formData.location || "unknown"}
                </div>
              </div>
              <div className='mb-2'>
                <span className='text-base text-gray-500 mb-1 font-semibold'>
                  Exposure Regions{" "}
                </span>
                <div className='text-base text-gray-800 font-base'>
                  {formData.exposureRegions || "unknown"}
                </div>
              </div>
            </div>
          </div>
          <section className='mb-6'>
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
          <div className='text-sm font-semibold text-gray-700 space-y-3'>
            {/* 근처 지하철 */}
            <div>
              <span className='text-base text-gray-500 mb-1 font-semibold'>Near Station</span>
              {formData.nearbySubways && formData.nearbySubways.length > 0 ? (
                <div className='mt-1 flex flex-wrap gap-2'>
                  {formData.nearbySubways.map((station: string, index: number) => (
                    <span
                      key={index}
                      className='bg-gray-200 text-gray-800 px-3 py-2 rounded-full text-sm'>
                      {station}
                    </span>
                  ))}
                </div>
              ) : (
                <span className='bg-gray-200 text-gray-800 px-3 py-2 rounded-full text-sm'>
                  None
                </span>
              )}
            </div>

            {/* 근처 학교 */}
            <div>
              <span className='text-base text-gray-500 mb-1 font-semibold'>Near School</span>
              {formData.nearbySchools && formData.nearbySchools.length > 0 ? (
                <div className='mt-1 flex flex-wrap gap-2'>
                  {formData.nearbySchools.map((school: string, index: number) => (
                    <span
                      key={index}
                      className='bg-gray-200 text-gray-800 px-3 py-2 rounded-full text-sm'>
                      {school}
                    </span>
                  ))}
                </div>
              ) : (
                <span className='bg-gray-200 text-gray-800 px-3 py-2 rounded-full text-sm'>
                  None
                </span>
              )}
            </div>
          </div>
        </div>

        {/* 세부 정보 */}
        <div className='bg-white p-10 shadow-md rounded-lg space-y-6 mx-auto mb-6'>
          {/* Description */}
          <h2 className='text-xl font-bold text-gray-800'>Description</h2>
          <div
            className='prose max-w-none mt-10'
            dangerouslySetInnerHTML={{ __html: formData.description || "<p>Not specified</p>" }}
          />
        </div>
        {/* 지원 정보 */}
        <div className='bg-white p-10 shadow-md rounded-lg space-y-6 mx-auto mb-6'>
          <div className='flex items-center justify-between'>
            <h2 className='text-xl font-bold text-gray-800'>Application Method</h2>
          </div>

          <div className='grid grid-cols-2 gap-4 text-gray-700'>
            {/* Contact Name */}
            <div>
              <span className='block text-base font-semibold text-gray-500 mb-1'>
                Contact Method
              </span>
              <span className='text-base text-gray-800 font-bold'>
                {formData.applicationMethod || "N/A"}
              </span>
            </div>
            <div>
              <span className='block text-base font-semibold text-gray-500 mb-1'>Contact Name</span>
              <span className='text-base text-gray-800 font-base'>
                {formData.contactName || "N/A"}
              </span>
            </div>

            {/* Phone */}
            <div>
              <span className='block text-base font-semibold text-gray-500 mb-1'>Phone</span>
              <span className='text-gray-800'>{formData.contactPhone || "N/A"}</span>
            </div>

            {/* Email */}
            <div>
              <span className='block text-base font-semibold text-gray-500 mb-1'>Email</span>
              <span className='text-gray-800'>{formData.contactEmail || "N/A"}</span>
            </div>
          </div>
        </div>

        {/* 기업정보 */}
        <div className='bg-white p-10 shadow-md rounded-lg space-y-6 mx-auto mb-6'>
          <div className='flex items-center justify-between'>
            <h2 className='text-xl font-bold text-gray-800'>Company Information</h2>
          </div>

          <div className='grid grid-cols-2 gap-4 text-gray-700'>
            {/* Company Address */}
            <div>
              <span className='block text-base font-semibold text-gray-500 mb-1'>
                Company Address
              </span>
              <span className='text-gray-800'>
                {formData.workAddress || "No address"} <br />
                {formData.addressDetail || ""}
              </span>
            </div>

            {/* CEO */}
            <div>
              <span className='block text-base font-semibold text-gray-500 mb-1'>CEO</span>
              <span className='text-gray-800'>Unknown</span>
            </div>

            {/* Phone */}
            <div>
              <span className='block text-base font-semibold text-gray-500 mb-1'>Phone</span>
              <span className='text-gray-800'>{formData.contactPhone || "N/A"}</span>
            </div>

            {/* Email */}
            <div>
              <span className='block text-base font-semibold text-gray-500 mb-1'>Website</span>
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
