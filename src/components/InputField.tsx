import React from "react";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

const InputField: React.FC<InputFieldProps> = ({ name, ...props }) => {
  return (
    <input
      name={name}
      className='w-full p-3 border rounded-lg mb-3 focus:border-green-500 focus:ring focus:ring-green-200'
      {...props} // 나머지 속성 전달
    />
  );
};

export default InputField;
