import { memo, useCallback, useMemo } from "react";
import { Highlight } from "@components/ui/Highlight";
import { useHighlightIndices } from "@hooks/useHighlightIndices";
import { TableDeviceImage } from "./TableDeviceImage";
import type { TableRowProps } from "./DeviceTableTypes";

export const TableRow = memo(({ index, style, data }: TableRowProps) => {
  const { devices, selectedDeviceId, onDeviceSelect, searchHits } = data;
  const device = devices[index];
  
  if (!device) return null;

  const searchHit = searchHits.get(device.id);
  const isSelected = device.id === selectedDeviceId;
  const highlightIndices = useHighlightIndices(searchHit, "displayName");

  const productLineName = useMemo(() => 
    device.line?.name || device.line?.id || "UniFi", 
    [device.line?.name, device.line?.id]
  );

  const handleClick = useCallback(() => {
    onDeviceSelect(device);
  }, [device, onDeviceSelect]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onDeviceSelect(device);
    }
  }, [device, onDeviceSelect]);

  const rowClassName = useMemo(() => 
    `group flex items-center max-w-7xl mx-auto transition-colors ${
      isSelected
        ? "bg-ui-gray-100 border-y border-ui-blue-primary"
        : "border-b border-ui-gray-200 hover:bg-ui-gray-100 hover:border-b-ui-gray-200"
    }`,
    [isSelected]
  );

  const displayNameClassName = useMemo(() =>
    `font-sans text-sm font-normal truncate group-hover:text-ui-text-muted ${
      isSelected ? "text-ui-text-muted" : "text-ui-text-subtle"
    }`,
    [isSelected]
  );

  return (
    <div style={style}>
      <button
        type="button"
        className={`${rowClassName} focus:outline-none focus:border-y focus:border-ui-blue-primary w-full text-left`}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        role="row"
        aria-selected={isSelected}
        aria-label={`${productLineName} - ${device.displayName}`}
        tabIndex={0}
      >
        <div className="flex items-center justify-center w-9 h-8 px-2 py-1.5 gap-2" role="cell">
          <div className="w-5 h-5" aria-hidden="true">
            <TableDeviceImage device={device} />
          </div>
        </div>
        <div className="flex items-center flex-1 min-w-0 h-8 px-2 py-1.5 gap-2" role="cell">
          <span className="font-sans text-sm font-normal text-ui-text-muted truncate">
            <Highlight text={productLineName} indices={highlightIndices} />
          </span>
        </div>
        <div className="flex items-center flex-1 min-w-0 h-8 px-2 py-1.5 gap-2" role="cell">
          <span className={displayNameClassName}>
            <Highlight text={device.displayName} indices={highlightIndices} />
          </span>
        </div>
      </button>
    </div>
  );
});

TableRow.displayName = "TableRow";
