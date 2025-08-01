import { FixedSizeList as List } from "react-window";
import { FixedSizeGrid as Grid } from "react-window";
import { DeviceGrid } from "../grid/DeviceGrid";
import { NoDevicesFound } from "../common/NoDevicesFound";
import { DeviceTable } from "./DeviceTable";
import type { NormalizedDevice } from "types/uidb";
import { useUidbData } from "@hooks/useUidbData";
import { useUrlState } from "@hooks/useUrlState";
import { useWindowDimensions } from "@hooks/useWindowDimensions";
import { useRef, useEffect, useCallback } from "react";

interface DeviceListProps {
  height: number;
  isInteractive: boolean;
}

export function DeviceList({ height, isInteractive }: DeviceListProps) {
  const listRef = useRef<List>(null);
  const gridRef = useRef<Grid>(null);
  const { filteredDevices, searchHits } = useUidbData();
  const { selectedDeviceId, viewMode, updateState } = useUrlState();
  const { windowWidth } = useWindowDimensions();

  // Scroll to selected device when component mounts or selectedDeviceId changes
  useEffect(() => {
    if (selectedDeviceId && filteredDevices.length > 0) {
      const selectedIndex = filteredDevices.findIndex(
        (device) => device.id === selectedDeviceId
      );

      if (selectedIndex !== -1) {
        if (viewMode === "grid" && gridRef.current) {
          // Calculate grid position
          const CARD_WIDTH = 263;
          const CARD_HORIZONTAL_GAP = 16;
          const columnWidth = CARD_WIDTH + CARD_HORIZONTAL_GAP;
          const columnCount = Math.floor(windowWidth / columnWidth);
          const rowIndex = Math.floor(selectedIndex / columnCount);

          gridRef.current.scrollToItem({
            rowIndex,
            columnIndex: 0,
            align: "center",
          });
        } else if (viewMode === "list" && listRef.current) {
          listRef.current.scrollToItem(selectedIndex, "center");
        }
      }
    }
  }, [selectedDeviceId, filteredDevices, viewMode, windowWidth]);

  // Scroll to top when search query or filters change
  useEffect(() => {
    if (viewMode === "grid" && gridRef.current) {
      gridRef.current.scrollTo({ scrollTop: 0 });
    } else if (viewMode === "list" && listRef.current) {
      listRef.current.scrollTo(0);
    }
  }, [filteredDevices, viewMode]); // Dependency on filteredDevices ensures this runs when search/filters change

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
    isInteractive,
  };

  if (viewMode === "grid") {
    return <DeviceGrid ref={gridRef} {...commonProps} />;
  } else {
    return <DeviceTable ref={listRef} {...commonProps} />;
  }
}
