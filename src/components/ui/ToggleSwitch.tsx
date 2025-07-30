import React, { memo } from "react";

type ToggleOption<T> = {
  value: T;
  label: React.ReactNode;
  "aria-label"?: string;
};

interface ToggleSwitchProps<T> {
  options: ToggleOption<T>[];
  selectedValue: T;
  onValueChange: (value: T) => void;
  label?: string;
}

function ToggleSwitchComponent<T extends string | number>({
  options,
  selectedValue,
  onValueChange,
  label,
}: ToggleSwitchProps<T>) {
  return (
    <div className="flex items-center">
      {label && (
        <span className="text-sm font-medium text-gray-700 mr-2">{label}:</span>
      )}
      <div className="flex items-center space-x-1 bg-gray-200 rounded-lg p-1">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onValueChange(option.value)}
            className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
              selectedValue === option.value
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-600 hover:bg-gray-300"
            }`}
            aria-label={option["aria-label"]}
            aria-pressed={selectedValue === option.value}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export const ToggleSwitch = memo(ToggleSwitchComponent) as <
  T extends string | number,
>(
  props: ToggleSwitchProps<T>,
) => React.ReactElement;
