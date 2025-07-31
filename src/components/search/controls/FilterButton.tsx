import React, { useState } from "react";

interface FilterButtonProps {
  onFilterOpen?: () => void;
}

export function FilterButton({ onFilterOpen }: FilterButtonProps) {
  return (
    <button
      onClick={onFilterOpen}
      className="px-1.5 py-1.5 rounded border-0 bg-transparent hover:bg-gray-50 transition-colors"
      aria-label="Open filters"
    >
      <span className="text-sm font-normal text-[rgba(0,0,0,0.45)]">
        Filter
      </span>
    </button>
  );
}