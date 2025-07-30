import React from 'react';
import { CopyButton } from '@components/ui/CopyButton';
import { useImageUrl } from '@hooks/useImageUrl';
import type { NormalizedDevice } from "types/uidb";

interface ImageListProps {
  device: NormalizedDevice;
  className?: string;
}

export const ImageList = React.memo(({ device, className = "" }: ImageListProps) => {
  const defaultImageUrl = useImageUrl({ device });

  if (!device.images || Object.keys(device.images).length === 0) {
    return null;
  }

  return (
    <div className={`mt-6 ${className}`}>
      <h4 className="text-md font-medium text-gray-900 mb-2">Images</h4>
      <div className="space-y-1">
        {Object.entries(device.images).map(([type, hash]) => (
          <div
            key={type}
            className="flex items-center justify-between text-xs"
          >
            <span className="font-medium capitalize">{type}:</span>
            <div className="flex items-center gap-2">
              <code className="bg-gray-100 px-1 py-0.5 rounded truncate max-w-32">
                {hash as string}
              </code>
              <CopyButton
                textToCopy={defaultImageUrl || ""}
                title={`Copy ${type} image URL`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

ImageList.displayName = 'ImageList';