import { useHeaderHeight } from "@hooks/useHeaderHeight";
import { ErrorBoundary } from "@components/ui/ErrorBoundary";
import { AppHeader } from "@components/layout/AppHeader";
import { SearchAndFilters } from "@components/search/SearchAndFilters";
import { DeviceList } from "@components/device/list/DeviceList";
import { DeviceDetails } from "@components/device/details/DeviceDetails";
import { useUidbData } from "@hooks/useUidbData";
import { useWindowDimensions } from "@hooks/useWindowDimensions";
import { useUrlState } from "@hooks/useUrlState";

function App() {
  const { warnings, connectionInfo } = useUidbData();
  const { selectedDeviceId } = useUrlState();
  const { headerHeight, headerRef } = useHeaderHeight([
    warnings,
    selectedDeviceId,
  ]);
  const { windowHeight } = useWindowDimensions();

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-white flex flex-col overflow-hidden">
        <div ref={headerRef}>
          <AppHeader warnings={warnings} connectionInfo={connectionInfo} />
          {!selectedDeviceId && <SearchAndFilters />}
        </div>

        {selectedDeviceId && <DeviceDetails deviceId={selectedDeviceId} />}

        <main
          className="flex-1 min-h-0"
          style={{ height: `calc(100vh - ${headerHeight}px)` }}
          tabIndex={selectedDeviceId ? -1 : 0} // Allow focus for keyboard navigation
        >
          <DeviceList
            height={windowHeight - headerHeight}
            isInteractive={!selectedDeviceId}
          />
        </main>
      </div>
    </ErrorBoundary>
  );
}

export default App;
