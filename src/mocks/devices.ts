import type { NormalizedDevice } from "types/uidb";

export const mockDevices: NormalizedDevice[] = [
  {
    id: "1",
    name: "Router X2000",
    displayName: "Router X2000",
    line: { id: "line1", name: "Network Infrastructure" },
    lineId: "line1",
    shortnames: [],
    product: { name: "Router X2000" },
  },
  {
    id: "2",
    name: "Switch Pro 48",
    displayName: "Switch Pro 48",
    line: { id: "line2", name: "Enterprise Hardware" },
    lineId: "line2",
    shortnames: [],
    product: { name: "Switch Pro 48" },
  },
  {
    id: "3",
    name: "Firewall Guardian",
    displayName: "Firewall Guardian",
    line: { id: "line1", name: "Network Infrastructure" },
    lineId: "line1",
    shortnames: [],
    product: { name: "Firewall Guardian" },
  },
];
