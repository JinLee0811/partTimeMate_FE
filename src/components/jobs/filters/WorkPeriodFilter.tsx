import { workPeriods } from "../../../data/workPeriods";

interface WorkPeriodFilterProps {
  selectedFilters: string[];
  setSelectedFilters: (filters: string[]) => void;
}

export default function WorkPeriodFilter({
  selectedFilters,
  setSelectedFilters,
}: WorkPeriodFilterProps) {
  const handleSelect = (period: string) => {
    setSelectedFilters(
      selectedFilters.includes(period)
        ? selectedFilters.filter((f) => f !== period)
        : [...selectedFilters, period]
    );
  };

  return (
    <div className='border p-4 rounded-md mt-4'>
      <h3 className='font-bold text-lg mb-3'>Select Work Period</h3>
      <ul className='text-gray-700 space-y-2'>
        {workPeriods.map((period) => (
          <li
            key={period}
            className={`cursor-pointer p-2 rounded transition ${
              selectedFilters.includes(period) ? "bg-blue-500 text-white" : "hover:bg-gray-200"
            }`}
            onClick={() => handleSelect(period)}>
            {period}
          </li>
        ))}
      </ul>
    </div>
  );
}
