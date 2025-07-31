import { forwardRef, useRef, useImperativeHandle } from "react";
import { FixedSizeGrid as Grid } from "react-window";
import { DeviceGrid } from "./DeviceGrid";
import { NoDevicesFound } from "./NoDevicesFound";
import { DeviceTable } from "./DeviceTable";
import type { NormalizedDevice, SearchHit } from "types/uidb";

type CommonDeviceViewProps = {
  devices: NormalizedDevice[];
  selectedDeviceId?: string;
  onDeviceSelect: (device: NormalizedDevice) => void;
  height: number;
  width: number;
  searchHits: Map<string, SearchHit>;
};

interface DeviceListProps extends CommonDeviceViewProps {
  viewMode: "list" | "grid";
}

export const DeviceList = forwardRef<any, DeviceListProps>(
  ({ viewMode, ...commonProps }, ref) => {
    const listRef = useRef<any>(null);
    const gridRef = useRef<Grid>(null);

    useImperativeHandle(ref, () => ({
      scrollToTop: () => {
        if (listRef.current) {
          listRef.current.scrollTo(0);
        }
      },
    }));

    if (commonProps.devices.length === 0) {
      return <NoDevicesFound />;
    }

    const ViewComponent = viewMode === "grid" ? DeviceGrid : DeviceTable;
    const viewRef = viewMode === "grid" ? gridRef : listRef;

    return <ViewComponent ref={viewRef} {...commonProps} />;
  },
);

DeviceList.displayName = "DeviceList";
