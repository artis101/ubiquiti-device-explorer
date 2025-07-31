import React, { forwardRef } from "react";
import { FixedSizeGrid as Grid } from "react-window";
import type { NormalizedDevice, SearchHit } from "types/uidb";
import { DeviceCard } from "@components/device/DeviceCard";

interface DeviceGridProps {
  devices: NormalizedDevice[];
  selectedDeviceId?: string;
  onDeviceSelect: (device: NormalizedDevice) => void;
  height: number;
  width: number;
  searchHits: Map<string, SearchHit>;
}

interface GridItemProps {
  columnIndex: number;
  rowIndex: number;
  style: React.CSSProperties;
  data: {
    devices: NormalizedDevice[];
    selectedDeviceId?: string;
    onDeviceSelect: (device: NormalizedDevice) => void;
    searchHits: Map<string, SearchHit>;
    columnCount: number;
    centerOffset: number;
  };
}

function GridItem({ columnIndex, rowIndex, style, data }: GridItemProps) {
  const {
    devices,
    selectedDeviceId,
    onDeviceSelect,
    searchHits,
    columnCount,
    centerOffset,
  } = data;
  
  const imageSize = 256; // Fixed image size
  const index = rowIndex * columnCount + columnIndex;
  const device = devices[index];

  if (!device) return null;

  const searchHit = searchHits.get(device.id);

  // Apply center offset to position
  const centeredStyle = {
    ...style,
    left: (style.left as number) + centerOffset,
  };

  return (
    <div style={centeredStyle} className="p-2 flex items-center justify-center">
      <DeviceCard
        device={device}
        imageSize={imageSize}
        onSelect={onDeviceSelect}
        isSelected={device.id === selectedDeviceId}
        searchHit={searchHit}
        layout="grid"
      />
    </div>
  );
}

export const DeviceGrid = forwardRef<Grid, DeviceGridProps>(
  (
    {
      devices,
      selectedDeviceId,
      onDeviceSelect,
      height,
      width,
      searchHits,
    },
    ref
  ) => {
    const imageSize = 256; // Fixed image size
    const columnWidth = imageSize + 64;
    const rowHeight = imageSize + 180;
    const maxColumns = 6;

    // Calculate column count
    const columnCount = Math.min(Math.floor(width / columnWidth), maxColumns);

    const rowCount = Math.ceil(devices.length / columnCount);

    // Calculate centering offset
    const gridWidth = columnCount * columnWidth;
    const centerOffset = Math.max(0, (width - gridWidth) / 2);

    return (
      <div className="h-full w-full">
        <Grid
          ref={ref}
          height={height}
          width={width}
          columnCount={columnCount}
          columnWidth={columnWidth}
          rowCount={rowCount}
          rowHeight={rowHeight}
          itemData={{
            devices,
            selectedDeviceId,
            onDeviceSelect,
            searchHits,
            columnCount,
            centerOffset,
          }}
          className="scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
        >
          {GridItem}
        </Grid>
      </div>
    );
  }
);

DeviceGrid.displayName = "DeviceGrid";
