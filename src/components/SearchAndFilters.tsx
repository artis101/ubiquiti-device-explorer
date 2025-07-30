import { useState, useEffect } from "react";
import type { NormalizedDevice } from "../types/uidb";
import { getProductLines } from "../utils/uidb";

interface SearchAndFiltersProps {
  devices: NormalizedDevice[];
  searchQuery: string;
  selectedLineId?: string;
  imageSize: number;
  onSearchChange: (query: string) => void;
  onLineFilterChange: (lineId?: string) => void;
  onImageSizeChange: (size: number) => void;
}

const IMAGE_SIZES = [
  { value: 64, label: "Small (64px)" },
  { value: 128, label: "Medium (128px)" },
  { value: 256, label: "Large (256px)" },
  { value: 512, label: "Extra Large (512px)" },
];

export function SearchAndFilters({
  devices,
  searchQuery,
  selectedLineId,
  imageSize,
  onSearchChange,
  onLineFilterChange,
  onImageSizeChange,
}: SearchAndFiltersProps) {
  const [productLines, setProductLines] = useState<
    Array<{ id: string; name: string }>
  >([]);

  useEffect(() => {
    setProductLines(getProductLines(devices));
  }, [devices]);

  return (
    <div className="bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
          {/* Search Input */}
          <div className="flex-1 min-w-0">
            <label
              htmlFor="search"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Search devices
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                id="search"
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg text-sm bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-colors"
                placeholder="Search by name, SKU, aliases, or triplets..."
                aria-label="Search devices"
              />
            </div>
          </div>

          {/* Product Line Filter */}
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

          {/* Image Size Selector */}
          <div className="flex-shrink-0 min-w-48">
            <label
              htmlFor="image-size"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Image size
            </label>
            <select
              id="image-size"
              value={imageSize}
              onChange={(e) => onImageSizeChange(Number(e.target.value))}
              className="block w-full px-4 py-3 text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 rounded-lg bg-white transition-colors"
            >
              {IMAGE_SIZES.map((size) => (
                <option key={size.value} value={size.value}>
                  {size.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mt-6 flex items-center justify-between">
          <div className="text-lg font-semibold text-gray-900">
            {devices.length.toLocaleString()} device
            {devices.length !== 1 ? "s" : ""} found
          </div>
        </div>
      </div>
    </div>
  );
}
