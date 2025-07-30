import { List, Grid } from "lucide-react";
import { ToggleSwitch } from "@components/ui/ToggleSwitch";
import React from "react";

type ViewMode = "list" | "grid";

const viewModeOptions: {
  value: ViewMode;
  label: React.ReactNode;
  "aria-label": string;
}[] = [
  {
    value: "list",
    label: <List className="h-5 w-5" />,
    "aria-label": "List view",
  },
  {
    value: "grid",
    label: <Grid className="h-5 w-5" />,
    "aria-label": "Grid view",
  },
];

interface ViewModeSwitcherProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

export function ViewModeSwitcher({
  viewMode,
  onViewModeChange,
}: ViewModeSwitcherProps) {
  return (
    <ToggleSwitch
      options={viewModeOptions}
      selectedValue={viewMode}
      onValueChange={onViewModeChange}
    />
  );
}
