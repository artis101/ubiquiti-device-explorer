import type { NormalizedDevice, SearchHit } from "types/uidb";
import { Highlight } from "@components/ui/Highlight";
import { DeviceAliases } from "@components/device/DeviceAliases";

interface DeviceInfoProps {
  device: NormalizedDevice;
  searchHit?: SearchHit;
  layout?: "list" | "grid";
}

export function DeviceInfo({ device, searchHit, layout = "list" }: DeviceInfoProps) {
  const isListLayout = layout === "list";

  return (
    <div
      className={`w-full ${isListLayout ? "flex-1 min-w-0" : "text-center"}`}>
      <h3
        className={`font-bold text-gray-900 ${isListLayout ? "text-lg mb-3 truncate" : "text-base mb-1 whitespace-normal break-words"}`}>
        <Highlight
          text={device.displayName}
          indices={
            searchHit?.matches?.find((m) => m.key === "displayName")?.indices
          }
        />
      </h3>

      <div className={isListLayout ? "space-y-2" : "space-y-1"}>
        {device.sku && (
          <div
            className={`flex items-center gap-2 ${!isListLayout && "justify-center"}`}>
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
          <div
            className={`flex items-center gap-2 ${!isListLayout && "justify-center"}`}>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Line:
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {device.line.name || device.line.id}
            </span>
          </div>
        )}

        {isListLayout && device.shortnames && device.shortnames.length > 0 && (
          <DeviceAliases aliases={device.shortnames} searchHit={searchHit} />
        )}
      </div>
    </div>
  );
}
