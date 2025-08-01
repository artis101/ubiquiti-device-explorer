import { Search } from "lucide-react";
import { useState, useRef, useEffect } from "react";

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
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isKeyboardNav, setIsKeyboardNav] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      setIsKeyboardNav(true);
      setActiveIndex((prevIndex) => {
        let nextIndex = e.key === "ArrowDown" ? prevIndex + 1 : prevIndex - 1;
        if (nextIndex >= suggestions.length) {
          nextIndex = 0;
        } else if (nextIndex < 0) {
          nextIndex = suggestions.length - 1;
        }
        return nextIndex;
      });
    } else if (e.key === "Enter") {
      if (activeIndex > -1 && suggestions[activeIndex]) {
        if (onDeviceSelect) {
          onDeviceSelect(suggestions[activeIndex].id);
        } else {
          onSearchChange(suggestions[activeIndex].name);
        }
        setIsOpen(false);
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  const handleSuggestionClick = (suggestion: {
    id: string;
    name: string;
    abbrev: string;
  }) => {
    if (onDeviceSelect) {
      onDeviceSelect(suggestion.id);
    } else {
      onSearchChange(suggestion.name);
    }
    setIsOpen(false);
  };

  const handleFocus = () => {
    if (searchQuery.length > 0) {
      setIsOpen(true);
    }
  };

  const handleMouseEnter = (index: number) => {
    setIsKeyboardNav(false);
    setActiveIndex(index);
  };

  return (
    <div className="relative w-full max-w-md" ref={containerRef}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-icon-default" />
      </div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => {
          onSearchChange(e.target.value);
          setIsOpen(true);
          setIsKeyboardNav(false);
        }}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        placeholder="Search all devices"
        className="block w-full pl-10 pr-3 py-2 border border-ui-gray-300 rounded-radius leading-5 bg-ui-white placeholder-ui-text-subtle focus:outline-none focus:placeholder-ui-text-muted focus:ring-1 focus:ring-icon-focus-ring focus:border-icon-focus-ring text-sm"
        aria-autocomplete="list"
        aria-expanded={isOpen && suggestions.length > 0}
      />
      {isOpen && suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-ui-white border border-ui-gray-300 rounded-radius mt-1 shadow-lg p-1">
          {suggestions.map((suggestion, index) => {
            const isActive = activeIndex === index;
            const activeStyle = isKeyboardNav
              ? "ring-2 ring-ui-blue-primary/30"
              : "bg-ui-gray-100";

            return (
              <li
                key={suggestion.id}
                className={`px-3 py-2 cursor-pointer flex justify-between rounded-radius ${
                  isActive ? activeStyle : "hover:bg-ui-gray-100"
                }`}
                onClick={() => handleSuggestionClick(suggestion)}
                onMouseEnter={() => handleMouseEnter(index)}
              >
                <span>{suggestion.name}</span>
                <span
                  className={
                    isActive && isKeyboardNav
                      ? "text-ui-blue-primary/60"
                      : "text-ui-text-subtle"
                  }
                >
                  {suggestion.abbrev}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
