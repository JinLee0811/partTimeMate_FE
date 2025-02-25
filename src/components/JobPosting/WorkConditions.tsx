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

  // ----------------------------
  //   "To be discussed" 체크박스 핸들러
  // ----------------------------

  // 1) Work Period
  const handleWorkPeriodToBeDiscussedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      // 체크됨 -> "To be discussed"로 저장
      setFormData({ workPeriod: "To be discussed" });
    } else {
      // 체크 해제 -> 초기화(또는 이전 값 복원 로직)
      setFormData({ workPeriod: "" });
    }
  };

  // 2) Work Days
  const handleWorkDaysToBeDiscussedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setFormData({ workDays: ["To be discussed"] });
    } else {
      setFormData({ workDays: [] });
    }
  };

  // 3) Work Time
  const handleWorkHoursToBeDiscussedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      // 체크됨 -> 문자열 "To be discussed"로 저장
      setFormData({ workTime: "To be discussed" });
    } else {
      // 체크 해제 -> 다시 { start: null, end: null } 로
      setFormData({ workTime: { start: null, end: null } });
    }
  };

  // 4) Salary
  const handleSalaryToBeDiscussedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setFormData({ salary: "To be discussed" });
    } else {
      setFormData({ salary: "" });
    }
  };

  // 5) Benefits
  const handleBenefitsToBeDiscussedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setFormData({ benefits: ["To be discussed"] });
    } else {
      setFormData({ benefits: [] });
    }
  };

  // ----------------------------
  //   일반 핸들러
  // ----------------------------

  // Work Days나 Benefits 등 배열에 대한 일반 토글
  const handleCheckboxToggle = (key: "workDays" | "benefits", value: string) => {
    // 만약 현재가 "To be discussed"라면 다른 항목은 선택 불가
    // (UI에서 disabled 처리도 필요할 수 있음)
    const current = formData[key];
    if (Array.isArray(current)) {
      // 이미 "To be discussed"가 들어있으면 무시
      if (current.includes("To be discussed")) return;

      const isSelected = current.includes(value);
      const updated = isSelected ? current.filter((item) => item !== value) : [...current, value];
      setFormData({ [key]: updated });
    }
  };

  // Work Period 일반 선택
  const handleWorkPeriodSelect = (period: string) => {
    // 이미 "To be discussed" 상태라면 무시
    if (formData.workPeriod === "To be discussed") return;
    setFormData({ workPeriod: period });
  };

  // SalaryType 변경
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ [name]: value });
  };

  // Salary 숫자만 입력
  const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyNumbers = e.target.value.replace(/[^0-9]/g, "");
    setFormData({ salary: onlyNumbers });
  };

  // Work Hours DatePicker 변경
  const handleTimeChange = (date: Date | null, type: "start" | "end") => {
    // 이미 "To be discussed" 상태라면 무시
    if (formData.workTime === "To be discussed") return;

    // 기존 workTime 객체를 업데이트
    const newWorkTime = {
      ...formData.workTime,
      [type]: date,
    };
    setFormData({ workTime: newWorkTime });

    // start와 end 둘 중 하나라도 없으면 workHours에 "To be discussed" 저장
    if (!newWorkTime.start || !newWorkTime.end) {
      setFormData({ workHours: "To be discussed" });
      return;
    }

    const start = new Date(newWorkTime.start);
    const end = new Date(newWorkTime.end);
    const diffMs = end.getTime() - start.getTime();

    // 음수 차이나 유효하지 않은 경우에도 "To be discussed" 저장
    if (diffMs < 0) {
      setFormData({ workHours: "To be discussed" });
      return;
    }

    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const totalHours = hours + minutes / 60;

    setFormData({ workHours: totalHours });
  };

  // Benefits 사용자 정의 추가
  const handleAddBenefit = () => {
    const trimmedBenefit = formData.customBenefit.trim();
    if (!trimmedBenefit) return;
    // 이미 "To be discussed"인 상태라면 무시
    if (formData.benefits.includes("To be discussed")) return;

    if (!benefitsList.includes(trimmedBenefit)) {
      setBenefitsList([...benefitsList, trimmedBenefit]);
    }
    setFormData({
      benefits: [...formData.benefits, trimmedBenefit],
      customBenefit: "",
    });
  };

  return (
    <div className='space-y-4'>
      {/* ✅ 상단 섹션 제목 및 설명 */}
      <div className='bg-gray-100 p-4 rounded-lg'>
        <h2 className='text-xl font-bold text-blue-600'>Work Conditions</h2>
        <p className='text-gray-600 text-sm mt-1'>Who’s your ideal Part-time Mate?</p>
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
              className='p-2 border border-gray-300 rounded-md'
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
              className='p-2 border border-gray-300 rounded-md'
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
            className='p-2 border border-gray-300 rounded-md'
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
            onChange={(e) => setFormData({ customBenefit: e.target.value })}
            disabled={formData.benefits.includes("To be discussed")}
            className='p-2 border border-gray-300 rounded-md w-full'
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
