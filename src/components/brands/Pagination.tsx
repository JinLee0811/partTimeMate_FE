// src/components/Pagination.tsx
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  return (
    <div className='flex justify-center items-center mt-6'>
      <button
        className='px-4 py-2 border rounded-md text-gray-600 disabled:opacity-50'
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}>
        ◀
      </button>
      <span className='mx-4 text-gray-700'>
        {currentPage} / {totalPages}
      </span>
      <button
        className='px-4 py-2 border rounded-md text-gray-600 disabled:opacity-50'
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}>
        ▶
      </button>
    </div>
  );
}
