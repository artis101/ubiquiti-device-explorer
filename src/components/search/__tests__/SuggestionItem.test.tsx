import { render, screen, fireEvent } from "@testing-library/react";
import { SuggestionItem } from "../SuggestionItem";
import { vi } from "vitest";

describe("SuggestionItem", () => {
  const mockOnClick = vi.fn();
  const mockOnMouseEnter = vi.fn();
  const defaultSuggestion = {
    id: "1",
    name: "Dream Router",
    abbrev: "UDR",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders suggestion name and abbreviation", () => {
    render(
      <SuggestionItem
        suggestion={defaultSuggestion}
        isActive={false}
        isKeyboardNav={false}
        searchQuery=""
        onClick={mockOnClick}
        onMouseEnter={mockOnMouseEnter}
      />,
    );

    expect(screen.getByText("Dream Router")).toBeInTheDocument();
    expect(screen.getByText("UDR")).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    render(
      <SuggestionItem
        suggestion={defaultSuggestion}
        isActive={false}
        isKeyboardNav={false}
        searchQuery=""
        onClick={mockOnClick}
        onMouseEnter={mockOnMouseEnter}
      />,
    );

    fireEvent.click(screen.getByRole("option"));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it("calls onMouseEnter when mouse enters", () => {
    render(
      <SuggestionItem
        suggestion={defaultSuggestion}
        isActive={false}
        isKeyboardNav={false}
        searchQuery=""
        onClick={mockOnClick}
        onMouseEnter={mockOnMouseEnter}
      />,
    );

    fireEvent.mouseEnter(screen.getByRole("option"));
    expect(mockOnMouseEnter).toHaveBeenCalledTimes(1);
  });

  it("applies hover styles when not active", () => {
    render(
      <SuggestionItem
        suggestion={defaultSuggestion}
        isActive={false}
        isKeyboardNav={false}
        searchQuery=""
        onClick={mockOnClick}
        onMouseEnter={mockOnMouseEnter}
      />,
    );

    const item = screen.getByRole("option");
    expect(item).toHaveClass("hover:bg-ui-gray-100");
  });

  it("applies background style when active via mouse", () => {
    render(
      <SuggestionItem
        suggestion={defaultSuggestion}
        isActive={true}
        isKeyboardNav={false}
        searchQuery=""
        onClick={mockOnClick}
        onMouseEnter={mockOnMouseEnter}
      />,
    );

    const item = screen.getByRole("option");
    expect(item).toHaveClass("bg-ui-gray-100");
  });

  it("applies border style when active via keyboard", () => {
    render(
      <SuggestionItem
        suggestion={defaultSuggestion}
        isActive={true}
        isKeyboardNav={true}
        searchQuery=""
        onClick={mockOnClick}
        onMouseEnter={mockOnMouseEnter}
      />,
    );

    const item = screen.getByRole("option");
    expect(item).toHaveClass("border", "border-ui-blue-primary");
  });

  it("sets aria-selected based on active state", () => {
    const { rerender } = render(
      <SuggestionItem
        suggestion={defaultSuggestion}
        isActive={false}
        isKeyboardNav={false}
        searchQuery=""
        onClick={mockOnClick}
        onMouseEnter={mockOnMouseEnter}
      />,
    );

    expect(screen.getByRole("option")).toHaveAttribute(
      "aria-selected",
      "false",
    );

    rerender(
      <SuggestionItem
        suggestion={defaultSuggestion}
        isActive={true}
        isKeyboardNav={false}
        searchQuery=""
        onClick={mockOnClick}
        onMouseEnter={mockOnMouseEnter}
      />,
    );

    expect(screen.getByRole("option")).toHaveAttribute("aria-selected", "true");
  });

  it("applies correct text styles", () => {
    render(
      <SuggestionItem
        suggestion={defaultSuggestion}
        isActive={false}
        isKeyboardNav={false}
        searchQuery=""
        onClick={mockOnClick}
        onMouseEnter={mockOnMouseEnter}
      />,
    );

    const name = screen.getByText("Dream Router");
    const abbrev = screen.getByText("UDR");

    expect(name).toHaveClass("text-sm", "leading-5", "text-ui-gray-600");
    expect(abbrev).toHaveClass("text-sm", "leading-5", "text-ui-gray-500");
  });

  it("truncates long names", () => {
    const longSuggestion = {
      id: "2",
      name: "This is a very long device name that should be truncated",
      abbrev: "LONG",
    };

    render(
      <SuggestionItem
        suggestion={longSuggestion}
        isActive={false}
        isKeyboardNav={false}
        searchQuery=""
        onClick={mockOnClick}
        onMouseEnter={mockOnMouseEnter}
      />,
    );

    const name = screen.getByText(longSuggestion.name);
    expect(name).toHaveClass("truncate");
  });

  it("renders correctly when memoized", () => {
    const { rerender } = render(
      <SuggestionItem
        suggestion={defaultSuggestion}
        isActive={false}
        isKeyboardNav={false}
        searchQuery=""
        onClick={mockOnClick}
        onMouseEnter={mockOnMouseEnter}
      />,
    );

    // Re-render with same props - React.memo should prevent re-render
    rerender(
      <SuggestionItem
        suggestion={defaultSuggestion}
        isActive={false}
        isKeyboardNav={false}
        searchQuery=""
        onClick={mockOnClick}
        onMouseEnter={mockOnMouseEnter}
      />,
    );

    // Component should still be in the document
    expect(screen.getByText("Dream Router")).toBeInTheDocument();
  });

  it("highlights matching search query text", () => {
    render(
      <SuggestionItem
        suggestion={defaultSuggestion}
        isActive={false}
        isKeyboardNav={false}
        searchQuery="Dr"
        onClick={mockOnClick}
        onMouseEnter={mockOnMouseEnter}
      />,
    );

    // Check that the highlighted portion exists
    const highlightedElement = screen.getByText("Dr");
    expect(highlightedElement).toHaveClass("font-bold");
    expect(highlightedElement).toHaveClass("underline");
  });

  it("highlights matching text in abbreviation", () => {
    render(
      <SuggestionItem
        suggestion={defaultSuggestion}
        isActive={false}
        isKeyboardNav={false}
        searchQuery="UD"
        onClick={mockOnClick}
        onMouseEnter={mockOnMouseEnter}
      />,
    );

    // Check that the highlighted portion exists in abbrev
    const highlightedElement = screen.getByText("UD");
    expect(highlightedElement).toHaveClass("font-bold");
    expect(highlightedElement).toHaveClass("underline");
  });
});
