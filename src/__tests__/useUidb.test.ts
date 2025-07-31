import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, waitFor, act } from '@testing-library/react';
import { useUidb } from '@hooks/useUidb';
import * as uidbUtils from '@utils/uidb';
import * as constants from '@config/constants';

// Mock the fetch API
const mockFetch = vi.fn();
global.fetch = mockFetch;

// Mock the import of public.json
vi.mock('../data/public.json', () => ({
  default: { devices: [{ id: 'cached1' }] },
}));

describe('useUidb', () => {
  const MOCK_API_URL = 'https://api.example.com/uidb.json';
  const MOCK_CACHED_DEVICE = { id: 'cached1', displayName: 'Cached Device 1' };
  const MOCK_NORMALIZED_DEVICE = { id: 'api1', displayName: 'API Device 1' };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(constants, 'getUidbUrl').mockReturnValue(MOCK_API_URL);
    vi.spyOn(uidbUtils, 'parseUidbResponse').mockReturnValue({
      devices: [{ id: 'api1' }],
      warnings: [],
    });
    vi.spyOn(uidbUtils, 'normalizeDevices').mockReturnValue({
      normalized: [MOCK_NORMALIZED_DEVICE],
      warnings: [],
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return initial loading state', () => {
    mockFetch.mockImplementationOnce(() => new Promise(() => {})); // Never resolve
    const { result } = renderHook(() => useUidb());
    expect(result.current.loading).toBe(true);
    expect(result.current.devices).toEqual([]);
    expect(result.current.warnings).toEqual([]);
    expect(result.current.error).toBeUndefined();
  });

  it('should fetch data successfully from API', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ devices: [{ id: 'api1' }] }),
      headers: new Headers({ 'last-modified': 'Thu, 01 Jan 1970 00:00:00 GMT' }),
    });

    const { result } = renderHook(() => useUidb());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.devices).toEqual([MOCK_NORMALIZED_DEVICE]);
    expect(result.current.warnings).toEqual([]);
    expect(result.current.error).toBeUndefined();
    expect(result.current.connectionInfo.status).toBe('live');
    expect(mockFetch).toHaveBeenCalledWith(MOCK_API_URL);
  });

  it('should fallback to local public.json if API fetch fails', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));
    vi.spyOn(uidbUtils, 'normalizeDevices').mockReturnValueOnce({
      normalized: [MOCK_CACHED_DEVICE],
      warnings: [],
    });

    const { result } = renderHook(() => useUidb());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.devices).toEqual([MOCK_CACHED_DEVICE]);
    expect(result.current.warnings).toEqual([]);
    expect(result.current.error).toBeDefined(); // Error should still be present
    expect(result.current.connectionInfo.status).toBe('cached');
    expect(mockFetch).toHaveBeenCalledWith(MOCK_API_URL);
  });

  it('should handle API response not ok and fallback to local public.json', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: 'Not Found',
    });
    vi.spyOn(uidbUtils, 'normalizeDevices').mockReturnValueOnce({
      normalized: [MOCK_CACHED_DEVICE],
      warnings: [],
    });

    const { result } = renderHook(() => useUidb());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.devices).toEqual([MOCK_CACHED_DEVICE]);
    expect(result.current.warnings).toEqual([]);
    expect(result.current.error).toBeDefined();
    expect(result.current.connectionInfo.status).toBe('cached');
    expect(mockFetch).toHaveBeenCalledWith(MOCK_API_URL);
  });

  it('should handle parsing errors and fallback to local public.json', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ invalidData: 'abc' }),
      headers: new Headers({ 'last-modified': 'Thu, 01 Jan 1970 00:00:00 GMT' }),
    });
    vi.spyOn(uidbUtils, 'parseUidbResponse').mockReturnValueOnce({
      devices: [],
      warnings: [],
      error: 'Zod error',
    });
    vi.spyOn(uidbUtils, 'normalizeDevices').mockReturnValueOnce({
      normalized: [MOCK_CACHED_DEVICE],
      warnings: [],
    });

    const { result } = renderHook(() => useUidb());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.devices).toEqual([MOCK_CACHED_DEVICE]);
    expect(result.current.warnings).toEqual([]);
    expect(result.current.error).toBeDefined();
    expect(result.current.connectionInfo.status).toBe('cached');
  });

  it('should refetch data when refetch is called', async () => {
    // Initial successful fetch
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ devices: [{ id: 'initial' }] }),
      headers: new Headers({ 'last-modified': 'Thu, 01 Jan 1970 00:00:00 GMT' }),
    });
    const { result } = renderHook(() => useUidb());
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.devices).toEqual([MOCK_NORMALIZED_DEVICE]);

    // Refetch with new data
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ devices: [{ id: 'refetched' }] }),
      headers: new Headers({ 'last-modified': 'Fri, 02 Jan 1970 00:00:00 GMT' }),
    });
    vi.spyOn(uidbUtils, 'normalizeDevices').mockReturnValueOnce({
      normalized: [{ id: 'refetched', displayName: 'Refetched Device' }],
      warnings: [],
    });

    await act(async () => {
      result.current.refetch();
    });

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.devices).toEqual([{ id: 'refetched', displayName: 'Refetched Device' }]);
    expect(mockFetch).toHaveBeenCalledTimes(2);
  });

  it('should include warnings from normalization', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ devices: [{ id: 'api1' }] }),
      headers: new Headers({ 'last-modified': 'Thu, 01 Jan 1970 00:00:00 GMT' }),
    });
    vi.spyOn(uidbUtils, 'normalizeDevices').mockReturnValueOnce({
      normalized: [MOCK_NORMALIZED_DEVICE],
      warnings: [{ deviceId: 'api1', field: 'test', reason: 'test warning' }],
    });

    const { result } = renderHook(() => useUidb());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.warnings).toEqual([
      { deviceId: 'api1', field: 'test', reason: 'test warning' },
    ]);
  });
});
