import React, { useState } from "react";
import { workHourTypes, timeSlotOptions, timeRanges } from "../../../Mockdata/workHours";

interface WorkHourFilterProps {
  selectedFilters: string[];
  setSelectedFilters: (filters: string[]) => void;
  canAddMoreFilters: boolean;
}

export default function WorkHourFilter({
  selectedFilters,
  setSelectedFilters,
  canAddMoreFilters,
}: WorkHourFilterProps) {
  const [selectedType, setSelectedType] = useState<string>(workHourTypes.SELECT_FROM_LIST);
  const [startTime, setStartTime] = useState<string>("09:00");
  const [endTime, setEndTime] = useState<string>("17:00");

  const handleSelectFilter = (filter: string) => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter((f) => f !== filter));
      return;
    }

    if (!canAddMoreFilters) {
      return;
    }

    setSelectedFilters([...selectedFilters, filter]);
  };

  const handleTimeSelection = () => {
    const timeFilter = `${startTime}-${endTime}`;
    handleSelectFilter(timeFilter);
  };

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between text-sm text-gray-500'>
        <span>Work Hours ({selectedFilters.length}/3)</span>
      </div>

      {/* Selection Type */}
      <div className='flex space-x-4'>
        {Object.values(workHourTypes).map((type) => (
          <label key={type} className='flex items-center space-x-2'>
            <input
              type='radio'
              checked={selectedType === type}
              onChange={() => setSelectedType(type)}
              className='text-orange-500 focus:ring-orange-500'
            />
            <span className='text-sm'>{type}</span>
          </label>
        ))}
      </div>

      {selectedType === workHourTypes.SELECT_FROM_LIST && (
        <div className='grid grid-cols-2 gap-2'>
          {timeSlotOptions.map((option) => {
            const isSelected = selectedFilters.includes(option);
            return (
              <button
                key={option}
                onClick={() => handleSelectFilter(option)}
                className={`
                  py-2 px-3 rounded-lg border text-sm transition-all
                  ${
                    isSelected
                      ? "border-orange-500 bg-orange-50 text-orange-600 font-semibold"
                      : "border-gray-200 hover:border-orange-200 hover:bg-orange-50"
                  }
                  ${!isSelected && !canAddMoreFilters ? "opacity-50 cursor-not-allowed" : ""}
                `}>
                {option}
              </button>
            );
          })}
        </div>
      )}

      {selectedType === workHourTypes.DIRECT_SELECT && (
        <div className='space-y-3'>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Start Time</label>
              <select
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className='w-full rounded-lg border border-gray-200 p-2 text-sm'>
                {timeRanges.start.map((time) => (
                  <option key={time.value} value={time.label}>
                    {time.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>End Time</label>
              <select
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className='w-full rounded-lg border border-gray-200 p-2 text-sm'>
                {timeRanges.end.map((time) => (
                  <option key={time.value} value={time.label}>
                    {time.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
            onClick={handleTimeSelection}
            className='w-full py-2 px-4 bg-orange-500 text-white rounded-lg text-sm hover:bg-orange-600 transition-colors'>
            Add Time Range
          </button>
        </div>
      )}
    </div>
  );
}
