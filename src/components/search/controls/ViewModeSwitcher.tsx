import { List, LayoutGrid } from "lucide-react";
import { IconButton } from "@components/ui/IconButton";

type ViewMode = "list" | "grid";

interface ViewModeSwitcherProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

export function ViewModeSwitcher({
  viewMode,
  onViewModeChange,
}: ViewModeSwitcherProps) {
  return (
    <div className="flex items-center gap-x-2">
      <IconButton
        variant={viewMode === "list" ? "active" : "default"}
        aria-label="List view"
        onClick={() => onViewModeChange("list")}
      >
        <List className="h-5 w-5" />
      </IconButton>
      <IconButton
        variant={viewMode === "grid" ? "active" : "default"}
        aria-label="Grid view"
        onClick={() => onViewModeChange("grid")}
      >
        <LayoutGrid className="h-5 w-5" />
      </IconButton>
    </div>
  );
}
