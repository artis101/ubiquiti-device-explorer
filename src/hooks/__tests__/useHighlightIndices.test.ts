import { renderHook } from "@testing-library/react";
import { useHighlightIndices } from "../useHighlightIndices";
import type { SearchHit } from "../../types/uidb";
import { describe, it, expect } from "vitest";

describe("useHighlightIndices", () => {
  const mockSearchHit: SearchHit = {
    id: "1",
    displayName: "Device A",
    score: 0.9,
    matches: [
      { key: "name", value: "Device A", indices: [[0, 3]] },
      { key: "line.name", value: "Line 1", indices: [[0, 1]] },
      { key: "aliases", value: "Alias 1", indices: [[2, 4]] },
      { key: "aliases", value: "Alias 2", indices: [[1, 3]] },
    ],
  };

  it("should return undefined if searchHit is undefined", () => {
    const { result } = renderHook(() => useHighlightIndices(undefined, "name"));
    expect(result.current).toBeUndefined();
  });

  it("should return undefined if there are no matches", () => {
    const noMatchesHit: SearchHit = {
      id: "1",
      displayName: "Device",
      score: 1.0,
      matches: [],
    };
    const { result } = renderHook(() =>
      useHighlightIndices(noMatchesHit, "name"),
    );
    expect(result.current).toBeUndefined();
  });

  it("should return indices for a matching key without a specific value", () => {
    const { result } = renderHook(() =>
      useHighlightIndices(mockSearchHit, "name"),
    );
    expect(result.current).toEqual([[0, 3]]);
  });

  it("should return indices for a matching key and value", () => {
    const { result } = renderHook(() =>
      useHighlightIndices(mockSearchHit, "aliases", "Alias 2"),
    );
    expect(result.current).toEqual([[1, 3]]);
  });

  it("should return the first match if multiple keys are the same without a value", () => {
    const { result } = renderHook(() =>
      useHighlightIndices(mockSearchHit, "aliases"),
    );
    expect(result.current).toEqual([[2, 4]]);
  });

  it("should return undefined if the key does not match", () => {
    const { result } = renderHook(() =>
      useHighlightIndices(mockSearchHit, "nonexistent"),
    );
    expect(result.current).toBeUndefined();
  });

  it("should return undefined if the key matches but the value does not", () => {
    const { result } = renderHook(() =>
      useHighlightIndices(mockSearchHit, "aliases", "nonexistent"),
    );
    expect(result.current).toBeUndefined();
  });

  it("should re-evaluate when dependencies change", () => {
    const { result, rerender } = renderHook(
      ({ searchHit, key, value }) => useHighlightIndices(searchHit, key, value),
      {
        initialProps: {
          searchHit: mockSearchHit,
          key: "name",
          value: undefined as string | undefined,
        },
      },
    );

    expect(result.current).toEqual([[0, 3]]);

    rerender({ searchHit: mockSearchHit, key: "aliases", value: "Alias 1" });
    expect(result.current).toEqual([[2, 4]]);

    const newSearchHit: SearchHit = {
      id: "2",
      displayName: "New Device",
      score: 0.8,
      matches: [{ key: "name", value: "New Device", indices: [[5, 8]] }],
    };
    rerender({ searchHit: newSearchHit, key: "name", value: undefined });
    expect(result.current).toEqual([[5, 8]]);
  });
});
