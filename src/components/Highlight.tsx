import React from 'react';

interface HighlightProps {
  text: string;
  indices?: readonly [number, number][];
}

export const Highlight: React.FC<HighlightProps> = ({ text, indices }) => {
  // If no indices provided, return plain text
  if (!indices || indices.length === 0) {
    return <>{text}</>;
  }

  // Sort indices by start position to handle overlapping matches
  const sortedIndices = [...indices].sort((a, b) => a[0] - b[0]);
  
  // Merge overlapping indices
  const mergedIndices: [number, number][] = [];
  for (const [start, end] of sortedIndices) {
    if (mergedIndices.length === 0) {
      mergedIndices.push([start, end]);
    } else {
      const lastIndex = mergedIndices[mergedIndices.length - 1];
      if (start <= lastIndex[1]) {
        // Overlapping or adjacent - merge them
        lastIndex[1] = Math.max(lastIndex[1], end);
      } else {
        mergedIndices.push([start, end]);
      }
    }
  }

  // Build the result array with highlighted and non-highlighted parts
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;

  mergedIndices.forEach(([start, end], idx) => {
    // Add non-highlighted text before this match
    if (start > lastIndex) {
      parts.push(text.slice(lastIndex, start));
    }
    
    // Add highlighted text
    parts.push(
      <mark key={idx}>
        {text.slice(start, end + 1)}
      </mark>
    );
    
    lastIndex = end + 1;
  });

  // Add any remaining non-highlighted text
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return <>{parts}</>;
};