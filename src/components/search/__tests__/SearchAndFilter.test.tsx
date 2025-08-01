
import { render, screen, fireEvent } from '@testing-library/react';
import { UidbProvider } from '../../../contexts/UidbProvider';
import { SearchInput } from './SearchInput';
import { DeviceList } from '../device/list/DeviceList';
import { describe, it, expect, vi } from 'vitest';
import { mockDevices } from '../../__tests__/mocks';

describe('Search and Filter Integration', () => {
  it('should filter the device list when a search query is entered', () => {
    render(
      <UidbProvider initialDevices={mockDevices}>
        <SearchInput />
        <DeviceList height={500} isInteractive={true} />
      </UidbProvider>
    );

    // Initially, all devices should be visible
    expect(screen.getByText('Device A')).toBeInTheDocument();
    expect(screen.getByText('Device B')).toBeInTheDocument();
    expect(screen.getByText('Device C')).toBeInTheDocument();

    const searchInput = screen.getByPlaceholderText('Search...');

    // Type a search query
    fireEvent.change(searchInput, { target: { value: 'Device A' } });

    // Only Device A should be visible
    expect(screen.getByText('Device A')).toBeInTheDocument();
    expect(screen.queryByText('Device B')).not.toBeInTheDocument();
    expect(screen.queryByText('Device C')).not.toBeInTheDocument();
  });
});
