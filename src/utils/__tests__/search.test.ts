import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  searchDevices,
  filterByLine,
  filterByProductLines,
  processFuseMatches,
} from "../search";
import Fuse from "fuse.js";
import type { NormalizedDevice, FuseMatch } from "types/uidb";

vi.mock("fuse.js", () => ({
  default: vi.fn().mockImplementation((devices) => ({
    search: vi.fn((query) => {
      if (query === "Device A") {
        return [
          {
            item: devices[0],
            score: 0.1,
            matches: [
              { indices: [[0, 6]], key: "displayName", value: "Device A" },
            ],
          },
        ];
      } else if (query === "SKU002") {
        return [
          {
            item: devices[1],
            score: 0.2,
            matches: [{ indices: [[0, 5]], key: "sku", value: "SKU002" }],
          },
        ];
      } else if (query === "Product C") {
        return [
          {
            item: devices[2],
            score: 0.3,
            matches: [
              { indices: [[0, 6]], key: "product.name", value: "Product C" },
            ],
          },
        ];
      } else if (query === "DB") {
        return [
          {
            item: devices[1],
            score: 0.4,
            matches: [{ indices: [[0, 1]], key: "shortnames", value: "DB" }],
          },
        ];
      } else if (query === "SYS001") {
        return [
          {
            item: devices[0],
            score: 0.5,
            matches: [{ indices: [[0, 5]], key: "sysid", value: "SYS001" }],
          },
        ];
      } else if (query === "T5") {
        return [
          {
            item: devices[1],
            score: 0.6,
            matches: [{ indices: [[0, 1]], key: "triplets", value: "T5" }],
          },
        ];
      } else if (query === "Device") {
        return [
          {
            item: devices[0],
            score: 0.1,
            matches: [
              { indices: [[0, 5]], key: "displayName", value: "Device A" },
            ],
          },
          {
            item: devices[1],
            score: 0.2,
            matches: [
              { indices: [[0, 5]], key: "displayName", value: "Device B" },
            ],
          },
          {
            item: devices[2],
            score: 0.3,
            matches: [
              {
                indices: [[8, 13]],
                key: "displayName",
                value: "Another Device",
              },
            ],
          },
        ];
      } else if (query === "NonExistent") {
        return [];
      }
      return [];
    }),
  })),
}));

describe("searchDevices", () => {
  const mockDevices: Partial<NormalizedDevice>[] = [
    {
      id: "1",
      displayName: "Device A",
      sku: "SKU001",
      lineId: "line1",
      product: { name: "Product A" },
      shortnames: ["DA"],
      sysid: "SYS001",
      triplets: [{ k1: "T1", k2: "T2", k3: "T3" }],
    },
    {
      id: "2",
      displayName: "Device B",
      sku: "SKU002",
      lineId: "line2",
      product: { name: "Product B" },
      shortnames: ["DB"],
      sysid: "SYS002",
      triplets: [{ k1: "T4", k2: "T5", k3: "T6" }],
    },
    {
      id: "3",
      displayName: "Another Device",
      sku: "SKU003",
      lineId: "line1",
      product: { name: "Product C" },
      shortnames: ["AD"],
      sysid: "SYS003",
      triplets: [{ k1: "T7", k2: "T8", k3: "T9" }],
    },
  ];

  beforeEach(() => {
    // Clear the mock before each test
    vi.mocked(Fuse).mockClear();
  });

  it("should return all devices if query is empty", () => {
    const results = searchDevices(mockDevices as NormalizedDevice[], "");
    expect(results.length).toBe(mockDevices.length);
    expect(results[0].score).toBe(1.0);
  });

  it("should find devices by displayName", () => {
    const results = searchDevices(
      mockDevices as NormalizedDevice[],
      "Device A"
    );
    expect(results.length).toBe(1);
    expect(results[0].id).toBe("1");
  });

  it("should find devices by sku", () => {
    const results = searchDevices(mockDevices as NormalizedDevice[], "SKU002");
    expect(results.length).toBe(1);
    expect(results[0].id).toBe("2");
  });

  it("should find devices by product name", () => {
    const results = searchDevices(
      mockDevices as NormalizedDevice[],
      "Product C"
    );
    expect(results.length).toBe(1);
    expect(results[0].id).toBe("3");
  });

  it("should find devices by shortname", () => {
    const results = searchDevices(mockDevices as NormalizedDevice[], "DB");
    expect(results.length).toBe(1);
    expect(results[0].id).toBe("2");
  });

  it("should find devices by sysid", () => {
    const results = searchDevices(mockDevices as NormalizedDevice[], "SYS001");
    expect(results.length).toBe(1);
    expect(results[0].id).toBe("1");
  });

  it("should find devices by triplets", () => {
    const results = searchDevices(mockDevices as NormalizedDevice[], "T5");
    expect(results.length).toBe(1);
    expect(results[0].id).toBe("2");
  });

  it("should return multiple results for fuzzy matches", () => {
    const results = searchDevices(mockDevices as NormalizedDevice[], "Device");
    expect(results.length).toBe(3);
  });

  it("should return empty array if no matches", () => {
    const results = searchDevices(
      mockDevices as NormalizedDevice[],
      "NonExistent"
    );
    expect(results.length).toBe(0);
  });

  it("should include matches in the result", () => {
    const results = searchDevices(
      mockDevices as NormalizedDevice[],
      "Device A"
    );
    expect(results[0].matches).toBeDefined();
    expect(results[0].matches?.[0].key).toBe("displayName");
  });
});

