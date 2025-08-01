import { Search } from "lucide-react";

interface SearchInputProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function SearchInput({ searchQuery, onSearchChange }: SearchInputProps) {
  return (
    <div className="w-full sm:w-80">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-ui-text-subtle" />
        </div>
        <input
          id="search"
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="block w-full h-8 pl-8 pr-3 border-0 rounded text-sm font-normal bg-search-bg-default placeholder-ui-text-subtle hover:bg-search-bg-hover focus:bg-search-bg-default active:bg-search-bg-active focus:outline-none focus:ring-1 focus:ring-icon-focus-ring transition-all duration-200"
          placeholder="Search"
          aria-label="Search devices"
        />
      </div>
    </div>
  );
}
