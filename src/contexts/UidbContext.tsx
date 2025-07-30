import React, { createContext, useContext, useMemo } from 'react';
import type { ConnectionInfo } from '@hooks/useConnectionStatus';
import { useUidb } from '@hooks/useUidb';
import type { NormalizedDevice, SchemaWarning, SearchHit } from 'types/uidb';
import { LoadingScreen } from '@components/ui/LoadingScreen';
import { ErrorScreen } from '@components/ui/ErrorScreen';
import { useUrlState } from '@hooks/useUrlState';
import { useDebounce } from '@hooks/useDebounce';
import { filterByLine, searchDevices } from '@utils/search';

interface UidbContextType {
  devices: NormalizedDevice[];
  warnings: SchemaWarning[];
  connectionInfo: ConnectionInfo;
  fetchData: () => Promise<void>;
  filteredDevices: NormalizedDevice[];
  searchHits: Map<string, SearchHit>;
}

const UidbContext = createContext<UidbContextType | undefined>(undefined);

export function UidbProvider({ children }: { children: React.ReactNode }) {
  const {
    devices,
    warnings,
    error,
    isLoading,
    fetchData,
    connectionInfo,
  } = useUidb();
  const { searchQuery, selectedLineId } = useUrlState();
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const { filteredDevices, searchHits } = useMemo(() => {
    const filtered = filterByLine(devices, selectedLineId);

    if (debouncedSearchQuery) {
      const searchResults = searchDevices(filtered, debouncedSearchQuery);
      const resultDevices = searchResults.map(
        (hit) => filtered.find((device) => device.id === hit.id)!
      );

      const searchHitMap = new Map<string, SearchHit>(
        searchResults.map((hit) => [hit.id, hit])
      );

      return {
        filteredDevices: resultDevices,
        searchHits: searchHitMap,
      };
    }

    return {
      filteredDevices: filtered,
      searchHits: new Map<string, SearchHit>(),
    };
  }, [devices, selectedLineId, debouncedSearchQuery]);

  const contextValue = useMemo(() => ({
    devices,
    warnings,
    connectionInfo,
    fetchData,
    filteredDevices,
    searchHits,
  }), [devices, warnings, connectionInfo, fetchData, filteredDevices, searchHits]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorScreen error={error} onRetry={fetchData} />;
  }

  return (
    <UidbContext.Provider value={contextValue}>
      {children}
    </UidbContext.Provider>
  );
}

export function useUidbData() {
  const context = useContext(UidbContext);
  if (context === undefined) {
    throw new Error('useUidbData must be used within a UidbProvider');
  }
  return context;
}
