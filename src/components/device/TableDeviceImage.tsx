import React from "react";
import type { NormalizedDevice } from "types/uidb";
import { useImageUrl } from "@hooks/useImageUrl";

interface TableDeviceImageProps {
  device: NormalizedDevice;
}

export function TableDeviceImage({ device }: TableDeviceImageProps) {
  const { src } = useImageUrl({ device, size: 256 });

  return (
    <img
      src={src}
      alt={device.displayName || "Device"}
      width={20}
      height={20}
      className="object-contain"
      onError={(e) => {
        const img = e.target as HTMLImageElement;
        img.style.display = "none";
      }}
    />
  );
}
