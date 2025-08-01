import { useState, useRef, useCallback, useEffect } from "react";
import { useClickOutside } from "@hooks/useClickOutside";
import { useKeyboardNavigation } from "@hooks/useKeyboardNavigation";
import { SearchInput } from "./SearchInput";
import { SuggestionsList } from "./SuggestionsList";

interface AutocompleteProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onDeviceSelect?: (deviceId: string) => void;
  suggestions: { id: string; name: string; abbrev: string }[];
}

export function Autocomplete({
  searchQuery,
  onSearchChange,
  onDeviceSelect,
  suggestions,
}: AutocompleteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleSuggestionSelect = useCallback(
    (index: number) => {
      const suggestion = suggestions[index];
      if (suggestion) {
        if (onDeviceSelect) {
          onDeviceSelect(suggestion.id);
        } else {
          onSearchChange(suggestion.name);
        }
        handleClose();
      }
    },
    [suggestions, onDeviceSelect, onSearchChange, handleClose]
  );

  const {
    activeIndex,
    isKeyboardNav,
    handleKeyDown,
    handleMouseEnter,
    resetActiveIndex,
  } = useKeyboardNavigation({
    itemCount: suggestions.length,
    isOpen,
    onSelect: handleSuggestionSelect,
    onClose: handleClose,
  });

  useClickOutside(containerRef, handleClose, isOpen);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onSearchChange(e.target.value);
      setIsOpen(true);
      resetActiveIndex();
    },
    [onSearchChange, resetActiveIndex]
  );

  const handleInputFocus = useCallback(() => {
    if (searchQuery.length > 0 && suggestions.length > 0) {
      setIsOpen(true);
    }
  }, [searchQuery, suggestions.length]);

  const handleSuggestionClick = useCallback(
    (suggestion: { id: string; name: string; abbrev: string }) => {
      if (onDeviceSelect) {
        onDeviceSelect(suggestion.id);
      } else {
        onSearchChange(suggestion.name);
      }
      handleClose();
    },
    [onDeviceSelect, onSearchChange, handleClose]
  );

  // Close dropdown when suggestions become empty
  useEffect(() => {
    if (suggestions.length === 0 && isOpen) {
      handleClose();
    }
  }, [suggestions.length, isOpen, handleClose]);

  const dropdownId = "autocomplete-suggestions";

  return (
    <div className="relative w-full max-w-md" ref={containerRef}>
      <SearchInput
        ref={inputRef}
        value={searchQuery}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={handleInputFocus}
        aria-expanded={isOpen && suggestions.length > 0}
        aria-controls={dropdownId}
        aria-autocomplete="list"
      />
      
      {isOpen && (
        <div id={dropdownId}>
          <SuggestionsList
            suggestions={suggestions}
            activeIndex={activeIndex}
            isKeyboardNav={isKeyboardNav}
            onSuggestionClick={handleSuggestionClick}
            onMouseEnter={handleMouseEnter}
          />
        </div>
      )}
    </div>
  );
}