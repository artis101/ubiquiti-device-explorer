import React, { useMemo } from "react";
import { useUidb } from "@hooks/useUidb";
import type { SearchHit } from "types/uidb";
import { LoadingScreen } from "@components/ui/LoadingScreen";
import { ErrorScreen } from "@components/ui/ErrorScreen";

import {
  filterByLine,
  filterByProductLines,
  searchDevices,
} from "@utils/search";

import { UidbContext } from "./UidbContext";

export default function UidbProvider({
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
      const devicesFilteredByLine = filterByLine(devices, selectedLineId);
      const devicesForProductLineFilter = devicesFilteredByLine; // Keep this for the product line filter dropdown

      const devicesFilteredByProductLines = filterByProductLines(
        devicesFilteredByLine,
        selectedProductLines,
      );

      if (searchQuery) {
        const searchResults = searchDevices(
          devicesFilteredByProductLines,
          searchQuery,
        );
        const resultDevices = searchResults.map(
          (hit) =>
            devicesFilteredByProductLines.find((device) => device.id === hit.id)!,
        );

        const searchHitMap = new Map<string, SearchHit>(
          searchResults.map((hit) => [hit.id, hit]),
        );

        // Apply search to devices for product line filter if a search query exists
        const searchResultsForFilter = searchDevices(
          devicesForProductLineFilter,
          searchQuery,
        );
        const devicesForFilterWithSearch = searchResultsForFilter.map(
          (hit) =>
            devicesForProductLineFilter.find((device) => device.id === hit.id)!,
        );

        return {
          filteredDevices: resultDevices,
          searchHits: searchHitMap,
          devicesForProductLineFilter: devicesForFilterWithSearch,
        };
      }

      return {
        filteredDevices: devicesFilteredByProductLines,
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