import InputField from "../../components/InputField";

interface BasicInfoProps {
  formData: {
    title: string;
    companyName: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function BasicInfo({ formData, handleChange }: BasicInfoProps) {
  return (
    <div className='space-y-4'>
      <h3 className='text-lg font-semibold text-gray-700'>Basic Info</h3>
      <InputField label='Job Title *' name='title' value={formData.title} onChange={handleChange} />
      <InputField
        label='Company Name *'
        name='companyName'
        value={formData.companyName}
        onChange={handleChange}
      />
    </div>
  );
}
