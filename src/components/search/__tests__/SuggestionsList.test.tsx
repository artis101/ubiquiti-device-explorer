import { render, screen, fireEvent } from "@testing-library/react";
import { SuggestionsList } from "../SuggestionsList";
import { vi } from "vitest";

describe("SuggestionsList", () => {
  const mockOnSuggestionClick = vi.fn();
  const mockOnMouseEnter = vi.fn();

  const suggestions = [
    { id: "1", name: "Dream Router", abbrev: "UDR" },
    { id: "2", name: "Dream Machine", abbrev: "UDM" },
    { id: "3", name: "Security Gateway", abbrev: "USG" },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders all suggestions", () => {
    render(
      <SuggestionsList
        suggestions={suggestions}
        activeIndex={-1}
        isKeyboardNav={false}
        searchQuery=""
        onSuggestionClick={mockOnSuggestionClick}
        onMouseEnter={mockOnMouseEnter}
      />,
    );

    expect(screen.getByText("Dream Router")).toBeInTheDocument();
    expect(screen.getByText("Dream Machine")).toBeInTheDocument();
    expect(screen.getByText("Security Gateway")).toBeInTheDocument();
  });

  it("renders nothing when suggestions array is empty", () => {
    const { container } = render(
      <SuggestionsList
        suggestions={[]}
        activeIndex={-1}
        isKeyboardNav={false}
        searchQuery=""
        onSuggestionClick={mockOnSuggestionClick}
        onMouseEnter={mockOnMouseEnter}
      />,
    );

    expect(container.firstChild).toBeNull();
  });

  it("passes click handler to each suggestion item", () => {
    render(
      <SuggestionsList
        suggestions={suggestions}
        activeIndex={-1}
        isKeyboardNav={false}
        searchQuery=""
        onSuggestionClick={mockOnSuggestionClick}
        onMouseEnter={mockOnMouseEnter}
      />,
    );

    fireEvent.click(screen.getByText("Dream Machine"));

    expect(mockOnSuggestionClick).toHaveBeenCalledWith(suggestions[1]);
  });

  it("passes mouse enter handler with correct index", () => {
    render(
      <SuggestionsList
        suggestions={suggestions}
        activeIndex={-1}
        isKeyboardNav={false}
        searchQuery=""
        onSuggestionClick={mockOnSuggestionClick}
        onMouseEnter={mockOnMouseEnter}
      />,
    );

    fireEvent.mouseEnter(screen.getByText("Security Gateway").parentElement!);

    expect(mockOnMouseEnter).toHaveBeenCalledWith(2);
  });

  it("marks correct item as active", () => {
    render(
      <SuggestionsList
        suggestions={suggestions}
        activeIndex={1}
        isKeyboardNav={true}
        searchQuery=""
        onSuggestionClick={mockOnSuggestionClick}
        onMouseEnter={mockOnMouseEnter}
      />,
    );

    const items = screen.getAllByRole("option");

    expect(items[0]).toHaveAttribute("aria-selected", "false");
    expect(items[1]).toHaveAttribute("aria-selected", "true");
    expect(items[2]).toHaveAttribute("aria-selected", "false");
  });

  it("applies correct listbox role", () => {
    render(
      <SuggestionsList
        suggestions={suggestions}
        activeIndex={-1}
        isKeyboardNav={false}
        searchQuery=""
        onSuggestionClick={mockOnSuggestionClick}
        onMouseEnter={mockOnMouseEnter}
      />,
    );

    expect(screen.getByRole("listbox")).toBeInTheDocument();
  });

  it("applies correct styling classes", () => {
    render(
      <SuggestionsList
        suggestions={suggestions}
        activeIndex={-1}
        isKeyboardNav={false}
        searchQuery=""
        onSuggestionClick={mockOnSuggestionClick}
        onMouseEnter={mockOnMouseEnter}
      />,
    );

    const list = screen.getByRole("listbox");
    expect(list).toHaveClass(
      "absolute",
      "z-10",
      "w-full",
      "bg-ui-white",
      "border",
      "border-ui-gray-300",
      "rounded-radius",
      "mt-1",
      "shadow-lg",
      "max-h-60",
      "overflow-y-auto",
      "scrollbar-thin",
    );
  });

  it("renders suggestions with unique keys", () => {
    render(
      <SuggestionsList
        suggestions={suggestions}
        activeIndex={-1}
        isKeyboardNav={false}
        searchQuery=""
        onSuggestionClick={mockOnSuggestionClick}
        onMouseEnter={mockOnMouseEnter}
      />,
    );

    const items = screen.getAllByRole("option");
    expect(items).toHaveLength(3);

    // Each item should be rendered (React will warn if keys are not unique)
    suggestions.forEach((suggestion) => {
      expect(screen.getByText(suggestion.name)).toBeInTheDocument();
    });
  });

  it("passes isKeyboardNav state to suggestion items", () => {
    const { rerender } = render(
      <SuggestionsList
        suggestions={suggestions}
        activeIndex={0}
        isKeyboardNav={false}
        searchQuery=""
        onSuggestionClick={mockOnSuggestionClick}
        onMouseEnter={mockOnMouseEnter}
      />,
    );

    // Active item should have gray background when not keyboard nav
    const firstItem = screen.getAllByRole("option")[0];
    expect(firstItem).toHaveClass("bg-ui-gray-100");

    // Re-render with keyboard nav
    rerender(
      <SuggestionsList
        suggestions={suggestions}
        activeIndex={0}
        isKeyboardNav={true}
        searchQuery=""
        onSuggestionClick={mockOnSuggestionClick}
        onMouseEnter={mockOnMouseEnter}
      />,
    );

    // Active item should have border when keyboard nav
    expect(firstItem).toHaveClass("border", "border-ui-blue-primary");
  });
});
