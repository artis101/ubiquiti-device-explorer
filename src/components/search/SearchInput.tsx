import { Search } from "lucide-react";
import { forwardRef } from "react";

interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  placeholder?: string;
  "aria-expanded"?: boolean;
  "aria-controls"?: string;
  "aria-autocomplete"?: "list";
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  function SearchInput(props, ref) {
    const { placeholder = "Search all devices", ...inputProps } = props;

    return (
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-icon-default" aria-hidden="true" />
        </div>
        <input
          ref={ref}
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-ui-gray-300 rounded-radius leading-5 bg-ui-white placeholder-ui-text-subtle focus:outline-none focus:placeholder-ui-text-muted focus:ring-1 focus:ring-icon-focus-ring focus:border-icon-focus-ring text-sm"
          placeholder={placeholder}
          role="combobox"
          autoComplete="off"
          {...inputProps}
        />
      </div>
    );
  }
);