describe("filterByLine", () => {
  const mockDevices: Partial<NormalizedDevice>[] = [
    { id: "1", lineId: "line1" },
    { id: "2", lineId: "line2" },
    { id: "3", lineId: "line1" },
  ];

  it("should return all devices if lineId is undefined", () => {
    expect(filterByLine(mockDevices as NormalizedDevice[], undefined)).toEqual(
      mockDevices
    );
  });

  it("should filter devices by a single lineId", () => {
    const results = filterByLine(mockDevices as NormalizedDevice[], "line1");
    expect(results.length).toBe(2);
    expect(results.every((d) => d.lineId === "line1")).toBe(true);
  });

  it("should return empty array if no devices match lineId", () => {
    const results = filterByLine(mockDevices as NormalizedDevice[], "line3");
    expect(results.length).toBe(0);
  });
});

describe("filterByProductLines", () => {
  const mockDevices: Partial<NormalizedDevice>[] = [
    { id: "1", lineId: "line1" },
    { id: "2", lineId: "line2" },
    { id: "3", lineId: "line1" },
    { id: "4", lineId: "line3" },
  ];

  it("should return all devices if productLines is empty or undefined", () => {
    expect(filterByProductLines(mockDevices as NormalizedDevice[], [])).toEqual(
      mockDevices
    );
    expect(
      filterByProductLines(
        mockDevices as NormalizedDevice[],
        undefined as unknown as string[]
      )
    ).toEqual(mockDevices);
  });

  it("should filter devices by multiple product lines", () => {
    const results = filterByProductLines(mockDevices as NormalizedDevice[], [
      "line1",
      "line3",
    ]);
    expect(results.length).toBe(3);
    expect(results.some((d) => d.id === "2")).toBe(false);
  });

  it("should return empty array if no devices match any product line", () => {
    const results = filterByProductLines(mockDevices as NormalizedDevice[], [
      "line4",
    ]);
    expect(results.length).toBe(0);
  });
});

describe("processFuseMatches", () => {
  it("should return undefined if matches is undefined", () => {
    expect(processFuseMatches(undefined)).toBeUndefined();
  });

  it("should correctly transform Fuse matches", () => {
    const fuseMatches: FuseMatch[] = [
      { indices: [[0, 4]], key: "displayName", value: "Device A" },
      { indices: [[0, 2]], key: "sku", value: "SKU001" },
    ];
    const expected = [
      { indices: [[0, 4]], key: "displayName", value: "Device A" },
      { indices: [[0, 2]], key: "sku", value: "SKU001" },
    ];
    expect(processFuseMatches(fuseMatches)).toEqual(expected);
  });
});
