import React, { forwardRef } from "react";
import { FixedSizeGrid as Grid } from "react-window";
import type { NormalizedDevice, SearchHit } from "types/uidb";
import { DeviceGridCard } from "@components/device/DeviceGridCard";
import { useImageUrl } from "@hooks/useImageUrl";

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
  const { devices, selectedDeviceId, onDeviceSelect, columnCount, centerOffset } = data;

  const index = rowIndex * columnCount + columnIndex;
  const device = devices[index];

  if (!device) return null;

  const { src: imageUrl } = useImageUrl({ device, size: 256 });

  if (!imageUrl) return null;

  const isSelected = device.id === selectedDeviceId;

  // Apply center offset to position
  const centeredStyle = {
    ...style,
    left: (style.left as number) + centerOffset,
  };

  return (
    <div
      style={centeredStyle}
      className="flex items-center justify-center"
    >
      <DeviceGridCard
        imageUrl={imageUrl || ""}
        productLineName={device.line?.name || device.line?.id || "UniFi"}
        deviceName={device.product?.name || ""}
        shortName={device.shortnames?.join(", ") || ""}
        isSelected={isSelected}
        onClick={() => onDeviceSelect(device)}
      />
    </div>
  );
}

export const DeviceGrid = forwardRef<Grid, DeviceGridProps>(
  (
    { devices, selectedDeviceId, onDeviceSelect, height, width, searchHits },
    ref
  ) => {
    const CARD_WIDTH = 263; // The target width for each device card
    const CARD_HORIZONTAL_GAP = 16; // The horizontal gap between device cards
    const CARD_HEIGHT = 174; // The target height for each device card
    const CARD_VERTICAL_GAP = 16; // The vertical gap between device cards

    const columnWidth = CARD_WIDTH + CARD_HORIZONTAL_GAP;
    const rowHeight = CARD_HEIGHT + CARD_VERTICAL_GAP;
    // Calculate column count
    const columnCount = Math.floor(width / columnWidth);

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
