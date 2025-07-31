import { Highlight } from "@components/ui/Highlight";
import { useHighlightIndices } from "@hooks/useHighlightIndices";
import { TableDeviceImage } from "./TableDeviceImage";
import type { TableRowProps } from "./DeviceTableTypes";

export function TableRow({ index, style, data }: TableRowProps) {
  const { devices, selectedDeviceId, onDeviceSelect, searchHits } = data;
  const device = devices[index];
  const searchHit = device ? searchHits.get(device.id) : undefined;
  const isSelected = device ? device.id === selectedDeviceId : false;
  const highlightIndices = useHighlightIndices(searchHit, "displayName");

  if (!device) return null;

  return (
    <div style={style}>
      <div
        className={`flex items-center max-w-7xl mx-auto border-b border-ui-gray-200 hover:bg-ui-gray-50 cursor-pointer transition-colors ${
          isSelected ? "bg-ui-gray-100" : ""
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
            {device.line?.name || device.line?.id || "UniFi"}
          </span>
        </div>
        <div className="flex items-center flex-1 min-w-0 h-8 px-2 py-1.5 gap-2">
          <span className="font-sans text-sm font-normal text-ui-text-subtle truncate">
            <Highlight text={device.displayName} indices={highlightIndices} />
          </span>
        </div>
      </div>
    </div>
  );
}
