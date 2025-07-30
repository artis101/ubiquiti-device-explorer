import type { NormalizedDevice, SearchHit } from "../types/uidb";
import { Highlight } from "./Highlight";

interface DeviceCardProps {
  device: NormalizedDevice;
  imageSize: number;
  onSelect: (device: NormalizedDevice) => void;
  isSelected: boolean;
  searchHit?: SearchHit;
}

export function DeviceCard({
  device,
  imageSize,
  onSelect,
  isSelected,
  searchHit,
}: DeviceCardProps) {
  return (
    <div
      className={`bg-white border rounded-xl p-6 cursor-pointer transition-all duration-200 hover:shadow-xl hover:-translate-y-1 ${
        isSelected
          ? "border-blue-600 ring-2 ring-blue-600 ring-opacity-20 shadow-lg"
          : "border-gray-200 hover:border-blue-300"
      }`}
      onClick={() => onSelect(device)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(device);
        }
      }}
      aria-label={`Select device ${device.displayName}`}
    >
      <div className="flex items-start gap-6">
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

        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-gray-900 truncate mb-3">
            <Highlight 
              text={device.displayName} 
              indices={searchHit?.matches?.find(m => m.key === 'displayName')?.indices}
            />
          </h3>

          <div className="space-y-2">
            {device.sku && (
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  SKU:
                </span>
                <span className="text-sm font-medium text-gray-900">
                  <Highlight 
                    text={device.sku} 
                    indices={searchHit?.matches?.find(m => m.key === 'sku')?.indices}
                  />
                </span>
              </div>
            )}

            {device.line && (
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Line:
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {device.line.name || device.line.id}
                </span>
              </div>
            )}

            {device.shortnames && device.shortnames.length > 0 && (
              <div className="flex items-start gap-2">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide mt-0.5">
                  Aliases:
                </span>
                <div className="flex flex-wrap gap-1">
                  {device.shortnames.slice(0, 3).map((alias, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700"
                    >
                      <Highlight 
                        text={alias} 
                        indices={searchHit?.matches?.find(m => m.key === 'shortnames' && m.value === alias)?.indices}
                      />
                    </span>
                  ))}
                  {device.shortnames.length > 3 && (
                    <span className="text-xs text-gray-500">
                      +{device.shortnames.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
