import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function WorkConditions() {
  const workDayOptions = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const employmentTypes = ["Part-time", "Contract", "Temporary", "Casual"];

  // ✅ 기본 복리후생 목록 (초기 값)
  const [benefitsList, setBenefitsList] = useState([
    "Flexible Hours",
    "Paid Leave",
    "Meal Allowance",
    "Bonus",
    "Insurance",
  ]);

  const [formData, setFormData] = useState({
    salary: "",
    salaryType: "hourly",
    workPeriod: { startDate: null, endDate: null },
    workHours: { start: null, end: null },
    workDays: [],
    employmentType: "Part-time",
    benefits: [],
    customBenefit: "",
  });

  // ✅ 급여 입력 (숫자만 허용)
  const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyNumbers = e.target.value.replace(/[^0-9]/g, "");
    setFormData((prev) => ({ ...prev, salary: onlyNumbers }));
  };

  // ✅ 일반 입력 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // ✅ 날짜 선택 핸들러
  const handleDateChange = (date: Date | null, type: "startDate" | "endDate") => {
    setFormData((prev) => ({
      ...prev,
      workPeriod: { ...prev.workPeriod, [type]: date },
    }));
  };

  // ✅ 근무 시간 선택 핸들러
  const handleTimeChange = (date: Date | null, type: "start" | "end") => {
    setFormData((prev) => ({
      ...prev,
      workHours: { ...prev.workHours, [type]: date },
    }));
  };

  // ✅ 버튼 토글 (WorkDays, Benefits)
  const handleToggle = (key: "workDays" | "benefits", value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((item) => item !== value)
        : [...prev[key], value],
    }));
  };

  // ✅ 사용자가 직접 입력한 복리후생 추가
  const handleAddBenefit = () => {
    const trimmedBenefit = formData.customBenefit.trim();
    if (trimmedBenefit && !benefitsList.includes(trimmedBenefit)) {
      setBenefitsList((prev) => [...prev, trimmedBenefit]); // ✅ 리스트에도 추가
      setFormData((prev) => ({
        ...prev,
        benefits: [...prev.benefits, trimmedBenefit], // ✅ 선택된 상태로 추가
        customBenefit: "",
      }));
    }
  };

  return (
    <div className='space-y-4'>
      <h3 className='text-lg font-semibold text-gray-700'>Work Conditions</h3>

      {/* ✅ Salary Type */}
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
      </select>

      {/* ✅ Salary 입력 필드 (기본적으로 $ 포함) */}
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
            required
            className='bg-white text-sm text-gray-800 pl-2 pr-4 py-1.5 w-full outline-none'
          />
        </div>
      </div>

      {/* ✅ Work Period (달력) */}
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

      {/* ✅ Work Hours (시간 선택) */}
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

      {/* ✅ Benefits (기본 제공 + 사용자 추가) */}
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
            onChange={(e) => setFormData((prev) => ({ ...prev, customBenefit: e.target.value }))}
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
