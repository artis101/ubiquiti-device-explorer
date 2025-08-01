import { describe, it, expect } from "vitest";
import {
  buildImageUrl,
  getPlaceholderImage,
  normalizeDevices,
  parseUidbResponse,
  getProductLines,
} from "../uidb";
import type { Device, NormalizedDevice } from "types/uidb";

describe("buildImageUrl", () => {
  it("should return undefined if no images are present", () => {
    const device: Partial<Device> = { id: "1", images: {} };
    expect(buildImageUrl(device as Device)).toBeUndefined();
  });

  it("should return the correct URL for default image", () => {
    const device: Partial<Device> = { id: "1", images: { default: "hash1" } };
    const expectedUrl =
      "https://images.svc.ui.com/?u=https%3A%2F%2Fstatic.ui.com%2Ffingerprint%2Fui%2Fimages%2F1%2Fdefault%2Fhash1.png&w=640&q=75";
    expect(buildImageUrl(device as Device)).toBe(expectedUrl);
  });

  it("should prioritize image types correctly", () => {
    const device: Partial<Device> = {
      id: "1",
      images: { nopadding: "hash2", default: "hash1" },
    };
    const expectedUrl =
      "https://images.svc.ui.com/?u=https%3A%2F%2Fstatic.ui.com%2Ffingerprint%2Fui%2Fimages%2F1%2Fdefault%2Fhash1.png&w=640&q=75";
    expect(buildImageUrl(device as Device)).toBe(expectedUrl);
  });

  it("should handle size parameter correctly", () => {
    const device: Partial<Device> = { id: "1", images: { default: "hash1" } };
    const expectedUrl =
      "https://images.svc.ui.com/?u=https%3A%2F%2Fstatic.ui.com%2Ffingerprint%2Fui%2Fimages%2F1%2Fdefault%2Fhash1.png&w=100&q=75";
    expect(buildImageUrl(device as Device, 100)).toBe(expectedUrl);
  });
});

describe("getPlaceholderImage", () => {
  it("should return a base64 encoded SVG", () => {
    const device: Partial<NormalizedDevice> = {
      id: "1",
      displayName: "Test Device",
    };
    const result = getPlaceholderImage(device as NormalizedDevice);
    expect(result).toMatch(/^data:image\/svg\+xml;base64,/);
  });

  it("should use device.line.abbrev if available", () => {
    const device: Partial<NormalizedDevice> = {
      id: "1",
      displayName: "Test Device",
      line: { abbrev: "TD" },
    };
    const result = getPlaceholderImage(device as NormalizedDevice);

    // Should be a base64 encoded SVG
    expect(result).toMatch(/^data:image\/svg\+xml;base64,/);

    // Decode and check that it contains the abbreviation
    const base64Part = result.replace("data:image/svg+xml;base64,", "");
    const decodedSvg = atob(base64Part);
    expect(decodedSvg).toContain("TD");
    expect(decodedSvg).toContain("<svg");
    expect(decodedSvg).toContain('width="200"');
    expect(decodedSvg).toContain('height="200"');
  });

  it('should use "UI" as fallback if device.line.abbrev is not available', () => {
    const device: Partial<NormalizedDevice> = {
      id: "1",
      displayName: "Test Device",
    };
    const result = getPlaceholderImage(device as NormalizedDevice);

    // Should be a base64 encoded SVG
    expect(result).toMatch(/^data:image\/svg\+xml;base64,/);

    // Decode and check that it contains the fallback "UI"
    const base64Part = result.replace("data:image/svg+xml;base64,", "");
    const decodedSvg = atob(base64Part);
    expect(decodedSvg).toContain("UI");
    expect(decodedSvg).toContain("<svg");
    expect(decodedSvg).toContain('width="200"');
    expect(decodedSvg).toContain('height="200"');
  });
});

