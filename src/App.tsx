import { useState, useEffect, useMemo, useRef } from "react";
import { useUidb } from "./hooks/useUidb";
import { useUrlState } from "./hooks/useUrlState";
import { useDebounce } from "./hooks/useDebounce";
import { searchDevices, filterByLine } from "./utils/search";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { WarningBanner } from "./components/WarningBanner";
import { SearchAndFilters } from "./components/SearchAndFilters";
import { DeviceList } from "./components/DeviceList";
import { DeviceDetails } from "./components/DeviceDetails";
import { ConnectionStatusIndicator } from "./components/ConnectionStatusIndicator";
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
  const [headerHeight, setHeaderHeight] = useState(256);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const headerRef = useRef<HTMLDivElement>(null);

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

  // Calculate header height dynamically
  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    };

    updateHeaderHeight();

    const resizeObserver = new ResizeObserver(updateHeaderHeight);
    if (headerRef.current) {
      resizeObserver.observe(headerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [warnings]);

  // Track window height changes
  useEffect(() => {
    const updateWindowHeight = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener('resize', updateWindowHeight);

    return () => {
      window.removeEventListener('resize', updateWindowHeight);
    };
  }, []);

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
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white rounded-xl shadow-lg p-8">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Loading UIDB data...
          </h2>
          <p className="text-gray-600">Fetching device information</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white shadow-xl rounded-xl p-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="h-8 w-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Failed to load UIDB data
            </h3>
            <div className="text-gray-600 mb-6">
              <p>{error}</p>
            </div>
            <button
              onClick={refetch}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <div id="header" ref={headerRef}>
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
                        UIDB Agent
                      </h1>
                      <span className="text-sm text-gray-500 font-medium">
                        Internal Product Knowledge Explorer
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
            onSearchChange={handleSearchChange}
            onLineFilterChange={handleLineFilterChange}
            onImageSizeChange={handleImageSizeChange}
          />
        </div>

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
