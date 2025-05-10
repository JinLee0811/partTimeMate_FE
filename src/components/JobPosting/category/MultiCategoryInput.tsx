import React from "react";

interface MultiCategoryInputProps {
  label: string;
  tempValue: string;
  addedItems: string[];
  placeholder?: string;
  suggestions: string[];
  onTempChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectSuggestion: (suggestion: string) => void;
  onRemoveItem: (item: string) => void;
}

const MultiCategoryInput: React.FC<MultiCategoryInputProps> = ({
  label,
  tempValue,
  addedItems,
  placeholder,
  suggestions,
  onTempChange,
  onSelectSuggestion,
  onRemoveItem,
}) => {
  return (
    <div>
      <label className='block text-sm font-medium text-gray-700 mb-1'>{label}</label>
      <input
        type='text'
        value={tempValue}
        onChange={onTempChange}
        placeholder={placeholder}
        className='p-2 border border-gray-300 rounded-md w-full'
      />
      {suggestions.length > 0 && tempValue.length > 0 && (
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
      {addedItems.length > 0 && (
        <ul className='mt-2 flex flex-wrap gap-2'>
          {addedItems.map((item, idx) => (
            <li key={idx} className='flex items-center bg-gray-200 rounded px-2 py-1 text-sm'>
              {item}
              <button
                onClick={() => onRemoveItem(item)}
                className='ml-2 text-red-500 hover:text-red-700'>
                x
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MultiCategoryInput;
