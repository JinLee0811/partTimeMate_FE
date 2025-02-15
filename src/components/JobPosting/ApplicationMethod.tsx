import InputField from "../InputField";

export default function ApplicationMethod({ formData, handleChange, applicationMethods }) {
  return (
    <div className='space-y-4'>
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
      <InputField
        label='Contact Email *'
        name='contactEmail'
        value={formData.Email}
        onChange={handleChange}
      />
      <div>
        <label className='block text-sm font-medium text-gray-700'>Application Method *</label>
        <select
          name='applicationMethod'
          value={formData.applicationMethod}
          onChange={handleChange}
          className='w-full p-2 border border-gray-300 rounded-md'>
          <option value=''>Select Application Method</option>
          {applicationMethods.map((method) => (
            <option key={method} value={method}>
              {method}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
