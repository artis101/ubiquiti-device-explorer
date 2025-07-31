import type { NormalizedDevice } from "types/uidb";
import { useImageUrl } from "@hooks/useImageUrl";

interface DeviceImageDisplayProps {
  device: NormalizedDevice;
}

export function DeviceImageDisplay({ device }: DeviceImageDisplayProps) {
  const { src: imageUrl } = useImageUrl({ device, size: 256 });

  return (
    <div className="flex-shrink-1 flex justify-center items-center bg-gray-50 rounded-lg p-4">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={device.displayName}
          className="max-w-64 max-h-64 object-contain"
        />
      ) : (
        <div className="w-full h-32 lg:h-64 bg-gray-200 rounded flex items-center justify-center text-gray-500">
          No Image Available
        </div>
      )}
    </div>
  );
}
