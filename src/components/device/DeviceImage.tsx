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
  imageSize: number;
}

export const DeviceImage = React.memo(
  ({ device, imageSize }: DeviceImageProps) => {
    const validImageSize = isImageSize(imageSize) ? imageSize : 256;
    const { src, srcSet, sizes } = useImageUrl({
      device,
      size: validImageSize,
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
  },
);

DeviceImage.displayName = "DeviceImage";
