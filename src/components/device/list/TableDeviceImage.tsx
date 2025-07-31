import React from 'react';
import { useImageUrl } from '@hooks/useImageUrl';
import type { NormalizedDevice } from 'types/uidb';

interface TableDeviceImageProps {
  device: NormalizedDevice;
}

export const TableDeviceImage: React.FC<TableDeviceImageProps> = ({ device }) => {
  const { src } = useImageUrl({ device, size: 32 });

  if (!src) {
    return <div className="w-full h-full bg-ui-gray-200 rounded-sm" />;
  }

  return <img src={src} alt={device.product?.name || ""} className="w-full h-full object-contain" />;
};
