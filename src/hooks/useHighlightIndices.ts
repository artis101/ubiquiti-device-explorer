import { useMemo } from "react";
import type { SearchHit } from "../types/uidb";

export function useHighlightIndices(
  searchHit: SearchHit | undefined,
  key: string,
  value?: string,
) {
  const indices = useMemo(() => {
    if (!searchHit?.matches) {
      return undefined;
    }

    const foundMatch = searchHit.matches.find((m) => {
      if (value !== undefined) {
        return m.key === key && m.value === value;
      }
      return m.key === key;
    });

    return foundMatch?.indices;
  }, [searchHit, key, value]);

  return indices;
}
