import { useUidbData } from "@contexts/UidbContext";

interface SearchResultsCountProps {
  searchQuery: string;
  selectedLineId?: string;
}

export function SearchResultsCount({
  searchQuery,
  selectedLineId,
}: SearchResultsCountProps) {
  const { devices, filteredDevices } = useUidbData();
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
