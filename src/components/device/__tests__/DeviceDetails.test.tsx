import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { DeviceDetails } from "../details/DeviceDetails";
import { UidbContext } from "@contexts/UidbContext";
import { MemoryRouter } from "react-router-dom";
import type { NormalizedDevice } from "types/uidb";

// Mock hooks
vi.mock("@hooks/useHeaderHeight", () => ({
  useHeaderHeight: () => ({ headerHeight: 60 }),
}));

// Mock child components to simplify testing
vi.mock("../details/DeviceDetailsHeader", () => ({
  DeviceDetailsHeader: () => (
    <div data-testid="device-details-header">Header</div>
  ),
}));

vi.mock("../details/DeviceImageDisplay", () => ({
  DeviceImageDisplay: ({ device }: { device: NormalizedDevice }) => (
    <div data-testid="device-image-display">{device.displayName} Image</div>
  ),
}));

vi.mock("../details/DeviceOverview", () => ({
  DeviceOverview: ({ device }: { device: NormalizedDevice }) => (
    <div data-testid="device-overview">{device.displayName} Overview</div>
  ),
}));

vi.mock("../details/DeviceJsonModal", () => ({
  DeviceJsonModal: ({
    device,
    onClose,
  }: {
    device: NormalizedDevice;
    onClose: () => void;
  }) => (
    <div data-testid="device-json-modal">
      <div>JSON Modal for {device.displayName}</div>
      <button onClick={onClose}>Close</button>
    </div>
  ),
}));

const mockDevice: NormalizedDevice = {
  id: "123",
  product: { name: "Test Device" },
  line: { id: "l1", name: "Line 1" },
  images: { default: "hash1" },
  shortnames: ["Test Device"],
  sku: "SKU-123",
  displayName: "Test Device",
  lineId: "l1",
  imageUrl: "https://example.com/test-device.png",
};

const mockUidbContext = {
  devices: [mockDevice],
  warnings: [],
  connectionInfo: {
    status: "live" as const,
    lastFetch: new Date(),
    dataSource: "api" as const,
    isOnline: true,
  },
  refetch: vi.fn(),
  filteredDevices: [mockDevice],
  searchHits: new Map(),
  devicesForProductLineFilter: [mockDevice],
};

describe("DeviceDetails", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render device details when device is found", () => {
    render(
      <MemoryRouter>
        <UidbContext.Provider value={mockUidbContext}>
          <DeviceDetails deviceId="123" />
        </UidbContext.Provider>
      </MemoryRouter>,
    );

    expect(screen.getByTestId("device-details-header")).toBeInTheDocument();
    expect(screen.getByTestId("device-image-display")).toBeInTheDocument();
    expect(screen.getByTestId("device-overview")).toBeInTheDocument();
    expect(screen.getByText("See All Details as JSON")).toBeInTheDocument();
  });

  it("should render null when device is not found", () => {
    const { container } = render(
      <MemoryRouter>
        <UidbContext.Provider value={mockUidbContext}>
          <DeviceDetails deviceId="nonexistent" />
        </UidbContext.Provider>
      </MemoryRouter>,
    );

    expect(container.firstChild).toBeNull();
  });

  it('should show JSON modal when "See All Details as JSON" is clicked', async () => {
    render(
      <MemoryRouter>
        <UidbContext.Provider value={mockUidbContext}>
          <DeviceDetails deviceId="123" />
        </UidbContext.Provider>
      </MemoryRouter>,
    );

    // Initially, modal should not be visible
    expect(screen.queryByTestId("device-json-modal")).not.toBeInTheDocument();

    // Click the button
    const jsonButton = screen.getByText("See All Details as JSON");
    fireEvent.click(jsonButton);

    // Modal should appear
    await waitFor(() => {
      expect(screen.getByTestId("device-json-modal")).toBeInTheDocument();
      expect(
        screen.getByText("JSON Modal for Test Device"),
      ).toBeInTheDocument();
    });
  });

  it("should close JSON modal when close is triggered", async () => {
    render(
      <MemoryRouter>
        <UidbContext.Provider value={mockUidbContext}>
          <DeviceDetails deviceId="123" />
        </UidbContext.Provider>
      </MemoryRouter>,
    );

    // Open the modal
    fireEvent.click(screen.getByText("See All Details as JSON"));

    await waitFor(() => {
      expect(screen.getByTestId("device-json-modal")).toBeInTheDocument();
    });

    // Close the modal
    fireEvent.click(screen.getByText("Close"));

    await waitFor(() => {
      expect(screen.queryByTestId("device-json-modal")).not.toBeInTheDocument();
    });
  });

  it("should position the details panel based on header height", () => {
    const { container } = render(
      <MemoryRouter>
        <UidbContext.Provider value={mockUidbContext}>
          <DeviceDetails deviceId="123" />
        </UidbContext.Provider>
      </MemoryRouter>,
    );

    const detailsPanel = container.querySelector('[style*="top"]');
    expect(detailsPanel).toBeTruthy();
    expect(detailsPanel?.getAttribute("style")).toContain("top: 60px");
  });

  it("should pass the correct device to child components", () => {
    render(
      <MemoryRouter>
        <UidbContext.Provider value={mockUidbContext}>
          <DeviceDetails deviceId="123" />
        </UidbContext.Provider>
      </MemoryRouter>,
    );

    expect(screen.getByText("Test Device Image")).toBeInTheDocument();
    expect(screen.getByText("Test Device Overview")).toBeInTheDocument();
  });
});
