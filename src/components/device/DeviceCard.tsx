import { memo, useCallback } from "react";
import type { NormalizedDevice, SearchHit } from "types/uidb";
import { DeviceImage } from "@components/device/DeviceImage";
import { DeviceInfo } from "@components/device/DeviceInfo";
import { DeviceCardLayout } from "./DeviceCardLayout";

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

  return (
    <DeviceCardLayout
      isSelected={isSelected}
      layout={layout}
      imageSize={imageSize}
      onSelect={handleSelect}
    >
      <DeviceImage device={device} imageSize={imageSize} />
      <DeviceInfo device={device} searchHit={searchHit} layout={layout} />
    </DeviceCardLayout>
  );
}

export const DeviceCard = memo(DeviceCardComponent);
