import { SearchResultsCount, ViewModeSwitcher, FilterButton } from "./controls";
import { useUrlState } from "@hooks/useUrlState";
import { useUidbData } from "@hooks/useUidbData";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDebounce } from "@hooks/useDebounce";
import Fuse from "fuse.js";
import { Autocomplete } from "./Autocomplete";

export function SearchAndFilters() {
  const {
    searchQuery,
    selectedLineId,
    viewMode,
    selectedProductLines,
    updateState,
  } = useUrlState();
  const { devices, devicesForProductLineFilter } = useUidbData();
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  const debouncedSearchQuery = useDebounce(localSearchQuery, 300);

  const fuse = useMemo(() => {
    return new Fuse(devices, {
      keys: ["product.name"],
      threshold: 0.3,
    });
  }, [devices]);

  const suggestions = useMemo(() => {
    if (!localSearchQuery) {
      return [];
    }
    return fuse
      .search(localSearchQuery)
      .map((result) => {
        const product = result.item.product;
        if (!product?.name || !product?.abbrev) {
          return null;
        }
        return {
          id: result.item.id,
          name: product.name,
          abbrev: product.abbrev,
        };
      })
      .filter(
        (item): item is { id: string; name: string; abbrev: string } =>
          item !== null,
      )
      .slice(0, 5);
  }, [localSearchQuery, fuse]);

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

  const handleDeviceSelect = useCallback(
    (deviceId: string) => {
      updateState({ select: deviceId });
    },
    [updateState],
  );

  const handleViewModeChange = useCallback(
    (mode: "list" | "grid") => {
      updateState({ view: mode });
    },
    [updateState],
  );

  const handleFilterChange = useCallback(
    (selectedProductLines: string[]) => {
      updateState({ productLines: selectedProductLines });
    },
    [updateState],
  );

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between py-4 gap-4">
          {/* Left Side - Search and Device Count */}
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <Autocomplete
              searchQuery={localSearchQuery}
              onSearchChange={handleSearchChange}
              onDeviceSelect={handleDeviceSelect}
              suggestions={suggestions}
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
