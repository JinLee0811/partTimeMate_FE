interface ResetButtonProps {
  onReset: () => void;
}

export default function ResetButton({ onReset }: ResetButtonProps) {
  return (
    <button
      className='flex items-center text-sm text-gray-600 hover:text-red-500'
      onClick={onReset}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='w-5 h-5 mr-1 text-gray-500'
        viewBox='0 0 24 24'
        fill='currentColor'>
        <path
          fillRule='evenodd'
          d='M12 2a10 10 0 1 0 7.071 2.929l-1.414 1.414A8 8 0 1 1 4 12h3a1 1 0 0 1 0 2H2a1 1 0 0 1-1-1V8a1 1 0 1 1 2 0v2.243A10 10 0 0 0 12 2Z'
          clipRule='evenodd'
        />
      </svg>
      초기화
    </button>
  );
}
