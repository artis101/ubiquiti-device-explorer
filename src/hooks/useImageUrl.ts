import React from "react";
import type { NormalizedDevice } from "types/uidb";
import {
  UI_IMAGES_BASE_URL,
  UI_IMAGES_SVC_URL,
  IMAGE_TYPES,
  IMAGE_QUALITY,
  type ImageType,
  type ImageSize,
} from "@config/constants";

interface UseImageUrlOptions {
  device: NormalizedDevice;
  size?: ImageSize;
  type?: ImageType;
}

interface ImageUrlData {
  src: string | undefined;
  srcSet: string | undefined;
  sizes: string | undefined;
}

export const useImageUrl = ({
  device,
  size = 512,
  type,
}: UseImageUrlOptions): ImageUrlData => {
  return React.useMemo(() => {
    const getImageUrlData = (imageType: ImageType): ImageUrlData | null => {
      const hash = device.images?.[imageType];
      if (!hash) return null;

      const baseUrl = `${UI_IMAGES_BASE_URL}/${device.id}/${imageType}/${hash}.png`;
      const encodedUrl = encodeURIComponent(baseUrl);

      const src = `${UI_IMAGES_SVC_URL}/?u=${encodedUrl}&w=${size}&q=${IMAGE_QUALITY}`;
      const imageSizes = [256, 512, 1024] as const;
      const srcSet = imageSizes
        .map(
          (s) =>
            `${UI_IMAGES_SVC_URL}/?u=${encodedUrl}&w=${s}&q=${IMAGE_QUALITY} ${s}w`,
        )
        .join(", ");
      const sizes = "(max-width: 600px) 480px, 800px";

      return { src, srcSet, sizes };
    };

    // If specific type is requested, use it directly
    if (type) {
      const data = getImageUrlData(type);
      if (data) return data;
    }

    // If no specific type, check all available image types in priority order
    for (const imageType of IMAGE_TYPES) {
      const data = getImageUrlData(imageType);
      if (data) return data;
    }

    // Fallback to device.imageUrl if no specific images are found
    return { src: device.imageUrl, srcSet: undefined, sizes: undefined };
  }, [device, size, type]);
};
