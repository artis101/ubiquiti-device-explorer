import { useProductLineData } from "@contexts/ProductLineContext";
import type { NormalizedDevice } from "types/uidb";

interface FilterCheckboxListProps {
  filteredDevices: NormalizedDevice[];
  selectedProductLines: string[];
  onCheckboxChange: (productLineId: string) => void;
}

export function FilterCheckboxList({
  filteredDevices,
  selectedProductLines,
  onCheckboxChange,
}: FilterCheckboxListProps) {
  const { productLines } = useProductLineData();

  const availableProductLineIds = new Set(
    filteredDevices.map((device) => device.lineId),
  );

  return (
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
                className="form-checkbox h-4 w-4 text-checkbox-active transition duration-150 ease-in-out"
                checked={isChecked}
                disabled={!isAvailable && !isChecked}
                onChange={() => onCheckboxChange(productLine.id)}
              />
              <span
                className={`ml-3 text-sm ${
                  !isAvailable ? "text-text-disabled" : "text-text-primary"
                }`}
              >
                {productLine.name}
              </span>
            </label>
          </li>
        );
      })}
    </ul>
  );
}
