import React, { useMemo } from "react";
import { JobPostingData, JobLocation, ApplicationMethod, WorkTime } from "../../types/jobPosting";
import useCategoryStore from "../../store/categoryStore";
import { GoogleMap, MarkerF } from "@react-google-maps/api";

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: JobPostingData | null;
}

const PreviewModal: React.FC<PreviewModalProps> = ({ isOpen, onClose, data }) => {
  const { categories } = useCategoryStore();
  const subcategory = data?.subcategoryId
    ? categories.flatMap((c) => c.subcategories).find((s) => s.id === data.subcategoryId)
    : null;

  const mapCenter = useMemo(() => {
    if (typeof data?.latitude === "number" && typeof data?.longitude === "number") {
      return { lat: data.latitude, lng: data.longitude };
    }
    return { lat: -33.8688, lng: 151.2093 }; // Sydney default
  }, [data?.latitude, data?.longitude]);

  const mapContainerStyle = {
    width: "100%",
    height: "300px",
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "No deadline set";
    const [dd, mm, yyyy] = dateString.split("-");
    return new Date(`${yyyy}-${mm}-${dd}`).toLocaleDateString();
  };

  if (!isOpen || !data) return null;

  // 모달 바깥 클릭 시 닫힘 처리
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'
      onClick={handleOverlayClick}>
      <div
        className='bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto'
        onClick={(e) => e.stopPropagation()} // 모달 내부 클릭 시 닫힘 방지
      >
        {/* Header */}
        <div className='p-6 border-b'>
          <div className='flex justify-between items-start'>
            <div>
              <h2 className='text-2xl font-bold text-gray-900'>{data.title}</h2>
              <p className='text-gray-600 mt-1'>{subcategory?.name || "No category"}</p>
            </div>
            <button onClick={onClose} className='text-gray-400 hover:text-gray-500'>
              <svg className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className='p-6 space-y-8'>
          {/* Company Info (선택된 회사 or 직접입력) */}
          {(data.companyId || data.contact || data.phone || data.email) && (
            <div className='flex items-center space-x-4 p-4 bg-gray-50 rounded-lg'>
              {data.companyId && data.company && data.company.logoUrl && (
                <img
                  src={data.company.logoUrl}
                  alt={data.company.name}
                  className='w-16 h-16 rounded-full object-cover'
                />
              )}
              <div>
                {data.companyId && data.company ? (
                  <>
                    <h3 className='text-lg font-semibold'>{data.company.name}</h3>
                    <p className='text-gray-600'>{data.company.ceoName}</p>
                    <div className='mt-2 space-y-1'>
                      <p className='text-sm text-gray-600'>{data.company.contactEmail}</p>
                      <p className='text-sm text-gray-600'>{data.company.contactPhone}</p>
                      {data.company.website && (
                        <a
                          href={data.company.website}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='text-sm text-orange-500 hover:underline'>
                          {data.company.website}
                        </a>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <h3 className='text-lg font-semibold'>Manual Company Entry</h3>
                    <div className='mt-2 space-y-1'>
                      <p className='text-sm text-gray-600'>Contact: {data.contact || "-"}</p>
                      <p className='text-sm text-gray-600'>Phone: {data.phone || "-"}</p>
                      <p className='text-sm text-gray-600'>Email: {data.email || "-"}</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Location */}
          <div className='space-y-4'>
            <h3 className='text-lg font-semibold'>Location</h3>
            <div className='p-4 bg-gray-50 rounded-lg'>
              <p className='text-gray-700 mb-4'>{data.address}</p>
              <div className='h-[300px] rounded-lg overflow-hidden'>
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={mapCenter}
                  zoom={15}
                  options={{
                    disableDefaultUI: false,
                    zoomControl: true,
                    streetViewControl: false,
                    mapTypeControl: false,
                  }}>
                  <MarkerF position={mapCenter} />
                </GoogleMap>
              </div>
            </div>
          </div>

          {/* Job Details */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {/* Salary */}
            <div className='space-y-2'>
              <h3 className='text-lg font-semibold'>Hourly Rate</h3>
              <div className='p-4 bg-gray-50 rounded-lg'>
                <p className='text-gray-700'>
                  ${data.hourlyRate}
                  {data.isHourlyRateNegotiable && (
                    <span className='ml-2 text-sm text-gray-500'>(Negotiable)</span>
                  )}
                </p>
              </div>
            </div>

            {/* Work Period */}
            <div className='space-y-2'>
              <h3 className='text-lg font-semibold'>Work Period</h3>
              <div className='p-4 bg-gray-50 rounded-lg'>
                <p className='text-gray-700'>{data.workPeriods?.join(", ") || "-"}</p>
              </div>
            </div>

            {/* Work Days */}
            <div className='space-y-2'>
              <h3 className='text-lg font-semibold'>Work Days</h3>
              <div className='p-4 bg-gray-50 rounded-lg'>
                <p className='text-gray-700'>{data.workDays?.join(", ") || "-"}</p>
              </div>
            </div>

            {/* Work Hours */}
            <div className='space-y-2'>
              <h3 className='text-lg font-semibold'>Work Hours</h3>
              <div className='p-4 bg-gray-50 rounded-lg'>
                <p className='text-gray-700'>{data.workHours?.join(", ") || "-"}</p>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {/* Employment Type */}
            <div className='space-y-2'>
              <h3 className='text-lg font-semibold'>Employment Type</h3>
              <div className='p-4 bg-gray-50 rounded-lg'>
                <p className='text-gray-700'>{data.employmentTypes?.join(", ") || "-"}</p>
              </div>
            </div>
            {/* Preferred Language */}
            <div className='space-y-2'>
              <h3 className='text-lg font-semibold'>Preferred Language</h3>
              <div className='p-4 bg-gray-50 rounded-lg'>
                <p className='text-gray-700'>{data.preferredLanguages?.join(", ") || "-"}</p>
              </div>
            </div>
            {/* Additional Options */}
            <div className='space-y-2'>
              <h3 className='text-lg font-semibold'>Additional Options</h3>
              <div className='p-4 bg-gray-50 rounded-lg'>
                <p className='text-gray-700'>{data.additionalOptions?.join(", ") || "-"}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className='space-y-2'>
            <h3 className='text-lg font-semibold'>Job Description</h3>
            <div
              className='prose max-w-none bg-gray-50 p-4 rounded-lg'
              dangerouslySetInnerHTML={{ __html: data.description }}
            />
          </div>

          {/* Application Method & Contact */}
          <div className='space-y-2'>
            <h3 className='text-lg font-semibold'>How to Apply</h3>
            <div className='p-4 bg-gray-50 rounded-lg'>
              <div className='flex flex-wrap gap-2'>
                {data.applicationMethod && (
                  <span className='px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm'>
                    {data.applicationMethod}
                  </span>
                )}
              </div>
              {/* Contact Preview (manual 입력 시) */}
              {data.contact && (
                <div className='mt-4 space-y-2'>
                  <h4 className='font-medium'>Contact Information</h4>
                  <p className='text-gray-700 whitespace-pre-line'>
                    Name: {data.contact || "-"}
                    {data.phone && (
                      <>
                        <br />
                        Phone: {data.phone}
                      </>
                    )}
                    {data.email && (
                      <>
                        <br />
                        Email: {data.email}
                      </>
                    )}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Deadline */}
          <div className='space-y-2'>
            <h3 className='text-lg font-semibold'>Application Deadline</h3>
            <div className='p-4 bg-gray-50 rounded-lg'>
              <p className='text-gray-700'>{formatDate(data.deadline)}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className='p-6 border-t'>
          <button
            onClick={onClose}
            className='w-full px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700'>
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;
