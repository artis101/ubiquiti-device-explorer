import type { Device, NormalizedDevice, SchemaWarning } from "../types/uidb";
import { UidbResponseSchema } from "../types/uidb";

// Build image URL with fallback chain
export function buildImageUrl(
  device: Device,
  size: number = 640,
): string | undefined {
  if (!device.images) return undefined;

  // Try image types in priority order: default → nopadding → topology → icon
  const imageTypes = ["default", "nopadding", "topology", "icon"] as const;

  for (const type of imageTypes) {
    const hash = device.images[type];
    if (hash) {
      const baseUrl = `https://static.ui.com/fingerprint/ui/images/${device.id}/${type}/${hash}.png`;
      const encodedUrl = encodeURIComponent(baseUrl);
      return `https://images.svc.ui.com/?u=${encodedUrl}&w=${size}&q=75`;
    }
  }

  return undefined;
}

// Generate placeholder image URL/SVG for devices without images
export function getPlaceholderImage(device: NormalizedDevice): string {
  const abbrev = device.line?.abbrev || "UI";
  const svg = `<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
    <rect width="200" height="200" fill="#f3f4f6"/>
    <text x="100" y="100" text-anchor="middle" dominant-baseline="middle" 
          font-family="Arial, sans-serif" font-size="24" fill="#6b7280">
      ${abbrev}
    </text>
  </svg>`;

  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

// Normalize devices and collect warnings
export function normalizeDevices(devices: Device[]): {
  normalized: NormalizedDevice[];
  warnings: SchemaWarning[];
} {
  const warnings: SchemaWarning[] = [];
  const normalized: NormalizedDevice[] = [];
  const seenIds = new Set<string>();

  for (const device of devices) {
    // Skip empty objects
    if (!device.id) {
      warnings.push({
        deviceId: "unknown",
        field: "id",
        reason: "Missing device ID",
      });
      continue;
    }

    // Handle duplicate IDs
    if (seenIds.has(device.id)) {
      warnings.push({
        deviceId: device.id,
        field: "id",
        reason: "Duplicate device ID (first occurrence kept)",
      });
      continue;
    }
    seenIds.add(device.id);

    // Generate display name with fallback chain
    const displayName =
      device.product?.name || device.shortnames?.[0] || device.sku || device.id;

    // Check for missing critical fields
    if (
      !device.product?.name &&
      (!device.shortnames || device.shortnames.length === 0)
    ) {
      warnings.push({
        deviceId: device.id,
        field: "product.name",
        reason: "Missing product name and shortnames",
      });
    }

    if (!device.images || Object.keys(device.images).length === 0) {
      warnings.push({
        deviceId: device.id,
        field: "images",
        reason: "Missing all image hashes",
      });
    }

    const normalizedDevice: NormalizedDevice = {
      ...device,
      displayName,
      lineId: device.line?.id,
      imageUrl:
        buildImageUrl(device) ||
        getPlaceholderImage({
          ...device,
          displayName,
          lineId: device.line?.id,
        }),
    };

    normalized.push(normalizedDevice);
  }

  return { normalized, warnings };
}

// Parse UIDB response with error handling
export function parseUidbResponse(data: unknown): {
  devices: Device[];
  warnings: SchemaWarning[];
  error?: string;
} {
  try {
    const parsed = UidbResponseSchema.parse(data);
    return {
      devices: parsed.devices.filter(
        (device) => device && typeof device === "object",
      ),
      warnings: [],
    };
  } catch (error) {
    return {
      devices: [],
      warnings: [],
      error: error instanceof Error ? error.message : "Unknown parsing error",
    };
  }
}

// Get unique product lines from devices
export function getProductLines(
  devices: NormalizedDevice[],
): Array<{ id: string; name: string }> {
  const lines = new Map<string, string>();

  for (const device of devices) {
    if (device.line?.id) {
      lines.set(device.line.id, device.line.name || device.line.id);
    }
  }

  return Array.from(lines.entries())
    .map(([id, name]) => ({ id, name }))
    .sort((a, b) => a.name.localeCompare(b.name));
}
