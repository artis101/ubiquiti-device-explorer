import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { FilterButton } from '../controls/FilterButton';
import { ProductLineContext } from '@contexts/ProductLineContext';
import type { NormalizedDevice } from 'types/uidb';

// Mock the useProductLineData hook
vi.mock('@hooks/useProductLineData', () => ({
  useProductLineData: () => ({
    productLines: [
      { id: 'l1', name: 'Line 1', count: 2 },
      { id: 'l2', name: 'Line 2', count: 1 },
      { id: 'l3', name: 'Line 3', count: 0 },
    ],
  }),
}));

const mockDevices: NormalizedDevice[] = [
  {
    id: '1',
    displayName: 'Device A',
    lineId: 'l1',
    imageUrl: 'https://example.com/a.png',
    product: { name: 'Device A' },
    line: { id: 'l1', name: 'Line 1' },
    images: {},
  },
  {
    id: '2',
    displayName: 'Device B',
    lineId: 'l2',
    imageUrl: 'https://example.com/b.png',
    product: { name: 'Device B' },
    line: { id: 'l2', name: 'Line 2' },
    images: {},
  },
  {
    id: '3',
    displayName: 'Device C',
    lineId: 'l1',
    imageUrl: 'https://example.com/c.png',
    product: { name: 'Device C' },
    line: { id: 'l1', name: 'Line 1' },
    images: {},
  },
];

describe('FilterButton', () => {
  it('should render the filter button', () => {
    const onFilterChange = vi.fn();
    
    render(
      <FilterButton
        onFilterChange={onFilterChange}
        filteredDevices={mockDevices}
        selectedProductLines={[]}
      />
    );

    expect(screen.getByText('Filter')).toBeInTheDocument();
  });

  it('should open dropdown when clicked', async () => {
    const onFilterChange = vi.fn();
    
    render(
      <FilterButton
        onFilterChange={onFilterChange}
        filteredDevices={mockDevices}
        selectedProductLines={[]}
      />
    );

    const filterButton = screen.getByText('Filter');
    fireEvent.click(filterButton);

    await waitFor(() => {
      expect(screen.getByText('Product Line')).toBeInTheDocument();
      expect(screen.getByText('Line 1')).toBeInTheDocument();
      expect(screen.getByText('Line 2')).toBeInTheDocument();
      expect(screen.getByText('Line 3')).toBeInTheDocument();
    });
  });

  it('should call onFilterChange when a product line is selected', async () => {
    const onFilterChange = vi.fn();
    
    render(
      <FilterButton
        onFilterChange={onFilterChange}
        filteredDevices={mockDevices}
        selectedProductLines={[]}
      />
    );

    // Open the dropdown
    fireEvent.click(screen.getByText('Filter'));

    // Click on Line 1 checkbox
    const line1Checkbox = screen.getByRole('checkbox', { name: /Line 1/i });
    fireEvent.click(line1Checkbox);

    await waitFor(() => {
      expect(onFilterChange).toHaveBeenCalledWith(['l1']);
    });
  });

  it('should unselect a product line when clicked again', async () => {
    const onFilterChange = vi.fn();
    
    render(
      <FilterButton
        onFilterChange={onFilterChange}
        filteredDevices={mockDevices}
        selectedProductLines={['l1']}
      />
    );

    // Open the dropdown
    fireEvent.click(screen.getByText('Filter'));

    // Line 1 should be checked
    const line1Checkbox = screen.getByRole('checkbox', { name: /Line 1/i });
    expect(line1Checkbox).toBeChecked();

    // Click to uncheck
    fireEvent.click(line1Checkbox);

    await waitFor(() => {
      expect(onFilterChange).toHaveBeenCalledWith([]);
    });
  });

  it('should disable product lines with no available devices', async () => {
    const onFilterChange = vi.fn();
    
    // Filter devices to only have l1 and l2
    const filteredDevices = mockDevices.filter(d => d.lineId !== 'l3');
    
    render(
      <FilterButton
        onFilterChange={onFilterChange}
        filteredDevices={filteredDevices}
        selectedProductLines={[]}
      />
    );

    // Open the dropdown
    fireEvent.click(screen.getByText('Filter'));

    // Line 3 should be disabled since it has no devices in filteredDevices
    const line3Checkbox = screen.getByRole('checkbox', { name: /Line 3/i });
    expect(line3Checkbox).toBeDisabled();
  });

  it('should show Reset button and reset filters when clicked', async () => {
    const onFilterChange = vi.fn();
    
    render(
      <FilterButton
        onFilterChange={onFilterChange}
        filteredDevices={mockDevices}
        selectedProductLines={['l1', 'l2']}
      />
    );

    // Open the dropdown
    fireEvent.click(screen.getByText('Filter'));

    // Click Reset
    const resetButton = screen.getByText('Reset');
    fireEvent.click(resetButton);

    await waitFor(() => {
      expect(onFilterChange).toHaveBeenCalledWith([]);
    });
  });

  it('should close dropdown when clicking outside', async () => {
    const onFilterChange = vi.fn();
    
    render(
      <div>
        <div data-testid="outside">Outside element</div>
        <FilterButton
          onFilterChange={onFilterChange}
          filteredDevices={mockDevices}
          selectedProductLines={[]}
        />
      </div>
    );

    // Open the dropdown
    fireEvent.click(screen.getByText('Filter'));
    expect(screen.getByText('Product Line')).toBeInTheDocument();

    // Click outside
    fireEvent.mouseDown(screen.getByTestId('outside'));

    await waitFor(() => {
      expect(screen.queryByText('Product Line')).not.toBeInTheDocument();
    });
  });
});