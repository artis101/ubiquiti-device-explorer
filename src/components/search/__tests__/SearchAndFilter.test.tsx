import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { mockDevices } from "@mocks/devices";
import UidbProvider from "@contexts/UidbProvider";
import { DeviceList } from "@components/device/list/DeviceList";
import { SearchInput } from "../controls";

// Mock the useUidb hook
vi.mock("@hooks/useUidb", () => ({
  useUidb: () => ({
    devices: mockDevices,
    warnings: [],
    loading: false,
    error: undefined,
    connectionInfo: {
      source: "api" as const,
      timestamp: new Date().toISOString(),
    },
    refetch: vi.fn(),
  }),
}));

describe("Search and Filter Integration", () => {
  it("should filter the device list when a search query is entered", () => {
    const { rerender } = render(
      <UidbProvider searchQuery="" selectedProductLines={[]}>
        <SearchInput searchQuery="" onSearchChange={vi.fn()} />
        <DeviceList height={500} isInteractive={true} />
      </UidbProvider>,
    );

    // Initially, all devices should be visible
    expect(screen.getByText("Router X2000")).toBeTruthy();
    expect(screen.getByText("Switch Pro 48")).toBeTruthy();
    expect(screen.getByText("Firewall Guardian")).toBeTruthy();

    // Rerender with search query
    rerender(
      <UidbProvider searchQuery="Router" selectedProductLines={[]}>
        <SearchInput searchQuery="Router" onSearchChange={vi.fn()} />
        <DeviceList height={500} isInteractive={true} />
      </UidbProvider>,
    );

    // Only Router X2000 should be visible (search term will be highlighted)
    // Check that Router is in the results
    const routerElements = screen.getAllByText((_, element) => {
      return element?.textContent === "Router X2000";
    });
    expect(routerElements.length).toBeGreaterThan(0);

    // Other devices should not be visible
    expect(
      screen.queryByText((_, element) => {
        return element?.textContent === "Switch Pro 48";
      }),
    ).toBeFalsy();
    expect(
      screen.queryByText((_, element) => {
        return element?.textContent === "Firewall Guardian";
      }),
    ).toBeFalsy();
  });
});
