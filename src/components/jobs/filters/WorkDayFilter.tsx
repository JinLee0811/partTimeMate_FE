import React, { useState } from "react";
import { workDayTypes, weeklyOptions, dayOptions } from "../../../data/workDays";

interface WorkDayFilterProps {
  selectedFilters: string[];
  setSelectedFilters: (filters: string[]) => void;
  canAddMoreFilters: boolean;
}

export default function WorkDayFilter({
  selectedFilters,
  setSelectedFilters,
  canAddMoreFilters,
}: WorkDayFilterProps) {
  const [selectedType, setSelectedType] = useState<string>(workDayTypes.SELECT_FROM_LIST);

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

  return (
    <div className='space-y-4'>
      <div className='flex items-center gap-1 text-sm text-gray-700'>
        <span>Work Days</span>
        <span className='text-gray-500'>({selectedFilters.length}/3)</span>
      </div>

      {/* Selection Type */}
      <div className='flex gap-6'>
        {Object.values(workDayTypes).map((type) => (
          <label key={type} className='flex items-center gap-2 cursor-pointer'>
            <div className='relative flex items-center'>
              <input
                type='radio'
                checked={selectedType === type}
                onChange={() => setSelectedType(type)}
                className='w-4 h-4 text-orange-500 border-gray-300 focus:ring-orange-500'
              />
              {selectedType === type && (
                <div className='absolute inset-0 flex items-center justify-center'>
                  <div className='w-2 h-2 bg-orange-500 rounded-full' />
                </div>
              )}
            </div>
            <span className='text-sm text-gray-700'>{type}</span>
          </label>
        ))}
      </div>

      {selectedType === workDayTypes.SELECT_FROM_LIST && (
        <div className='flex flex-wrap gap-2'>
          {weeklyOptions.map((option) => {
            const isSelected = selectedFilters.includes(option);
            return (
              <button
                key={option}
                onClick={() => handleSelectFilter(option)}
                className={`
                  py-2 px-4 rounded-full border text-sm whitespace-nowrap transition-all
                  ${
                    isSelected
                      ? "border-orange-500 bg-orange-50 text-orange-600 font-medium"
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

      {selectedType === workDayTypes.DIRECT_SELECT && (
        <div className='flex gap-2'>
          {dayOptions.map(({ key, label }) => {
            const isSelected = selectedFilters.includes(key);
            return (
              <button
                key={key}
                onClick={() => handleSelectFilter(key)}
                className={`
                  w-12 h-12 rounded-full border text-sm flex items-center justify-center transition-all
                  ${
                    isSelected
                      ? "border-orange-500 bg-orange-50 text-orange-600 font-medium"
                      : "border-gray-200 hover:border-orange-200 hover:bg-orange-50"
                  }
                  ${!isSelected && !canAddMoreFilters ? "opacity-50 cursor-not-allowed" : ""}
                `}>
                {label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
