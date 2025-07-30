import React from 'react';
import type { NormalizedDevice } from "types/uidb";
import { ImageWithFallback } from './ImageWithFallback';
import { DeviceImageContainer } from './DeviceImageContainer';
import { useImageUrl } from '@hooks/useImageUrl';

interface DeviceImageProps {
  device: NormalizedDevice;
  imageSize: number;
}

export const DeviceImage = React.memo(({ device, imageSize }: DeviceImageProps) => {
  const { src, srcSet, sizes } = useImageUrl({ device, size: imageSize });

  const errorHandlerOptions = {
    deviceName: device.displayName,
    deviceLineAbbrev: device.line?.abbrev,
    size: imageSize
  };

  return (
    <DeviceImageContainer>
      <ImageWithFallback
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        alt={device.displayName || 'Device'}
        width={imageSize}
        height={imageSize}
        className="object-contain"
        errorHandlerOptions={errorHandlerOptions}
      />
    </DeviceImageContainer>
  );
});

DeviceImage.displayName = 'DeviceImage';
