import { Dispatch, SetStateAction } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { JobPostingData } from "../../types/jobPosting";

interface WorkConditionsProps {
  formData: JobPostingData;
  // <input> | <select> | <textarea> 모두 처리할 수 있도록 유니온 타입
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
  benefitsList: string[];
  setBenefitsList: Dispatch<SetStateAction<string[]>>;
  setFormData: Dispatch<SetStateAction<JobPostingData>>;
  workDayOptions: string[];
  employmentTypes: string[];
}

export default function WorkConditions({
  formData,
  handleChange,
  benefitsList,
  setFormData,
  setBenefitsList,
  workDayOptions,
  employmentTypes,
}: WorkConditionsProps) {
  // ✅ 급여 입력 (숫자만 허용)
  const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyNumbers = e.target.value.replace(/[^0-9]/g, "");
    setFormData((prev) => ({ ...prev, salary: onlyNumbers }));
  };

  // ✅ 급여 협의 토글: 체크 시 급여 입력 필드를 비활성화
  const handleSalaryNegotiableToggle = () => {
    setFormData((prev) => ({
      ...prev,
      salaryNegotiable: !prev.salaryNegotiable,
      salary: !prev.salaryNegotiable ? "" : prev.salary, // 토글 시 급여 입력 초기화
    }));
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
    if (key === "workDays") {
      if (value === "To be discussed") {
        // "To be discussed"가 선택되면 다른 요일은 모두 제거
        setFormData((prev) => ({ ...prev, workDays: ["To be discussed"] }));
        return;
      } else {
        // 다른 요일 선택 시 "To be discussed"가 있으면 제거
        setFormData((prev) => ({
          ...prev,
          workDays: prev.workDays.filter((day) => day !== "To be discussed"),
        }));
      }
    }
    setFormData((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((item: string) => item !== value)
        : [...prev[key], value],
    }));
  };

  // ✅ 사용자가 직접 입력한 복리후생 추가
  const handleAddBenefit = () => {
    const trimmedBenefit = formData.customBenefit.trim();
    if (trimmedBenefit && !benefitsList.includes(trimmedBenefit)) {
      setBenefitsList((prev) => [...prev, trimmedBenefit]); // 리스트에도 추가
      setFormData((prev) => ({
        ...prev,
        benefits: [...prev.benefits, trimmedBenefit], // 선택된 상태로 추가
        customBenefit: "",
      }));
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

      {/* Employment Types (드롭다운 선택) */}
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
