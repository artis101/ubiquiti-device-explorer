import { createContext } from "react";
import type { ConnectionInfo } from "@hooks/useConnectionStatus";
import type { NormalizedDevice, SchemaWarning, SearchHit } from "types/uidb";

interface UidbContextType {
  devices: NormalizedDevice[];
  warnings: SchemaWarning[];
  connectionInfo: ConnectionInfo;
  refetch: () => void;
  filteredDevices: NormalizedDevice[];
  searchHits: Map<string, SearchHit>;
  devicesForProductLineFilter: NormalizedDevice[];
}

export const UidbContext = createContext<UidbContextType | undefined>(undefined);
