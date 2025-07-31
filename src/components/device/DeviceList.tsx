import { forwardRef, useRef, useImperativeHandle, useCallback } from "react";
import { FixedSizeGrid as Grid } from "react-window";
import { DeviceGrid } from "./DeviceGrid";
import { NoDevicesFound } from "./NoDevicesFound";
import { DeviceTable } from "./DeviceTable";
import type { NormalizedDevice } from "types/uidb";
import { useUidbData } from "@contexts/UidbContext";
import { useUrlState } from "@hooks/useUrlState";
import { useWindowDimensions } from "@hooks/useWindowDimensions";

interface DeviceListProps {
  height: number;
}

export const DeviceList = forwardRef<any, DeviceListProps>(
  ({ height }, ref) => {
    const listRef = useRef<any>(null);
    const gridRef = useRef<Grid>(null);
    const { filteredDevices, searchHits } = useUidbData();
    const { selectedDeviceId, viewMode, updateState, searchQuery } =
      useUrlState();
    console.log({
      searchQuery,
    });
    const { windowWidth } = useWindowDimensions();

    const handleDeviceSelect = useCallback(
      (device: NormalizedDevice) => {
        updateState({ select: device.id });
      },
      [updateState]
    );

    useImperativeHandle(ref, () => ({
      scrollToTop: () => {
        if (listRef.current) {
          listRef.current.scrollTo(0);
        }
      },
    }));

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
);

DeviceList.displayName = "DeviceList";
