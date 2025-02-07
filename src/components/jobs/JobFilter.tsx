import React from "react";

interface JobFilterProps {
  selectedFilter: string | null;
  setSelectedFilter: (filter: string | null) => void;
}

const JobFilter: React.FC<JobFilterProps> = ({ selectedFilter, setSelectedFilter }) => {
  const filters = ["Location", "Industry", "Work Conditions", "Detail Conditions"];

  return (
    <div className='flex gap-4 bg-white p-4 rounded-lg shadow'>
      {filters.map((filter) => (
        <button
          key={filter}
          className={`px-4 py-2 rounded-lg ${
            selectedFilter === filter ? "bg-gray-800 text-white" : "bg-gray-200"
          }`}
          onClick={() => setSelectedFilter(selectedFilter === filter ? null : filter)}>
          {filter}
        </button>
      ))}
    </div>
  );
};

export default JobFilter;
