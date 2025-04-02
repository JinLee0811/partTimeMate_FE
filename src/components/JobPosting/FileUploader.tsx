import React, { ChangeEvent } from "react";

interface FileUploaderProps {
  onFileUpload: (file: File) => void;
  isSubmitting?: boolean;
}

export default function FileUploader({ onFileUpload, isSubmitting = false }: FileUploaderProps) {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      onFileUpload(e.target.files[0]);
    }
  };

  return (
    <div>
      <label className='block text-sm font-medium text-gray-700 mb-1'>
        Attach File (PNG or Image)
      </label>
      <input
        type='file'
        onChange={handleFileChange}
        disabled={isSubmitting}
        className={`w-full p-2 border border-gray-300 rounded-md
                   focus:outline-none focus:ring-2 focus:ring-blue-500
                   transition-colors ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
      />
      {isSubmitting && <p className='mt-2 text-sm text-gray-500'>Uploading...</p>}
    </div>
  );
}
