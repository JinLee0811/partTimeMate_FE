import { FaUndo } from "react-icons/fa";

interface ResetButtonProps {
  onReset: () => void;
}

export default function ResetButton({ onReset }: ResetButtonProps) {
  return (
    <button
      onClick={onReset}
      className='flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors'>
      <FaUndo className='w-4 h-4' />
      Reset Filters
    </button>
  );
}
