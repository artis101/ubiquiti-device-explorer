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
      <h3
        className={`font-bold text-[#212327] ${
          isListLayout
            ? "text-lg mb-3 truncate"
            : "text-base mb-1 h-12 line-clamp-2"
        }`}
      >
        <Highlight
          text={device.displayName}
          indices={useHighlightIndices(searchHit, "displayName")}
        />
      </h3>

      <div className={isListLayout ? "space-y-2" : "space-y-1"}>
        {device.sku && (
          <div
            className={`flex items-center gap-2 min-w-0 ${
              !isListLayout ? "justify-center w-full" : ""
            }`}
          >
            <span className="text-xs font-semibold text-[#808893] uppercase tracking-wide shrink-0">
              SKU:
            </span>
            <span
              className={`text-sm font-medium text-[#212327] truncate ${
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

        {device.line && (
          <div
            className={`flex items-center gap-2 ${
              !isListLayout && "justify-center"
            }`}
          >
            <span className="text-xs font-semibold text-[#808893] uppercase tracking-wide">
              Line:
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#006FFF] text-white">
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
