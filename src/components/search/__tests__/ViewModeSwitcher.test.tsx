import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ViewModeSwitcher } from "../controls/ViewModeSwitcher";

describe("ViewModeSwitcher", () => {
  it("should render both list and grid buttons", () => {
    const onViewModeChange = vi.fn();

    render(
      <ViewModeSwitcher viewMode="list" onViewModeChange={onViewModeChange} />,
    );

    expect(screen.getByLabelText("List view")).toBeInTheDocument();
    expect(screen.getByLabelText("Grid view")).toBeInTheDocument();
  });

  it("should show list button as active when viewMode is list", () => {
    const onViewModeChange = vi.fn();

    render(
      <ViewModeSwitcher viewMode="list" onViewModeChange={onViewModeChange} />,
    );

    const listButton = screen.getByLabelText("List view");
    const gridButton = screen.getByLabelText("Grid view");

    // Check the button classes - active variant has different styling
    expect(listButton.className).toContain("bg-icon-hover-bg");
    expect(listButton.className).toContain("text-icon-active");
    expect(gridButton.className).toContain("bg-transparent");
    expect(gridButton.className).toContain("text-icon-default");
  });

  it("should show grid button as active when viewMode is grid", () => {
    const onViewModeChange = vi.fn();

    render(
      <ViewModeSwitcher viewMode="grid" onViewModeChange={onViewModeChange} />,
    );

    const listButton = screen.getByLabelText("List view");
    const gridButton = screen.getByLabelText("Grid view");

    // Check the button classes - active variant has different styling
    expect(gridButton.className).toContain("bg-icon-hover-bg");
    expect(gridButton.className).toContain("text-icon-active");
    expect(listButton.className).toContain("bg-transparent");
    expect(listButton.className).toContain("text-icon-default");
  });

  it('should call onViewModeChange with "list" when list button is clicked', () => {
    const onViewModeChange = vi.fn();

    render(
      <ViewModeSwitcher viewMode="grid" onViewModeChange={onViewModeChange} />,
    );

    const listButton = screen.getByLabelText("List view");
    fireEvent.click(listButton);

    expect(onViewModeChange).toHaveBeenCalledWith("list");
  });

  it('should call onViewModeChange with "grid" when grid button is clicked', () => {
    const onViewModeChange = vi.fn();

    render(
      <ViewModeSwitcher viewMode="list" onViewModeChange={onViewModeChange} />,
    );

    const gridButton = screen.getByLabelText("Grid view");
    fireEvent.click(gridButton);

    expect(onViewModeChange).toHaveBeenCalledWith("grid");
  });

  it("should still call onViewModeChange even when clicking the already active button", () => {
    const onViewModeChange = vi.fn();

    render(
      <ViewModeSwitcher viewMode="list" onViewModeChange={onViewModeChange} />,
    );

    const listButton = screen.getByLabelText("List view");
    fireEvent.click(listButton);

    expect(onViewModeChange).toHaveBeenCalledWith("list");
  });
});
