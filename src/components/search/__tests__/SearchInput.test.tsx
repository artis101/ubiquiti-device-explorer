import { render, screen, fireEvent } from "@testing-library/react";
import { SearchInput } from "../SearchInput";
import { vi } from "vitest";

describe("SearchInput", () => {
  const mockOnChange = vi.fn();
  const mockOnKeyDown = vi.fn();
  const mockOnFocus = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default placeholder", () => {
    render(
      <SearchInput
        value=""
        onChange={mockOnChange}
        onKeyDown={mockOnKeyDown}
        onFocus={mockOnFocus}
      />
    );

    expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();
  });

  it("renders with custom placeholder", () => {
    render(
      <SearchInput
        value=""
        onChange={mockOnChange}
        onKeyDown={mockOnKeyDown}
        onFocus={mockOnFocus}
        placeholder="Custom placeholder"
      />
    );

    expect(screen.getByPlaceholderText("Custom placeholder")).toBeInTheDocument();
  });

  it("displays the provided value", () => {
    render(
      <SearchInput
        value="test query"
        onChange={mockOnChange}
        onKeyDown={mockOnKeyDown}
        onFocus={mockOnFocus}
      />
    );

    expect(screen.getByDisplayValue("test query")).toBeInTheDocument();
  });

  it("calls onChange when typing", () => {
    render(
      <SearchInput
        value=""
        onChange={mockOnChange}
        onKeyDown={mockOnKeyDown}
        onFocus={mockOnFocus}
      />
    );

    const input = screen.getByRole("combobox") as HTMLInputElement;
    
    // Use userEvent for more realistic typing simulation
    fireEvent.change(input, { target: { value: "new text" } });

    expect(mockOnChange).toHaveBeenCalled();
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  it("calls onKeyDown when pressing keys", () => {
    render(
      <SearchInput
        value=""
        onChange={mockOnChange}
        onKeyDown={mockOnKeyDown}
        onFocus={mockOnFocus}
      />
    );

    const input = screen.getByRole("combobox");
    fireEvent.keyDown(input, { key: "Enter" });

    expect(mockOnKeyDown).toHaveBeenCalledWith(expect.objectContaining({
      key: "Enter"
    }));
  });

  it("calls onFocus when focused", () => {
    render(
      <SearchInput
        value=""
        onChange={mockOnChange}
        onKeyDown={mockOnKeyDown}
        onFocus={mockOnFocus}
      />
    );

    const input = screen.getByRole("combobox");
    fireEvent.focus(input);

    expect(mockOnFocus).toHaveBeenCalled();
  });

  it("renders search icon", () => {
    render(
      <SearchInput
        value=""
        onChange={mockOnChange}
        onKeyDown={mockOnKeyDown}
        onFocus={mockOnFocus}
      />
    );

    const searchIcon = document.querySelector('svg');
    expect(searchIcon).toBeInTheDocument();
    expect(searchIcon).toHaveClass('lucide-search');
  });

  it("sets correct ARIA attributes", () => {
    render(
      <SearchInput
        value=""
        onChange={mockOnChange}
        onKeyDown={mockOnKeyDown}
        onFocus={mockOnFocus}
        aria-expanded={true}
        aria-controls="autocomplete-list"
        aria-autocomplete="list"
      />
    );

    const input = screen.getByRole("combobox");
    expect(input).toHaveAttribute("aria-expanded", "true");
    expect(input).toHaveAttribute("aria-controls", "autocomplete-list");
    expect(input).toHaveAttribute("aria-autocomplete", "list");
  });

  it("has autocomplete turned off", () => {
    render(
      <SearchInput
        value=""
        onChange={mockOnChange}
        onKeyDown={mockOnKeyDown}
        onFocus={mockOnFocus}
      />
    );

    const input = screen.getByRole("combobox");
    expect(input).toHaveAttribute("autoComplete", "off");
  });

  it("forwards ref correctly", () => {
    const ref = { current: null };
    render(
      <SearchInput
        ref={ref}
        value=""
        onChange={mockOnChange}
        onKeyDown={mockOnKeyDown}
        onFocus={mockOnFocus}
      />
    );

    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});