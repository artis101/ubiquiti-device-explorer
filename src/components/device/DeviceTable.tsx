import React, { forwardRef } from "react";
import { FixedSizeList as List } from "react-window";
import type { NormalizedDevice, SearchHit } from "types/uidb";
import { Highlight } from "@components/ui/Highlight";
import { useHighlightIndices } from "@hooks/useHighlightIndices";
import { useImageUrl } from "@hooks/useImageUrl";

interface TableDeviceImageProps {
  device: NormalizedDevice;
}

function TableDeviceImage({ device }: TableDeviceImageProps) {
  const { src } = useImageUrl({ device, size: 256 });
  
  return (
    <img
      src={src}
      alt={device.displayName || "Device"}
      width={20}
      height={20}
      className="object-contain"
      onError={(e) => {
        const img = e.target as HTMLImageElement;
        img.style.display = 'none';
      }}
    />
  );
}

interface DeviceTableProps {
  devices: NormalizedDevice[];
  selectedDeviceId?: string;
  onDeviceSelect: (device: NormalizedDevice) => void;
  height: number;
  width: number;
  searchHits: Map<string, SearchHit>;
}

interface TableRowProps {
  index: number;
  style: React.CSSProperties;
  data: {
    devices: NormalizedDevice[];
    selectedDeviceId?: string;
    onDeviceSelect: (device: NormalizedDevice) => void;
    searchHits: Map<string, SearchHit>;
  };
}

function TableRow({ index, style, data }: TableRowProps) {
  const { devices, selectedDeviceId, onDeviceSelect, searchHits } = data;
  const device = devices[index];
  const searchHit = device ? searchHits.get(device.id) : undefined;
  const isSelected = device ? device.id === selectedDeviceId : false;
  const highlightIndices = useHighlightIndices(searchHit, "displayName");

  if (!device) return null;

  return (
    <div 
      style={style} 
      className={`border-b border-[var(--ui-gray-200)] hover:bg-[var(--ui-gray-50)] cursor-pointer transition-colors ${
        isSelected ? "bg-[var(--ui-gray-100)]" : ""
      }`}
      onClick={() => onDeviceSelect(device)}
    >
      <div className="flex items-center h-full px-8 -mx-8">
        {/* IMG Column */}
        <div className="flex items-center justify-center w-9 px-2 py-1.5">
          <div className="flex items-center justify-center w-5 h-5">
            <TableDeviceImage device={device} />
          </div>
        </div>
        
        {/* Line Column */}
        <div className="flex items-center px-2 py-1.5 min-w-0 flex-1">
          <span className="text-sm font-normal text-[rgba(0,0,0,0.65)] truncate">
            {device.line?.name || device.line?.id || "UniFi"}
          </span>
        </div>
        
        {/* Name Column */}
        <div className="flex items-center px-2 py-1.5 min-w-0 flex-1">
          <span className="text-sm font-normal text-[rgba(0,0,0,0.45)] truncate">
            <Highlight
              text={device.displayName}
              indices={highlightIndices}
            />
          </span>
        </div>
      </div>
    </div>
  );
}

export const DeviceTable = forwardRef<List, DeviceTableProps>(
  (
    {
      devices,
      selectedDeviceId,
      onDeviceSelect,
      height,
      searchHits,
    },
    ref
  ) => {
    const rowHeight = 32; // Fixed row height matching Figma spec (6px + 20px + 6px)

    return (
      <div className="h-full bg-white">
        {/* Table Header - Matching Figma design exactly */}
        <div className="border-b border-[var(--ui-gray-200)] bg-[#F4F5F6] sticky top-0 z-10">
          <div className="flex items-center h-12">
            {/* IMG Header */}
            <div className="flex items-center justify-center w-9 px-2 py-1.5">
              <span className="text-sm font-normal text-[var(--ui-text-muted)]">
                IMG
              </span>
            </div>
            
            {/* Line Header */}
            <div className="flex items-center px-2 py-1.5 min-w-0 flex-1">
              <span className="text-sm font-normal text-[var(--ui-text-muted)]">
                Line
              </span>
            </div>
            
            {/* Name Header */}
            <div className="flex items-center px-2 py-1.5 min-w-0 flex-1">
              <span className="text-sm font-normal text-[var(--ui-text-muted)]">
                Name
              </span>
            </div>
          </div>
        </div>

        {/* Table Body */}
        <div className="max-w-7xl mx-auto">
          <List
            ref={ref}
            height={height - 48} // Subtract header height
            width="100%"
            itemCount={devices.length}
            itemSize={rowHeight}
            itemData={{
              devices,
              selectedDeviceId,
              onDeviceSelect,
              searchHits,
            }}
            className="scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
          >
            {TableRow}
          </List>
        </div>
      </div>
    );
  }
);

DeviceTable.displayName = "DeviceTable";