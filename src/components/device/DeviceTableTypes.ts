import type { NormalizedDevice, SearchHit } from "types/uidb";

export interface DeviceTableProps {
  devices: NormalizedDevice[];
  selectedDeviceId?: string;
  onDeviceSelect: (device: NormalizedDevice) => void;
  height: number;
  width: number;
  searchHits: Map<string, SearchHit>;
}

export interface TableRowProps {
  index: number;
  style: React.CSSProperties;
  data: {
    devices: NormalizedDevice[];
    selectedDeviceId?: string;
    onDeviceSelect: (device: NormalizedDevice) => void;
    searchHits: Map<string, SearchHit>;
  };
}