import {
  ImageSizeSelector,
  ProductLineFilter,
  SearchInput,
  SearchResultsCount,
  ViewModeSwitcher,
} from "./controls";

interface SearchAndFiltersProps {
  searchQuery: string;
  selectedLineId?: string;
  imageSize: number;
  viewMode: "list" | "grid";
  onSearchChange: (query: string) => void;
  onLineFilterChange: (lineId?: string) => void;
  onImageSizeChange: (size: number) => void;
  onViewModeChange: (mode: "list" | "grid") => void;
}

export function SearchAndFilters({
  searchQuery,
  selectedLineId,
  imageSize,
  viewMode,
  onSearchChange,
  onLineFilterChange,
  onImageSizeChange,
  onViewModeChange,
}: SearchAndFiltersProps) {
  return (
    <div className="bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <SearchInput
            searchQuery={searchQuery}
            onSearchChange={onSearchChange}
          />
          <ProductLineFilter
            selectedLineId={selectedLineId}
            onLineFilterChange={onLineFilterChange}
          />
        </div>

        <div className="mt-4 flex items-center justify-between">
          <SearchResultsCount
            searchQuery={searchQuery}
            selectedLineId={selectedLineId}
          />
          <div className="flex items-center gap-4">
            <ImageSizeSelector
              imageSize={imageSize}
              onImageSizeChange={onImageSizeChange}
            />
            <ViewModeSwitcher
              viewMode={viewMode}
              onViewModeChange={onViewModeChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
