import { renderHook, act } from "@testing-library/react";
import { useKeyboardNavigation } from "../useKeyboardNavigation";
import { vi } from "vitest";

describe("useKeyboardNavigation", () => {
  const mockOnSelect = vi.fn();
  const mockOnClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const setup = (itemCount = 3, isOpen = true) => {
    return renderHook(() =>
      useKeyboardNavigation({
        itemCount,
        isOpen,
        onSelect: mockOnSelect,
        onClose: mockOnClose,
      })
    );
  };

  describe("Arrow key navigation", () => {
    it("should navigate down through items with ArrowDown", () => {
      const { result } = setup();

      const event = new KeyboardEvent("keydown", { key: "ArrowDown" });
      act(() => {
        result.current.handleKeyDown(event as any);
      });

      expect(result.current.activeIndex).toBe(0);
      expect(result.current.isKeyboardNav).toBe(true);

      act(() => {
        result.current.handleKeyDown(event as any);
      });

      expect(result.current.activeIndex).toBe(1);
    });

    it("should navigate up through items with ArrowUp", () => {
      const { result } = setup();

      const event = new KeyboardEvent("keydown", { key: "ArrowUp" });
      act(() => {
        result.current.handleKeyDown(event as any);
      });

      expect(result.current.activeIndex).toBe(2); // Wraps to last item

      act(() => {
        result.current.handleKeyDown(event as any);
      });

      expect(result.current.activeIndex).toBe(1);
    });

    it("should wrap around when navigating past bounds", () => {
      const { result } = setup(3);

      // Navigate to last item
      const downEvent = new KeyboardEvent("keydown", { key: "ArrowDown" });
      act(() => {
        result.current.handleKeyDown(downEvent as any); // -1 -> 0
        result.current.handleKeyDown(downEvent as any); // 0 -> 1
        result.current.handleKeyDown(downEvent as any); // 1 -> 2
      });

      expect(result.current.activeIndex).toBe(2); // At last item

      // Navigate down once more to wrap to first
      act(() => {
        result.current.handleKeyDown(downEvent as any); // 2 -> 0
      });

      expect(result.current.activeIndex).toBe(0); // Wrapped to first

      // Navigate up from first to wrap to last
      const upEvent = new KeyboardEvent("keydown", { key: "ArrowUp" });
      act(() => {
        result.current.handleKeyDown(upEvent as any); // 0 -> 2
      });

      expect(result.current.activeIndex).toBe(2); // Wrapped to last
    });
  });

  describe("Tab navigation", () => {
    it("should navigate forward with Tab", () => {
      const { result } = setup();

      const event = new KeyboardEvent("keydown", { key: "Tab" });
      act(() => {
        result.current.handleKeyDown(event as any);
      });

      expect(result.current.activeIndex).toBe(0);
      expect(result.current.isKeyboardNav).toBe(true);
    });

    it("should navigate backward with Shift+Tab", () => {
      const { result } = setup();

      const event = new KeyboardEvent("keydown", { key: "Tab", shiftKey: true });
      act(() => {
        result.current.handleKeyDown(event as any);
      });

      expect(result.current.activeIndex).toBe(2); // Wraps to last item
    });

    it("should close dropdown on Tab when no items", () => {
      const { result } = setup(0);

      const event = new KeyboardEvent("keydown", { key: "Tab" });
      act(() => {
        result.current.handleKeyDown(event as any);
      });

      expect(mockOnClose).toHaveBeenCalled();
      expect(result.current.activeIndex).toBe(-1);
    });
  });

  describe("Enter key selection", () => {
    it("should select item on Enter when an item is active", () => {
      const { result } = setup();

      // Navigate to first item
      const downEvent = new KeyboardEvent("keydown", { key: "ArrowDown" });
      act(() => {
        result.current.handleKeyDown(downEvent as any);
      });

      // Press Enter
      const enterEvent = new KeyboardEvent("keydown", { key: "Enter" });
      act(() => {
        result.current.handleKeyDown(enterEvent as any);
      });

      expect(mockOnSelect).toHaveBeenCalledWith(0);
    });

    it("should not select anything on Enter when no item is active", () => {
      const { result } = setup();

      const event = new KeyboardEvent("keydown", { key: "Enter" });
      act(() => {
        result.current.handleKeyDown(event as any);
      });

      expect(mockOnSelect).not.toHaveBeenCalled();
    });
  });

  describe("Escape key", () => {
    it("should close dropdown and reset on Escape", () => {
      const { result } = setup();

      // Navigate to an item first
      const downEvent = new KeyboardEvent("keydown", { key: "ArrowDown" });
      act(() => {
        result.current.handleKeyDown(downEvent as any);
      });

      expect(result.current.activeIndex).toBe(0);

      // Press Escape
      const escapeEvent = new KeyboardEvent("keydown", { key: "Escape" });
      act(() => {
        result.current.handleKeyDown(escapeEvent as any);
      });

      expect(mockOnClose).toHaveBeenCalled();
      expect(result.current.activeIndex).toBe(-1);
    });
  });

  describe("Mouse interaction", () => {
    it("should handle mouse enter and disable keyboard nav", () => {
      const { result } = setup();

      // First enable keyboard nav
      const event = new KeyboardEvent("keydown", { key: "ArrowDown" });
      act(() => {
        result.current.handleKeyDown(event as any);
      });

      expect(result.current.isKeyboardNav).toBe(true);

      // Mouse enter
      act(() => {
        result.current.handleMouseEnter(2);
      });

      expect(result.current.activeIndex).toBe(2);
      expect(result.current.isKeyboardNav).toBe(false);
    });
  });

  describe("Reset functionality", () => {
    it("should reset active index and keyboard nav", () => {
      const { result } = setup();

      // Set some state
      const event = new KeyboardEvent("keydown", { key: "ArrowDown" });
      act(() => {
        result.current.handleKeyDown(event as any);
      });

      expect(result.current.activeIndex).toBe(0);
      expect(result.current.isKeyboardNav).toBe(true);

      // Reset
      act(() => {
        result.current.resetActiveIndex();
      });

      expect(result.current.activeIndex).toBe(-1);
      expect(result.current.isKeyboardNav).toBe(false);
    });
  });

  it("should not respond to keys when dropdown is closed", () => {
    const { result } = setup(3, false);

    const event = new KeyboardEvent("keydown", { key: "ArrowUp" });
    act(() => {
      result.current.handleKeyDown(event as any);
    });

    expect(result.current.activeIndex).toBe(-1);
    expect(result.current.isKeyboardNav).toBe(false);
  });
});