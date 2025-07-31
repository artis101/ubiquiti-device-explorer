import { Highlight } from "@components/ui/Highlight";
import { useHighlightIndices } from "@hooks/useHighlightIndices";
import { TableDeviceImage } from "./TableDeviceImage";
import type { TableRowProps } from "./DeviceTableTypes";

export function TableRow({ index, style, data }: TableRowProps) {
  const { devices, selectedDeviceId, onDeviceSelect, searchHits } = data;
  const device = devices[index];
  if (!device) return null;

  const searchHit = searchHits.get(device.id);
  const isSelected = device.id === selectedDeviceId;
  const highlightIndices = useHighlightIndices(searchHit, "displayName");

  const productLineName = device.line?.name || device.line?.id || "UniFi";

  return (
    <div style={style}>
      <div
        className={`group flex items-center max-w-7xl mx-auto cursor-pointer transition-colors ${
          isSelected
            ? "bg-ui-gray-100 border-y border-ui-blue-primary"
            : "border-b border-ui-gray-200 hover:bg-ui-gray-100 hover:border-b-ui-gray-200"
        }`}
        onClick={() => onDeviceSelect(device)}
      >
        <div className="flex items-center justify-center w-9 h-8 px-2 py-1.5 gap-2">
          <div className="w-5 h-5">
            <TableDeviceImage device={device} />
          </div>
        </div>
        <div className="flex items-center flex-1 min-w-0 h-8 px-2 py-1.5 gap-2">
          <span className="font-sans text-sm font-normal text-ui-text-muted truncate">
            <Highlight text={productLineName} indices={highlightIndices} />
          </span>
        </div>
        <div className="flex items-center flex-1 min-w-0 h-8 px-2 py-1.5 gap-2">
          <span
            className={`font-sans text-sm font-normal truncate group-hover:text-ui-text-muted ${
              isSelected ? "text-ui-text-muted" : "text-ui-text-subtle"
            }`}
          >
            <Highlight text={device.displayName} indices={highlightIndices} />
          </span>
        </div>
      </div>
    </div>
  );
}
