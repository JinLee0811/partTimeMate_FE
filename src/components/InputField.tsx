import React from "react";

interface InputFieldProps {
  label: string;
  type?: "text" | "number" | "password" | "email" | "tel" | "url"; // ✅ 기본값을 "text"로 설정
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void; // ✅ textarea도 지원
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  autoComplete?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder = "",
  disabled = false,
  className = "",
  autoComplete = "off",
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label className='text-gray-800 text-sm mb-2 block'>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        disabled={disabled}
        autoComplete={autoComplete}
        className={`bg-white border w-full text-sm text-gray-800 pl-4 pr-10 py-2.5 rounded-md outline-blue-500
          ${disabled ? "border-gray-300 bg-gray-100 cursor-not-allowed" : "border-gray-300"}
        `}
      />
    </div>
  );
};

export default InputField;
