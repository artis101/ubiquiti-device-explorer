import { useProductLineData } from "@contexts/ProductLineContext";

interface ProductLineFilterProps {
  selectedLineId?: string;
  onLineFilterChange: (lineId?: string) => void;
}

export function ProductLineFilter({
  selectedLineId,
  onLineFilterChange,
}: ProductLineFilterProps) {
  const { productLines } = useProductLineData();

  return (
    <div className="flex-shrink-0 min-w-40">
      <select
        id="line-filter"
        value={selectedLineId || ""}
        onChange={(e) => onLineFilterChange(e.target.value || undefined)}
        className="block w-full px-3 py-2 text-sm border border-[#EDEDF0] focus:outline-none focus:ring-1 focus:ring-[#006FFF] focus:border-[#006FFF] rounded-lg bg-white transition-colors text-[#212327]"
      >
        <option value="">All Product Lines</option>
        {productLines.map((line) => (
          <option key={line.id} value={line.id}>
            {line.name}
          </option>
        ))}
      </select>
    </div>
  );
}
