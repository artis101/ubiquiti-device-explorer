import { memo, useCallback } from "react";
import type { KeyboardEvent } from "react";
import type { NormalizedDevice, SearchHit } from "types/uidb";
import { DeviceImage } from "@components/device/DeviceImage";
import { DeviceInfo } from "@components/device/DeviceInfo";

interface DeviceCardProps {
  device: NormalizedDevice;
  imageSize: number;
  onSelect: (device: NormalizedDevice) => void;
  isSelected: boolean;
  searchHit?: SearchHit;
  layout?: "list" | "grid";
}

function DeviceCardComponent({
  device,
  imageSize,
  onSelect,
  isSelected,
  searchHit,
  layout = "list",
}: DeviceCardProps) {
  const handleSelect = useCallback(() => {
    onSelect(device);
  }, [device, onSelect]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleSelect();
      }
    },
    [handleSelect]
  );

  const isListLayout = layout === "list";

  return (
    <div
      className={`bg-white border rounded-xl cursor-pointer transition-all duration-200 hover:shadow-xl hover:-translate-y-1 ${
        isSelected
          ? "border-blue-600 ring-2 ring-blue-600 ring-opacity-20 shadow-lg"
          : "border-gray-200 hover:border-blue-300"
      } ${
        isListLayout ? "p-4 w-full max-w-4xl mx-auto" : "p-3 flex flex-col items-center h-full"
      }`}
      onClick={handleSelect}
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-label={`Select device ${device.displayName}`}
      aria-pressed={isSelected}
      style={!isListLayout ? { width: `${imageSize + 48}px` } : {}}
    >
      <div
        className={isListLayout ? "flex items-start gap-6" : "flex flex-col items-center gap-3"}
      >
        <DeviceImage device={device} imageSize={imageSize} />
        <DeviceInfo device={device} searchHit={searchHit} layout={layout} />
      </div>
    </div>
  );
}

export const DeviceCard = memo(DeviceCardComponent);
