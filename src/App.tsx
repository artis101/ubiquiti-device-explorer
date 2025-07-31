
import { useHeaderHeight } from "@hooks/useHeaderHeight";
import { ErrorBoundary } from "@components/ui/ErrorBoundary";
import { AppHeader } from "@components/layout/AppHeader";
import { SearchAndFilters } from "@components/search/SearchAndFilters";
import { DeviceList } from "@components/device/list/DeviceList";
// import { DeviceDetails } from "@components/device/DeviceDetails";
import { useUidbData } from "@hooks/useUidbData";
import { useWindowDimensions } from "@hooks/useWindowDimensions";


function App() {
  const { warnings, connectionInfo } = useUidbData();
  const { headerHeight, headerRef } = useHeaderHeight([warnings]);
  const { windowHeight } = useWindowDimensions();

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
          <DeviceList height={windowHeight - headerHeight} />
        </main>

        {/* {selectedDeviceId && (
          <DeviceDetails
            deviceId={selectedDeviceId}
            onClose={handleCloseDetails}
          />
        )} */}
      </div>
    </ErrorBoundary>
  );
}

export default App;
