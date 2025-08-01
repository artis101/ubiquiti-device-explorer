import type { NormalizedDevice } from "types/uidb";

export const mockDevices: NormalizedDevice[] = [
  {
    id: "1",
    name: "Device A",
    line: { id: "line1", name: "Product Line 1" },
    shortnames: [],
    product: { name: "Device A" },
  },
  {
    id: "2",
    name: "Device B",
    line: { id: "line2", name: "Product Line 2" },
    shortnames: [],
    product: { name: "Device B" },
  },
  {
    id: "3",
    name: "Device C",
    line: { id: "line1", name: "Product Line 1" },
    shortnames: [],
    product: { name: "Device C" },
  },
];
