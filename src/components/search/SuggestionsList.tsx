import { SuggestionItem } from "./SuggestionItem";

interface SuggestionsListProps {
  suggestions: {
    id: string;
    name: string;
    abbrev: string;
  }[];
  activeIndex: number;
  isKeyboardNav: boolean;
  onSuggestionClick: (suggestion: { id: string; name: string; abbrev: string }) => void;
  onMouseEnter: (index: number) => void;
}

export function SuggestionsList({
  suggestions,
  activeIndex,
  isKeyboardNav,
  onSuggestionClick,
  onMouseEnter,
}: SuggestionsListProps) {
  if (suggestions.length === 0) return null;

  return (
    <ul 
      className="absolute z-10 w-full bg-ui-white border border-ui-gray-300 rounded-radius mt-1 shadow-lg max-h-60 overflow-y-auto scrollbar-thin"
      role="listbox"
    >
      {suggestions.map((suggestion, index) => (
        <SuggestionItem
          key={suggestion.id}
          suggestion={suggestion}
          isActive={activeIndex === index}
          isKeyboardNav={isKeyboardNav}
          onClick={() => onSuggestionClick(suggestion)}
          onMouseEnter={() => onMouseEnter(index)}
        />
      ))}
    </ul>
  );
}