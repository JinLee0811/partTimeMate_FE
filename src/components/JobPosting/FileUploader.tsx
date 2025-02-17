// FileUploader.tsx
import React from "react";

interface FileUploaderProps {
  onFileUpload: (file: File) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileUpload }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      onFileUpload(file);
    }
  };

  return (
    <div className='flex flex-col space-y-2'>
      <label className='text-sm'>Attach File (PDF, etc.)</label>
      <input
        className='text-sm border rounded-md p-2'
        type='file'
        accept='.pdf, .doc, .docx, image/*'
        onChange={handleFileChange}
      />
    </div>
  );
};

export default FileUploader;
