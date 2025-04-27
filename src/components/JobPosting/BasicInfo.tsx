import React, { useState } from "react";
import useJobPostingStore from "../../store/jobPostingStore";
import useCategoryStore from "../../store/categoryStore";
import AddressAutocomplete from "./AddressAutocomplete";
import Select from "react-select";

const WORK_PERIODS = [
  "One day",
  "Within 1 week",
  "1 week - 1 month",
  "1-3 months",
  "3-6 months",
  "6 months - 1 year",
  "Over 1 year",
];
const WORK_DAYS = [
  "Mon-Fri (5 days/week)",
  "Sat-Sun (Weekends)",
  "6 days/week",
  "4 days/week",
  "3 days/week",
  "2 days/week",
  "1 day/week",
  "Days to be discussed",
];
const WORK_HOURS = [
  "Morning shift",
  "Afternoon shift",
  "Evening shift",
  "Night shift",
  "Night-Morning shift",
  "Full time (8h+)",
  "Time to be discussed",
];

const inputClass =
  "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white text-gray-900 placeholder-gray-400 transition";
const labelClass = "block text-sm font-bold text-orange-600 mb-1";

const selectStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    minHeight: "44px",
    borderRadius: "0.5rem",
    borderColor: state.isFocused ? "#ff7f32" : "#e5e7eb",
    boxShadow: state.isFocused ? "0 0 0 2px #ffb380" : "none",
    fontSize: "1rem",
    fontWeight: 400,
    backgroundColor: "#fff",
    "&:hover": { borderColor: "#ff7f32" },
  }),
  multiValue: (provided: any) => ({
    ...provided,
    backgroundColor: "#fff7ed",
    border: "1px solid #ffb380",
    borderRadius: "0.5rem",
    color: "#ff7f32",
    fontWeight: 500,
  }),
  multiValueLabel: (provided: any) => ({
    ...provided,
    color: "#ff7f32",
    fontWeight: 500,
  }),
  multiValueRemove: (provided: any) => ({
    ...provided,
    color: "#ff7f32",
    ":hover": { backgroundColor: "#ffb380", color: "#fff" },
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#ffb380" : state.isFocused ? "#fff7ed" : "#fff",
    color: state.isSelected ? "#fff" : "#333",
    fontWeight: state.isSelected ? 600 : 400,
    fontSize: "1rem",
    ":active": { backgroundColor: "#ff7f32", color: "#fff" },
  }),
  menu: (provided: any) => ({
    ...provided,
    borderRadius: "0.75rem",
    boxShadow: "0 4px 24px 0 rgba(0,0,0,0.08)",
    zIndex: 20,
  }),
};

const workPeriodOptions = WORK_PERIODS.map((v) => ({ value: v, label: v }));
const workDayOptions = WORK_DAYS.map((v) => ({ value: v, label: v }));
const workHourOptions = WORK_HOURS.map((v) => ({ value: v, label: v }));

