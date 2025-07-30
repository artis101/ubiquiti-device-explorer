import type { NormalizedDevice, SearchHit } from "../types/uidb";

// Simple string matching score (0-1, higher is better)
function scoreMatch(query: string, text: string): number {
  if (!text) return 0;

  const lowerQuery = query.toLowerCase();
  const lowerText = text.toLowerCase();

  // Exact match gets highest score
  if (lowerText === lowerQuery) return 1.0;

  // Starts with query gets high score
  if (lowerText.startsWith(lowerQuery)) return 0.8;

  // Contains query gets medium score
  if (lowerText.includes(lowerQuery)) return 0.6;

  // Fuzzy matching for partial matches
  let score = 0;
  const queryChars = lowerQuery.split("");
  let textIndex = 0;

  for (const char of queryChars) {
    const found = lowerText.indexOf(char, textIndex);
    if (found >= 0) {
      score += 0.1;
      textIndex = found + 1;
    }
  }

  return Math.min(score, 0.4); // Cap fuzzy scores
}

// Search across multiple device fields
export function searchDevices(
  devices: NormalizedDevice[],
  query: string,
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

  const results: SearchHit[] = [];

  for (const device of devices) {
    let maxScore = 0;

    // Search in primary fields
    const fields = [
      device.id,
      device.sku,
      device.product?.name,
      device.product?.abbrev,
      device.displayName,
      ...(device.shortnames || []),
    ];

    // Search in sysid (can be string or array)
    if (device.sysid) {
      if (Array.isArray(device.sysid)) {
        fields.push(...device.sysid);
      } else {
        fields.push(device.sysid);
      }
    }

    // Search in triplets
    if (device.triplets) {
      for (const triplet of device.triplets) {
        if (triplet.k1) fields.push(triplet.k1);
        if (triplet.k2) fields.push(triplet.k2);
        if (triplet.k3) fields.push(triplet.k3);
      }
    }

    // Find best matching field
    for (const field of fields) {
      if (field) {
        const score = scoreMatch(query, field);
        maxScore = Math.max(maxScore, score);
      }
    }

    // Include devices with any match
    if (maxScore > 0) {
      results.push({
        id: device.id,
        displayName: device.displayName,
        lineId: device.lineId,
        imageUrl: device.imageUrl,
        score: maxScore,
      });
    }
  }

  // Sort by score (descending) then by display name
  return results.sort((a, b) => {
    if (a.score !== b.score) {
      return b.score - a.score;
    }
    return a.displayName.localeCompare(b.displayName);
  });
}

// Filter devices by product line
export function filterByLine(
  devices: NormalizedDevice[],
  lineId?: string,
): NormalizedDevice[] {
  if (!lineId) return devices;
  return devices.filter((device) => device.lineId === lineId);
}
