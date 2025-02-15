// PostingInputField.tsx
import React from "react";

interface PostingInputFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
}

export default function PostingInputField({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder = "",
  required = false,
}: PostingInputFieldProps) {
  return (
    <div className='mb-4'>
      <label htmlFor={name} className='block text-sm font-medium text-gray-700 mb-1'>
        {label}
        {required && <span className='text-red-500 ml-1'>*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className='w-full p-2 border border-gray-300 rounded-md
                   focus:outline-none focus:ring-2 focus:ring-blue-500
                   transition-colors'
      />
    </div>
  );
}
