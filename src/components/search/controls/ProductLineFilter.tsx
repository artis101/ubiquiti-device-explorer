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
        className="block w-full px-3 py-2 text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-md bg-white transition-colors"
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
