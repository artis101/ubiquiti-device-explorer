import React from 'react';

interface ImageLoaderProps {
  size: number;
  className?: string;
}

export const ImageLoader = React.memo(({ size, className = "" }: ImageLoaderProps) => {
  return (
    <div 
      className={`animate-pulse bg-gray-200 rounded ${className}`}
      style={{ width: size, height: size }}
    >
      <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse" />
    </div>
  );
});

ImageLoader.displayName = 'ImageLoader';