import { forwardRef } from "react";
import { WarningBanner } from "@components/ui/WarningBanner";
import { SearchAndFilters } from "@components/search/SearchAndFilters";
import { ConnectionStatusIndicator } from "@components/ui/ConnectionStatusIndicator";
import type { NormalizedDevice, SchemaWarning } from "types/uidb";
import type { ConnectionInfo } from "@hooks/useConnectionStatus";

interface AppHeaderProps {
  warnings: SchemaWarning[];
  connectionInfo: ConnectionInfo;
  devices: NormalizedDevice[];
  filteredDevices: NormalizedDevice[];
  searchQuery: string;
  selectedLineId?: string;
  imageSize: number;
  onSearchChange: (query: string) => void;
  onLineFilterChange: (lineId?: string) => void;
  onImageSizeChange: (size: number) => void;
}

export const AppHeader = forwardRef<HTMLDivElement, AppHeaderProps>(
  (
    {
      warnings,
      connectionInfo,
      devices,
      filteredDevices,
      searchQuery,
      selectedLineId,
      imageSize,
      onSearchChange,
      onLineFilterChange,
      onImageSizeChange,
    },
    ref,
  ) => {
    return (
      <div ref={ref}>
        {/* Header */}
        <header className="bg-white shadow-lg border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              <div className="flex items-center">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-lg">U</span>
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                      UIDB Explorer
                    </h1>
                    <span className="text-sm text-gray-500 font-medium">
                      Internal Product Knowledge Browser
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <ConnectionStatusIndicator connectionInfo={connectionInfo} />
              </div>
            </div>
          </div>
        </header>

        {/* Warning Banner */}
        <WarningBanner warnings={warnings} />

        {/* Search and Filters */}
        <SearchAndFilters
          devices={devices}
          filteredDevices={filteredDevices}
          searchQuery={searchQuery}
          selectedLineId={selectedLineId}
          imageSize={imageSize}
          onSearchChange={onSearchChange}
          onLineFilterChange={onLineFilterChange}
          onImageSizeChange={onImageSizeChange}
        />
      </div>
    );
  },
);
