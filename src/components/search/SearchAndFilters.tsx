import {
  SearchInput,
  SearchResultsCount,
  ViewModeSwitcher,
  FilterButton,
} from "./controls";
import { useUrlState } from "@hooks/useUrlState";
import { useUidbData } from "@hooks/useUidbData";
import { useCallback, useEffect, useState } from "react";
import { useDebounce } from "@hooks/useDebounce";

export function SearchAndFilters() {
  const {
    searchQuery,
    selectedLineId,
    viewMode,
    selectedProductLines,
    updateState,
  } = useUrlState();
  const { devicesForProductLineFilter } = useUidbData();
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  const debouncedSearchQuery = useDebounce(localSearchQuery, 300);

  useEffect(() => {
    if (debouncedSearchQuery !== searchQuery) {
      updateState({ q: debouncedSearchQuery, productLines: [] });
    }
  }, [debouncedSearchQuery, searchQuery, updateState]);

  useEffect(() => {
    setLocalSearchQuery(searchQuery);
  }, [searchQuery]);

  const handleSearchChange = useCallback((query: string) => {
    setLocalSearchQuery(query);
  }, []);

  const handleViewModeChange = useCallback(
    (mode: "list" | "grid") => {
      updateState({ view: mode });
    },
    [updateState]
  );

  const handleFilterChange = useCallback(
    (selectedProductLines: string[]) => {
      updateState({ productLines: selectedProductLines });
    },
    [updateState]
  );

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between py-4 gap-4">
          {/* Left Side - Search and Device Count */}
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <SearchInput
              searchQuery={localSearchQuery}
              onSearchChange={handleSearchChange}
            />
            <SearchResultsCount
              searchQuery={searchQuery}
              selectedLineId={selectedLineId}
            />
          </div>

          {/* Right Side - View Mode and Filter */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <ViewModeSwitcher
              viewMode={viewMode}
              onViewModeChange={handleViewModeChange}
            />
            <FilterButton
              onFilterChange={handleFilterChange}
              filteredDevices={devicesForProductLineFilter}
              selectedProductLines={selectedProductLines}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
