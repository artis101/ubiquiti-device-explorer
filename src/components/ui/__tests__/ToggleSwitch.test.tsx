import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import { ToggleSwitch } from "../ToggleSwitch";

describe("ToggleSwitch", () => {
  const options = [
    { value: "list", label: "List" },
    { value: "grid", label: "Grid" },
  ];

  it("should render the options correctly", () => {
    render(
      <ToggleSwitch
        options={options}
        selectedValue="list"
        onValueChange={() => {}}
      />,
    );
    expect(screen.getByText("List")).toBeInTheDocument();
    expect(screen.getByText("Grid")).toBeInTheDocument();
  });

  it("should call onValueChange with the correct value when an option is clicked", () => {
    const onValueChange = vi.fn();
    render(
      <ToggleSwitch
        options={options}
        selectedValue="list"
        onValueChange={onValueChange}
      />,
    );
    fireEvent.click(screen.getByText("Grid"));
    expect(onValueChange).toHaveBeenCalledWith("grid");
  });

  it("should have the correct aria-pressed attribute on the selected option", () => {
    render(
      <ToggleSwitch
        options={options}
        selectedValue="list"
        onValueChange={() => {}}
      />,
    );
    expect(screen.getByText("List").closest("button")).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByText("Grid").closest("button")).toHaveAttribute(
      "aria-pressed",
      "false",
    );
  });

  it("should render the label when provided", () => {
    render(
      <ToggleSwitch
        options={options}
        selectedValue="list"
        onValueChange={() => {}}
        label="View Mode"
      />,
    );
    expect(screen.getByText("View Mode:")).toBeInTheDocument();
  });
});
