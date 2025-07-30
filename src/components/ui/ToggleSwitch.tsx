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
        <span className="text-sm font-medium text-[#212327] mr-2">{label}:</span>
      )}
      <div className="flex items-center space-x-1 bg-[#F4F5F6] rounded-lg p-1">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onValueChange(option.value)}
            className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
              selectedValue === option.value
                ? "bg-white text-[#006FFF] shadow-sm"
                : "text-[#808893] hover:bg-[#F4F5F6]"
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
