interface SelectedFiltersProps {
  selectedFilters: string[];
  onRemoveFilter: (filter: string) => void;
}

export default function SelectedFilters({ selectedFilters, onRemoveFilter }: SelectedFiltersProps) {
  return (
    <div className='flex flex-wrap gap-2 mt-4'>
      {selectedFilters.map((filter) => (
        <div key={filter} className='bg-gray-200 px-3 py-1 rounded-full flex items-center'>
          <span className='text-sm'>{filter}</span>
          <button
            onClick={() => onRemoveFilter(filter)}
            className='ml-2 text-gray-600 hover:text-red-500'>
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}
