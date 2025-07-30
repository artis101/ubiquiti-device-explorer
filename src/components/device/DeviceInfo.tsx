import type { NormalizedDevice, SearchHit } from "types/uidb";
import { Highlight } from "@components/ui/Highlight";
import { DeviceAliases } from "@components/device/DeviceAliases";

interface DeviceInfoProps {
  device: NormalizedDevice;
  searchHit?: SearchHit;
}

export function DeviceInfo({ device, searchHit }: DeviceInfoProps) {
  return (
    <div className="flex-1 min-w-0">
      <h3 className="text-lg font-bold text-gray-900 truncate mb-3">
        <Highlight
          text={device.displayName}
          indices={
            searchHit?.matches?.find((m) => m.key === "displayName")?.indices
          }
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
                indices={
                  searchHit?.matches?.find((m) => m.key === "sku")?.indices
                }
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
          <DeviceAliases aliases={device.shortnames} searchHit={searchHit} />
        )}
      </div>
    </div>
  );
}
