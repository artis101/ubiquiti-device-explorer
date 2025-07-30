import { z } from "zod";
import type { SearchHitMatch } from "@utils/search";

export const DeviceSchema = z.looseObject({
  id: z.string(),
  sku: z.string().optional(),
  line: z
    .looseObject({
      id: z.string(),
      name: z.string().optional(),
      abbrev: z.string().optional(),
    })
    .optional(),
  product: z
    .looseObject({
      name: z.string().optional(),
      abbrev: z.string().optional(),
    })
    .optional(),
  shortnames: z.array(z.string()).optional(),
  sysid: z.union([z.string(), z.array(z.string())]).optional(),
  images: z
    .looseObject({
      default: z.string().optional(),
      nopadding: z.string().optional(),
      topology: z.string().optional(),
      icon: z.string().optional(),
    })
    .optional(),
  triplets: z
    .array(
      z.looseObject({
        k1: z.string().optional(),
        k2: z.string().optional(),
        k3: z.string().optional(),
      })
    )
    .optional(),
});

export const UidbResponseSchema = z.looseObject({
  devices: z.array(DeviceSchema),
});

// Inferred types
export type Device = z.infer<typeof DeviceSchema>;
export type UidbResponse = z.infer<typeof UidbResponseSchema>;

// Normalized device for internal use
export interface NormalizedDevice extends Device {
  displayName: string;
  lineId?: string;
  imageUrl?: string;
}

// Fuse.js match type
export interface FuseMatch {
  indices: readonly [number, number][];
  key?: string;
  value?: string;
}

// Search result type
export interface SearchHit {
  id: string;
  displayName: string;
  lineId?: string;
  imageUrl?: string;
  score: number;
  matches?: SearchHitMatch[];
}

// Warning system types
export interface SchemaWarning {
  deviceId: string;
  field: string;
  reason: string;
}

export interface AppState {
  devices: NormalizedDevice[];
  filteredDevices: NormalizedDevice[];
  searchQuery: string;
  selectedLineId?: string;
  selectedDeviceId?: string;
  imageSize: number;
  warnings: SchemaWarning[];
}
