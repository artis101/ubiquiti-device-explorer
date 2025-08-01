import React from "react";

interface HighlightMatch {
  start: number;
  end: number;
}

export function getHighlightMatches(
  text: string,
  query: string,
): HighlightMatch[] {
  if (!query || !text) return [];

  const matches: HighlightMatch[] = [];
  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();

  let startIndex = 0;
  let matchIndex = lowerText.indexOf(lowerQuery, startIndex);

  while (matchIndex !== -1) {
    matches.push({
      start: matchIndex,
      end: matchIndex + query.length,
    });
    startIndex = matchIndex + 1;
    matchIndex = lowerText.indexOf(lowerQuery, startIndex);
  }

  return matches;
}

export function highlightText(text: string, query: string): React.ReactNode {
  const matches = getHighlightMatches(text, query);

  if (matches.length === 0) {
    return text;
  }

  const segments: React.ReactNode[] = [];
  let lastIndex = 0;

  matches.forEach((match, index) => {
    if (match.start > lastIndex) {
      segments.push(text.slice(lastIndex, match.start));
    }

    segments.push(
      <span key={index} className="font-bold underline">
        {text.slice(match.start, match.end)}
      </span>,
    );

    lastIndex = match.end;
  });

  if (lastIndex < text.length) {
    segments.push(text.slice(lastIndex));
  }

  return <>{segments}</>;
}
