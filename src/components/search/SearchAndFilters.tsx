import {
  SearchInput,
  SearchResultsCount,
  ViewModeSwitcher,
  FilterButton,
} from "./controls";
import { useUrlState } from "@hooks/useUrlState";
import { useUidbData } from "@contexts/UidbContext";
import { useCallback } from "react";

export function SearchAndFilters() {
  const {
    searchQuery,
    selectedLineId,
    viewMode,
    selectedProductLines,
    updateState,
  } = useUrlState();
  const { devicesForProductLineFilter } = useUidbData();

  const handleSearchChange = useCallback(
    (query: string) => {
      updateState({ q: query, productLines: [] });
    },
    [updateState]
  );

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
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between py-4">
          {/* Left Side - Search and Device Count */}
          <div className="flex items-center gap-4">
            <SearchInput
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
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
