import { FixedSizeList as List } from "react-window";
import type { NormalizedDevice } from "../types/uidb";
import { DeviceCard } from "./DeviceCard";

interface DeviceListProps {
  devices: NormalizedDevice[];
  imageSize: number;
  selectedDeviceId?: string;
  onDeviceSelect: (device: NormalizedDevice) => void;
  height: number;
}

interface ListItemProps {
  index: number;
  style: React.CSSProperties;
  data: {
    devices: NormalizedDevice[];
    imageSize: number;
    selectedDeviceId?: string;
    onDeviceSelect: (device: NormalizedDevice) => void;
  };
}

function ListItem({ index, style, data }: ListItemProps) {
  const { devices, imageSize, selectedDeviceId, onDeviceSelect } = data;
  const device = devices[index];

  if (!device) return null;

  return (
    <div style={style} className="px-3 py-2">
      <DeviceCard
        device={device}
        imageSize={imageSize}
        onSelect={onDeviceSelect}
        isSelected={device.id === selectedDeviceId}
      />
    </div>
  );
}

export function DeviceList({
  devices,
  imageSize,
  selectedDeviceId,
  onDeviceSelect,
  height,
}: DeviceListProps) {
  if (devices.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-gray-500 bg-white rounded-xl border border-gray-200 mx-2">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <svg
            className="w-10 h-10 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          No devices found
        </h3>
        <p className="text-gray-600">Try adjusting your search or filters</p>
      </div>
    );
  }

  // Calculate item height based on image size + padding for new card design
  const itemHeight = Math.max(imageSize + 80, 160);

  return (
    <List
      height={height}
      width="100%"
      itemCount={devices.length}
      itemSize={itemHeight}
      itemData={{
        devices,
        imageSize,
        selectedDeviceId,
        onDeviceSelect,
      }}
      className="scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
    >
      {ListItem}
    </List>
  );
}