const BasicInfo: React.FC = () => {
  const { formData, updateFormData } = useJobPostingStore();
  const { categories, fetchCategories } = useCategoryStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<number | null>(null);

  React.useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleSubcategoryChange = (subcategoryId: number) => {
    setSelectedSubcategory(subcategoryId);
    updateFormData({ subcategoryId });
    setIsDropdownOpen(false);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFormData({ title: e.target.value });
  };

  const handleAddressSelect = (
    address: string,
    coordinates: { lat: number; lng: number },
    placeId: string
  ) => {
    updateFormData({
      address,
      latitude: coordinates.lat,
      longitude: coordinates.lng,
      placeId,
    });
  };

  return (
    <div className='space-y-6'>
      {/* Job Title */}
      <div>
        <label className={labelClass}>Job Title</label>
        <input
          type='text'
          value={formData?.title || ""}
          onChange={handleTitleChange}
          placeholder='Enter title (e.g., Looking for a barista! ☕ Join us!)'
          className={inputClass}
        />
      </div>

      {/* Job Category */}
      <div className='space-y-4'>
        <div className='relative'>
          <label className={labelClass}>Job Category</label>
          <button
            type='button'
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={inputClass + " flex items-center justify-between cursor-pointer"}
            disabled={!categories || categories.length === 0}>
            <span className='flex items-center'>
              {categories.length === 0
                ? "Loading categories..."
                : selectedCategory
                  ? categories.find((cat) => cat.id === selectedCategory)?.name
                  : "Select a category"}
              {selectedSubcategory && selectedCategory && (
                <span className='ml-2 text-gray-500'>
                  -{" "}
                  {
                    categories
                      .find((cat) => cat.id === selectedCategory)
                      ?.subcategories.find((sub) => sub.id === selectedSubcategory)?.name
                  }
                </span>
              )}
            </span>
            <svg
              className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
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
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
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
              <div className='flex-1 p-4 overflow-y-auto flex items-center justify-center'>
                {selectedCategory &&
                categories.find((cat) => cat.id === selectedCategory)?.subcategories ? (
                  <div className='grid grid-cols-2 gap-4'>
                    {categories
                      .find((cat) => cat.id === selectedCategory)
                      ?.subcategories.map((sub) => (
                        <button
                          key={sub.id}
                          onClick={() => handleSubcategoryChange(sub.id)}
                          className={`px-4 py-2 text-left rounded hover:bg-gray-50 focus:outline-none ${
                            selectedSubcategory === sub.id
                              ? "text-gray-900 font-medium"
                              : "text-gray-600"
                          }`}>
                          {sub.name}
                        </button>
                      ))}
                  </div>
                ) : (
                  <span className='text-gray-400 text-base'>Select a main category</span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Address Autocomplete */}
      <div>
        <label className={labelClass}>Workplace Address</label>
        <AddressAutocomplete onSelect={handleAddressSelect} />
      </div>

      {/* Work Period */}
      <div>
        <label className={labelClass}>Work Period</label>
        <div className='flex flex-wrap gap-2'>
          {WORK_PERIODS.map((period) => (
            <button
              key={period}
              type='button'
              onClick={() => {
                const selected = formData?.workPeriods || [];
                updateFormData({
                  workPeriods: selected.includes(period)
                    ? selected.filter((p) => p !== period)
                    : [...selected, period],
                });
              }}
              className={`px-4 py-2 rounded-full border transition ${
                formData?.workPeriods?.includes(period)
                  ? "bg-orange-100 border-orange-500 text-orange-700"
                  : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}>
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* Work Days */}
      <div>
        <label className={labelClass}>Work Days</label>
        <div className='flex flex-wrap gap-2'>
          {WORK_DAYS.map((day) => (
            <button
              key={day}
              type='button'
              onClick={() => {
                const selected = formData?.workDays || [];
                updateFormData({
                  workDays: selected.includes(day)
                    ? selected.filter((d) => d !== day)
                    : [...selected, day],
                });
              }}
              className={`px-4 py-2 rounded-full border transition ${
                formData?.workDays?.includes(day)
                  ? "bg-orange-100 border-orange-500 text-orange-700"
                  : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}>
              {day}
            </button>
          ))}
        </div>
      </div>

      {/* Work Hours */}
      <div>
        <label className={labelClass}>Work Hours</label>
        <div className='flex flex-wrap gap-2'>
          {WORK_HOURS.map((hour) => (
            <button
              key={hour}
              type='button'
              onClick={() => {
                const selected = formData?.workHours || [];
                updateFormData({
                  workHours: selected.includes(hour)
                    ? selected.filter((h) => h !== hour)
                    : [...selected, hour],
                });
              }}
              className={`px-4 py-2 rounded-full border transition ${
                formData?.workHours?.includes(hour)
                  ? "bg-orange-100 border-orange-500 text-orange-700"
                  : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}>
              {hour}
            </button>
          ))}
        </div>
      </div>

      {/* Hourly Rate */}
      <div>
        <label className={labelClass}>Hourly Rate (AUD)</label>
        <div className='flex items-center gap-2'>
          <input
            type='text'
            value={formData?.hourlyRate || ""}
            onChange={(e) => updateFormData({ hourlyRate: e.target.value })}
            placeholder='e.g. 25'
            disabled={formData?.isHourlyRateNegotiable}
            className={inputClass + " w-16"}
          />
          <span className='text-gray-500'>per hour</span>
          <label className='flex items-center gap-1 ml-4'>
            <input
              type='checkbox'
              checked={formData?.isHourlyRateNegotiable || false}
              onChange={(e) => updateFormData({ isHourlyRateNegotiable: e.target.checked })}
              className='h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded'
            />
            <span className='text-sm text-gray-600'>Negotiable</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default BasicInfo;
