import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useJobPostingStore } from "../../store/jobPostingStore";

export default function WorkConditions() {
  // 글로벌 스토어에서 formData와 setFormData를 직접 구독
  const { formData, setFormData } = useJobPostingStore();

  // Benefits 옵션은 로컬 상태에서 관리
  const [benefitsList, setBenefitsList] = useState<string[]>([
    "Flexible Hours",
    "Paid Leave",
    "Meal Allowance",
    "Bonus",
    "Insurance",
  ]);

  // workDayOptions와 employmentTypes를 컴포넌트 내부에서 정의
  const workDayOptions = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
    "To be discussed",
  ];

  const employmentTypes = [
    "Part-time",
    "Contract",
    "Temporary",
    "Casual",
    "To be discussed after interview",
  ];

  // 기본 onChange: 입력값 변화 시 store에 업데이트
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ [name]: value });
  };

  // 급여 입력 (숫자만 허용)
  const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyNumbers = e.target.value.replace(/[^0-9]/g, "");
    setFormData({ salary: onlyNumbers });
  };

  // 급여 협의 토글: 체크 시 급여 입력 필드를 비활성화 및 초기화
  const handleSalaryNegotiableToggle = () => {
    setFormData({
      salaryNegotiable: !formData.salaryNegotiable,
      salary: !formData.salaryNegotiable ? "" : formData.salary,
    });
  };

  // 날짜 선택 핸들러: workPeriod 업데이트
  const handleDateChange = (date: Date | null, type: "startDate" | "endDate") => {
    setFormData({
      workPeriod: { ...formData.workPeriod, [type]: date },
    });
  };

  // 근무 시간 선택 핸들러: workHours 업데이트
  const handleTimeChange = (date: Date | null, type: "start" | "end") => {
    setFormData({
      workHours: { ...formData.workHours, [type]: date },
    });
  };

  // 버튼 토글: workDays 및 benefits 업데이트
  const handleToggle = (key: "workDays" | "benefits", value: string) => {
    if (key === "workDays") {
      if (value === "To be discussed") {
        setFormData({ workDays: ["To be discussed"] });
        return;
      } else {
        // 다른 요일 선택 시, "To be discussed"가 있으면 제거
        setFormData({ workDays: formData.workDays.filter((day) => day !== "To be discussed") });
      }
    }
    setFormData({
      [key]: formData[key].includes(value)
        ? formData[key].filter((item: string) => item !== value)
        : [...formData[key], value],
    });
  };

  // 사용자가 직접 입력한 복리후생 추가
  const handleAddBenefit = () => {
    const trimmedBenefit = formData.customBenefit.trim();
    if (trimmedBenefit && !benefitsList.includes(trimmedBenefit)) {
      setBenefitsList([...benefitsList, trimmedBenefit]);
      setFormData({
        benefits: [...formData.benefits, trimmedBenefit],
        customBenefit: "",
      });
    }
  };

  return (
    <div className='space-y-4'>
      <h3 className='text-lg font-semibold text-gray-700'>Work Conditions</h3>

      {/* Salary Type */}
      <label className='block text-sm font-medium text-gray-700'>Salary Type</label>
      <select
        name='salaryType'
        value={formData.salaryType}
        onChange={handleChange}
        className='w-full p-2 border border-gray-300 rounded-md'>
        <option value='hourly'>Hourly</option>
        <option value='daily'>Daily</option>
        <option value='weekly'>Weekly</option>
        <option value='monthly'>Monthly</option>
        <option value='TBD'>To be discussed after interview</option>
      </select>

      {/* Salary 입력 필드 */}
      <div>
        <label className='text-gray-800 text-sm mb-2 block'>Salary *</label>
        <div className='flex items-center border border-gray-300 rounded-md p-2'>
          <span className='px-3 text-gray-600'>$</span>
          <input
            type='text'
            name='salary'
            value={formData.salary}
            onChange={handleSalaryChange}
            placeholder='Enter amount (e.g. 25)'
            required={!formData.salaryNegotiable}
            disabled={formData.salaryNegotiable}
            className='bg-white text-sm text-gray-800 pl-2 pr-4 py-1.5 w-full outline-none'
          />
        </div>
        <div className='mt-2'>
          <label className='inline-flex items-center'>
            <input
              type='checkbox'
              checked={formData.salaryNegotiable}
              onChange={handleSalaryNegotiableToggle}
              className='form-checkbox'
            />
            <span className='ml-2 text-sm text-gray-700'>
              Salary: To be discussed after interview
            </span>
          </label>
        </div>
      </div>

      {/* Work Period (달력) */}
      <div>
        <label className='text-gray-800 text-sm mb-2 block'>Work Period</label>
        <div className='flex space-x-2'>
          <DatePicker
            selected={formData.workPeriod.startDate}
            onChange={(date) => handleDateChange(date, "startDate")}
            placeholderText='Start Date'
            className='w-full p-2 border border-gray-300 rounded-md'
          />
          <DatePicker
            selected={formData.workPeriod.endDate}
            onChange={(date) => handleDateChange(date, "endDate")}
            placeholderText='End Date'
            className='w-full p-2 border border-gray-300 rounded-md'
          />
        </div>
      </div>

      {/* Work Hours (시간 선택) */}
      <div>
        <label className='text-gray-800 text-sm mb-2 block'>Work Hours *</label>
        <div className='flex space-x-2'>
          <DatePicker
            selected={formData.workHours.start}
            onChange={(date) => handleTimeChange(date, "start")}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={30}
            timeCaption='Start Time'
            dateFormat='h:mm aa'
            placeholderText='Start Time'
            className='w-full p-2 border border-gray-300 rounded-md'
          />
          <DatePicker
            selected={formData.workHours.end}
            onChange={(date) => handleTimeChange(date, "end")}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={30}
            timeCaption='End Time'
            dateFormat='h:mm aa'
            placeholderText='End Time'
            className='w-full p-2 border border-gray-300 rounded-md'
          />
        </div>
      </div>

      {/* Work Days (체크 버튼) */}
      <div>
        <label className='text-gray-800 text-sm mb-2 block'>Work Days</label>
        <div className='flex flex-wrap gap-2'>
          {workDayOptions.map((day) => (
            <button
              key={day}
              type='button'
              onClick={() => handleToggle("workDays", day)}
              className={`px-3 py-1 rounded-full border ${
                formData.workDays.includes(day)
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-600 border-gray-300"
              }`}>
              {day}
            </button>
          ))}
        </div>
      </div>

      {/* Employment Type (드롭다운 선택) */}
      <div>
        <label className='text-gray-800 text-sm mb-2 block'>Employment Type</label>
        <select
          name='employmentType'
          value={formData.employmentType}
          onChange={handleChange}
          className='w-full p-2 border border-gray-300 rounded-md'>
          <option value=''>Select employment type</option>
          {employmentTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Benefits (기본 제공 + 사용자 추가) */}
      <div>
        <label className='text-gray-800 text-sm mb-2 block'>Benefits (Optional)</label>
        <div className='flex flex-wrap gap-2'>
          {benefitsList.map((benefit) => (
            <button
              key={benefit}
              type='button'
              onClick={() => handleToggle("benefits", benefit)}
              className={`px-3 py-1 rounded-full border ${
                formData.benefits.includes(benefit)
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-600 border-gray-300"
              }`}>
              {benefit}
            </button>
          ))}
        </div>
        <div className='flex mt-2 gap-2'>
          <input
            type='text'
            placeholder='Add custom benefit'
            value={formData.customBenefit}
            onChange={(e) => setFormData({ customBenefit: e.target.value })}
            className='p-2 border border-gray-300 rounded-md w-full'
          />
          <button
            onClick={handleAddBenefit}
            className='bg-blue-500 text-white px-3 py-1 rounded-md'>
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
