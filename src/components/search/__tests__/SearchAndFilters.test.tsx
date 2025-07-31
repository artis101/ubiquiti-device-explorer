import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SearchAndFilters } from '../SearchAndFilters';
import { useUrlState } from '@hooks/useUrlState';
import { useUidbData } from '@hooks/useUidbData';

// Mock the hooks
vi.mock('@hooks/useUrlState');
vi.mock('@hooks/useUidbData');

describe('SearchAndFilters', () => {
  const mockUpdateState = vi.fn();
  const mockUseUrlState = useUrlState as vi.Mock;
  const mockUseUidbData = useUidbData as vi.Mock;

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseUrlState.mockReturnValue({
      searchQuery: '',
      selectedLineId: undefined,
      viewMode: 'list',
      selectedProductLines: [],
      updateState: mockUpdateState,
    });
    mockUseUidbData.mockReturnValue({
      devicesForProductLineFilter: [],
    });
  });

  it('renders search input and view mode switcher', () => {
    render(<SearchAndFilters />);
    expect(screen.getByPlaceholderText('Search devices...')).toBeInTheDocument();
    expect(screen.getByLabelText('List View')).toBeInTheDocument();
    expect(screen.getByLabelText('Grid View')).toBeInTheDocument();
  });

  it('updates search query after debounce', async () => {
    render(<SearchAndFilters />);
    const searchInput = screen.getByPlaceholderText('Search devices...');
    fireEvent.change(searchInput, { target: { value: 'test query' } });

    // Expect updateState not to be called immediately due to debounce
    expect(mockUpdateState).not.toHaveBeenCalled();

    // Wait for the debounce time to pass
    await waitFor(() => {
      expect(mockUpdateState).toHaveBeenCalledWith({ q: 'test query', productLines: [] });
    }, { timeout: 500 }); // Debounce is 300ms, so 500ms should be enough
  });

  it('changes view mode when switcher is clicked', () => {
    render(<SearchAndFilters />);
    const gridViewButton = screen.getByLabelText('Grid View');
    fireEvent.click(gridViewButton);
    expect(mockUpdateState).toHaveBeenCalledWith({ view: 'grid' });

    const listViewButton = screen.getByLabelText('List View');
    fireEvent.click(listViewButton);
    expect(mockUpdateState).toHaveBeenCalledWith({ view: 'list' });
  });
});
