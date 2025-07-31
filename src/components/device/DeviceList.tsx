import { FixedSizeList as List } from "react-window";
import { FixedSizeGrid as Grid } from "react-window";
import { DeviceGrid } from "./DeviceGrid";
import { NoDevicesFound } from "./NoDevicesFound";
import { DeviceTable } from "./DeviceTable";
import type { NormalizedDevice } from "types/uidb";
import { useUidbData } from "@contexts/UidbContext";
import { useUrlState } from "@hooks/useUrlState";
import { useWindowDimensions } from "@hooks/useWindowDimensions";
import { useRef, useEffect, useCallback } from "react";

interface DeviceListProps {
  height: number;
}

export function DeviceList({ height }: DeviceListProps) {
  const listRef = useRef<List>(null);
  const gridRef = useRef<Grid>(null);
  const { filteredDevices, searchHits } = useUidbData();
  const { selectedDeviceId, viewMode, updateState } = useUrlState();
  const { windowWidth } = useWindowDimensions();

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTo(0);
    }
  }, [filteredDevices, viewMode]);

  const handleDeviceSelect = useCallback(
    (device: NormalizedDevice) => {
      updateState({ select: device.id });
    },
    [updateState]
  );

  if (filteredDevices.length === 0) {
    return <NoDevicesFound />;
  }

  const commonProps = {
    devices: filteredDevices,
    selectedDeviceId,
    onDeviceSelect: handleDeviceSelect,
    height,
    width: windowWidth,
    searchHits,
  };

  const ViewComponent = viewMode === "grid" ? DeviceGrid : DeviceTable;
  const viewRef = viewMode === "grid" ? gridRef : listRef;

  return <ViewComponent ref={viewRef} {...commonProps} />;
}
