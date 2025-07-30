import React from "react";
import { ImageWithFallback } from "./ImageWithFallback";
import type { NormalizedDevice } from "types/uidb";
import { useImageUrl } from "@hooks/useImageUrl";
import type { ImageSize } from "@config/constants";

interface DeviceImageDisplayProps {
  device: NormalizedDevice;
  size: ImageSize;
  className?: string;
}

export const DeviceImageDisplay = React.memo(
  ({ device, size, className = "" }: DeviceImageDisplayProps) => {
    const { src, srcSet, sizes } = useImageUrl({ device, size });

    const errorHandlerOptions = {
      deviceName: device.displayName,
      deviceLineAbbrev: device.line?.abbrev,
      size,
    };

    return (
      <ImageWithFallback
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        alt={device.displayName || "Device"}
        className={`w-full h-auto object-contain border border-gray-200 bg-white rounded-lg ${className}`}
        errorHandlerOptions={errorHandlerOptions}
      />
    );
  },
);

DeviceImageDisplay.displayName = "DeviceImageDisplay";
