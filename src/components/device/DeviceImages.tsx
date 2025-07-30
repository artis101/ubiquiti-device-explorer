import React from "react";
import type { NormalizedDevice } from "types/uidb";
import { DeviceImageDisplay } from "./DeviceImageDisplay";

interface DeviceImagesProps {
  device: NormalizedDevice;
}

export const DeviceImages = React.memo(({ device }: DeviceImagesProps) => {
  return (
    <div className="bg-gray-100 p-4">
      <DeviceImageDisplay
        device={device}
        size={1024} // Large, full-width image
        className="w-full"
      />
    </div>
  );
});

DeviceImages.displayName = "DeviceImages";
