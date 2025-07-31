import { useState, useEffect, useCallback, useRef } from "react";
import { useHeaderHeight } from "@hooks/useHeaderHeight";
import { useWindowDimensions } from "@hooks/useWindowDimensions";
import { ErrorBoundary } from "@components/ui/ErrorBoundary";
import { AppHeader } from "@components/layout/AppHeader";
import { SearchAndFilters } from "@components/search/SearchAndFilters";
import { DeviceList } from "@components/device/DeviceList";
import { DeviceDetails } from "@components/device/DeviceDetails";
import type { NormalizedDevice } from "types/uidb";
import { useUidbData } from "./contexts/UidbContext";
import type { UrlState } from "@hooks/useUrlState";

interface AppProps {
  searchQuery: string;
  selectedLineId?: string;
  selectedDeviceId?: string;
  viewMode: "list" | "grid";
  selectedProductLines: string[];
  updateState: (updates: Partial<UrlState>) => void;
}

function App({
  searchQuery,
  selectedLineId,
  selectedDeviceId,
  viewMode,
  selectedProductLines, // Used via UidbProvider for filtering
  updateState,
}: AppProps) {
  const {
    devices,
    warnings,
    connectionInfo,
    filteredDevices,
    searchHits,
    devicesForProductLineFilter,
  } = useUidbData();

  const [detailsDevice, setDetailsDevice] = useState<NormalizedDevice | null>(
    null
  );

  // Refs
  const deviceListRef = useRef<{ scrollToTop: () => void }>(null);

  // Custom hooks
  const { headerHeight, headerRef } = useHeaderHeight([warnings]);
  const { windowHeight, windowWidth } = useWindowDimensions();

  // Handle device selection from URL
  useEffect(() => {
    if (selectedDeviceId && devices.length > 0) {
      const device = devices.find((d) => d.id === selectedDeviceId);
      if (device) {
        setDetailsDevice(device);
      }
    }
  }, [selectedDeviceId, devices]);

  // Scroll to top when search query changes
  useEffect(() => {
    if (deviceListRef.current) {
      deviceListRef.current.scrollToTop();
    }
  }, [searchQuery, selectedLineId]); // Also scroll to top when line filter changes

  const handleDeviceSelect = useCallback(
    (device: NormalizedDevice) => {
      setDetailsDevice(device);
      updateState({ select: device.id });
    },
    [updateState]
  );

  const handleCloseDetails = useCallback(() => {
    setDetailsDevice(null);
    updateState({ select: undefined });
  }, [updateState]);

  const handleSearchChange = useCallback(
    (query: string) => {
      updateState({ q: query, productLines: [] });
    },
    [updateState]
  );

  const handleLineFilterChange = useCallback(
    (lineId?: string) => {
      updateState({ line: lineId });
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
    <ErrorBoundary>
      <div className="min-h-screen bg-white flex flex-col overflow-hidden">
        {/* Header */}
        <div ref={headerRef}>
          <AppHeader warnings={warnings} connectionInfo={connectionInfo} />

          {/* Search and Filters */}
          <SearchAndFilters
            searchQuery={searchQuery}
            selectedLineId={selectedLineId}
            viewMode={viewMode}
            devicesForProductLineFilter={devicesForProductLineFilter}
            selectedProductLines={selectedProductLines}
            onSearchChange={handleSearchChange}
            onLineFilterChange={handleLineFilterChange}
            onViewModeChange={handleViewModeChange}
            onFilterChange={handleFilterChange}
          />
        </div>

        {/* Main Content */}
        <main
          className="flex-1 min-h-0"
          style={{ height: `calc(100vh - ${headerHeight}px)` }}
        >
          <DeviceList
            ref={deviceListRef}
            devices={filteredDevices}
            selectedDeviceId={selectedDeviceId}
            onDeviceSelect={handleDeviceSelect}
            height={windowHeight - headerHeight}
            width={windowWidth}
            searchHits={searchHits}
            viewMode={viewMode}
          />
        </main>

        {/* Device Details Modal */}
        {detailsDevice && (
          <DeviceDetails device={detailsDevice} onClose={handleCloseDetails} />
        )}
      </div>
    </ErrorBoundary>
  );
}

export default App;
