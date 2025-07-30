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

  const containerStyle = !isListLayout ? { 
    width: `${imageSize + 48}px`,
    maxWidth: `${imageSize + 48}px`
  } : {};

  return (
    <div
      className={`bg-white border cursor-pointer transition-all duration-200 ${
        isSelected
          ? "border-[#006FFF] ring-1 ring-[#006FFF] ring-opacity-20 shadow-lg"
          : "border-[#EDEDF0] hover:bg-[#F4F5F6]"
      } ${
        isListLayout
          ? "p-6 w-full max-w-none mx-auto rounded-lg"
          : "p-4 flex flex-col items-center h-full rounded-lg hover:shadow-md"
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
