import type { NormalizedDevice } from "@types/uidb";

interface DeviceImageProps {
  device: NormalizedDevice;
  imageSize: number;
}

export function DeviceImage({ device, imageSize }: DeviceImageProps) {
  return (
    <div className="flex-shrink-0">
      <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
        <img
          src={device.imageUrl}
          alt={device.displayName}
          width={imageSize}
          height={imageSize}
          loading="lazy"
          className="object-contain"
          onError={(e) => {
            // Fallback to placeholder on image load error
            const target = e.target as HTMLImageElement;
            if (!target.src.startsWith("data:image/svg+xml")) {
              const abbrev = device.line?.abbrev || "UI";
              const svg = `<svg width="${imageSize}" height="${imageSize}" xmlns="http://www.w3.org/2000/svg">
                <rect width="${imageSize}" height="${imageSize}" fill="#f9fafb"/>
                <text x="${imageSize / 2}" y="${imageSize / 2}" text-anchor="middle" dominant-baseline="middle" 
                      font-family="Arial, sans-serif" font-size="18" font-weight="600" fill="#6b7280">
                  ${abbrev}
                </text>
              </svg>`;
              target.src = `data:image/svg+xml;base64,${btoa(svg)}`;
            }
          }}
        />
      </div>
    </div>
  );
}
