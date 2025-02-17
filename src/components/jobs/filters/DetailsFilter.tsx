import { details } from "../../../data/details";

interface DetailsFilterProps {
  selectedFilters: string[];
  setSelectedFilters: (filters: string[]) => void;
}

export default function DetailsFilter({ selectedFilters, setSelectedFilters }: DetailsFilterProps) {
  const handleSelect = (detail: string) => {
    setSelectedFilters(
      selectedFilters.includes(detail)
        ? selectedFilters.filter((f) => f !== detail)
        : [...selectedFilters, detail]
    );
  };

  return (
    <div className='border p-4 rounded-md mt-4'>
      <h3 className='font-bold text-lg mb-3'>Select Additional Details</h3>
      <ul className='text-gray-700 space-y-2'>
        {details.map((detail) => (
          <li
            key={detail}
            className={`cursor-pointer p-2 rounded transition ${
              selectedFilters.includes(detail) ? "bg-blue-500 text-white" : "hover:bg-gray-200"
            }`}
            onClick={() => handleSelect(detail)}>
            {detail}
          </li>
        ))}
      </ul>
    </div>
  );
}
