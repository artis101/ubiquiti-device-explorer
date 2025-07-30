import React from 'react';
import type { NormalizedDevice } from 'types/uidb';

interface SearchResultsCountProps {
  devices: NormalizedDevice[];
  filteredDevices: NormalizedDevice[];
  searchQuery: string;
  selectedLineId?: string;
}

export function SearchResultsCount({ devices, filteredDevices, searchQuery, selectedLineId }: SearchResultsCountProps) {
  return (
    <div className="text-lg font-semibold text-gray-900">
      {searchQuery || selectedLineId ? (
        <>
          {filteredDevices.length.toLocaleString()}/
          {devices.length.toLocaleString()} device
          {devices.length !== 1 ? "s" : ""} found
        </>
      ) : (
        <>
          {devices.length.toLocaleString()} device
          {devices.length !== 1 ? "s" : ""} found
        </>
      )}
    </div>
  );
}
