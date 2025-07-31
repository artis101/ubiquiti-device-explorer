import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { generateFallbackSvg, handleImageError } from "../imageFallback";
import { getPlaceholderImage } from "../uidb"; // Import getPlaceholderImage
import type { NormalizedDevice } from "../../types/uidb"; // Import NormalizedDevice

describe("imageFallback utilities", () => {
  describe("generateFallbackSvg", () => {
    it("should generate SVG with provided parameters", () => {
      const result = generateFallbackSvg({
        deviceName: "Test Device",
        deviceLineAbbrev: "TD",
        size: 100,
      });
      const decodedSvg = atob(result.split(",")[1]); // Decode base64 SVG

      expect(decodedSvg).toContain('width="100"');
      expect(decodedSvg).toContain('height="100"');
      expect(decodedSvg).toContain("TD");
    });

    it('should use "UI" as fallback when deviceLineAbbrev is not provided', () => {
      const result = generateFallbackSvg({
        deviceName: "",
        size: 100,
      });
      const decodedSvg = atob(result.split(",")[1]); // Decode base64 SVG

      expect(decodedSvg).toContain("UI");
    });
  });

  // New describe block for getPlaceholderImage from uidb.ts
  describe("getPlaceholderImage (from uidb.ts)", () => {
    it("should use device line abbreviation if available", () => {
      const device = {
        id: "test1",
        displayName: "Test Device 1",
        line: { id: "line1", abbrev: "L1" },
      } as NormalizedDevice;
      const result = getPlaceholderImage(device);
      const decodedSvg = atob(result.split(",")[1]);
      expect(decodedSvg).toContain("L1");
    });

    it("should use \"UI\" as fallback if no line abbreviation is available", () => {
      const device = {
        id: "test2",
        displayName: "Test Device 2",
      } as NormalizedDevice;
      const result = getPlaceholderImage(device);
      const decodedSvg = atob(result.split(",")[1]);
      expect(decodedSvg).toContain("UI");
    });
  });

  describe("handleImageError", () => {
    let mockEvent: React.SyntheticEvent<HTMLImageElement>;
    let mockTarget: HTMLImageElement;
    let originalBtoa: (str: string) => string; // Keep original btoa

    beforeEach(() => {
      mockTarget = {
        src: "original-image.jpg",
        startsWith: vi.fn((str) => mockTarget.src.startsWith(str)),
        style: { display: "" }, // Mock style property
      } as unknown as HTMLImageElement;

      mockEvent = {
        target: mockTarget,
      } as React.SyntheticEvent<HTMLImageElement>;

      originalBtoa = global.btoa; // Store original btoa
      global.btoa = vi.fn((str) => Buffer.from(str).toString("base64"));
    });

    afterEach(() => {
      vi.restoreAllMocks();
      global.btoa = originalBtoa; // Restore original btoa
    });

    it("should set fallback image src on error", () => {
      const options = {
        deviceName: "Test Device",
        deviceLineAbbrev: "TD",
        size: 100,
      };

      handleImageError(mockEvent, options);

      expect(mockTarget.src).toContain("data:image/svg+xml;base64,");
    });

    it("should not set fallback if already using fallback", () => {
      mockTarget.src = "data:image/svg+xml;base64,test";

      const options = {
        deviceName: "Test Device",
        size: 100,
      };

      handleImageError(mockEvent, options);

      expect(mockTarget.src).toBe("data:image/svg+xml;base64,test");
    });

    it("should handle btoa errors gracefully", () => {
      (global.btoa as ReturnType<typeof vi.fn>).mockImplementationOnce(() => {
        throw new Error("Encoding error");
      });

      const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

      const options = {
        deviceName: "Test Device",
        size: 100,
      };

      handleImageError(mockEvent, options);

      expect(consoleSpy).toHaveBeenCalledWith(
        "Failed to generate fallback image:",
        expect.any(Error),
      );
      expect(mockTarget.style.display).toBe("none");

      consoleSpy.mockRestore();
    });
  });
});
