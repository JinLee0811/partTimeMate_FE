import InputField from "../InputField";

export default function RecruitmentConditions({ formData, handleChange }) {
  return (
    <div>
      <InputField
        label='Application Deadline *'
        name='deadline'
        value={formData.deadline}
        onChange={handleChange}
      />
      <InputField
        label='Education Level'
        name='education'
        value={formData.education}
        onChange={handleChange}
      />
      <InputField
        label='Number of Hires *'
        name='hiringCount'
        value={formData.hiringCount}
        onChange={handleChange}
      />
    </div>
  );
}
