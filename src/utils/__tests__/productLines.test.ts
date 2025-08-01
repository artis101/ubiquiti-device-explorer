import { describe, it, expect } from "vitest";
import { getProductLines } from "../productLines";
import type { NormalizedDevice } from "types/uidb";

describe("getProductLines", () => {
  it("should return an empty array if no devices are provided", () => {
    expect(getProductLines([])).toEqual([]);
  });

  it("should return unique product lines from devices", () => {
    const devices: Partial<NormalizedDevice>[] = [
      { id: "1", line: { id: "line1", name: "Product Line 1" } },
      { id: "2", line: { id: "line2", name: "Product Line 2" } },
      { id: "3", line: { id: "line1", name: "Product Line 1" } },
      { id: "4", line: { id: "line3", name: "Product Line 3" } },
    ];
    expect(getProductLines(devices as NormalizedDevice[])).toEqual([
      { id: "line1", name: "Product Line 1" },
      { id: "line2", name: "Product Line 2" },
      { id: "line3", name: "Product Line 3" },
    ]);
  });

  it("should handle devices without a product line", () => {
    const devices: Partial<NormalizedDevice>[] = [
      { id: "1", line: { id: "line1", name: "Product Line 1" } },
      { id: "2" },
      { id: "3", line: { id: "line2", name: "Product Line 2" } },
    ];
    expect(getProductLines(devices as NormalizedDevice[])).toEqual([
      { id: "line1", name: "Product Line 1" },
      { id: "line2", name: "Product Line 2" },
    ]);
  });

  it("should handle devices with incomplete product line info", () => {
    const devices: Partial<NormalizedDevice>[] = [
      { id: "1", line: { id: "line1", name: "Product Line 1" } },
      { id: "2", line: { id: "line2" } },
      { id: "3", line: { name: "Product Line 3" } },
    ];
    expect(getProductLines(devices as NormalizedDevice[])).toEqual([
      { id: "line1", name: "Product Line 1" },
    ]);
  });

  it("should ignore devices with empty product line id or name", () => {
    const devices: Partial<NormalizedDevice>[] = [
      { id: "1", line: { id: "line1", name: "Product Line 1" } },
      { id: "2", line: { id: "", name: "Empty ID" } },
      { id: "3", line: { id: "line3", name: "" } },
      { id: "4", line: { id: "", name: "" } },
    ];
    expect(getProductLines(devices as NormalizedDevice[])).toEqual([
      { id: "line1", name: "Product Line 1" },
    ]);
  });
});
