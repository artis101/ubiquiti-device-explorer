import {
  ImageSizeSelector,
  ProductLineFilter,
  SearchInput,
  SearchResultsCount,
  ViewModeSwitcher,
  FilterButton,
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
    <div className="bg-white">
      <div className="flex items-center justify-between px-8 py-4">
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
          <FilterButton />
        </div>
      </div>
      
      {/* Hidden components that are no longer visible but might be needed for functionality */}
      <div className="hidden">
        <ProductLineFilter
          selectedLineId={selectedLineId}
          onLineFilterChange={onLineFilterChange}
        />
        <ImageSizeSelector
          imageSize={imageSize}
          onImageSizeChange={onImageSizeChange}
        />
      </div>
    </div>
  );
}
