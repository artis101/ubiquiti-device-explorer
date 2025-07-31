import { useState, useMemo, useEffect } from "react";
import { useProductLineData } from "@contexts/ProductLineContext";
import type { NormalizedDevice } from "types/uidb";

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
  const { productLines } = useProductLineData();
  const [selectedProductLines, setSelectedProductLines] = useState<string[]>(
    externalSelectedProductLines
  );
  const hasActiveFilters = selectedProductLines.length > 0;

  // Sync internal state with external state
  useEffect(() => {
    setSelectedProductLines(externalSelectedProductLines);
  }, [externalSelectedProductLines]);

  // Get product lines that are available in the current filtered results
  const availableProductLineIds = useMemo(() => {
    return new Set(filteredDevices.map((device) => device.lineId));
  }, [filteredDevices]);

  const handleCheckboxChange = (productLineId: string) => {
    const newSelectedProductLines = selectedProductLines.includes(productLineId)
      ? selectedProductLines.filter((id) => id !== productLineId)
      : [...selectedProductLines, productLineId];
    setSelectedProductLines(newSelectedProductLines);
    onFilterChange(newSelectedProductLines);
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
      {isOpen && (
        <div className="absolute z-50 mt-2 w-48 bg-white shadow-2xl rounded-md -left-36">
          <div className="p-3">
            <h3 className="text-sm font-medium text-gray-900">Product Line</h3>
          </div>
          <ul className="max-h-56 overflow-y-auto">
            {productLines.map((productLine) => {
              const isAvailable = availableProductLineIds.has(productLine.id);
              const isChecked = selectedProductLines.includes(productLine.id);
              return (
                <li key={productLine.id}>
                  <label
                    className={`flex items-center px-3 py-2 ${
                      !isAvailable ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                      checked={isChecked}
                      disabled={!isAvailable && !isChecked}
                      onChange={() => handleCheckboxChange(productLine.id)}
                    />
                    <span
                      className={`ml-3 text-sm ${
                        !isAvailable ? "text-gray-400" : "text-gray-700"
                      }`}
                    >
                      {productLine.name}
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>
          <div className="p-3">
            <button
              onClick={() => {
                setSelectedProductLines([]);
                onFilterChange([]);
              }}
              className={`text-left text-sm ${
                hasActiveFilters ? "text-reset-active" : "text-reset-default"
              } focus-visible:outline-1 focus-visible:outline-offset-1 focus-visible:outline-reset-active transition-colors duration-200`}
            >
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
