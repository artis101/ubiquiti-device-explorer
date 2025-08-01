import { memo } from "react";
import { highlightText } from "../../utils/highlightText";

interface SuggestionItemProps {
  suggestion: {
    id: string;
    name: string;
    abbrev: string;
  };
  isActive: boolean;
  isKeyboardNav: boolean;
  searchQuery: string;
  onClick: () => void;
  onMouseEnter: () => void;
}

export const SuggestionItem = memo(function SuggestionItem({
  suggestion,
  isActive,
  isKeyboardNav,
  searchQuery,
  onClick,
  onMouseEnter,
}: SuggestionItemProps) {
  const activeStyle = isKeyboardNav
    ? "border border-ui-blue-primary"
    : "bg-ui-gray-100";

  return (
    <li
      className={`px-2 py-1.5 cursor-pointer flex justify-between items-start h-8 ${
        isActive ? activeStyle : "hover:bg-ui-gray-100"
      }`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      role="option"
      aria-selected={isActive}
    >
      <span className="text-sm leading-5 text-ui-gray-600 flex-1 truncate">
        {highlightText(suggestion.name, searchQuery)}
      </span>
      <span className="text-sm leading-5 text-ui-gray-500 ml-2">
        {highlightText(suggestion.abbrev, searchQuery)}
      </span>
    </li>
  );
});
