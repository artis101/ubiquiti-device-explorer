import React from 'react';
import type { NormalizedDevice } from "types/uidb";
import { UI_IMAGES_BASE_URL, UI_IMAGES_SVC_URL, IMAGE_TYPES, IMAGE_QUALITY, type ImageType, type ImageSize } from '@config/constants';

interface UseImageUrlOptions {
  device: NormalizedDevice;
  size?: ImageSize;
  type?: ImageType;
}

export const useImageUrl = ({ device, size = 512, type }: UseImageUrlOptions) => {
  return React.useMemo(() => {
    // If specific type is requested, use it directly
    if (type && device.images?.[type]) {
      const hash = device.images[type];
      const baseUrl = `${UI_IMAGES_BASE_URL}/${device.id}/${type}/${hash}.png`;
      const encodedUrl = encodeURIComponent(baseUrl);
      return `${UI_IMAGES_SVC_URL}/?u=${encodedUrl}&w=${size}&q=${IMAGE_QUALITY}`;
    }

    // If no specific type, check all available image types in priority order
    for (const imageType of IMAGE_TYPES) {
      const hash = device.images?.[imageType];
      if (hash) {
        const baseUrl = `${UI_IMAGES_BASE_URL}/${device.id}/${imageType}/${hash}.png`;
        const encodedUrl = encodeURIComponent(baseUrl);
        return `${UI_IMAGES_SVC_URL}/?u=${encodedUrl}&w=${size}&q=${IMAGE_QUALITY}`;
      }
    }

    // Fallback to device.imageUrl if no specific images are found
    return device.imageUrl;
  }, [device, size, type]);
};