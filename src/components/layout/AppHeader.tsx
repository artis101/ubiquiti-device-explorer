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
        {/* Header - Matching Figma Design */}
        <header className="bg-white">
          <div className="max-w-none px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#006FFF] rounded-sm flex items-center justify-center">
                  <span className="text-white font-bold text-sm">U</span>
                </div>
                <h1 className="text-4xl font-bold text-[#006FFF]" style={{fontFamily: 'UI Sans, system-ui, sans-serif', lineHeight: '1.3333333333333333'}}>
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
