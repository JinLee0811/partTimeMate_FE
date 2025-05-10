import React from "react";

interface SingleCategoryInputProps {
  label: string;
  value: string;
  placeholder?: string;
  suggestions: string[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectSuggestion: (suggestion: string) => void;
}

const SingleCategoryInput: React.FC<SingleCategoryInputProps> = ({
  label,
  value,
  placeholder,
  suggestions,
  onChange,
  onSelectSuggestion,
}) => {
  return (
    <div>
      <label className='block text-sm font-medium text-gray-700 mb-1'>{label}</label>
      <input
        type='text'
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className='w-full p-2 border border-gray-300 rounded-md'
      />
      {suggestions.length > 0 && value.length > 0 && (
        <ul className='mt-1 border border-gray-300 rounded-md bg-white shadow-md'>
          {suggestions.map((suggestion, idx) => (
            <li
              key={idx}
              onClick={() => onSelectSuggestion(suggestion)}
              className='p-2 cursor-pointer hover:bg-gray-100 border-b last:border-0'>
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SingleCategoryInput;