describe("normalizeDevices", () => {
  it("should normalize devices correctly", () => {
    const devices: Partial<Device>[] = [
      { id: "1", product: { name: "Product A" }, images: { default: "hash1" } },
    ];
    const { normalized, warnings } = normalizeDevices(devices as Device[]);
    expect(normalized.length).toBe(1);
    expect(normalized[0].displayName).toBe("Product A");
    expect(normalized[0].imageUrl).toBeDefined();
    expect(warnings).toEqual([]);
  });

  it("should generate displayName correctly with fallback", () => {
    const devices: Partial<Device>[] = [
      { id: "1", shortnames: ["SN1"], images: {} },
      { id: "2", sku: "SKU1", images: {} },
      { id: "3", images: {} },
    ];
    const { normalized } = normalizeDevices(devices as Device[]);
    expect(normalized[0].displayName).toBe("SN1");
    expect(normalized[1].displayName).toBe("SKU1");
    expect(normalized[2].displayName).toBe("3");
  });

  it("should collect warnings for invalid or incomplete device objects", () => {
    const devices = [
      null,
      undefined,
      { id: "1" },
      { product: { name: "Product A" } },
    ];
    const { warnings } = normalizeDevices(devices as Device[]);

    // Should have warnings for: null, undefined, missing id, plus additional warnings for missing fields
    expect(warnings.length).toBeGreaterThanOrEqual(3);

    // Check that we get the expected "Invalid or incomplete device object" warnings
    const invalidObjectWarnings = warnings.filter(
      (w) => w.reason === "Invalid or incomplete device object"
    );
    expect(invalidObjectWarnings.length).toBe(3); // null, undefined, { product: { name: 'Product A' } }
  });

  it("should collect warnings for duplicate device IDs", () => {
    const devices: Partial<Device>[] = [
      { id: "1", product: { name: "Product A" } },
      { id: "1", product: { name: "Product B" } },
    ];
    const { normalized, warnings } = normalizeDevices(devices as Device[]);
    expect(normalized.length).toBe(1);

    // Should have at least the duplicate ID warning, plus missing images warnings
    expect(warnings.length).toBeGreaterThanOrEqual(1);

    // Check for the specific duplicate ID warning
    const duplicateWarnings = warnings.filter(
      (w) => w.reason === "Duplicate device ID (first occurrence kept)"
    );
    expect(duplicateWarnings.length).toBe(1);
  });

  it("should collect warnings for missing product name and shortnames", () => {
    const devices: Partial<Device>[] = [{ id: "1", images: {} }];
    const { warnings } = normalizeDevices(devices as Device[]);

    // Should have warnings for both missing product name/shortnames AND missing images
    expect(warnings.length).toBe(2);

    // Check for the specific missing product name warning
    const missingNameWarnings = warnings.filter(
      (w) => w.reason === "Missing product name and shortnames"
    );
    expect(missingNameWarnings.length).toBe(1);

    // Check for the missing images warning
    const missingImagesWarnings = warnings.filter(
      (w) => w.reason === "Missing all image hashes"
    );
    expect(missingImagesWarnings.length).toBe(1);
  });

  it("should collect warnings for missing images", () => {
    const devices: Partial<Device>[] = [
      { id: "1", product: { name: "Product A" } },
    ];
    const { warnings } = normalizeDevices(devices as Device[]);
    expect(warnings.length).toBe(1);
    expect(warnings[0].reason).toBe("Missing all image hashes");
  });
});

describe("parseUidbResponse", () => {
  it("should parse valid UIDB response", () => {
    const data = { devices: [{ id: "1", product: { name: "Product A" } }] };
    const { devices, warnings, error } = parseUidbResponse(data);
    expect(devices.length).toBe(1);
    expect(warnings).toEqual([]);
    expect(error).toBeUndefined();
  });

  it("should return empty devices and error for invalid schema", () => {
    const data = { invalid: "data" };
    const { devices, warnings, error } = parseUidbResponse(data);
    expect(devices).toEqual([]);
    expect(warnings).toEqual([]);
    expect(error).toBeDefined();
  });

  it("should filter out null/undefined devices", () => {
    const data = { devices: [{ id: "1" }, null, undefined, { id: "2" }] };
    const { devices } = parseUidbResponse(data);
    expect(devices.length).toBe(2);
    expect(devices[0].id).toBe("1");
    expect(devices[1].id).toBe("2");
  });
});

describe("getProductLines (from uidb.ts)", () => {
  it("should return unique product lines", () => {
    const devices: Partial<NormalizedDevice>[] = [
      { id: "1", line: { id: "line1", name: "Product Line A" } },
      { id: "2", line: { id: "line2", name: "Product Line B" } },
      { id: "3", line: { id: "line1", name: "Product Line A" } },
    ];
    const result = getProductLines(devices as NormalizedDevice[]);
    expect(result).toEqual([
      { id: "line1", name: "Product Line A" },
      { id: "line2", name: "Product Line B" },
    ]);
  });

  it("should sort product lines by name", () => {
    const devices: Partial<NormalizedDevice>[] = [
      { id: "1", line: { id: "lineB", name: "Product Line B" } },
      { id: "2", line: { id: "lineA", name: "Product Line A" } },
    ];
    const result = getProductLines(devices as NormalizedDevice[]);
    expect(result).toEqual([
      { id: "lineA", name: "Product Line A" },
      { id: "lineB", name: "Product Line B" },
    ]);
  });

  it("should handle devices with missing line.name", () => {
    const devices: Partial<NormalizedDevice>[] = [
      { id: "1", line: { id: "line1" } },
      { id: "2", line: { id: "line2", name: "Product Line B" } },
    ];
    const result = getProductLines(devices as NormalizedDevice[]);
    expect(result).toEqual([
      { id: "line1", name: "line1" },
      { id: "line2", name: "Product Line B" },
    ]);
  });

  it("should handle devices with missing line.id", () => {
    const devices: Partial<NormalizedDevice>[] = [
      { id: "1", line: { name: "Product Line A" } },
      { id: "2", line: { id: "line2", name: "Product Line B" } },
    ];
    const result = getProductLines(devices as NormalizedDevice[]);
    expect(result).toEqual([{ id: "line2", name: "Product Line B" }]);
  });
});
