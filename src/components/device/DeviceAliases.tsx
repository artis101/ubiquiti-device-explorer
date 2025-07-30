import type { SearchHit } from "types/uidb";
import { Highlight } from "@components/ui/Highlight";

interface DeviceAliasesProps {
  aliases: string[];
  searchHit?: SearchHit;
}

export function DeviceAliases({ aliases, searchHit }: DeviceAliasesProps) {
  if (!aliases || aliases.length === 0) {
    return null;
  }

  // Get highlighted aliases first, then non-highlighted ones
  const highlightedAliases: string[] = [];
  const nonHighlightedAliases: string[] = [];

  aliases.forEach((alias) => {
    const hasHighlight = searchHit?.matches?.some(
      (m) =>
        m.key === "shortnames" &&
        m.value === alias &&
        m.indices &&
        m.indices.length > 0,
    );
    if (hasHighlight) {
      highlightedAliases.push(alias);
    } else {
      nonHighlightedAliases.push(alias);
    }
  });

  // Show up to 3 aliases, prioritizing highlighted ones
  const visibleAliases = [
    ...highlightedAliases,
    ...nonHighlightedAliases,
  ].slice(0, 3);
  const hiddenCount = aliases.length - visibleAliases.length;

  return (
    <div className="flex items-start gap-2">
      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide mt-0.5">
        Aliases:
      </span>
      <div className="flex flex-wrap gap-1">
        {visibleAliases.map((alias, index) => {
          const isHighlighted = highlightedAliases.includes(alias);
          return (
            <span
              key={`${alias}-${index}`}
              className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                isHighlighted
                  ? "bg-blue-50 text-blue-700 border border-blue-200"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              <Highlight
                text={alias}
                indices={
                  searchHit?.matches?.find(
                    (m) => m.key === "shortnames" && m.value === alias,
                  )?.indices
                }
              />
            </span>
          );
        })}
        {hiddenCount > 0 && (
          <span className="text-xs text-gray-500">+{hiddenCount} more</span>
        )}
      </div>
    </div>
  );
}
