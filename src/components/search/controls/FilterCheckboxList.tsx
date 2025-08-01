import { useProductLineData } from "@hooks/useProductLineData";
import type { NormalizedDevice } from "types/uidb";
import type { ProductLine } from "@contexts/ProductLineTypes";

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
    <ul className="max-h-56 overflow-y-auto px-3 pt-2">
      {productLines.map((productLine: ProductLine) => {
        const isAvailable = availableProductLineIds.has(productLine.id);
        const isChecked = selectedProductLines.includes(productLine.id);
        return (
          <li key={productLine.id} className="pb-1">
            <label
              className={`inline-block cursor-pointer transition-colors
                ${
                  !isAvailable
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-ui-gray-50 focus-within:outline-1 focus-within:outline-ui-blue-primary focus-within:outline-offset-1 rounded p-0.5"
                }
              `}
            >
              <div className="flex items-center rounded-sm">
                <input
                  type="checkbox"
                  className="h-4 w-4 border-ui-gray-300 text-ui-blue-primary 
                    checked:bg-ui-blue-primary checked:border-ui-blue-primary
                    hover:border-ui-blue-primary
                    disabled:cursor-not-allowed disabled:opacity-50"
                  checked={isChecked}
                  disabled={!isAvailable && !isChecked}
                  onChange={() => onCheckboxChange(productLine.id)}
                />
                <span
                  className={`ml-3 text-sm ${
                    !isAvailable ? "text-ui-gray-300" : "text-ui-gray-700"
                  }`}
                >
                  {productLine.name}
                </span>
              </div>
            </label>
          </li>
        );
      })}
    </ul>
  );
}
