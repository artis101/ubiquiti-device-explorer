
import { renderHook, act } from '@testing-library/react';
import { useUrlState } from '../useUrlState';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Mock browser APIs
const mockReplaceState = vi.fn();
const mockDispatchEvent = vi.fn();

Object.defineProperty(window, 'history', {
  value: {
    replaceState: mockReplaceState,
  },
});

Object.defineProperty(window, 'dispatchEvent', {
  value: mockDispatchEvent,
});

function setUrl(search: string) {
  Object.defineProperty(window, 'location', {
    writable: true,
    value: {
      search,
      pathname: '/',
    },
  });
}

describe('useUrlState', () => {
  beforeEach(() => {
    mockReplaceState.mockClear();
    mockDispatchEvent.mockClear();
  });

  it('should initialize with default state from an empty URL', () => {
    setUrl('');
    const { result } = renderHook(() => useUrlState());

    expect(result.current.searchQuery).toBe('');
    expect(result.current.viewMode).toBe('list');
    expect(result.current.selectedProductLines).toEqual([]);
  });

  it('should initialize with state from a populated URL', () => {
    setUrl('?q=test&view=grid&productLines=line1,line2');
    const { result } = renderHook(() => useUrlState());

    expect(result.current.searchQuery).toBe('test');
    expect(result.current.viewMode).toBe('grid');
    expect(result.current.selectedProductLines).toEqual(['line1', 'line2']);
  });

  it('should update state and URL when updateState is called', () => {
    setUrl('');
    const { result } = renderHook(() => useUrlState());

    act(() => {
      result.current.updateState({ q: 'new-query', view: 'grid' });
    });

    expect(result.current.searchQuery).toBe('new-query');
    expect(result.current.viewMode).toBe('grid');

    // Check if URL was updated correctly
    const expectedParams = new URLSearchParams({ q: 'new-query', view: 'grid' }).toString();
    expect(mockReplaceState).toHaveBeenCalledWith({}, '', `/?${expectedParams}`);
  });

  it('should handle partial updates without affecting other state', () => {
    setUrl('?q=initial&view=list');
    const { result } = renderHook(() => useUrlState());

    act(() => {
      result.current.updateState({ view: 'grid' });
    });

    expect(result.current.searchQuery).toBe('initial');
    expect(result.current.viewMode).toBe('grid');

    const expectedParams = new URLSearchParams({ q: 'initial', view: 'grid' }).toString();
    expect(mockReplaceState).toHaveBeenCalledWith({}, '', `/?${expectedParams}`);
  });

  it('should correctly format productLines array into a string in the URL', () => {
    setUrl('');
    const { result } = renderHook(() => useUrlState());

    act(() => {
      result.current.updateState({ productLines: ['p1', 'p2'] });
    });

    expect(result.current.selectedProductLines).toEqual(['p1', 'p2']);
    const expectedParams = new URLSearchParams({ productLines: 'p1,p2' }).toString();
    expect(mockReplaceState).toHaveBeenCalledWith({}, '', `/?${expectedParams}`);
  });

  it('should remove empty values from the URL', () => {
    setUrl('?q=test&select=device1');
    const { result } = renderHook(() => useUrlState());

    act(() => {
      result.current.updateState({ q: '', select: undefined });
    });

    expect(result.current.searchQuery).toBe('');
    expect(result.current.selectedDeviceId).toBeUndefined();
    expect(mockReplaceState).toHaveBeenCalledWith({}, '', '/');
  });
});
