import React from "react";
import { workPeriods } from "../../../data/workPeriods";

interface WorkPeriodFilterProps {
  selectedFilters: string[];
  setSelectedFilters: (filters: string[]) => void;
  canAddMoreFilters: boolean;
}

export default function WorkPeriodFilter({
  selectedFilters,
  setSelectedFilters,
  canAddMoreFilters,
}: WorkPeriodFilterProps) {
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
      {workPeriods.map((period) => {
        const isSelected = selectedFilters.includes(period);
        return (
          <button
            key={period}
            onClick={() => handleSelectFilter(period)}
            className={`
              p-3 rounded-lg border transition-all
              ${
                isSelected
                  ? "border-orange-500 bg-orange-50 text-orange-600 font-semibold"
                  : "border-gray-200 hover:border-orange-200 hover:bg-orange-50"
              }
              ${!isSelected && !canAddMoreFilters ? "opacity-50 cursor-not-allowed" : ""}
            `}>
            {period}
          </button>
        );
      })}
    </div>
  );
}
