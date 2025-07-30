import { forwardRef, useRef, useImperativeHandle } from "react";
import { FixedSizeGrid as Grid } from "react-window";
import { DeviceGrid } from "./DeviceGrid";
import { NoDevicesFound } from "./NoDevicesFound";
import { DeviceListTable } from "./DeviceListTable";
import type { NormalizedDevice, SearchHit } from "types/uidb";

interface DeviceListProps {
  devices: NormalizedDevice[];
  imageSize: number;
  selectedDeviceId?: string;
  onDeviceSelect: (device: NormalizedDevice) => void;
  height: number;
  width: number;
  searchHits: Map<string, SearchHit>;
  viewMode: "list" | "grid";
}

export const DeviceList = forwardRef<any, DeviceListProps>(
  (
    {
      devices,
      imageSize,
      selectedDeviceId,
      onDeviceSelect,
      height,
      width,
      searchHits,
      viewMode,
    },
    ref
  ) => {
    const listRef = useRef<any>(null); // Ref for DeviceListTable
    const gridRef = useRef<Grid>(null);

    useImperativeHandle(ref, () => ({
      scrollToTop: () => {
        if (viewMode === "list" && listRef.current) {
          listRef.current.scrollTo(0);
        } else if (viewMode === "grid" && gridRef.current) {
          gridRef.current.scrollTo({ scrollTop: 0, scrollLeft: 0 });
        }
      },
    }));

    if (devices.length === 0) {
      return <NoDevicesFound />;
    }

    if (viewMode === "grid") {
      return (
        <DeviceGrid
          ref={gridRef}
          devices={devices}
          imageSize={imageSize}
          selectedDeviceId={selectedDeviceId}
          onDeviceSelect={onDeviceSelect}
          height={height}
          width={width}
          searchHits={searchHits}
        />
      );
    }

    return (
      <DeviceListTable
        ref={listRef}
        devices={devices}
        imageSize={imageSize}
        selectedDeviceId={selectedDeviceId}
        onDeviceSelect={onDeviceSelect}
        height={height}
        width={width}
        searchHits={searchHits}
      />
    );
  }
);

DeviceList.displayName = "DeviceList";
