import React from 'react';

interface ImageLoaderProps {
  size: number;
  className?: string;
}

export const ImageLoader = React.memo(({ size, className = "" }: ImageLoaderProps) => {
  return (
    <div
      className={`relative overflow-hidden bg-gray-200 rounded-lg ${className}`}
      style={{ width: size, height: size }}
    >
      <div
        className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"
        style={{
          animation: "shimmer 1.5s infinite",
          backgroundSize: "200% 100%",
        }}
      />
    </div>
  );
});

ImageLoader.displayName = 'ImageLoader';