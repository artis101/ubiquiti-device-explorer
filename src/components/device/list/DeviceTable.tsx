import { forwardRef, useMemo } from "react";
import { FixedSizeList as List } from "react-window";
import { TableHeader } from "./TableHeader";
import { TableRow } from "./TableRow";
import type { DeviceTableProps } from "./DeviceTableTypes";

export const DeviceTable = forwardRef<List, DeviceTableProps>(
  (
    {
      devices,
      selectedDeviceId,
      onDeviceSelect,
      height,
      searchHits,
      isInteractive,
    },
    ref,
  ) => {
    const rowHeight = 32; // Fixed row height matching Figma spec (6px + 20px + 6px)

    const itemData = useMemo(
      () => ({
        devices,
        selectedDeviceId,
        onDeviceSelect,
        searchHits,
        isInteractive,
      }),
      [devices, selectedDeviceId, onDeviceSelect, searchHits, isInteractive],
    );

    return (
      <div
        className="flex flex-col h-full bg-ui-white"
        role="table"
        aria-label="Device list"
      >
        <TableHeader />

        {/* Table Body */}
        <div role="rowgroup">
          <List
            ref={ref}
            height={height - 32} // Subtract header height
            width="100%"
            itemCount={devices.length}
            itemSize={rowHeight}
            itemData={itemData}
            className="scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
          >
            {TableRow}
          </List>
        </div>
      </div>
    );
  },
);

DeviceTable.displayName = "DeviceTable";
