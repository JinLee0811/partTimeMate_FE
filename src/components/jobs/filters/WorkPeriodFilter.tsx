import React, { useState } from "react";
import { workPeriods } from "../../../Mockdata/workPeriods";
import { workDayTypes, weeklyOptions, dayOptions } from "../../../Mockdata/workDays";
import { workHourTypes, timeSlotOptions, timeRanges } from "../../../Mockdata/workHours";

interface WorkPeriodFilterProps {
  selectedPeriods: string[];
  setSelectedPeriods: (filters: string[]) => void;
  selectedDays: string[];
  setSelectedDays: (filters: string[]) => void;
  selectedHours: string[];
  setSelectedHours: (filters: string[]) => void;
}

export default function WorkPeriodFilter({
  selectedPeriods,
  setSelectedPeriods,
  selectedDays,
  setSelectedDays,
  selectedHours,
  setSelectedHours,
}: WorkPeriodFilterProps) {
  // 근무요일, 근무시간 선택 타입 상태
  const [selectedDayType, setSelectedDayType] = useState<string>(workDayTypes.SELECT_FROM_LIST);
  const [selectedHourType, setSelectedHourType] = useState<string>(workHourTypes.SELECT_FROM_LIST);
  const [startTime, setStartTime] = useState<string>("09:00");
  const [endTime, setEndTime] = useState<string>("17:00");

  // 근무기간 선택 핸들러
  const handlePeriodSelect = (period: string) => {
    if (selectedPeriods.includes(period)) {
      setSelectedPeriods(selectedPeriods.filter((p) => p !== period));
      return;
    }
    if (selectedPeriods.length < 6) {
      setSelectedPeriods([...selectedPeriods, period]);
    }
  };

  // 근무요일 선택 핸들러
  const handleDaySelect = (day: string) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
      return;
    }
    if (selectedDays.length < 3) {
      setSelectedDays([...selectedDays, day]);
    }
  };

  // 근무시간 선택 핸들러
  const handleHourSelect = (hour: string) => {
    if (selectedHours.includes(hour)) {
      setSelectedHours(selectedHours.filter((h) => h !== hour));
      return;
    }
    if (selectedHours.length < 3) {
      setSelectedHours([...selectedHours, hour]);
    }
  };

  // 시간 범위 추가 핸들러
  const handleTimeRangeAdd = () => {
    const timeRange = `${startTime}-${endTime}`;
    handleHourSelect(timeRange);
  };

  return (
    <div className='space-y-8'>
      {/* 근무기간 필터 */}
      <div className='space-y-4'>
        <div className='flex items-center gap-1 text-sm text-gray-700'>
          <span>Work Period</span>
          <span className='text-gray-500'>({selectedPeriods.length}/6)</span>
        </div>
        <div className='flex flex-wrap gap-2'>
          {workPeriods.map((period) => {
            const isSelected = selectedPeriods.includes(period);
            return (
              <button
                key={period}
                onClick={() => handlePeriodSelect(period)}
                className={`
                  py-2 px-4 rounded-full border text-sm whitespace-nowrap transition-all
                  ${
                    isSelected
                      ? "border-orange-500 bg-orange-50 text-orange-600 font-medium"
                      : "border-gray-200 hover:border-orange-200 hover:bg-orange-50"
                  }
                  ${!isSelected && selectedPeriods.length >= 6 ? "opacity-50 cursor-not-allowed" : ""}
                `}>
                {period}
              </button>
            );
          })}
        </div>
      </div>

      {/* 근무요일 필터 */}
      <div className='space-y-4'>
        <div className='flex items-center gap-1 text-sm text-gray-700'>
          <span>Work Days</span>
          <span className='text-gray-500'>({selectedDays.length}/3)</span>
        </div>
        <div className='flex gap-6'>
          {Object.values(workDayTypes).map((type) => (
            <label key={type} className='flex items-center gap-2 cursor-pointer'>
              <div className='relative flex items-center'>
                <input
                  type='radio'
                  checked={selectedDayType === type}
                  onChange={() => setSelectedDayType(type)}
                  className='w-4 h-4 text-orange-500 border-gray-300 focus:ring-orange-500'
                />
                {selectedDayType === type && (
                  <div className='absolute inset-0 flex items-center justify-center'>
                    <div className='w-2 h-2 bg-orange-500 rounded-full' />
                  </div>
                )}
              </div>
              <span className='text-sm text-gray-700'>{type}</span>
            </label>
          ))}
        </div>
        {selectedDayType === workDayTypes.SELECT_FROM_LIST && (
          <div className='flex flex-wrap gap-2'>
            {weeklyOptions.map((option) => {
              const isSelected = selectedDays.includes(option);
              return (
                <button
                  key={option}
                  onClick={() => handleDaySelect(option)}
                  className={`
                    py-2 px-4 rounded-full border text-sm whitespace-nowrap transition-all
                    ${
                      isSelected
                        ? "border-orange-500 bg-orange-50 text-orange-600 font-medium"
                        : "border-gray-200 hover:border-orange-200 hover:bg-orange-50"
                    }
                    ${!isSelected && selectedDays.length >= 3 ? "opacity-50 cursor-not-allowed" : ""}
                  `}>
                  {option}
                </button>
              );
            })}
          </div>
        )}
        {selectedDayType === workDayTypes.DIRECT_SELECT && (
          <div className='flex gap-2'>
            {dayOptions.map(({ key, label }) => {
              const isSelected = selectedDays.includes(key);
              return (
                <button
                  key={key}
                  onClick={() => handleDaySelect(key)}
                  className={`
                    w-12 h-12 rounded-full border text-sm flex items-center justify-center transition-all
                    ${
                      isSelected
                        ? "border-orange-500 bg-orange-50 text-orange-600 font-medium"
                        : "border-gray-200 hover:border-orange-200 hover:bg-orange-50"
                    }
                    ${!isSelected && selectedDays.length >= 3 ? "opacity-50 cursor-not-allowed" : ""}
                  `}>
                  {label}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 근무시간 필터 */}
      <div className='space-y-4'>
        <div className='flex items-center gap-1 text-sm text-gray-700'>
          <span>Work Hours</span>
          <span className='text-gray-500'>({selectedHours.length}/3)</span>
        </div>
        <div className='flex gap-6'>
          {Object.values(workHourTypes).map((type) => (
            <label key={type} className='flex items-center gap-2 cursor-pointer'>
              <div className='relative flex items-center'>
                <input
                  type='radio'
                  checked={selectedHourType === type}
                  onChange={() => setSelectedHourType(type)}
                  className='w-4 h-4 text-orange-500 border-gray-300 focus:ring-orange-500'
                />
                {selectedHourType === type && (
                  <div className='absolute inset-0 flex items-center justify-center'>
                    <div className='w-2 h-2 bg-orange-500 rounded-full' />
                  </div>
                )}
              </div>
              <span className='text-sm text-gray-700'>{type}</span>
            </label>
          ))}
        </div>
        {selectedHourType === workHourTypes.SELECT_FROM_LIST && (
          <div className='flex flex-wrap gap-2'>
            {timeSlotOptions.map((option) => {
              const isSelected = selectedHours.includes(option);
              return (
                <button
                  key={option}
                  onClick={() => handleHourSelect(option)}
                  className={`
                    py-2 px-4 rounded-full border text-sm whitespace-nowrap transition-all
                    ${
                      isSelected
                        ? "border-orange-500 bg-orange-50 text-orange-600 font-medium"
                        : "border-gray-200 hover:border-orange-200 hover:bg-orange-50"
                    }
                    ${!isSelected && selectedHours.length >= 3 ? "opacity-50 cursor-not-allowed" : ""}
                  `}>
                  {option}
                </button>
              );
            })}
          </div>
        )}
        {selectedHourType === workHourTypes.DIRECT_SELECT && (
          <div className='space-y-3'>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Start Time</label>
                <select
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className='w-full rounded-lg border border-gray-200 p-2 text-sm focus:border-orange-500 focus:ring-orange-500'>
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
                  className='w-full rounded-lg border border-gray-200 p-2 text-sm focus:border-orange-500 focus:ring-orange-500'>
                  {timeRanges.end.map((time) => (
                    <option key={time.value} value={time.label}>
                      {time.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button
              onClick={handleTimeRangeAdd}
              disabled={selectedHours.length >= 3}
              className={`
                w-full py-2 px-4 bg-orange-500 text-white rounded-lg text-sm hover:bg-orange-600 transition-colors
                ${selectedHours.length >= 3 ? "opacity-50 cursor-not-allowed" : ""}
              `}>
              Add Time Range
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
