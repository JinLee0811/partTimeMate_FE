import { ChangeEvent } from "react";

interface SearchInputProps {
  placeholder?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchInput({
  placeholder = "Search...",
  value,
  onChange,
}: SearchInputProps) {
  return (
    <div className='relative w-full'>
      <input
        type='text'
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className='w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none'
      />
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500'
        viewBox='0 0 24 24'
        fill='currentColor'>
        <path
          fillRule='evenodd'
          d='M10 2a8 8 0 1 1-4.906 14.32l-3.507 3.507a1 1 0 1 1-1.414-1.414l3.507-3.507A8 8 0 0 1 10 2Zm0 2a6 6 0 1 0 0 12A6 6 0 0 0 10 4Z'
          clipRule='evenodd'
        />
      </svg>
    </div>
  );
}
