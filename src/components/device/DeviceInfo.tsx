import type { NormalizedDevice, SearchHit } from "types/uidb";
import { Highlight } from "@components/ui/Highlight";
import { DeviceAliases } from "@components/device/DeviceAliases";
import { useHighlightIndices } from "@hooks/useHighlightIndices";

interface DeviceInfoProps {
  device: NormalizedDevice;
  searchHit?: SearchHit;
  layout?: "list" | "grid";
}

export function DeviceInfo({
  device,
  searchHit,
  layout = "list",
}: DeviceInfoProps) {
  const isListLayout = layout === "list";

  return (
    <div
      className={`w-full ${
        isListLayout ? "flex-1 min-w-0" : "text-center min-w-0"
      }`}
    >
      {/* Device Title - Main name */}
      <h3
        className={`font-normal text-[var(--ui-gray-600)] ${
          isListLayout
            ? "text-sm mb-1 truncate"
            : "text-sm mb-1 h-8 line-clamp-2"
        }`}
      >
        <Highlight
          text={device.displayName}
          indices={useHighlightIndices(searchHit, "displayName")}
        />
      </h3>

      {/* Device Subtitle - SKU */}
      {device.sku && (
        <div className={`${isListLayout ? "mb-3" : "mb-2"}`}>
          <span
            className={`text-sm font-normal text-[var(--ui-gray-500)] truncate block ${
              !isListLayout ? "max-w-26" : ""
            }`}
            title={device.sku}
          >
            <Highlight
              text={device.sku}
              indices={useHighlightIndices(searchHit, "sku")}
            />
          </span>
        </div>
      )}

      {/* Device Specs - following Figma layout pattern */}
      <div className={`${isListLayout ? "space-y-2" : "space-y-1"}`}>
        {/* Product Line spec row */}
        {device.line && (
          <div
            className={`flex items-center justify-between gap-20 py-1.5 ${
              !isListLayout ? "justify-center flex-col gap-1" : ""
            }`}
          >
            <span className="text-sm font-normal text-[var(--ui-text-muted)] shrink-0">
              Product Line
            </span>
            <span className="text-sm font-normal text-[var(--ui-text-muted)] text-right">
              {device.line.name || device.line.id}
            </span>
          </div>
        )}

        {/* Additional spec rows can be added here following the same pattern */}
        {isListLayout && device.shortnames && device.shortnames.length > 0 && (
          <div className="flex items-center justify-between gap-20 py-1.5">
            <span className="text-sm font-normal text-[var(--ui-text-muted)] shrink-0">
              Aliases
            </span>
            <div className="text-right">
              <DeviceAliases
                aliases={device.shortnames}
                searchHit={searchHit}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
