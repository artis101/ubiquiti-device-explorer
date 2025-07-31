import React from "react";
import type { NormalizedDevice } from "types/uidb";
import { ImageWithFallback } from "./ImageWithFallback";
import { DeviceImageContainer } from "./DeviceImageContainer";
import { useImageUrl } from "@hooks/useImageUrl";
import type { ImageSize } from "@config/constants";

function isImageSize(size: number): size is ImageSize {
  return [128, 256, 512, 1024].includes(size);
}

interface DeviceImageProps {
  device: NormalizedDevice;
}

export const DeviceImage = React.memo(({ device }: DeviceImageProps) => {
  const imageSize = 256; // Fixed image size
  const { src, srcSet, sizes } = useImageUrl({
    device,
    size: imageSize,
  });

  const errorHandlerOptions = {
    deviceName: device.displayName,
    deviceLineAbbrev: device.line?.abbrev,
    size: imageSize,
  };

  return (
    <DeviceImageContainer>
      <ImageWithFallback
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        alt={device.displayName || "Device"}
        width={imageSize}
        height={imageSize}
        className="object-contain"
        errorHandlerOptions={errorHandlerOptions}
      />
    </DeviceImageContainer>
  );
});

DeviceImage.displayName = "DeviceImage";
