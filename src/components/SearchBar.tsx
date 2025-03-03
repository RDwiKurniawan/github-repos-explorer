interface SearchBarProps {
  search: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchClick: () => void;
}

const SearchBar = ({ search, onSearchChange, onSearchClick }: SearchBarProps) => {
  return (
    <div className="w-full">
      <input
        type="text"
        className="w-full p-2 border rounded"
        placeholder="Enter username"
        value={search}
        onChange={onSearchChange}
      />
      <button className="w-full mt-2 bg-blue-500 text-white py-2 rounded" onClick={onSearchClick}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;

