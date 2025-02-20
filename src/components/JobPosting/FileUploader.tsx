import React, { ChangeEvent } from "react";

interface FileUploaderProps {
  onFileUpload: (file: File) => void;
}

export default function FileUploader({ onFileUpload }: FileUploaderProps) {
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
      <input type='file' onChange={handleFileChange} />
    </div>
  );
}
