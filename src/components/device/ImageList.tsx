import React from 'react';
import { CopyButton } from '@components/ui/CopyButton';
import { useImageUrl } from '@hooks/useImageUrl';
import type { NormalizedDevice } from "types/uidb";

interface ImageListProps {
  device: NormalizedDevice;
  className?: string;
}

export const ImageList = React.memo(({ device, className = "" }: ImageListProps) => {
  if (!device.images || Object.keys(device.images).length === 0) {
    return null;
  }

  return (
    <div className={`mt-6 ${className}`}>
      <h4 className="text-md font-medium text-gray-900 mb-3">Available Images</h4>
      <div className="space-y-2">
        {Object.entries(device.images).map(([type, hash]) => {
          const { src } = useImageUrl({ device, type: type as any });

          return (
            <div
              key={type}
              className="p-3 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-between transition-colors hover:bg-gray-100"
            >
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-gray-800 capitalize w-20">
                  {type}
                </span>
                <code className="text-xs bg-white px-2 py-1 border border-gray-300 rounded-md text-gray-600 truncate max-w-xs">
                  {hash as string}
                </code>
              </div>
              <CopyButton
                textToCopy={src || ''}
                title={`Copy ${type} image URL`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
});

ImageList.displayName = 'ImageList';