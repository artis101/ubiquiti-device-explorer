import { describe, it, expect } from "vitest";
import {
  searchDevices,
  filterByLine,
  filterByProductLines,
} from "@utils/search";
import type { NormalizedDevice } from "types/uidb";

const mockDevices: NormalizedDevice[] = [
  {
    id: "device1",
    displayName: "UniFi Dream Machine Pro",
    sku: "UDM-Pro",
    lineId: "unifi",
    product: { name: "Dream Machine Pro", abbrev: "UDM-Pro" },
    shortnames: ["UDM-Pro", "Dream Machine Pro"],
    sysid: "udm_pro",
    images: { default: "hash1" },
  },
  {
    id: "device2",
    displayName: "UniFi Switch 24 PoE",
    sku: "USW-24-PoE",
    lineId: "unifi",
    product: { name: "Switch 24 PoE", abbrev: "USW-24" },
    shortnames: ["USW-24-PoE", "Switch 24 PoE"],
    sysid: "usw_24_poe",
    images: { default: "hash2" },
  },
  {
    id: "device3",
    displayName: "airMAX NanoStation M5",
    sku: "NSM5",
    lineId: "airmax",
    product: { name: "NanoStation M5", abbrev: "NSM5" },
    shortnames: ["NanoStation M5"],
    sysid: "nsm5",
    images: { default: "hash3" },
  },
  {
    id: "device4",
    displayName: "UniFi Access Point AC Lite",
    sku: "UAP-AC-Lite",
    lineId: "unifi",
    product: { name: "Access Point AC Lite", abbrev: "UAP-AC-Lite" },
    shortnames: ["UAP-AC-Lite"],
    sysid: "uap_ac_lite",
    images: { default: "hash4" },
  },
];

describe("Search and Filter Utilities", () => {
  describe("searchDevices", () => {
    it("should return all devices when query is empty", () => {
      const results = searchDevices(mockDevices, "");
      expect(results.length).toBe(mockDevices.length);
      expect(results[0].id).toBe("device1");
    });

    it("should find devices by product name", () => {
      const results = searchDevices(mockDevices, "Dream Machine");
      expect(results.length).toBe(1);
      expect(results[0].id).toBe("device1");
    });

    it("should find devices by SKU", () => {
      const results = searchDevices(mockDevices, "USW-24-PoE");
      expect(results.length).toBe(1);
      expect(results[0].id).toBe("device2");
    });

    it("should find devices by shortname", () => {
      const results = searchDevices(mockDevices, "NanoStation");
      expect(results.length).toBe(1);
      expect(results[0].id).toBe("device3");
    });

    it("should return multiple devices for a common query", () => {
      const results = searchDevices(mockDevices, "UniFi");
      expect(results.length).toBe(3);
      expect(results.some((d) => d.id === "device1")).toBe(true);
      expect(results.some((d) => d.id === "device2")).toBe(true);
      expect(results.some((d) => d.id === "device4")).toBe(true);
    });

    it("should return no devices for a non-matching query", () => {
      const results = searchDevices(mockDevices, "NonExistent");
      expect(results.length).toBe(0);
    });

    it("should handle case-insensitivity", () => {
      const results = searchDevices(mockDevices, "unifi");
      expect(results.length).toBe(3);
    });
  });

  describe("filterByLine", () => {
    it("should return all devices if no lineId is provided", () => {
      const results = filterByLine(mockDevices, undefined);
      expect(results.length).toBe(mockDevices.length);
    });

    it("should filter devices by a single lineId", () => {
      const results = filterByLine(mockDevices, "airmax");
      expect(results.length).toBe(1);
      expect(results[0].id).toBe("device3");
    });

    it("should return no devices if lineId does not match", () => {
      const results = filterByLine(mockDevices, "unknown");
      expect(results.length).toBe(0);
    });
  });

  describe("filterByProductLines", () => {
    it("should return all devices if no productLines are provided", () => {
      const results = filterByProductLines(mockDevices, []);
      expect(results.length).toBe(mockDevices.length);
    });

    it("should filter devices by multiple product lines", () => {
      const results = filterByProductLines(mockDevices, ["unifi", "airmax"]);
      expect(results.length).toBe(4);
    });

    it("should filter devices by a single product line in array", () => {
      const results = filterByProductLines(mockDevices, ["unifi"]);
      expect(results.length).toBe(3);
      expect(results.every((d) => d.lineId === "unifi")).toBe(true);
    });

    it("should return no devices if productLines do not match", () => {
      const results = filterByProductLines(mockDevices, ["unknown"]);
      expect(results.length).toBe(0);
    });
  });
});
