import { useEffect, useCallback, useRef } from "react";
import { useHeaderHeight } from "@hooks/useHeaderHeight";
import { ErrorBoundary } from "@components/ui/ErrorBoundary";
import { AppHeader } from "@components/layout/AppHeader";
import { SearchAndFilters } from "@components/search/SearchAndFilters";
import { DeviceList } from "@components/device/DeviceList";
import { DeviceDetails } from "@components/device/DeviceDetails";
import { useUidbData } from "./contexts/UidbContext";
import { useUrlState } from "@hooks/useUrlState";

function App() {
  const { warnings, connectionInfo } = useUidbData();
  const { selectedDeviceId, searchQuery, selectedLineId, updateState } =
    useUrlState();

  const deviceListRef = useRef<{ scrollToTop: () => void }>(null);

  const { headerHeight, headerRef } = useHeaderHeight([warnings]);

  useEffect(() => {
    if (deviceListRef.current) {
      deviceListRef.current.scrollToTop();
    }
  }, [searchQuery, selectedLineId]);

  const handleCloseDetails = useCallback(() => {
    updateState({ select: undefined });
  }, [updateState]);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-white flex flex-col overflow-hidden">
        <div ref={headerRef}>
          <AppHeader warnings={warnings} connectionInfo={connectionInfo} />
          <SearchAndFilters />
        </div>

        <main
          className="flex-1 min-h-0"
          style={{ height: `calc(100vh - ${headerHeight}px)` }}
        >
          <DeviceList ref={deviceListRef} height={window.innerHeight - headerHeight} />
        </main>

        {selectedDeviceId && (
          <DeviceDetails
            deviceId={selectedDeviceId}
            onClose={handleCloseDetails}
          />
        )}
      </div>
    </ErrorBoundary>
  );
}

export default App;
