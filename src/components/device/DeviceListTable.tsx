import React, { forwardRef } from "react";
import { FixedSizeList as List } from "react-window";
import type { NormalizedDevice, SearchHit } from "types/uidb";
import { DeviceGridCard as DeviceCard } from "@components/device/DeviceGridCard";

interface DeviceListTableProps {
  devices: NormalizedDevice[];
  imageSize: number;
  selectedDeviceId?: string;
  onDeviceSelect: (device: NormalizedDevice) => void;
  height: number;
  width: number;
  searchHits: Map<string, SearchHit>;
}

interface ListItemProps {
  index: number;
  style: React.CSSProperties;
  data: {
    devices: NormalizedDevice[];
    imageSize: number;
    selectedDeviceId?: string;
    onDeviceSelect: (device: NormalizedDevice) => void;
    searchHits: Map<string, SearchHit>;
  };
}

function ListItem({ index, style, data }: ListItemProps) {
  const { devices } = data;
  const device = devices[index];

  if (!device) return null;

  return (
    <div style={style} className="py-4">
      <DeviceCard
        imageUrl={device.imageUrl || ""}
        productLineName={device.line?.name || device.line?.id || "UniFi"}
        deviceName={device.product?.name || ""}
        shortName={device.shortnames?.join(", ") || ""}
      />
    </div>
  );
}

export const DeviceListTable = forwardRef<List, DeviceListTableProps>(
  (
    {
      devices,
      imageSize,
      selectedDeviceId,
      onDeviceSelect,
      height,
      searchHits,
    },
    ref,
  ) => {
    // Calculate item height based on image size + padding for new card design
    const itemHeight = Math.max(imageSize + 80, 160);

    return (
      <div className="h-full">
        <div className="max-w-7xl mx-auto">
          <List
            ref={ref}
            height={height}
            width="100%"
            itemCount={devices.length}
            itemSize={itemHeight}
            itemData={{
              devices,
              imageSize,
              selectedDeviceId,
              onDeviceSelect,
              searchHits,
            }}
            className="scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 w-100"
          >
            {ListItem}
          </List>
        </div>
      </div>
    );
  },
);

DeviceListTable.displayName = "DeviceListTable";
