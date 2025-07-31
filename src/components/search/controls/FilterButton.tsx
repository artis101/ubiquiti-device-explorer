import { useState, useEffect } from "react";
import type { NormalizedDevice } from "types/uidb";
import { ProductLineDropdown } from "./ProductLineDropdown";
import { FilterDropdownHeader } from "./FilterDropdownHeader";
import { FilterCheckboxList } from "./FilterCheckboxList";
import { FilterResetButton } from "./FilterResetButton";

interface FilterButtonProps {
  onFilterChange: (selectedProductLines: string[]) => void;
  filteredDevices: NormalizedDevice[];
  selectedProductLines: string[];
}

export function FilterButton({
  onFilterChange,
  filteredDevices,
  selectedProductLines: externalSelectedProductLines,
}: FilterButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProductLines, setSelectedProductLines] = useState<string[]>(
    externalSelectedProductLines,
  );
  const hasActiveFilters = selectedProductLines.length > 0;

  useEffect(() => {
    setSelectedProductLines(externalSelectedProductLines);
  }, [externalSelectedProductLines]);

  const handleCheckboxChange = (productLineId: string) => {
    const newSelectedProductLines = selectedProductLines.includes(productLineId)
      ? selectedProductLines.filter((id) => id !== productLineId)
      : [...selectedProductLines, productLineId];
    setSelectedProductLines(newSelectedProductLines);
    onFilterChange(newSelectedProductLines);
  };

  const handleReset = () => {
    setSelectedProductLines([]);
    onFilterChange([]);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`px-1.5 py-1.5 rounded border-0 hover:bg-icon-hover-bg active:bg-icon-hover-bg focus:outline-none focus:ring-1 focus:ring-icon-focus-ring transition-colors ${
          isOpen
            ? "bg-icon-hover-bg text-icon-active"
            : "bg-transparent text-icon-default"
        }`}
        aria-label="Open filters"
      >
        <span className="text-sm font-normal">Filter</span>
      </button>
      <ProductLineDropdown isOpen={isOpen}>
        <FilterDropdownHeader title="Product Line" />
        <FilterCheckboxList
          filteredDevices={filteredDevices}
          selectedProductLines={selectedProductLines}
          onCheckboxChange={handleCheckboxChange}
        />
        <FilterResetButton
          hasActiveFilters={hasActiveFilters}
          onReset={handleReset}
        />
      </ProductLineDropdown>
    </div>
  );
}
