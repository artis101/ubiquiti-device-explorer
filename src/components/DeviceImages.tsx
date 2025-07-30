import { useState } from "react";
import type { NormalizedDevice } from "../types/uidb";
import { CopyButton } from "./CopyButton";

interface DeviceImagesProps {
  device: NormalizedDevice;
}

export function DeviceImages({ device }: DeviceImagesProps) {
  const [imageSize, setImageSize] = useState(512);

  const getImageUrl = (size: number = 512) => {
    if (!device.images) return device.imageUrl;

    const imageTypes = ["default", "nopadding", "topology", "icon"] as const;

    for (const type of imageTypes) {
      const hash = device.images[type];
      if (hash) {
        const baseUrl = `https://static.ui.com/fingerprint/ui/images/${device.id}/${type}/${hash}.png`;
        const encodedUrl = encodeURIComponent(baseUrl);
        return `https://images.svc.ui.com/?u=${encodedUrl}&w=${size}&q=75`;
      }
    }

    return device.imageUrl;
  };

  return (
    <div className="lg:w-1/2 p-6 bg-gray-50">
      <div className="text-center">
        <img
          src={getImageUrl(imageSize)}
          alt={device.displayName}
          className="max-w-full h-auto mx-auto border border-gray-200 rounded-lg"
          style={{ maxHeight: "400px" }}
        />
        <div className="mt-4 flex items-center justify-center gap-2">
          <label htmlFor="image-size-detail" className="text-sm text-gray-600">
            Size:
          </label>
          <select
            id="image-size-detail"
            value={imageSize}
            onChange={(e) => setImageSize(Number(e.target.value))}
            className="text-sm border border-gray-300 rounded px-2 py-1"
          >
            <option value={256}>256px</option>
            <option value={512}>512px</option>
            <option value={1024}>1024px</option>
          </select>
        </div>
      </div>

      {device.images && (
        <div className="mt-6">
          <h4 className="text-md font-medium text-gray-900 mb-2">Images</h4>
          <div className="space-y-1">
            {Object.entries(device.images).map(([type, hash]) => (
              <div
                key={type}
                className="flex items-center justify-between text-xs"
              >
                <span className="font-medium">{type}:</span>
                <div className="flex items-center gap-2">
                  <code className="bg-gray-100 px-1 py-0.5 rounded truncate max-w-32">
                    {hash}
                  </code>
                  <CopyButton 
                    textToCopy={getImageUrl() || ""} 
                    title={`Copy ${type} image URL`} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}