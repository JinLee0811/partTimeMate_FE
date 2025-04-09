import React from "react";
import { details } from "../../../data/details";

interface DetailsFilterProps {
  selectedFilters: string[];
  setSelectedFilters: (filters: string[]) => void;
  canAddMoreFilters: boolean;
}

const detailFilters = [
  "주말근무",
  "주5일",
  "주4일",
  "주3일",
  "주2일",
  "주1일",
  "오전",
  "오후",
  "야간",
  "시간협의",
  "식사제공",
  "교통비지원",
  "유니폼제공",
  "기숙사제공",
];

export default function DetailsFilter({
  selectedFilters,
  setSelectedFilters,
  canAddMoreFilters,
}: DetailsFilterProps) {
  const handleSelectFilter = (filter: string) => {
    // 이미 선택된 필터인 경우 제거
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter((f) => f !== filter));
      return;
    }

    // 필터 제한에 도달한 경우 추가하지 않음
    if (!canAddMoreFilters) {
      return;
    }

    // 새로운 필터 추가
    setSelectedFilters([...selectedFilters, filter]);
  };

  return (
    <div className='grid grid-cols-3 gap-4'>
      {detailFilters.map((filter) => {
        const isSelected = selectedFilters.includes(filter);
        return (
          <button
            key={filter}
            onClick={() => handleSelectFilter(filter)}
            className={`
              p-3 rounded-lg border transition-all
              ${
                isSelected
                  ? "border-orange-500 bg-orange-50 text-orange-600 font-semibold"
                  : "border-gray-200 hover:border-orange-200 hover:bg-orange-50"
              }
              ${!isSelected && !canAddMoreFilters ? "opacity-50 cursor-not-allowed" : ""}
            `}>
            {filter}
          </button>
        );
      })}
    </div>
  );
}
