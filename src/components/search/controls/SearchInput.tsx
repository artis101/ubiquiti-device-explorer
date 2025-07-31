interface SearchInputProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function SearchInput({ searchQuery, onSearchChange }: SearchInputProps) {
  return (
    <div className="w-80">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
          <svg
            className="h-4 w-4 text-[rgba(0,0,0,0.45)]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          id="search"
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="block w-full h-8 pl-8 pr-3 border-0 rounded text-sm font-normal bg-[#F6F6F8] placeholder-[rgba(0,0,0,0.45)] hover:bg-[#F9FAFA] focus:outline-none focus:ring-1 focus:ring-[#006FFF] focus:bg-white active:bg-[#F4F5F6] transition-all duration-200"
          placeholder="Search"
          aria-label="Search devices"
        />
      </div>
    </div>
  );
}
