import {
  SearchInput,
  SearchResultsCount,
  ViewModeSwitcher,
  FilterButton,
} from "./controls";

import type { NormalizedDevice } from "types/uidb";

interface SearchAndFiltersProps {
  searchQuery: string;
  selectedLineId?: string;
  viewMode: "list" | "grid";
  devicesForProductLineFilter: NormalizedDevice[];
  selectedProductLines: string[];
  onSearchChange: (query: string) => void;
  onViewModeChange: (mode: "list" | "grid") => void;
  onFilterChange: (selectedProductLines: string[]) => void;
}

export function SearchAndFilters({
  searchQuery,
  selectedLineId,
  viewMode,
  devicesForProductLineFilter,
  selectedProductLines,
  onSearchChange,
  onViewModeChange,
  onFilterChange,
}: SearchAndFiltersProps) {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between py-4">
          {/* Left Side - Search and Device Count */}
          <div className="flex items-center gap-4">
            <SearchInput
              searchQuery={searchQuery}
              onSearchChange={onSearchChange}
            />
            <SearchResultsCount
              searchQuery={searchQuery}
              selectedLineId={selectedLineId}
            />
          </div>

          {/* Right Side - View Mode and Filter */}
          <div className="flex items-center gap-2">
            <ViewModeSwitcher
              viewMode={viewMode}
              onViewModeChange={onViewModeChange}
            />
            <FilterButton
              onFilterChange={onFilterChange}
              filteredDevices={devicesForProductLineFilter}
              selectedProductLines={selectedProductLines}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
