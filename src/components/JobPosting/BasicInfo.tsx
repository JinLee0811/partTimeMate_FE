import React, { useState, useEffect } from "react";
import { JobPostingData } from "../../types/jobPosting";
import { Category, Subcategory } from "../../types/category";
import useJobPostingStore from "../../store/jobPostingStore";
import useCategoryStore from "../../store/categoryStore";
import { JobLocation } from "../../types/jobPosting";
import AddressAutocomplete from "./AddressAutocomplete";
import WorkLocation from "./WorkLocation";

// Default coordinates for Sydney areas
const locationCoordinates: Record<JobLocation, { lat: number; lng: number }> = {
  [JobLocation.SYDNEY_CBD]: { lat: -33.8688, lng: 151.2093 },
  [JobLocation.INNER_WEST]: { lat: -33.8841, lng: 151.1897 },
  [JobLocation.EASTERN_SUBURBS]: { lat: -33.8927, lng: 151.2571 },
  [JobLocation.NORTH_SHORE]: { lat: -33.8382, lng: 151.2075 },
  [JobLocation.PARRAMATTA]: { lat: -33.815, lng: 151.0011 },
  [JobLocation.CHATSWOOD]: { lat: -33.7969, lng: 151.1804 },
  [JobLocation.NORTH_SYDNEY]: { lat: -33.8389, lng: 151.2064 },
  [JobLocation.BONDI]: { lat: -33.8915, lng: 151.2767 },
  [JobLocation.STRATHFIELD]: { lat: -33.8744, lng: 151.082 },
  [JobLocation.BURWOOD]: { lat: -33.8771, lng: 151.103 },
  [JobLocation.HURSTVILLE]: { lat: -33.9672, lng: 151.1012 },
};

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const TIME_SLOTS = Array.from({ length: 24 }, (_, i) => {
  const hour = i % 12 || 12;
  const ampm = i < 12 ? "AM" : "PM";
  return `${hour}:00 ${ampm}`;
});

