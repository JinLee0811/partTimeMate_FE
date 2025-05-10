import { useState } from "react";

interface SelectChipsProps {
  options: string[];
  selected: string[];
  onSelect: (value: string) => void;
  allowCustom?: boolean;
}

export default function SelectChips({
  options,
  selected,
  onSelect,
  allowCustom,
}: SelectChipsProps) {
  const [customValue, setCustomValue] = useState("");

  const handleCustomAdd = () => {
    if (customValue.trim() !== "" && !selected.includes(customValue)) {
      onSelect(customValue);
      setCustomValue("");
    }
  };

  return (
    <div className='space-y-2'>
      {/* 기본 옵션 */}
      <div className='flex flex-wrap gap-2'>
        {options.map((option) => (
          <button
            key={option}
            className={`px-4 py-2 border rounded-full text-sm ${
              selected.includes(option)
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-gray-100 text-gray-700 border-gray-300"
            }`}
            onClick={() => onSelect(option)}
            type='button'>
            {option}
          </button>
        ))}
      </div>

      {/* 커스텀 추가 (Optional) */}
      {allowCustom && (
        <div className='flex space-x-2 mt-2'>
          <input
            type='text'
            value={customValue}
            onChange={(e) => setCustomValue(e.target.value)}
            placeholder='Add custom option...'
            className='border p-2 w-full rounded-md text-sm'
          />
          <button
            type='button'
            onClick={handleCustomAdd}
            className='bg-green-500 text-white px-4 py-2 rounded-md text-sm'>
            Add
          </button>
        </div>
      )}
    </div>
  );
}
