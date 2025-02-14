import InputField from "../InputField";

export default function ApplicationMethod({ formData, handleChange }) {
  return (
    <div>
      <InputField
        label='Contact Name *'
        name='contactName'
        value={formData.contactName}
        onChange={handleChange}
      />
      <InputField
        label='Contact Phone *'
        name='contactPhone'
        value={formData.contactPhone}
        onChange={handleChange}
      />
    </div>
  );
}