const BasicInfo: React.FC = () => {
  const { formData, updateFormData } = useJobPostingStore();
  const { categories, fetchCategories } = useCategoryStore();
  const [showMap, setShowMap] = useState(false);
  const [googleMapsError, setGoogleMapsError] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<number | null>(null);
  const [locationArea, setLocationArea] = useState<string>("");
  const [showLocationInput, setShowLocationInput] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    const checkGoogleMaps = () => {
      if (window.google && window.google.maps) {
        setGoogleMapsError(null);
      } else {
        setGoogleMapsError("Google Maps API is not loaded. Please try refreshing the page.");
      }
    };

    checkGoogleMaps();
    const interval = setInterval(checkGoogleMaps, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    console.log("Current Form Data:", {
      title: formData?.title,
      categoryId: formData?.categoryId,
      locationCategory: formData?.locationCategory,
      location: formData?.location,
      hourly_rate: formData?.hourly_rate,
      isHourlyRateNegotiable: formData?.isHourlyRateNegotiable,
      workDays: formData?.workDays,
      isDaysNegotiable: formData?.isDaysNegotiable,
    });
  }, [formData]);

  const handleLocationSelect = (location: JobLocation) => {
    const coordinates = locationCoordinates[location];
    updateFormData({
      locationCategory: location,
      coordinates: coordinates,
      location: "", // Reset detailed address when selecting new area
    });
    setShowMap(true);
  };

  const handleAddressSelect = (
    address: string,
    coordinates: { lat: number; lng: number },
    placeId: string
  ) => {
    updateFormData({
      location: address,
      coordinates: coordinates,
      placeId: placeId,
    });
  };

  const handleCategoryChange = (categoryId: number) => {
    setSelectedCategory(categoryId);
    setSelectedSubcategory(null);
    updateFormData({ categoryId });
  };

  const handleSubcategoryChange = (subcategoryId: number) => {
    setSelectedSubcategory(subcategoryId);
    updateFormData({ subcategoryId });
    setIsDropdownOpen(false);
  };

  const handleLocationAreaChange = (area: string) => {
    setLocationArea(area);
    updateFormData({ location: area });
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFormData({ title: e.target.value });
  };

  const handleDayToggle = (day: string) => {
    const newSelectedDays = selectedDays.includes(day)
      ? selectedDays.filter((d) => d !== day)
      : [...selectedDays, day];
    setSelectedDays(newSelectedDays);
    updateFormData({
      workDays: newSelectedDays,
    });
  };

  const handleTimeChange = (type: "start" | "end", time: string) => {
    let newStartTime = startTime;
    let newEndTime = endTime;

    if (type === "start") {
      newStartTime = time;
      setStartTime(time);
    } else {
      newEndTime = time;
      setEndTime(time);
    }

    if (newStartTime && newEndTime) {
      updateFormData({
        workTime: `${newStartTime} - ${newEndTime}`,
      });
    }
  };

  // Find selected category name
  const selectedCategoryData = categories.find((cat) => cat.id === selectedCategory);

  return (
    <div className='space-y-6'>
      {/* Job Title */}
      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>Job Title</label>
        <input
          type='text'
          value={formData?.title || ""}
          onChange={handleTitleChange}
          placeholder='Enter position title (e.g., Barista, Retail Assistant)'
          className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500'
        />
      </div>

      {/* Job Category */}
      <div className='space-y-4'>
        <div className='relative'>
          <label className='block text-sm font-medium text-gray-700 mb-1'>Job Category</label>
          <button
            type='button'
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className='w-full px-4 py-2 text-left border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white flex items-center justify-between'
            disabled={!categories || categories.length === 0}>
            <span className='flex items-center'>
              {categories.length === 0
                ? "Loading categories..."
                : selectedCategoryData
                  ? selectedCategoryData.name
                  : "Select a category"}
              {selectedSubcategory && (
                <span className='ml-2 text-gray-500'>
                  -{" "}
                  {
                    selectedCategoryData?.subcategories?.find(
                      (sub) => sub.id === selectedSubcategory
                    )?.name
                  }
                </span>
              )}
            </span>
            <svg
              className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
              fill='currentColor'>
              <path
                fillRule='evenodd'
                d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                clipRule='evenodd'
              />
            </svg>
          </button>

          {isDropdownOpen && categories && categories.length > 0 && (
            <div className='absolute z-10 mt-1 w-[600px] bg-white shadow-lg rounded-lg border border-gray-200 divide-x flex max-h-[400px]'>
              {/* Main Categories */}
              <div className='w-[240px] overflow-y-auto'>
                {categories.map((category: Category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.id)}
                    className={`w-full px-4 py-3 text-left hover:bg-gray-50 focus:outline-none ${
                      selectedCategory === category.id
                        ? "bg-gray-50 border-l-4 border-orange-500"
                        : "border-l-4 border-transparent"
                    }`}>
                    <span
                      className={`block font-medium ${
                        selectedCategory === category.id ? "text-orange-500" : "text-gray-900"
                      }`}>
                      {category.name}
                    </span>
                  </button>
                ))}
              </div>

              {/* Subcategories */}
              <div className='flex-1 p-4 overflow-y-auto'>
                {selectedCategory && selectedCategoryData?.subcategories && (
                  <div className='grid grid-cols-2 gap-4'>
                    {selectedCategoryData.subcategories.map((sub: Subcategory) => (
                      <button
                        key={sub.id}
                        onClick={() => {
                          handleSubcategoryChange(sub.id);
                          setIsDropdownOpen(false);
                        }}
                        className={`px-4 py-2 text-left rounded hover:bg-gray-50 focus:outline-none ${
                          selectedSubcategory === sub.id
                            ? "text-gray-900 font-medium"
                            : "text-gray-600"
                        }`}>
                        {sub.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Location Area */}
      <div className='space-y-4'>
        <label className='block text-sm font-medium text-gray-700'>Location Area</label>
        <div className='flex flex-wrap gap-2'>
          {Object.values(JobLocation).map((location) => (
            <button
              key={location}
              onClick={() => handleLocationSelect(location)}
              className={`px-4 py-2 rounded-lg border ${
                formData?.locationCategory === location
                  ? "bg-orange-100 border-orange-500 text-orange-700"
                  : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}>
              {location}
            </button>
          ))}
          <button
            onClick={() => setShowLocationInput(true)}
            className={`px-4 py-2 rounded-lg border ${
              showLocationInput
                ? "bg-orange-100 border-orange-500 text-orange-700"
                : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}>
            Other
          </button>
        </div>
        {showLocationInput && (
          <input
            type='text'
            value={locationArea}
            onChange={(e) => handleLocationAreaChange(e.target.value)}
            placeholder='Enter location area'
            className='w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500'
          />
        )}
      </div>

      {/* Address Search and Map */}
      {showMap && (
        <div className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Detailed Address</label>
            {googleMapsError ? (
              <div className='text-red-600 text-sm'>{googleMapsError}</div>
            ) : (
              <AddressAutocomplete onSelect={handleAddressSelect} disabled={!!googleMapsError} />
            )}
          </div>

          {formData?.coordinates && (
            <WorkLocation coordinates={formData.coordinates} placeId={formData.placeId || ""} />
          )}
        </div>
      )}

      {/* Hourly Rate */}
      <div className='space-y-2'>
        <label className='block text-sm font-medium text-gray-700'>Hourly Rate (AUD)</label>
        <div className='flex items-center space-x-2'>
          <input
            type='number'
            value={formData?.hourly_rate || ""}
            onChange={(e) => updateFormData({ hourly_rate: parseFloat(e.target.value) })}
            placeholder='Enter hourly rate'
            disabled={formData?.isHourlyRateNegotiable}
            className='w-40 px-4 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 disabled:bg-gray-100 disabled:text-gray-500'
          />
          <span className='text-gray-500'>per hour</span>
        </div>
        <div className='flex items-center space-x-2'>
          <input
            type='checkbox'
            id='isNegotiable'
            checked={formData?.isHourlyRateNegotiable || false}
            onChange={(e) => updateFormData({ isHourlyRateNegotiable: e.target.checked })}
            className='h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded'
          />
          <label htmlFor='isNegotiable' className='text-sm text-gray-600'>
            Rate is negotiable
          </label>
        </div>
      </div>

      {/* Working Hours */}
      <div className='space-y-4'>
        <label className='block text-sm font-medium text-gray-700'>Working Hours</label>

        {/* Days Selection */}
        <div className='space-y-2'>
          <div className='flex items-center justify-between'>
            <label className='text-sm text-gray-600'>Select working days</label>
            <div className='flex items-center space-x-2'>
              <input
                type='checkbox'
                id='daysNegotiable'
                checked={formData?.isDaysNegotiable || false}
                onChange={(e) => {
                  updateFormData({ isDaysNegotiable: e.target.checked });
                  if (e.target.checked) {
                    setSelectedDays([]);
                    updateFormData({ workTime: "To be discussed" });
                  }
                }}
                className='h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded'
              />
              <label htmlFor='daysNegotiable' className='text-sm text-gray-600'>
                Days to be discussed
              </label>
            </div>
          </div>
          {!formData?.isDaysNegotiable && (
            <div className='flex flex-wrap gap-2'>
              {DAYS.map((day) => (
                <button
                  key={day}
                  onClick={() => handleDayToggle(day)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    selectedDays.includes(day)
                      ? "bg-orange-100 text-orange-700 border border-orange-300"
                      : "bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200"
                  }`}>
                  {day}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Time Selection */}
        {selectedDays.length > 0 && !formData?.isDaysNegotiable && (
          <div className='space-y-4 p-4 bg-gray-50 rounded-lg'>
            <div className='space-y-2'>
              <div className='flex items-center justify-between'>
                <label className='block text-sm font-medium text-gray-700'>Working Time</label>
                <div className='flex items-center space-x-2'>
                  <input
                    type='checkbox'
                    id='timeNegotiable'
                    checked={formData?.isTimeNegotiable || false}
                    onChange={(e) => {
                      updateFormData({ isTimeNegotiable: e.target.checked });
                      if (e.target.checked) {
                        setStartTime("");
                        setEndTime("");
                        updateFormData({ workTime: "To be discussed" });
                      }
                    }}
                    className='h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded'
                  />
                  <label htmlFor='timeNegotiable' className='text-sm text-gray-600'>
                    Time to be discussed
                  </label>
                </div>
              </div>
              {!formData?.isTimeNegotiable && (
                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm text-gray-600 mb-1'>From</label>
                    <select
                      value={startTime}
                      onChange={(e) => handleTimeChange("start", e.target.value)}
                      className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500'>
                      <option value=''>Select start time</option>
                      {TIME_SLOTS.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className='block text-sm text-gray-600 mb-1'>To</label>
                    <select
                      value={endTime}
                      onChange={(e) => handleTimeChange("end", e.target.value)}
                      className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500'>
                      <option value=''>Select end time</option>
                      {TIME_SLOTS.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* Schedule Preview */}
            {(startTime && endTime) || formData?.isTimeNegotiable ? (
              <div className='mt-4 p-3 bg-white border border-gray-200 rounded-lg'>
                <h4 className='text-sm font-medium text-gray-700 mb-2'>Selected Schedule</h4>
                <p className='text-sm text-gray-600'>
                  <span className='font-medium'>Days: {selectedDays.join(", ")}</span>
                  <br />
                  <span className='text-gray-500'>
                    {formData?.isTimeNegotiable
                      ? "Time to be discussed"
                      : `Time: ${startTime} - ${endTime}`}
                  </span>
                </p>
              </div>
            ) : null}
          </div>
        )}

        {/* Days Negotiable Preview */}
        {formData?.isDaysNegotiable && (
          <div className='mt-4 p-3 bg-white border border-gray-200 rounded-lg'>
            <h4 className='text-sm font-medium text-gray-700 mb-2'>Selected Schedule</h4>
            <p className='text-sm text-gray-600'>
              <span className='text-gray-500'>Working days and time to be discussed</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BasicInfo;
