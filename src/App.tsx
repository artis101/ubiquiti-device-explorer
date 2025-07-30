import { useState, useEffect, useMemo } from "react";
import { useUidb } from "./hooks/useUidb";
import { useUrlState } from "./hooks/useUrlState";
import { useDebounce } from "./hooks/useDebounce";
import { useHeaderHeight } from "./hooks/useHeaderHeight";
import { useWindowDimensions } from "./hooks/useWindowDimensions";
import { searchDevices, filterByLine } from "./utils/search";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { LoadingScreen } from "./components/LoadingScreen";
import { ErrorScreen } from "./components/ErrorScreen";
import { AppHeader } from "./components/AppHeader";
import { DeviceList } from "./components/DeviceList";
import { DeviceDetails } from "./components/DeviceDetails";
import type { NormalizedDevice } from "./types/uidb";
function App() {
  const { devices, warnings, loading, error, connectionInfo, refetch } =
    useUidb();
  const {
    searchQuery,
    selectedLineId,
    imageSize,
    selectedDeviceId,
    updateState,
  } = useUrlState();

  const [detailsDevice, setDetailsDevice] = useState<NormalizedDevice | null>(
    null
  );

  // Custom hooks
  const { headerHeight, headerRef } = useHeaderHeight([warnings]);
  const { windowHeight } = useWindowDimensions();

  // Debounce search query for better performance
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Filter and search devices
  const filteredDevices = useMemo(() => {
    const filtered = filterByLine(devices, selectedLineId);

    if (debouncedSearchQuery) {
      const searchResults = searchDevices(filtered, debouncedSearchQuery);
      return searchResults.map(
        (hit) => filtered.find((device) => device.id === hit.id)!
      );
    }

    return filtered;
  }, [devices, selectedLineId, debouncedSearchQuery]);

  // Handle device selection from URL
  useEffect(() => {
    if (selectedDeviceId && devices.length > 0) {
      const device = devices.find((d) => d.id === selectedDeviceId);
      if (device) {
        setDetailsDevice(device);
      }
    }
  }, [selectedDeviceId, devices]);

  const handleDeviceSelect = (device: NormalizedDevice) => {
    setDetailsDevice(device);
    updateState({ select: device.id });
  };

  const handleCloseDetails = () => {
    setDetailsDevice(null);
    updateState({ select: undefined });
  };

  const handleSearchChange = (query: string) => {
    updateState({ q: query });
  };

  const handleLineFilterChange = (lineId?: string) => {
    updateState({ line: lineId });
  };

  const handleImageSizeChange = (size: number) => {
    updateState({ size });
  };

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorScreen error={error} onRetry={refetch} />;
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <AppHeader
          ref={headerRef}
          warnings={warnings}
          connectionInfo={connectionInfo}
          devices={devices}
          filteredDevices={filteredDevices}
          searchQuery={searchQuery}
          selectedLineId={selectedLineId}
          imageSize={imageSize}
          onSearchChange={handleSearchChange}
          onLineFilterChange={handleLineFilterChange}
          onImageSizeChange={handleImageSizeChange}
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
