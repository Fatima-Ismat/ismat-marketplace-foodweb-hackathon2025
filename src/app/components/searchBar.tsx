import { FaSearch } from 'react-icons/fa';

interface SearchBarProps {
  query: string;
  setQuery: (query: string) => void;
  onSearch: (query: string) => void; // Add onSearch prop
}

const SearchBar: React.FC<SearchBarProps> = ({ query, setQuery, onSearch }) => {
  const handleSearch = () => {
    onSearch(query); // Call the onSearch prop with the current query
  };

  return (
    <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="px-4 py-2 w-full outline-none"
      />
      <button
        onClick={handleSearch}
        className="px-4 py-2 bg-[#FF9F0D] text-white transition-colors rounded-[5px]"
      >
        <FaSearch />
      </button>
    </div>
  );
};

export default SearchBar;