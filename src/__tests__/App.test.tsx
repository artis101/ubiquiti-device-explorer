import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, type Mock } from "vitest";
import App from "../App";
import { useHeaderHeight } from "@hooks/useHeaderHeight";
import { useUidbData } from "@hooks/useUidbData";
import { useWindowDimensions } from "@hooks/useWindowDimensions";
import { useUrlState } from "@hooks/useUrlState";

// Mock the hooks
vi.mock("@hooks/useHeaderHeight");
vi.mock("@hooks/useUidbData");
vi.mock("@hooks/useWindowDimensions");
vi.mock("@hooks/useUrlState");

describe("App", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (useHeaderHeight as Mock).mockReturnValue({
      headerHeight: 0,
      headerRef: { current: null },
    });
    (useUidbData as Mock).mockReturnValue({
      warnings: [],
      connectionInfo: { status: "connected" },
      devices: [],
      filteredDevices: [],
      searchHits: new Map(),
      devicesForProductLineFilter: [],
      refetch: vi.fn(),
    });
    (useWindowDimensions as Mock).mockReturnValue({
      windowHeight: 768,
      windowWidth: 1024,
    });
    (useUrlState as Mock).mockReturnValue({
      searchQuery: "",
      selectedLineId: undefined,
      viewMode: "list",
      selectedProductLines: [],
      updateState: vi.fn(),
    });
  });

  it("renders the AppHeader", () => {
    render(<App />);
    expect(screen.getByText("Devices")).toBeInTheDocument();
  });

  it("renders SearchAndFilters when no device is selected", () => {
    render(<App />);
    expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();
  });

  it("renders device details view when a device is selected", () => {
    (useUrlState as Mock).mockReturnValue({
      searchQuery: "",
      selectedLineId: undefined,
      viewMode: "list",
      selectedDeviceId: "some-device-id",
      selectedProductLines: [],
      updateState: vi.fn(),
    });

    // Also need to mock useUidbData to return a device
    (useUidbData as Mock).mockReturnValue({
      warnings: [],
      connectionInfo: { status: "connected" },
      devices: [{ id: "some-device-id", displayName: "Test Device" }],
      filteredDevices: [{ id: "some-device-id", displayName: "Test Device" }],
      searchHits: new Map(),
      devicesForProductLineFilter: [],
      refetch: vi.fn(),
    });

    render(<App />);
    // When a device is selected, the app should show device details
    // The search input is not visible in detail view
    expect(screen.queryByPlaceholderText("Search")).not.toBeInTheDocument();
  });
});
