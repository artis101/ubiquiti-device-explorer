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
  const count =
    searchQuery || selectedLineId ? filteredDevices.length : devices.length;

  return (
    <div className="text-xs font-normal text-[#BDBDBD]">
      {count} Device{count !== 1 ? "s" : ""}
    </div>
  );
}
