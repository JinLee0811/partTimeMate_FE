import InputField from "../../components/InputField";
import TextArea from "../../components/TextAreaBox";

interface CompanyDetailsProps {
  formData: {
    ceo: string;
    companyAddress: string;
    businessDetails: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export default function CompanyDetails({ formData, handleChange }: CompanyDetailsProps) {
  return (
    <div className='space-y-4'>
      <h3 className='text-lg font-semibold text-gray-700'>Company Details</h3>

      {/* 🔹 CEO Name */}
      <InputField label='CEO Name *' name='ceo' value={formData.ceo} onChange={handleChange} />

      {/* 🔹 Company Address */}
      <InputField
        label='Company Address *'
        name='companyAddress'
        value={formData.companyAddress}
        onChange={handleChange}
      />

      {/* 🔹 Business Details */}
      <TextArea
        label='Business Details *'
        name='businessDetails'
        value={formData.businessDetails}
        onChange={handleChange}
      />
    </div>
  );
}
