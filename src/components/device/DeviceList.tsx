import { FixedSizeList as List } from "react-window";
import type { NormalizedDevice, SearchHit } from "../../types/uidb";
import { DeviceCard } from "./DeviceCard";

interface DeviceListProps {
  devices: NormalizedDevice[];
  imageSize: number;
  selectedDeviceId?: string;
  onDeviceSelect: (device: NormalizedDevice) => void;
  height: number;
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
  const { devices, imageSize, selectedDeviceId, onDeviceSelect, searchHits } = data;
  const device = devices[index];

  if (!device) return null;

  const searchHit = searchHits.get(device.id);

  return (
    <div style={style} className="py-4">
      <DeviceCard
        device={device}
        imageSize={imageSize}
        onSelect={onDeviceSelect}
        isSelected={device.id === selectedDeviceId}
        searchHit={searchHit}
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
  searchHits,
}: DeviceListProps) {
  if (devices.length === 0) {
    return (
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center justify-center h-96 text-gray-500 bg-white rounded-xl border border-gray-200">
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
            <p className="text-gray-600">
              Try adjusting your search or filters
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Calculate item height based on image size + padding for new card design
  const itemHeight = Math.max(imageSize + 80, 160);

  return (
    <div className="h-full">
      <div className="max-w-7xl mx-auto">
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
            searchHits,
          }}
          className="scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 w-100"
        >
          {ListItem}
        </List>
      </div>
    </div>
  );
}