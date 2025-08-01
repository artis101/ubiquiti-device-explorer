import { renderHook } from "@testing-library/react";
import { useRef } from "react";
import { useClickOutside } from "../useClickOutside";
import { vi } from "vitest";

describe("useClickOutside", () => {
  let container: HTMLDivElement;
  let mockCallback: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    mockCallback = vi.fn();
  });

  afterEach(() => {
    document.body.removeChild(container);
    vi.clearAllMocks();
  });

  it("should call callback when clicking outside the element", () => {
    const { result } = renderHook(() => {
      const ref = useRef<HTMLDivElement>(null);
      useClickOutside(ref, mockCallback, true);
      return ref;
    });

    // Create and attach element
    const element = document.createElement("div");
    container.appendChild(element);
    (result.current as any).current = element;

    // Click outside
    const outsideElement = document.createElement("div");
    container.appendChild(outsideElement);
    
    const mouseEvent = new MouseEvent("mousedown", { bubbles: true });
    outsideElement.dispatchEvent(mouseEvent);

    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  it("should not call callback when clicking inside the element", () => {
    const { result } = renderHook(() => {
      const ref = useRef<HTMLDivElement>(null);
      useClickOutside(ref, mockCallback, true);
      return ref;
    });

    // Create and attach element
    const element = document.createElement("div");
    container.appendChild(element);
    (result.current as any).current = element;

    // Click inside
    const mouseEvent = new MouseEvent("mousedown", { bubbles: true });
    element.dispatchEvent(mouseEvent);

    expect(mockCallback).not.toHaveBeenCalled();
  });

  it("should not call callback when isActive is false", () => {
    const { result } = renderHook(() => {
      const ref = useRef<HTMLDivElement>(null);
      useClickOutside(ref, mockCallback, false);
      return ref;
    });

    // Create and attach element
    const element = document.createElement("div");
    container.appendChild(element);
    (result.current as any).current = element;

    // Click outside
    const outsideElement = document.createElement("div");
    container.appendChild(outsideElement);
    
    const mouseEvent = new MouseEvent("mousedown", { bubbles: true });
    outsideElement.dispatchEvent(mouseEvent);

    expect(mockCallback).not.toHaveBeenCalled();
  });

  it("should handle null ref gracefully", () => {
    renderHook(() => {
      const ref = useRef<HTMLDivElement>(null);
      useClickOutside(ref, mockCallback, true);
      return ref;
    });

    // Click anywhere - should NOT call callback since ref is null
    const mouseEvent = new MouseEvent("mousedown", { bubbles: true });
    document.dispatchEvent(mouseEvent);

    expect(mockCallback).not.toHaveBeenCalled();
  });

  it("should clean up event listener on unmount", () => {
    const removeEventListenerSpy = vi.spyOn(document, "removeEventListener");
    
    const { unmount } = renderHook(() => {
      const ref = useRef<HTMLDivElement>(null);
      useClickOutside(ref, mockCallback, true);
      return ref;
    });

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith("mousedown", expect.any(Function));
    removeEventListenerSpy.mockRestore();
  });
});