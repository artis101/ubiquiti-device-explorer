import React from 'react';
import { List, Grid } from 'lucide-react';
import { ToggleSwitch } from '@components/ui/ToggleSwitch';

const viewModeOptions = [
  {
    value: 'list',
    label: <List className="h-5 w-5" />,
    'aria-label': 'List view',
  },
  {
    value: 'grid',
    label: <Grid className="h-5 w-5" />,
    'aria-label': 'Grid view',
  },
];

interface ViewModeSwitcherProps {
  viewMode: 'list' | 'grid';
  onViewModeChange: (mode: 'list' | 'grid') => void;
}

export function ViewModeSwitcher({ viewMode, onViewModeChange }: ViewModeSwitcherProps) {
  return (
    <ToggleSwitch
      options={viewModeOptions}
      selectedValue={viewMode}
      onValueChange={onViewModeChange}
    />
  );
}
