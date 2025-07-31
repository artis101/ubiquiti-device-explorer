import React, { forwardRef } from "react";
import { FixedSizeList as List } from "react-window";
import { TableHeader } from "./TableHeader";
import { TableRow } from "./TableRow";
import type { DeviceTableProps } from "./DeviceTableTypes";

export const DeviceTable = forwardRef<List, DeviceTableProps>(
  ({ devices, selectedDeviceId, onDeviceSelect, height, searchHits }, ref) => {
    const rowHeight = 32; // Fixed row height matching Figma spec (6px + 20px + 6px)

    return (
      <div className="flex flex-col h-full bg-ui-white">
        <TableHeader />

        {/* Table Body */}
        <List
          ref={ref}
          height={height - 32} // Subtract header height
          width="100%"
          itemCount={devices.length}
          itemSize={rowHeight}
          itemData={{
            devices,
            selectedDeviceId,
            onDeviceSelect,
            searchHits,
          }}
          className="scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
        >
          {TableRow}
        </List>
      </div>
    );
  }
);

DeviceTable.displayName = "DeviceTable";
