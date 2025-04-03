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
  const category = data?.categoryId ? categories.find((c) => c.id === data.categoryId) : null;

  const mapCenter = useMemo(() => {
    if (!data?.coordinates) return { lat: -33.8688, lng: 151.2093 }; // Sydney default
    return data.coordinates;
  }, [data?.coordinates]);

  const mapContainerStyle = {
    width: "100%",
    height: "300px",
  };

  const formatWorkTime = (workTime: string | "To be discussed" | undefined) => {
    if (!workTime) return "";
    if (workTime === "To be discussed") return workTime;
    if (data?.isDaysNegotiable) {
      return "Working days and time to be discussed";
    }
    if (data?.isTimeNegotiable) {
      return `${workTime} (Time to be discussed)`;
    }

    return workTime;
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "No deadline set";
    return new Date(dateString).toLocaleDateString();
  };

  if (!isOpen || !data) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto'>
        {/* Header */}
        <div className='p-6 border-b'>
          <div className='flex justify-between items-start'>
            <div>
              <h2 className='text-2xl font-bold text-gray-900'>{data.title}</h2>
              <p className='text-gray-600 mt-1'>
                {category?.name || "No category"} • {data.locationCategory}
              </p>
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
          {/* Company Info */}
          {data.company && (
            <div className='flex items-center space-x-4 p-4 bg-gray-50 rounded-lg'>
              {data.company.logoUrl && (
                <img
                  src={data.company.logoUrl}
                  alt={data.company.name}
                  className='w-16 h-16 rounded-full object-cover'
                />
              )}
              <div>
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
                      className='text-sm text-blue-500 hover:underline'>
                      {data.company.website}
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Location */}
          <div className='space-y-4'>
            <h3 className='text-lg font-semibold'>Location</h3>
            <div className='p-4 bg-gray-50 rounded-lg'>
              <p className='text-gray-700 mb-4'>{data.location}</p>
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
                  ${data.hourly_rate}
                  {data.isHourlyRateNegotiable && (
                    <span className='ml-2 text-sm text-gray-500'>(Negotiable)</span>
                  )}
                </p>
              </div>
            </div>

            {/* Working Days */}
            <div className='space-y-2'>
              <h3 className='text-lg font-semibold'>Working Days</h3>
              <div className='p-4 bg-gray-50 rounded-lg'>
                <p className='text-gray-700'>
                  {data.isDaysNegotiable
                    ? "Working days to be discussed"
                    : data.workDays.join(", ")}
                </p>
              </div>
            </div>

            {/* Working Hours */}
            <div className='space-y-2'>
              <h3 className='text-lg font-semibold'>Working Hours</h3>
              <div className='p-4 bg-gray-50 rounded-lg'>
                <p className='text-gray-700'>
                  {data.isTimeNegotiable
                    ? "Time to be discussed"
                    : data.workTime.replace(/^.*?: /, "")}
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className='space-y-2'>
            <h3 className='text-lg font-semibold'>Job Description</h3>
            <div className='p-4 bg-gray-50 rounded-lg'>
              <div
                className='prose max-w-none'
                dangerouslySetInnerHTML={{ __html: data.description }}
              />
            </div>
          </div>

          {/* Application Methods */}
          <div className='space-y-2'>
            <h3 className='text-lg font-semibold'>How to Apply</h3>
            <div className='p-4 bg-gray-50 rounded-lg'>
              <div className='flex flex-wrap gap-2'>
                {data.applicationMethods?.map((method) => (
                  <span
                    key={method}
                    className='px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm'>
                    {method}
                  </span>
                ))}
              </div>
              {data.contactInfo && (
                <div className='mt-4 space-y-2'>
                  <h4 className='font-medium'>Contact Information</h4>
                  <p className='text-gray-700 whitespace-pre-line'>{data.contactInfo}</p>
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
            className='w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700'>
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;
