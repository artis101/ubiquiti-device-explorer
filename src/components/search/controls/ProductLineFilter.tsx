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
    <div className="flex-shrink-0 min-w-48">
      <select
        id="line-filter"
        value={selectedLineId || ""}
        onChange={(e) => onLineFilterChange(e.target.value || undefined)}
        className="block w-full px-3 py-3 text-sm font-normal border border-[var(--ui-gray-200)] focus:outline-none focus:border-[var(--ui-blue-primary)] focus:shadow-[0_0_0_1px_var(--ui-blue-primary)] hover:bg-[var(--ui-gray-50)] active:bg-[var(--ui-gray-100)] rounded-lg bg-white transition-all duration-200 text-[var(--ui-text-subtle)]"
      >
        <option value="" className="text-[var(--ui-text-subtle)]">Filter</option>
        {productLines.map((line) => (
          <option key={line.id} value={line.id} className="text-[var(--ui-text-muted)]">
            {line.name}
          </option>
        ))}
      </select>
    </div>
  );
}
