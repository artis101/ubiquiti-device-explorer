import React, { useState } from "react";
import type { NormalizedDevice } from "types/uidb";
import { DeviceImageDisplay } from "./DeviceImageDisplay";
import { ImageSizeSelector } from "./ImageSizeSelector";
import { ImageList } from "./ImageList";
import { DEFAULT_IMAGE_SIZE, type ImageSize } from "@config/constants";

interface DeviceImagesProps {
  device: NormalizedDevice;
}

export const DeviceImages = React.memo(({ device }: DeviceImagesProps) => {
  const [imageSize, setImageSize] = useState<ImageSize>(DEFAULT_IMAGE_SIZE);

  return (
    <div className="lg:w-1/2 p-6 bg-gray-50">
      <div className="text-center">
        <DeviceImageDisplay
          device={device}
          size={imageSize}
        />
        <ImageSizeSelector
          value={imageSize}
          onChange={setImageSize}
          className="mt-4 justify-center"
        />
      </div>

      <ImageList device={device} />
    </div>
  );
});

DeviceImages.displayName = 'DeviceImages';
