import React from "react";
import LocationFilter from "./filters/LocationFilter";
import IndustryFilter from "./filters/IndustryFilter";
import WorkConditionFilter from "./filters/WorkConditionFilter";
import DetailConditionFilter from "./filters/DetailConditionFilter";

interface FilterContentProps {
  selectedFilter: string | null;
}

const FilterContent: React.FC<FilterContentProps> = ({ selectedFilter }) => {
  if (!selectedFilter) {
    return (
      <>
        <div className='flex justify-center gap-4 bg-white p-4 rounded-lg shadow'>
          <div className=' p-4 text-gray-500'>Select a filter to refine your job search.</div>
        </div>
      </>
    );
  }

  return (
    <div className='bg-white p-4 rounded-lg shadow-md'>
      {selectedFilter === "Location" && <LocationFilter />}
      {selectedFilter === "Industry" && <IndustryFilter />}
      {selectedFilter === "Work Conditions" && <WorkConditionFilter />}
      {selectedFilter === "Detail Conditions" && <DetailConditionFilter />}
    </div>
  );
};

export default FilterContent;
