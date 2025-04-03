import useJobPostingStore from "../../store/jobPostingStore";
import RichTextEditor from "./RichTextEditor";

export default function JobDescription() {
  const { formData, updateFormData } = useJobPostingStore();

  const handleDescriptionChange = (value: string) => {
    updateFormData({ description: value });
  };

  return (
    <div className='space-y-8'>
      {/* Section Header */}
      <div className='border-b border-gray-200 pb-4'>
        <h3 className='text-lg font-semibold text-gray-900'>Job Description</h3>
        <p className='mt-1 text-sm text-gray-500'>
          Provide detailed information about the job role and requirements.
        </p>
      </div>

      <div>
        <label className='block text-sm font-medium text-gray-700 mb-2'>
          Description <span className='text-red-500'>*</span>
        </label>
        <div className='bg-gray-50 p-4 rounded-lg mb-4'>
          <h4 className='text-sm font-medium text-gray-700 mb-2'>Suggested Content:</h4>
          <ul className='text-sm text-gray-600 list-disc list-inside space-y-1'>
            <li>Job responsibilities and duties</li>
            <li>Required qualifications and experience</li>
            <li>Skills and competencies</li>
            <li>Benefits and perks</li>
            <li>Work environment and culture</li>
          </ul>
        </div>
        <RichTextEditor value={formData?.description || ""} onChange={handleDescriptionChange} />
      </div>
    </div>
  );
}
