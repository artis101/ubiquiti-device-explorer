import React, { createContext, useContext, useMemo } from "react";
import type { ConnectionInfo } from "@hooks/useConnectionStatus";
import { useUidb } from "@hooks/useUidb";
import type { NormalizedDevice, SchemaWarning, SearchHit } from "types/uidb";
import { LoadingScreen } from "@components/ui/LoadingScreen";
import { ErrorScreen } from "@components/ui/ErrorScreen";

import { useDebounce } from "@hooks/useDebounce";
import { filterByLine, filterByProductLines, searchDevices } from "@utils/search";

interface UidbContextType {
  devices: NormalizedDevice[];
  warnings: SchemaWarning[];
  connectionInfo: ConnectionInfo;
  refetch: () => void;
  filteredDevices: NormalizedDevice[];
  searchHits: Map<string, SearchHit>;
}

const UidbContext = createContext<UidbContextType | undefined>(undefined);

export function UidbProvider({
  children,
  searchQuery,
  selectedLineId,
  selectedProductLines,
}: {
  children: React.ReactNode;
  searchQuery: string;
  selectedLineId?: string;
  selectedProductLines: string[];
}) {
  const { devices, warnings, error, loading, refetch, connectionInfo } =
    useUidb();
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const { filteredDevices, searchHits } = useMemo(() => {
    let filtered = devices;
    
    // Apply line filter first
    filtered = filterByLine(filtered, selectedLineId);
    
    // Apply product lines filter
    filtered = filterByProductLines(filtered, selectedProductLines);

    if (debouncedSearchQuery) {
      const searchResults = searchDevices(filtered, debouncedSearchQuery);
      const resultDevices = searchResults.map(
        (hit) => filtered.find((device) => device.id === hit.id)!,
      );

      const searchHitMap = new Map<string, SearchHit>(
        searchResults.map((hit) => [hit.id, hit]),
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
  }, [devices, selectedLineId, selectedProductLines, debouncedSearchQuery]);

  const contextValue = useMemo(
    () => ({
      devices,
      warnings,
      connectionInfo,
      refetch,
      filteredDevices,
      searchHits,
    }),
    [devices, warnings, connectionInfo, refetch, filteredDevices, searchHits],
  );

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorScreen error={error} onRetry={refetch} />;
  }

  return (
    <UidbContext.Provider value={contextValue}>{children}</UidbContext.Provider>
  );
}

export function useUidbData() {
  const context = useContext(UidbContext);
  if (context === undefined) {
    throw new Error("useUidbData must be used within a UidbProvider");
  }
  return context;
}
