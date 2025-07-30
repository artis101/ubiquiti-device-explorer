import { memo, useCallback } from "react";
import type { KeyboardEvent } from "react";
import type { NormalizedDevice, SearchHit } from "@types/uidb";
import { DeviceImage } from "@components/device/DeviceImage";
import { DeviceInfo } from "@components/device/DeviceInfo";

interface DeviceCardProps {
  device: NormalizedDevice;
  imageSize: number;
  onSelect: (device: NormalizedDevice) => void;
  isSelected: boolean;
  searchHit?: SearchHit;
}

function DeviceCardComponent({
  device,
  imageSize,
  onSelect,
  isSelected,
  searchHit,
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

  return (
    <div
      className={`bg-white border rounded-xl p-6 cursor-pointer transition-all duration-200 hover:shadow-xl hover:-translate-y-1 ${
        isSelected
          ? "border-blue-600 ring-2 ring-blue-600 ring-opacity-20 shadow-lg"
          : "border-gray-200 hover:border-blue-300"
      }`}
      onClick={handleSelect}
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-label={`Select device ${device.displayName}`}
      aria-pressed={isSelected}
    >
      <div className="flex items-start gap-6">
        <DeviceImage device={device} imageSize={imageSize} />
        <DeviceInfo device={device} searchHit={searchHit} />
      </div>
    </div>
  );
}

export const DeviceCard = memo(DeviceCardComponent);
