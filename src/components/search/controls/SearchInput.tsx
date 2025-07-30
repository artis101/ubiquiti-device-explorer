import React from 'react';

interface SearchInputProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function SearchInput({ searchQuery, onSearchChange }: SearchInputProps) {
  return (
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
  );
}
