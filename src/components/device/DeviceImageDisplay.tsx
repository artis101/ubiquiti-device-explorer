import React from 'react';
import { ImageWithFallback } from './ImageWithFallback';
import type { NormalizedDevice } from "types/uidb";
import { useImageUrl } from '@hooks/useImageUrl';
import type { ImageSize } from '@config/constants';

interface DeviceImageDisplayProps {
  device: NormalizedDevice;
  size: ImageSize;
  className?: string;
  style?: React.CSSProperties;
}

export const DeviceImageDisplay = React.memo(({
  device,
  size,
  className = "",
  style
}: DeviceImageDisplayProps) => {
  const imageUrl = useImageUrl({ device, size });
  
  const errorHandlerOptions = {
    deviceName: device.displayName,
    deviceLineAbbrev: device.line?.abbrev,
    size
  };

  return (
    <div className={`text-center ${className}`}>
      <ImageWithFallback
        src={imageUrl}
        alt={device.displayName || 'Device'}
        width={size}
        height={size}
        className="max-w-full h-auto mx-auto border border-gray-200 rounded-lg"
        style={{
          maxHeight: "400px",
          ...style
        }}
        errorHandlerOptions={errorHandlerOptions}
      />
    </div>
  );
});

DeviceImageDisplay.displayName = 'DeviceImageDisplay';