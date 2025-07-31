import { memo, useCallback } from "react";
import type { NormalizedDevice, SearchHit } from "types/uidb";
import { DeviceImage } from "@components/device/DeviceImage";
import { DeviceInfo } from "@components/device/DeviceInfo";
import { DeviceCardLayout } from "./DeviceCardLayout";

interface DeviceCardProps {
  device: NormalizedDevice;
  onSelect: (device: NormalizedDevice) => void;
  isSelected: boolean;
  searchHit?: SearchHit;
  layout?: "list" | "grid";
}

function DeviceCardComponent({
  device,
  onSelect,
  isSelected,
  searchHit,
  layout = "list",
}: DeviceCardProps) {
  const imageSize = 256; // Fixed image size
  const handleSelect = useCallback(() => {
    onSelect(device);
  }, [device, onSelect]);

  return (
    <DeviceCardLayout
      isSelected={isSelected}
      layout={layout}
      imageSize={imageSize}
      onSelect={handleSelect}
    >
      <DeviceImage device={device} />
      <DeviceInfo device={device} searchHit={searchHit} layout={layout} />
    </DeviceCardLayout>
  );
}

export const DeviceCard = memo(DeviceCardComponent);
