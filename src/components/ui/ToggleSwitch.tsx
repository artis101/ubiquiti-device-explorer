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
        <span className="text-sm font-normal text-[var(--ui-text-primary)] mr-2">
          {label}:
        </span>
      )}
      <div className="flex items-center rounded-lg border border-[var(--ui-gray-200)] p-1">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onValueChange(option.value)}
            className={`px-2 py-1.5 text-sm font-normal rounded transition-all duration-200 ${
              selectedValue === option.value
                ? "bg-[var(--ui-gray-100)] text-[var(--ui-gray-700)]"
                : "text-[var(--ui-gray-500)] hover:bg-[var(--ui-gray-50)] active:bg-[var(--ui-gray-100)] focus:border-[var(--ui-blue-primary)]"
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
