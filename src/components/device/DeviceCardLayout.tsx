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

  const containerStyle = !isListLayout
    ? {
        width: `${imageSize + 48}px`,
        maxWidth: `${imageSize + 48}px`,
      }
    : {};

  return (
    <div
      className={`bg-white border cursor-pointer transition-all duration-200 ${
        isSelected
          ? "border-[var(--ui-blue-primary)] shadow-[var(--ui-shadow-card)]"
          : "border-[var(--ui-gray-200)] hover:bg-[var(--ui-gray-50)] hover:-translate-y-0.5"
      } ${
        isListLayout
          ? "p-2 w-full max-w-none mx-auto rounded-lg"
          : "p-2 flex flex-col items-center h-full rounded-lg hover:shadow-[var(--ui-shadow-card)]"
      }`}
      onClick={onSelect}
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-pressed={isSelected}
      style={{
        ...containerStyle,
        boxShadow: !isSelected ? "var(--ui-shadow-card)" : undefined,
      }}
    >
      <div
        className={
          isListLayout
            ? "flex items-start gap-2"
            : "flex flex-col items-center gap-2"
        }
      >
        {children}
      </div>
    </div>
  );
};

export const DeviceCardLayout = memo(DeviceCardLayoutComponent);
