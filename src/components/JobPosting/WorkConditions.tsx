import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useJobPostingStore from "../../store/jobPostingStore";
import { JobPostingData } from "../../types/jobPosting";

export default function WorkConditions() {
  const { formData, updateFormData } = useJobPostingStore();
  const [benefitsList, setBenefitsList] = useState<string[]>([
    "Flexible Hours",
    "Paid Leave",
    "Meal Allowance",
    "Bonus",
    "Insurance",
  ]);

  const workPeriods = [
    "More than 1 year",
    "6 months - 1 year",
    "3 months - 6 months",
    "1 month - 3 months",
    "1 week - 1 month",
    "Less than 1 week",
    "1 day",
  ];

  const workDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const salaryTypes = ["Hourly", "Daily", "Weekly", "Monthly"];

  const handleWorkPeriodToBeDiscussedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!formData) return;
    updateFormData({
      ...formData,
      workPeriod: e.target.checked ? "To be discussed" : "",
    });
  };

  const handleWorkDaysToBeDiscussedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!formData) return;
    updateFormData({
      ...formData,
      workDays: e.target.checked ? ["To be discussed"] : [],
    });
  };

  const handleWorkHoursToBeDiscussedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!formData) return;
    updateFormData({
      ...formData,
      workTime: e.target.checked ? "To be discussed" : "",
    });
  };

  const handleSalaryToBeDiscussedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!formData) return;
    updateFormData({
      ...formData,
      hourly_rate: e.target.checked ? 0 : formData.hourly_rate,
      isHourlyRateNegotiable: e.target.checked,
    });
  };

  const handleBenefitsToBeDiscussedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!formData) return;
    updateFormData({
      ...formData,
      benefits: e.target.checked ? ["To be discussed"] : [],
    });
  };

  const handleCheckboxToggle = (key: "workDays" | "benefits", value: string) => {
    if (!formData) return;
    const current = formData[key];
    if (Array.isArray(current)) {
      if (current.includes("To be discussed")) return;
      const isSelected = current.includes(value);
      const updated = isSelected ? current.filter((item) => item !== value) : [...current, value];
      updateFormData({
        ...formData,
        [key]: updated,
      });
    }
  };

  const handleWorkPeriodSelect = (period: string) => {
    if (!formData) return;
    if (formData.workPeriod === "To be discussed") return;
    updateFormData({
      ...formData,
      workPeriod: period,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    if (!formData) return;
    const { name, value } = e.target;
    updateFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!formData) return;
    const onlyNumbers = e.target.value.replace(/[^0-9]/g, "");
    updateFormData({
      ...formData,
      hourly_rate: Number(onlyNumbers),
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const handleTimeChange = (date: Date | null, type: "start" | "end") => {
    if (!formData) return;
    if (formData.workTime === "To be discussed") return;

    const selectedDays = formData.workDays || [];
    if (selectedDays.length === 0 || selectedDays.includes("To be discussed")) {
      return;
    }

    const currentWorkTime = typeof formData.workTime === "object" ? formData.workTime : {};
    const newWorkTime = {
      ...currentWorkTime,
      [type]: date ? formatTime(date) : "",
    };

    if (newWorkTime.start && newWorkTime.end) {
      const workTimeStr = selectedDays
        .map((day) => `${day} ${newWorkTime.start} - ${newWorkTime.end}`)
        .join("\n");

      updateFormData({
        ...formData,
        workTime: workTimeStr,
      });
    } else {
      updateFormData({
        ...formData,
        workTime: newWorkTime,
      });
    }
  };

  const handleAddBenefit = () => {
    if (!formData) return;
    const trimmedBenefit = formData.customBenefit?.trim() || "";
    if (!trimmedBenefit) return;
    if (formData.benefits.includes("To be discussed")) return;

    if (!benefitsList.includes(trimmedBenefit)) {
      setBenefitsList([...benefitsList, trimmedBenefit]);
    }
    updateFormData({
      ...formData,
      benefits: [...formData.benefits, trimmedBenefit],
      customBenefit: "",
    });
  };

  if (!formData) return null;

  return (
    <div className='space-y-4'>
      {/* ✅ 상단 섹션 제목 및 설명 */}
      <div className='bg-gray-100 p-4 rounded-lg'>
        <h2 className='text-xl font-bold text-blue-600'>Work Conditions</h2>
        <p className='text-gray-600 text-sm mt-1'>Who's your ideal Part-time Mate?</p>
      </div>

      {/* Work Period */}
      <div className='border border-gray-200 p-4 rounded-lg'>
        <label className='block text-sm font-bold text-gray-700 mb-2'>Work Period *</label>
        <div className='flex flex-wrap gap-2'>
          {workPeriods.map((period) => (
            <button
              key={period}
              type='button'
              onClick={() => handleWorkPeriodSelect(period)}
              className={`px-4 py-2 border rounded-md cursor-pointer text-sm ${
                formData.workPeriod === period
                  ? "bg-blue-600 text-white"
                  : "border-gray-300 text-gray-700"
              } ${
                formData.workPeriod === "To be discussed" ? "opacity-50 cursor-not-allowed" : ""
              }`}>
              {period}
            </button>
          ))}
        </div>

        {/* To be discussed 체크박스 */}
        <div className='mt-2 flex items-center'>
          <input
            type='checkbox'
            id='workPeriodDiscussed'
            checked={formData.workPeriod === "To be discussed"}
            onChange={handleWorkPeriodToBeDiscussedChange}
            className='mr-2'
          />
          <label htmlFor='workPeriodDiscussed' className='text-sm'>
            To be discussed
          </label>
        </div>
      </div>

      {/* Work Days */}
      <div className='border border-gray-200 p-4 rounded-lg'>
        <label className='block text-sm font-bold text-gray-700 mb-2'>Work Days *</label>
        <div className='flex flex-wrap gap-2'>
          {workDays.map((day) => (
            <button
              key={day}
              type='button'
              onClick={() => handleCheckboxToggle("workDays", day)}
              // 만약 "To be discussed"가 이미 체크되어 있다면 비활성화
              disabled={formData.workDays.includes("To be discussed")}
              className={`px-4 py-2 border rounded-md cursor-pointer text-sm ${
                formData.workDays.includes(day)
                  ? "bg-blue-600 text-white"
                  : "border-gray-300 text-gray-700"
              } ${
                formData.workDays.includes("To be discussed") ? "opacity-50 cursor-not-allowed" : ""
              }`}>
              {day}
            </button>
          ))}
        </div>

        {/* To be discussed 체크박스 */}
        <div className='mt-2 flex items-center'>
          <input
            type='checkbox'
            id='workDaysDiscussed'
            checked={formData.workDays.includes("To be discussed")}
            onChange={handleWorkDaysToBeDiscussedChange}
            className='mr-2'
          />
          <label htmlFor='workDaysDiscussed' className='text-sm'>
            To be discussed
          </label>
        </div>
      </div>

      {/* Work Hours */}
      <div className='border border-gray-200 p-4 rounded-lg'>
        <label className='block text-sm font-bold text-gray-700 mb-2'>Work Time *</label>

        {formData.workTime === "To be discussed" ? (
          <div className='text-sm text-gray-500'>
            (Start/End Time disabled because "To be discussed" is selected)
          </div>
        ) : (
          <div className='flex space-x-4 items-center'>
            <DatePicker
              selected={
                typeof formData.workTime === "object" && formData.workTime.start
                  ? new Date(formData.workTime.start)
                  : null
              }
              onChange={(date) => {
                if (typeof formData.workTime === "object") {
                  handleTimeChange(date, "start");
                }
              }}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={30}
              dateFormat='h:mm aa'
              placeholderText='Start Time'
              className={`p-2 border border-gray-300 rounded-md ${
                typeof formData.workTime === "string" && formData.workTime === "To be discussed"
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            />

            <DatePicker
              selected={
                typeof formData.workTime === "object" && formData.workTime.end
                  ? new Date(formData.workTime.end)
                  : null
              }
              onChange={(date) => {
                if (typeof formData.workTime === "object") {
                  handleTimeChange(date, "end");
                }
              }}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={30}
              dateFormat='h:mm aa'
              placeholderText='End Time'
              className={`p-2 border border-gray-300 rounded-md ${
                typeof formData.workTime === "string" && formData.workTime === "To be discussed"
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            />
          </div>
        )}

        {/* To be discussed 체크박스 */}
        <div className='mt-2 flex items-center'>
          <input
            type='checkbox'
            id='workHoursDiscussed'
            checked={formData.workTime === "To be discussed"}
            onChange={handleWorkHoursToBeDiscussedChange}
            className='mr-2'
          />
          <label htmlFor='workHoursDiscussed' className='text-sm'>
            To be discussed
          </label>
        </div>
      </div>

      {/* Salary */}
      <div className='border border-gray-200 p-4 rounded-lg'>
        <label className='block text-sm font-bold text-gray-700 mb-2'>Salary *</label>
        <div className='flex gap-2 items-center'>
          <select
            name='salaryType'
            value={formData.salaryType}
            onChange={handleChange}
            disabled={formData.salary === "To be discussed"}
            className='p-2 border border-gray-300 rounded-md'>
            {salaryTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          <input
            type='text'
            name='salary'
            value={formData.salary === "To be discussed" ? "" : formData.salary}
            onChange={handleSalaryChange}
            placeholder='Amount'
            disabled={formData.salary === "To be discussed"}
            className={`p-2 border border-gray-300 rounded-md ${
              formData.salary === "To be discussed" ? "opacity-50 cursor-not-allowed" : ""
            }`}
          />
        </div>

        {/* To be discussed 체크박스 */}
        <div className='mt-2 flex items-center'>
          <input
            type='checkbox'
            id='salaryDiscussed'
            checked={formData.salary === "To be discussed"}
            onChange={handleSalaryToBeDiscussedChange}
            className='mr-2'
          />
          <label htmlFor='salaryDiscussed' className='text-sm'>
            To be discussed
          </label>
        </div>
      </div>

      {/* Benefits (기본 제공 + 사용자 추가) */}
      <div className='border border-gray-200 p-4 rounded-lg'>
        <label className='text-gray-800 font-bold text-sm mb-2 block'>Benefits (Optional)</label>
        <div className='flex flex-wrap gap-2'>
          {benefitsList.map((benefit) => (
            <button
              key={benefit}
              type='button'
              onClick={() => handleCheckboxToggle("benefits", benefit)}
              disabled={formData.benefits.includes("To be discussed")}
              className={`px-3 py-1 rounded-full border ${
                formData.benefits.includes(benefit)
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-600 border-gray-300"
              } ${
                formData.benefits.includes("To be discussed") ? "opacity-50 cursor-not-allowed" : ""
              }`}>
              {benefit}
            </button>
          ))}
        </div>

        {/* 사용자 추가 Benefit 입력 */}
        <div className='flex mt-2 gap-2'>
          <input
            type='text'
            placeholder='Add custom benefit'
            value={formData.customBenefit}
            onChange={(e) => updateFormData({ customBenefit: e.target.value })}
            disabled={formData.benefits.includes("To be discussed")}
            className={`p-2 border border-gray-300 rounded-md w-full ${
              formData.benefits.includes("To be discussed") ? "opacity-50 cursor-not-allowed" : ""
            }`}
          />
          <button
            onClick={handleAddBenefit}
            disabled={formData.benefits.includes("To be discussed")}
            className='bg-blue-500 text-white px-3 py-1 rounded-md'>
            Add
          </button>
        </div>

        {/* To be discussed 체크박스 */}
        <div className='mt-2 flex items-center'>
          <input
            type='checkbox'
            id='benefitsDiscussed'
            checked={formData.benefits.includes("To be discussed")}
            onChange={handleBenefitsToBeDiscussedChange}
            className='mr-2'
          />
          <label htmlFor='benefitsDiscussed' className='text-sm'>
            To be discussed
          </label>
        </div>
      </div>
    </div>
  );
}
