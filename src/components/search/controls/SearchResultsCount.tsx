import { useUidbData } from "@hooks/useUidbData";

interface SearchResultsCountProps {
  searchQuery: string;
  selectedLineId?: string;
}

export function SearchResultsCount({
  searchQuery,
  selectedLineId,
}: SearchResultsCountProps) {
  const { devices, filteredDevices } = useUidbData();
  const count =
    searchQuery || selectedLineId ? filteredDevices.length : devices.length;

  return (
    <div className="hidden xs:block text-xs font-normal text-ui-gray-300 whitespace-nowrap">
      {count} Device{count !== 1 ? "s" : ""}
    </div>
  );
}
