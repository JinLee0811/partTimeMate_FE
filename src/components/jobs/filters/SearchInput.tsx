import { FaSearch, FaTimes } from "react-icons/fa";

interface SearchInputProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearch: () => void;
  placeholder?: string;
}

export default function SearchInput({
  searchQuery,
  setSearchQuery,
  onSearch,
  placeholder = "Search...",
}: SearchInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className='relative'>
      <input
        type='text'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
      />
      <div className='absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2'>
        {searchQuery && (
          <button
            onClick={handleClearSearch}
            className='text-gray-400 hover:text-gray-600 transition-colors'>
            <FaTimes />
          </button>
        )}
        <button onClick={onSearch} className='text-gray-400 hover:text-gray-600 transition-colors'>
          <FaSearch />
        </button>
      </div>
    </div>
  );
}
