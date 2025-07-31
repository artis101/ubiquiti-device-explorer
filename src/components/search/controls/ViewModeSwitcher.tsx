import React from "react";

type ViewMode = "list" | "grid";

interface ViewModeSwitcherProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

export function ViewModeSwitcher({
  viewMode,
  onViewModeChange,
}: ViewModeSwitcherProps) {
  return (
    <div className="flex">
      {/* List View Button */}
      <button
        onClick={() => onViewModeChange("list")}
        className="p-1.5 rounded hover:bg-gray-50 transition-colors"
        aria-label="List view"
      >
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 20 20" 
          fill="none"
        >
          <g transform="translate(3, 3)">
            {/* List icon - 3 rows with squares and lines */}
            {/* Row 1 */}
            <rect x="0" y="0" width="3" height="3" fill="#838691" stroke="#838691" strokeWidth="1"/>
            <rect x="5" y="0.75" width="9" height="1.5" fill="#000000"/>
            
            {/* Row 2 */}
            <rect x="0" y="5" width="3" height="3" fill="#838691" stroke="#838691" strokeWidth="1"/>
            <rect x="5" y="5.75" width="9" height="1.5" fill="#000000"/>
            
            {/* Row 3 */}
            <rect x="0" y="10" width="3" height="3" fill="#838691" stroke="#838691" strokeWidth="1"/>
            <rect x="5" y="10.75" width="9" height="1.5" fill="#000000"/>
          </g>
        </svg>
      </button>
      
      {/* Grid View Button */}
      <button
        onClick={() => onViewModeChange("grid")}
        className="p-1.5 rounded hover:bg-gray-50 transition-colors"
        aria-label="Grid view"
      >
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 20 20" 
          fill="none"
        >
          <g transform="translate(3, 3)">
            {/* Grid icon - 2x2 grid of squares */}
            <rect x="0" y="0" width="6.5" height="6.5" fill="#838691"/>
            <rect x="7.5" y="0" width="6.5" height="6.5" fill="#838691"/>
            <rect x="0" y="7.5" width="6.5" height="6.5" fill="#838691"/>
            <rect x="7.5" y="7.5" width="6.5" height="6.5" fill="#838691"/>
          </g>
        </svg>
      </button>
    </div>
  );
}
