import Fuse from "fuse.js";
import type { NormalizedDevice, SearchHit, FuseMatch } from "types/uidb";

// Configure Fuse.js
const fuseOptions = {
  keys: [
    "id",
    "sku",
    "product.name",
    "product.abbrev",
    "displayName",
    "shortnames",
    "sysid",
    "triplets.k1",
    "triplets.k2",
    "triplets.k3",
  ],
  includeScore: true,
  includeMatches: true,
  threshold: 0.4, // Adjust for more/less fuzzy matching
  minMatchCharLength: 2,
};

// Search across multiple device fields using Fuse.js
export function searchDevices(
  devices: NormalizedDevice[],
  query: string
): SearchHit[] {
  if (!query.trim()) {
    return devices.map((device) => ({
      id: device.id,
      displayName: device.displayName,
      lineId: device.lineId,
      imageUrl: device.imageUrl,
      score: 1.0,
    }));
  }

  const fuse = new Fuse(devices, fuseOptions);
  const results = fuse.search(query);

  return results.map(({ item, score, matches }) => ({
    id: item.id,
    displayName: item.displayName,
    lineId: item.lineId,
    imageUrl: item.imageUrl,
    score: 1 - (score || 0), // Fuse.js score is 0-1, 0 is perfect match
    matches: processFuseMatches(matches),
  }));
}

// Filter devices by product line
export function filterByLine(
  devices: NormalizedDevice[],
  lineId?: string
): NormalizedDevice[] {
  if (!lineId) return devices;
  return devices.filter((device) => device.lineId === lineId);
}

export interface SearchHitMatch {
  indices: readonly [number, number][];
  key?: string;
  value?: string;
}

export function processFuseMatches(
  matches: readonly FuseMatch[] | undefined
): SearchHitMatch[] | undefined {
  if (!matches) {
    return undefined;
  }
  return matches.map((match) => ({
    indices: match.indices,
    key: match.key,
    value: match.value,
  }));
}
