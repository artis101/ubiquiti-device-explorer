import React, { createContext, useContext, useMemo } from "react";
import type { ConnectionInfo } from "@hooks/useConnectionStatus";
import { useUidb } from "@hooks/useUidb";
import type { NormalizedDevice, SchemaWarning, SearchHit } from "types/uidb";
import { LoadingScreen } from "@components/ui/LoadingScreen";
import { ErrorScreen } from "@components/ui/ErrorScreen";

import {
  filterByLine,
  filterByProductLines,
  searchDevices,
} from "@utils/search";

interface UidbContextType {
  devices: NormalizedDevice[];
  warnings: SchemaWarning[];
  connectionInfo: ConnectionInfo;
  refetch: () => void;
  filteredDevices: NormalizedDevice[];
  searchHits: Map<string, SearchHit>;
  devicesForProductLineFilter: NormalizedDevice[];
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

  const { filteredDevices, searchHits, devicesForProductLineFilter } =
    useMemo(() => {
      let filtered = devices;

      // Apply line filter first
      filtered = filterByLine(filtered, selectedLineId);

      // Keep devices filtered only by line and search (for product line dropdown)
      let devicesForProductLineFilter = filtered;

      // Apply product lines filter for main results
      filtered = filterByProductLines(filtered, selectedProductLines);

      if (searchQuery) {
        // Apply search to both sets
        const searchResults = searchDevices(filtered, searchQuery);
        const resultDevices = searchResults.map(
          (hit) => filtered.find((device) => device.id === hit.id)!
        );

        const searchHitMap = new Map<string, SearchHit>(
          searchResults.map((hit) => [hit.id, hit])
        );

        // Apply search to devices for product line filter too
        const searchResultsForFilter = searchDevices(
          devicesForProductLineFilter,
          searchQuery
        );
        const devicesForFilterWithSearch = searchResultsForFilter.map(
          (hit) =>
            devicesForProductLineFilter.find((device) => device.id === hit.id)!
        );

        return {
          filteredDevices: resultDevices,
          searchHits: searchHitMap,
          devicesForProductLineFilter: devicesForFilterWithSearch,
        };
      }

      return {
        filteredDevices: filtered,
        searchHits: new Map<string, SearchHit>(),
        devicesForProductLineFilter,
      };
    }, [devices, selectedLineId, selectedProductLines, searchQuery]);

  const contextValue = useMemo(
    () => ({
      devices,
      warnings,
      connectionInfo,
      refetch,
      filteredDevices,
      searchHits,
      devicesForProductLineFilter,
    }),
    [
      devices,
      warnings,
      connectionInfo,
      refetch,
      filteredDevices,
      searchHits,
      devicesForProductLineFilter,
    ]
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
