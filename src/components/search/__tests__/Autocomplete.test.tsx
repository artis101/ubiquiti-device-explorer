import { render, screen, fireEvent } from "@testing-library/react";
import { Autocomplete } from "../Autocomplete";
import { vi, type Mock } from "vitest";

// Mock the custom hooks
vi.mock("@hooks/useClickOutside");
vi.mock("@hooks/useKeyboardNavigation", () => ({
  useKeyboardNavigation: vi.fn(() => ({
    activeIndex: -1,
    isKeyboardNav: false,
    handleKeyDown: vi.fn(),
    handleMouseEnter: vi.fn(),
    resetActiveIndex: vi.fn(),
  })),
}));

describe("Autocomplete", () => {
  const mockOnSearchChange = vi.fn();
  const mockOnDeviceSelect = vi.fn();

  const suggestions = [
    { id: "1", name: "Dream Router", abbrev: "UDR" },
    { id: "2", name: "Dream Machine", abbrev: "UDM" },
    { id: "3", name: "Security Gateway", abbrev: "USG" },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders search input with provided value", () => {
    render(
      <Autocomplete
        searchQuery="test"
        onSearchChange={mockOnSearchChange}
        suggestions={[]}
      />
    );

    expect(screen.getByDisplayValue("test")).toBeInTheDocument();
  });

  it("shows suggestions when typing and suggestions exist", async () => {
    const { rerender } = render(
      <Autocomplete
        searchQuery=""
        onSearchChange={mockOnSearchChange}
        suggestions={[]}
      />
    );

    // Type in the input
    const input = screen.getByRole("combobox");
    fireEvent.change(input, { target: { value: "dream" } });

    expect(mockOnSearchChange).toHaveBeenCalledWith("dream");

    // Re-render with suggestions - the dropdown opens automatically on input change
    rerender(
      <Autocomplete
        searchQuery="dream"
        onSearchChange={mockOnSearchChange}
        suggestions={suggestions}
      />
    );

    // Focus the input to open dropdown
    fireEvent.focus(input);

    // Suggestions should be visible - use text content matcher for highlighted text
    expect(
      screen.getByRole("option", { name: /Dream Router/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: /Dream Machine/i })
    ).toBeInTheDocument();
  });

  it("opens dropdown on focus when query and suggestions exist", () => {
    render(
      <Autocomplete
        searchQuery="dream"
        onSearchChange={mockOnSearchChange}
        suggestions={suggestions}
      />
    );

    const input = screen.getByRole("combobox");
    fireEvent.focus(input);

    expect(
      screen.getByRole("option", { name: /Dream Router/i })
    ).toBeInTheDocument();
  });

  it("does not open dropdown on focus when query is empty", () => {
    render(
      <Autocomplete
        searchQuery=""
        onSearchChange={mockOnSearchChange}
        suggestions={suggestions}
      />
    );

    const input = screen.getByRole("combobox");
    fireEvent.focus(input);

    expect(
      screen.queryByRole("option", { name: /Dream Router/i })
    ).not.toBeInTheDocument();
  });

  it("closes dropdown when suggestions become empty", () => {
    const { rerender } = render(
      <Autocomplete
        searchQuery="dream"
        onSearchChange={mockOnSearchChange}
        suggestions={suggestions}
      />
    );

    // Open dropdown
    const input = screen.getByRole("combobox");
    fireEvent.focus(input);

    expect(
      screen.getByRole("option", { name: /Dream Router/i })
    ).toBeInTheDocument();

    // Re-render with no suggestions
    rerender(
      <Autocomplete
        searchQuery="xyz"
        onSearchChange={mockOnSearchChange}
        suggestions={[]}
      />
    );

    expect(
      screen.queryByRole("option", { name: /Dream Router/i })
    ).not.toBeInTheDocument();
  });

  it("calls onDeviceSelect when suggestion is clicked", () => {
    render(
      <Autocomplete
        searchQuery="dream"
        onSearchChange={mockOnSearchChange}
        onDeviceSelect={mockOnDeviceSelect}
        suggestions={suggestions}
      />
    );

    // Open dropdown
    const input = screen.getByRole("combobox");
    fireEvent.focus(input);

    // Click suggestion
    fireEvent.click(screen.getByRole("option", { name: /Dream Machine/i }));

    expect(mockOnDeviceSelect).toHaveBeenCalledWith("2");
    expect(mockOnSearchChange).not.toHaveBeenCalled();
  });

  it("calls onSearchChange when no onDeviceSelect provided", () => {
    render(
      <Autocomplete
        searchQuery="dream"
        onSearchChange={mockOnSearchChange}
        suggestions={suggestions}
      />
    );

    // Open dropdown
    const input = screen.getByRole("combobox");
    fireEvent.focus(input);

    // Click suggestion
    fireEvent.click(screen.getByRole("option", { name: /Dream Machine/i }));

    expect(mockOnSearchChange).toHaveBeenCalledWith("Dream Machine");
  });

  it("sets correct ARIA attributes", () => {
    const { rerender } = render(
      <Autocomplete
        searchQuery=""
        onSearchChange={mockOnSearchChange}
        suggestions={[]}
      />
    );

    const input = screen.getByRole("combobox");

    // Initially closed
    expect(input).toHaveAttribute("aria-expanded", "false");
    expect(input).toHaveAttribute("aria-controls", "autocomplete-suggestions");
    expect(input).toHaveAttribute("aria-autocomplete", "list");

    // Re-render with suggestions and open
    rerender(
      <Autocomplete
        searchQuery="dream"
        onSearchChange={mockOnSearchChange}
        suggestions={suggestions}
      />
    );

    fireEvent.focus(input);

    expect(input).toHaveAttribute("aria-expanded", "true");
  });

  it("renders dropdown with correct id for ARIA", () => {
    render(
      <Autocomplete
        searchQuery="dream"
        onSearchChange={mockOnSearchChange}
        suggestions={suggestions}
      />
    );

    const input = screen.getByRole("combobox");
    fireEvent.focus(input);

    const dropdown = document.getElementById("autocomplete-suggestions");
    expect(dropdown).toBeInTheDocument();
  });

  it("handles keyboard navigation integration", async () => {
    const { useKeyboardNavigation } = await import(
      "@hooks/useKeyboardNavigation"
    );
    const mockHandleKeyDown = vi.fn();

    (useKeyboardNavigation as Mock).mockReturnValue({
      activeIndex: 1,
      isKeyboardNav: true,
      handleKeyDown: mockHandleKeyDown,
      handleMouseEnter: vi.fn(),
      resetActiveIndex: vi.fn(),
    });

    render(
      <Autocomplete
        searchQuery="dream"
        onSearchChange={mockOnSearchChange}
        onDeviceSelect={mockOnDeviceSelect}
        suggestions={suggestions}
      />
    );

    const input = screen.getByRole("combobox");
    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: "ArrowDown" });

    expect(mockHandleKeyDown).toHaveBeenCalled();
  });

  it("resets active index when input changes", async () => {
    const { useKeyboardNavigation } = await import(
      "@hooks/useKeyboardNavigation"
    );
    const mockResetActiveIndex = vi.fn();

    (useKeyboardNavigation as Mock).mockReturnValue({
      activeIndex: -1,
      isKeyboardNav: false,
      handleKeyDown: vi.fn(),
      handleMouseEnter: vi.fn(),
      resetActiveIndex: mockResetActiveIndex,
    });

    render(
      <Autocomplete
        searchQuery=""
        onSearchChange={mockOnSearchChange}
        suggestions={suggestions}
      />
    );

    const input = screen.getByRole("combobox");
    fireEvent.change(input, { target: { value: "new" } });

    expect(mockResetActiveIndex).toHaveBeenCalled();
  });

  it("handles suggestion selection via keyboard", async () => {
    const { useKeyboardNavigation } = await import(
      "@hooks/useKeyboardNavigation"
    );

    (useKeyboardNavigation as Mock).mockImplementation(() => ({
      activeIndex: 1,
      isKeyboardNav: true,
      handleKeyDown: vi.fn(),
      handleMouseEnter: vi.fn(),
      resetActiveIndex: vi.fn(),
    }));

    render(
      <Autocomplete
        searchQuery="dream"
        onSearchChange={mockOnSearchChange}
        onDeviceSelect={mockOnDeviceSelect}
        suggestions={suggestions}
      />
    );

    // Get the onSelect callback that was passed to useKeyboardNavigation
    const onSelectCallback = (useKeyboardNavigation as Mock).mock.calls[0][0]
      .onSelect;

    // Simulate selection
    onSelectCallback(1);

    expect(mockOnDeviceSelect).toHaveBeenCalledWith("2");
  });

  it("applies correct container classes", () => {
    render(
      <Autocomplete
        searchQuery=""
        onSearchChange={mockOnSearchChange}
        suggestions={[]}
      />
    );

    const container = screen
      .getByRole("combobox")
      .closest("div")?.parentElement;
    expect(container).toHaveClass("relative", "w-full", "max-w-md");
  });
});
