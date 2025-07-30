import React, { forwardRef } from "react";
import { FixedSizeGrid as Grid } from "react-window";
import type { NormalizedDevice, SearchHit } from "types/uidb";
import { DeviceCard } from "@components/device/DeviceCard";

interface DeviceGridProps {
  devices: NormalizedDevice[];
  imageSize: number;
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
    imageSize: number;
    selectedDeviceId?: string;
    onDeviceSelect: (device: NormalizedDevice) => void;
    searchHits: Map<string, SearchHit>;
    columnCount: number;
  };
}

function GridItem({ columnIndex, rowIndex, style, data }: GridItemProps) {
  const {
    devices,
    imageSize,
    selectedDeviceId,
    onDeviceSelect,
    searchHits,
    columnCount,
  } = data;
  const index = rowIndex * columnCount + columnIndex;
  const device = devices[index];

  if (!device) return null;

  const searchHit = searchHits.get(device.id);

  return (
    <div style={style} className="p-2 flex items-center justify-center">
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
      imageSize,
      selectedDeviceId,
      onDeviceSelect,
      height,
      width,
      searchHits,
    },
    ref
  ) => {
    const columnWidth = imageSize + 64;
    const rowHeight = imageSize + 180;
    const maxColumns = 6;

    // Calculate column count
    const columnCount = Math.min(Math.floor(width / columnWidth), maxColumns);

    const rowCount = Math.ceil(devices.length / columnCount);

    // Calculate grid width to center it
    const gridWidth = columnCount * columnWidth;

    return (
      <div className="h-full flex justify-center">
        <Grid
          ref={ref}
          height={height}
          width={gridWidth}
          columnCount={columnCount}
          columnWidth={columnWidth}
          rowCount={rowCount}
          rowHeight={rowHeight}
          itemData={{
            devices,
            imageSize,
            selectedDeviceId,
            onDeviceSelect,
            searchHits,
            columnCount,
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
