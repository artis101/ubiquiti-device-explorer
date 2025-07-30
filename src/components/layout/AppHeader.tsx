import { forwardRef } from "react";
import { WarningBanner } from "@components/ui/WarningBanner";
import { SearchAndFilters } from "@components/search/SearchAndFilters";
import { ConnectionStatusIndicator } from "@components/ui/ConnectionStatusIndicator";
import type { SchemaWarning } from "types/uidb";
import type { ConnectionInfo } from "@hooks/useConnectionStatus";

interface AppHeaderProps {
  warnings: SchemaWarning[];
  connectionInfo: ConnectionInfo;
  searchQuery: string;
  selectedLineId?: string;
  imageSize: number;
  viewMode: "list" | "grid";
  onSearchChange: (query: string) => void;
  onLineFilterChange: (lineId?: string) => void;
  onImageSizeChange: (size: number) => void;
  onViewModeChange: (mode: "list" | "grid") => void;
}

export const AppHeader = forwardRef<HTMLDivElement, AppHeaderProps>(
  (
    {
      warnings,
      connectionInfo,
      searchQuery,
      selectedLineId,
      imageSize,
      viewMode,
      onSearchChange,
      onLineFilterChange,
      onImageSizeChange,
      onViewModeChange,
    },
    ref,
  ) => {
    return (
      <div ref={ref}>
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-12">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                  <span className="text-white font-bold text-xs">U</span>
                </div>
                <h1 className="text-lg font-semibold text-gray-900">
                  UIDB Explorer
                </h1>
              </div>

              <ConnectionStatusIndicator connectionInfo={connectionInfo} />
            </div>
          </div>
        </header>

        {/* Warning Banner */}
        <WarningBanner warnings={warnings} />

        {/* Search and Filters */}
        <SearchAndFilters
          searchQuery={searchQuery}
          selectedLineId={selectedLineId}
          imageSize={imageSize}
          viewMode={viewMode}
          onSearchChange={onSearchChange}
          onLineFilterChange={onLineFilterChange}
          onImageSizeChange={onImageSizeChange}
          onViewModeChange={onViewModeChange}
        />
      </div>
    );
  },
);
