import { useState, useEffect, useCallback } from "react";
import { useHeaderHeight } from "@hooks/useHeaderHeight";
import { useWindowDimensions } from "@hooks/useWindowDimensions";
import { ErrorBoundary } from "@components/ui/ErrorBoundary";
import { AppHeader } from "@components/layout/AppHeader";
import { DeviceList } from "@components/device/DeviceList";
import { DeviceDetails } from "@components/device/DeviceDetails";
import type { NormalizedDevice } from "types/uidb";
import { useUidbData } from "./contexts/UidbContext";
import type { UrlState } from "@hooks/useUrlState";

interface AppProps {
  searchQuery: string;
  selectedLineId?: string;
  imageSize: number;
  selectedDeviceId?: string;
  viewMode: "list" | "grid";
  updateState: (updates: Partial<UrlState>) => void;
}

function App({
  searchQuery,
  selectedLineId,
  imageSize,
  selectedDeviceId,
  viewMode,
  updateState,
}: AppProps) {
  const { devices, warnings, connectionInfo, filteredDevices, searchHits } =
    useUidbData();

  const [detailsDevice, setDetailsDevice] = useState<NormalizedDevice | null>(
    null,
  );

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

  const handleDeviceSelect = useCallback(
    (device: NormalizedDevice) => {
      setDetailsDevice(device);
      updateState({ select: device.id });
    },
    [updateState],
  );

  const handleCloseDetails = useCallback(() => {
    setDetailsDevice(null);
    updateState({ select: undefined });
  }, [updateState]);

  const handleSearchChange = useCallback(
    (query: string) => {
      updateState({ q: query });
    },
    [updateState],
  );

  const handleLineFilterChange = useCallback(
    (lineId?: string) => {
      updateState({ line: lineId });
    },
    [updateState],
  );

  const handleImageSizeChange = useCallback(
    (size: number) => {
      updateState({ size });
    },
    [updateState],
  );

  const handleViewModeChange = useCallback(
    (mode: "list" | "grid") => {
      updateState({ view: mode });
    },
    [updateState],
  );

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <AppHeader
          ref={headerRef}
          warnings={warnings}
          connectionInfo={connectionInfo}
          searchQuery={searchQuery}
          selectedLineId={selectedLineId}
          imageSize={imageSize}
          viewMode={viewMode}
          onSearchChange={handleSearchChange}
          onLineFilterChange={handleLineFilterChange}
          onImageSizeChange={handleImageSizeChange}
          onViewModeChange={handleViewModeChange}
        />

        {/* Main Content */}
        <main
          className="flex-1 min-h-0"
          style={{ height: `calc(100vh - ${headerHeight}px)` }}
        >
          <DeviceList
            devices={filteredDevices}
            imageSize={imageSize}
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
