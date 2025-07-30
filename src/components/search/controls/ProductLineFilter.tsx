import React from 'react';
import { useProductLineData } from '@contexts/ProductLineContext';

interface ProductLineFilterProps {
  selectedLineId?: string;
  onLineFilterChange: (lineId?: string) => void;
}

export function ProductLineFilter({ selectedLineId, onLineFilterChange }: ProductLineFilterProps) {
  const { productLines } = useProductLineData();

  return (
    <div className="flex-shrink-0 min-w-48">
      <label
        htmlFor="line-filter"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Filter by product line
      </label>
      <select
        id="line-filter"
        value={selectedLineId || ""}
        onChange={(e) => onLineFilterChange(e.target.value || undefined)}
        className="block w-full px-4 py-3 text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 rounded-lg bg-white transition-colors"
      >
        <option value="">All Product Lines</option>
        {productLines.map((line) => (
          <option key={line.id} value={line.id}>
            {line.name}
          </option>
        ))}
      </select>
    </div>
  );
}
