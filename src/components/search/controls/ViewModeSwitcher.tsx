import React from 'react';
import { List, Grid } from 'lucide-react';

interface ViewModeSwitcherProps {
  viewMode: 'list' | 'grid';
  onViewModeChange: (mode: 'list' | 'grid') => void;
}

export function ViewModeSwitcher({ viewMode, onViewModeChange }: ViewModeSwitcherProps) {
  return (
    <div className="flex items-center space-x-1 bg-gray-200 rounded-lg p-1">
      <button
        onClick={() => onViewModeChange('list')}
        className={`p-2 rounded-md transition-colors ${
          viewMode === 'list' ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:bg-gray-300"
        }`}
        aria-label="List view"
      >
        <List className="h-5 w-5" />
      </button>
      <button
        onClick={() => onViewModeChange('grid')}
        className={`p-2 rounded-md transition-colors ${
          viewMode === 'grid' ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:bg-gray-300"
        }`}
        aria-label="Grid view"
      >
        <Grid className="h-5 w-5" />
      </button>
    </div>
  );
}
