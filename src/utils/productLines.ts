import type { NormalizedDevice } from "../types/uidb";

export const getProductLines = (devices: NormalizedDevice[]) => {
  const productLineMap = new Map<string, string>();
  devices.forEach((device) => {
    if (device.line && device.line.id && device.line.name) {
      productLineMap.set(device.line.id, device.line.name);
    }
  });
  return Array.from(productLineMap, ([id, name]) => ({ id, name }));
};
