import React from "react";

const InputField = ({
  label,
  type,
  name,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}) => {
  return (
    <div>
      <label className='text-gray-800 text-sm mb-2 block'>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        className='bg-white border border-gray-300 w-full text-sm text-gray-800 pl-4 pr-10 py-2.5 rounded-md outline-blue-500'
      />
    </div>
  );
};

export default InputField;
