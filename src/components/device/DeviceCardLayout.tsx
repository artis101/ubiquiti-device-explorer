
import React, { type KeyboardEvent, memo } from "react";

interface DeviceCardLayoutProps {
  isSelected: boolean;
  layout: "list" | "grid";
  imageSize: number;
  onSelect: () => void;
  children: React.ReactNode;
}

const DeviceCardLayoutComponent = ({
  isSelected,
  layout,
  imageSize,
  onSelect,
  children,
}: DeviceCardLayoutProps) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect();
    }
  };

  const isListLayout = layout === "list";

  const containerStyle = !isListLayout ? { width: `${imageSize + 48}px` } : {};

  return (
    <div
      className={`bg-white border rounded-xl cursor-pointer transition-all duration-200 hover:shadow-xl hover:-translate-y-1 ${
        isSelected
          ? "border-blue-600 ring-2 ring-blue-600 ring-opacity-20 shadow-lg"
          : "border-gray-200 hover:border-blue-300"
      } ${
        isListLayout
          ? "p-4 w-full max-w-4xl mx-auto"
          : "p-3 flex flex-col items-center h-full"
      }`}
      onClick={onSelect}
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-pressed={isSelected}
      style={containerStyle}
    >
      <div
        className={
          isListLayout
            ? "flex items-start gap-6"
            : "flex flex-col items-center gap-3"
        }
      >
        {children}
      </div>
    </div>
  );
};

export const DeviceCardLayout = memo(DeviceCardLayoutComponent);
