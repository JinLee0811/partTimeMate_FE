import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  // 페이지 번호 목록을 생성하는 함수
  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    const delta = 2; // 현재 페이지 기준 앞뒤 2페이지씩 표시

    if (totalPages <= 7) {
      // 전체 페이지가 7 이하인 경우 모든 페이지 번호를 표시
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // 전체 페이지가 많은 경우
      pages.push(1);

      let left = Math.max(2, currentPage - delta);
      let right = Math.min(totalPages - 1, currentPage + delta);

      // 만약 현재 페이지가 앞쪽에 가까우면 오른쪽 범위를 확장
      if (currentPage - delta <= 2) {
        right = 5;
      }
      // 만약 현재 페이지가 끝에 가까우면 왼쪽 범위를 확장
      if (currentPage + delta >= totalPages - 1) {
        left = totalPages - 4;
      }

      if (left > 2) {
        pages.push("...");
      }
      for (let i = left; i <= right; i++) {
        pages.push(i);
      }
      if (right < totalPages - 1) {
        pages.push("...");
      }
      pages.push(totalPages);
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className='flex items-center justify-center space-x-2 mt-4'>
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className='px-3 py-1 bg-gray-200 rounded disabled:opacity-50'>
        Prev
      </button>

      {pageNumbers.map((item, index) => {
        if (typeof item === "number") {
          return (
            <button
              key={index}
              onClick={() => onPageChange(item)}
              className={`px-3 py-1 rounded ${
                item === currentPage
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}>
              {item}
            </button>
          );
        } else {
          // Ellipsis일 경우
          return (
            <span key={index} className='px-3 py-1 text-gray-500'>
              {item}
            </span>
          );
        }
      })}

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className='px-3 py-1 bg-gray-200 rounded disabled:opacity-50'>
        Next
      </button>
    </div>
  );
}
