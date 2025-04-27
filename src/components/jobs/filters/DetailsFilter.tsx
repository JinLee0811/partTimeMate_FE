import React from "react";
import { details, employmentTypes, languagePreferences } from "../../../Mockdata/details";

interface DetailsFilterProps {
  selectedFilters: string[];
  setSelectedFilters: (filters: string[]) => void;
  canAddMoreFilters: boolean;
}

export default function DetailsFilter({
  selectedFilters,
  setSelectedFilters,
  canAddMoreFilters,
}: DetailsFilterProps) {
  const handleSelectFilter = (filter: string) => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter((f) => f !== filter));
      return;
    }

    if (!canAddMoreFilters) {
      return;
    }

    setSelectedFilters([...selectedFilters, filter]);
  };

  const FilterSection = ({ title, filters }: { title: string; filters: string[] }) => (
    <div className='space-y-3'>
      <h3 className='font-medium text-gray-900'>{title}</h3>
      <div className='grid grid-cols-3 gap-3'>
        {filters.map((filter) => {
          const isSelected = selectedFilters.includes(filter);
          return (
            <button
              key={filter}
              onClick={() => handleSelectFilter(filter)}
              className={`
                p-3 rounded-lg border text-sm transition-all
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
    </div>
  );

  return (
    <div className='space-y-6'>
      <FilterSection title='Employment Type' filters={employmentTypes} />
      <FilterSection title='Preferred Language' filters={languagePreferences} />
      <FilterSection title='Additional Options' filters={details} />
    </div>
  );
}
