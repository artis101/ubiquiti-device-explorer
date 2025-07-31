import { useState } from "react";
import { useProductLineData } from "@contexts/ProductLineContext";

interface FilterButtonProps {
  onFilterChange: (selectedProductLines: string[]) => void;
}

export function FilterButton({ onFilterChange }: FilterButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { productLines } = useProductLineData();
  const [selectedProductLines, setSelectedProductLines] = useState<string[]>(
    []
  );

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
        <div className="absolute z-50 mt-2 w-48 bg-white shadow-lg rounded-md -left-36">
          <ul className="py-1">
            {productLines.map((productLine) => (
              <li key={productLine.id}>
                <label className="flex items-center px-3 py-2">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                    checked={selectedProductLines.includes(productLine.id)}
                    onChange={() => handleCheckboxChange(productLine.id)}
                  />
                  <span className="ml-3 text-sm text-gray-700">
                    {productLine.name}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
