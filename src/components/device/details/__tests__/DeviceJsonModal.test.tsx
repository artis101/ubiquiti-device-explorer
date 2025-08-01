import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { DeviceJsonModal } from "../DeviceJsonModal";
import { mockDevices } from "@mocks/devices";

describe("DeviceJsonModal", () => {
  it("renders the modal with the device JSON", () => {
    const onClose = vi.fn();
    render(<DeviceJsonModal device={mockDevices[0]} onClose={onClose} />);

    expect(screen.getByText("Raw JSON Data")).toBeInTheDocument();
    const preElement = screen.getByRole("complementary");
    expect(preElement.textContent).not.toBe("");
  });

  it("calls onClose when the close button is clicked", () => {
    const onClose = vi.fn();
    render(<DeviceJsonModal device={mockDevices[0]} onClose={onClose} />);

    fireEvent.click(screen.getByLabelText("Close JSON view"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when the Escape key is pressed", () => {
    const onClose = vi.fn();
    render(<DeviceJsonModal device={mockDevices[0]} onClose={onClose} />);

    fireEvent.keyDown(window, { key: "Escape", code: "Escape" });
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
