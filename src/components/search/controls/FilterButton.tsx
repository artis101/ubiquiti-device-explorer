

interface FilterButtonProps {
  onFilterOpen?: () => void;
}

export function FilterButton({ onFilterOpen }: FilterButtonProps) {
  return (
    <button
      onClick={onFilterOpen}
      className="px-1.5 py-1.5 rounded border-0 bg-transparent hover:bg-[#F4F5F6] active:bg-[#F9FAFA] active:color-[#006FFF] focus:outline-none focus:ring-1 focus:ring-[#006FFF] transition-colors"
      aria-label="Open filters"
    >
      <span className="text-sm font-normal text-[rgba(0,0,0,0.45)]">
        Filter
      </span>
    </button>
  );
}
