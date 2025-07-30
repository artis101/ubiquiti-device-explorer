import React from 'react';
import type { NormalizedDevice } from "types/uidb";
import { ImageWithFallback } from './ImageWithFallback';
import { DeviceImageContainer } from './DeviceImageContainer';

interface DeviceImageProps {
  device: NormalizedDevice;
  imageSize: number;
}

export const DeviceImage = React.memo(({ device, imageSize }: DeviceImageProps) => {
  const errorHandlerOptions = {
    deviceName: device.displayName,
    deviceLineAbbrev: device.line?.abbrev,
    size: imageSize
  };

  return (
    <DeviceImageContainer>
      {device.imageUrl && (
        <ImageWithFallback
          src={device.imageUrl}
          alt={device.displayName || 'Device'}
          width={imageSize}
          height={imageSize}
          className="object-contain"
          errorHandlerOptions={errorHandlerOptions}
        />
      )}
    </DeviceImageContainer>
  );
});

DeviceImage.displayName = 'DeviceImage';
