export interface ImageErrorHandlerOptions {
  deviceName: string;
  deviceLineAbbrev?: string;
  size: number;
}

export const generateFallbackSvg = ({
  deviceName,
  deviceLineAbbrev,
  size,
}: ImageErrorHandlerOptions): string => {
  const abbrev =
    deviceLineAbbrev ||
    (deviceName?.substring(0, 2).toUpperCase()) ||
    'UI';

  const svg = `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${size}" height="${size}" fill="#f9fafb"/>
    <text x="${size / 2}" y="${size / 2}" text-anchor="middle" dominant-baseline="middle" 
          font-family="Arial, sans-serif" font-size="18" font-weight="600" fill="#6b7280"
          style="user-select: none; pointer-events: none;">
      ${abbrev}
    </text>
  </svg>`;

  return `data:image/svg+xml;base64,${btoa(svg)}`;
};

export const handleImageError = (
  event: React.SyntheticEvent<HTMLImageElement>,
  options: ImageErrorHandlerOptions,
): void => {
  const target = event.target as HTMLImageElement;

  // Prevent infinite loop by checking if we've already set a fallback
  if (target.src.startsWith("data:image/svg+xml")) {
    return;
  }

  try {
    const fallbackSrc = generateFallbackSvg(options);
    target.src = fallbackSrc;
  } catch (error) {
    console.warn("Failed to generate fallback image:", error);
    // Last resort fallback
    target.style.display = "none";
  }
};
