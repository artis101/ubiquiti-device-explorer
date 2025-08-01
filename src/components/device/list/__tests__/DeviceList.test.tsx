/**
 * DeviceList.test.tsx
 */
import { render, screen } from "@testing-library/react";
import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
  afterEach,
  type Mock,
} from "vitest";
import { forwardRef, useImperativeHandle } from "react";
import { DeviceList } from "../DeviceList";

// ──────────────────────────────────────────
// Mocks
// ──────────────────────────────────────────
import { useUrlState } from "@hooks/useUrlState";
import { useUidbData } from "@hooks/useUidbData";
import { useWindowDimensions } from "@hooks/useWindowDimensions";
import type { NormalizedDevice } from "types/uidb";

vi.mock("@hooks/useUrlState");
vi.mock("@hooks/useUidbData");
vi.mock("@hooks/useWindowDimensions");

/**
 * Stub react-window – we only need refs with the scrolling
 * API; rendering output is irrelevant for these tests.
 */
const mockScrollToItem = vi.fn();
const mockScrollTo = vi.fn();

vi.mock("react-window", () => {
  const FakeList = forwardRef((_props, ref) => {
    useImperativeHandle(ref, () => ({
      scrollToItem: mockScrollToItem,
      scrollTo: mockScrollTo,
    }));
    return <ul data-testid="fake-list" />;
  });

  const FakeGrid = forwardRef((_props, ref) => {
    useImperativeHandle(ref, () => ({
      scrollToItem: mockScrollToItem,
      scrollTo: mockScrollTo,
    }));
    return <div data-testid="fake-grid" />;
  });

  return { FixedSizeList: FakeList, FixedSizeGrid: FakeGrid };
});

// Convenience helpers
const mockUseUrlState = useUrlState as Mock;
const mockUseUidbData = useUidbData as Mock;
const mockUseWindowDimensions = useWindowDimensions as Mock;

// Default stubs (overridden per-test if needed)
const defaultDevices = Array.from({ length: 10 }, (_, i) => ({
  id: `dev-${i}`,
  name: `Device ${i}`,
  displayName: `Device ${i}`,
})) as NormalizedDevice[];

beforeEach(() => {
  vi.clearAllMocks();

  mockUseWindowDimensions.mockReturnValue({ windowWidth: 1024 });

  mockUseUrlState.mockReturnValue({
    selectedDeviceId: undefined,
    viewMode: "list",
    updateState: vi.fn(),
  });

  mockUseUidbData.mockReturnValue({
    filteredDevices: defaultDevices,
    searchHits: new Map(),
  });
});

afterEach(() => {
  vi.restoreAllMocks();
});

// ──────────────────────────────────────────
// Tests
// ──────────────────────────────────────────
describe("DeviceList – scrolling behaviour", () => {
  it("renders NoDevicesFound when list is empty", () => {
    mockUseUidbData.mockReturnValueOnce({
      filteredDevices: [],
      searchHits: new Map(),
    });

    render(<DeviceList height={300} isInteractive />);
    expect(screen.getByText(/no devices found/i)).toBeInTheDocument();
  });

  it("scrolls to selected device in LIST view on mount", () => {
    mockUseUrlState.mockReturnValueOnce({
      selectedDeviceId: "dev-5",
      viewMode: "list",
      updateState: vi.fn(),
    });

    render(<DeviceList height={300} isInteractive />);

    expect(mockScrollToItem).toHaveBeenCalledWith(5, "center");
  });

  it("scrolls to selected device in GRID view on mount", () => {
    mockUseUrlState.mockReturnValueOnce({
      selectedDeviceId: "dev-4",
      viewMode: "grid",
      updateState: vi.fn(),
    });

    render(<DeviceList height={300} isInteractive />);

    // CARD_WIDTH 263 + 16px gap → columnWidth 279; 1024px width → 3 columns
    // selectedIndex 4 → rowIndex floor(4 / 3) === 1
    expect(mockScrollToItem).toHaveBeenCalledWith({
      rowIndex: 1,
      columnIndex: 0,
      align: "center",
    });
  });

  it("scrolls to top when filteredDevices changes in LIST view", () => {
    const { rerender } = render(<DeviceList height={300} isInteractive />);

    // Simulate search / filter change
    mockScrollTo.mockClear();
    mockUseUidbData.mockReturnValueOnce({
      filteredDevices: defaultDevices.slice(0, 2), // new result set
      searchHits: new Map(),
    });

    rerender(<DeviceList height={300} isInteractive />);
    expect(mockScrollTo).toHaveBeenCalledWith(0);
  });

  it("scrolls to top when filteredDevices changes in GRID view", () => {
    mockUseUrlState.mockReturnValue({
      selectedDeviceId: undefined,
      viewMode: "grid",
      updateState: vi.fn(),
    });

    const { rerender } = render(<DeviceList height={300} isInteractive />);

    mockScrollTo.mockClear();
    mockUseUidbData.mockReturnValueOnce({
      filteredDevices: defaultDevices.slice(0, 3),
      searchHits: new Map(),
    });

    rerender(<DeviceList height={300} isInteractive />);
    expect(mockScrollTo).toHaveBeenCalledWith({ scrollTop: 0 });
  });
});
