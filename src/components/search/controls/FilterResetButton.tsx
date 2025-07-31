interface FilterResetButtonProps {
  hasActiveFilters: boolean;
  onReset: () => void;
}

export function FilterResetButton({
  hasActiveFilters,
  onReset,
}: FilterResetButtonProps) {
  return (
    <div className="p-3">
      <button
        onClick={onReset}
        className={`text-left text-sm ${
          hasActiveFilters ? "text-reset-active" : "text-reset-default"
        } focus-visible:outline-1 focus-visible:outline-offset-1 focus-visible:outline-reset-active transition-colors duration-200`}
      >
        Reset
      </button>
    </div>
  );
}
