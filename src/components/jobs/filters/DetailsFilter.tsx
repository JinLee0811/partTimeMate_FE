import React, { useState } from "react";
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
  const [showMoreEmployment, setShowMoreEmployment] = useState<boolean>(false);
  const [showMoreLanguage, setShowMoreLanguage] = useState<boolean>(false);
  const [showMoreDetails, setShowMoreDetails] = useState<boolean>(false);

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

  const FilterSection = ({
    title,
    filters,
    showMore,
    setShowMore,
  }: {
    title: string;
    filters: string[];
    showMore: boolean;
    setShowMore: (show: boolean) => void;
  }) => (
    <div className='space-y-2 md:space-y-3'>
      <h3 className='font-medium text-xs md:text-base text-gray-900'>{title}</h3>
      <div className='grid grid-cols-2 md:grid-cols-3 gap-1 md:gap-3'>
        {filters.slice(0, showMore ? undefined : 3).map((filter) => {
          const isSelected = selectedFilters.includes(filter);
          return (
            <button
              key={filter}
              onClick={() => handleSelectFilter(filter)}
              className={`
                  p-2 md:p-3 rounded-md md:rounded-lg border text-xs md:text-sm transition-all
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
      {filters.length > 3 && (
        <button
          onClick={() => setShowMore(!showMore)}
          className={`
            py-1 md:py-2 px-2 md:px-4 rounded-md md:rounded-full border border-gray-200 text-xs md:text-sm whitespace-nowrap transition-all
            hover:border-orange-200 hover:bg-orange-50 text-orange-500 font-medium
          `}>
          {showMore ? "Show Less" : "Show More"}
        </button>
      )}
    </div>
  );

  return (
    <div className='space-y-4 md:space-y-6'>
      <FilterSection
        title='Employment Type'
        filters={employmentTypes}
        showMore={showMoreEmployment}
        setShowMore={setShowMoreEmployment}
      />
      <FilterSection
        title='Preferred Language'
        filters={languagePreferences}
        showMore={showMoreLanguage}
        setShowMore={setShowMoreLanguage}
      />
      <FilterSection
        title='Additional Options'
        filters={details}
        showMore={showMoreDetails}
        setShowMore={setShowMoreDetails}
      />
    </div>
  );
}
