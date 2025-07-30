import React, { useState, useCallback } from "react";
import { ImageLoader } from "./ImageLoader";
import {
  handleImageError,
  type ImageErrorHandlerOptions,
} from "@utils/imageFallback";

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  loading?: "lazy" | "eager";
  errorHandlerOptions: ImageErrorHandlerOptions;
}

export const ImageWithFallback = React.memo(
  ({
    src,
    alt,
    width,
    height,
    className = "",
    loading = "lazy",
    errorHandlerOptions,
  }: ImageWithFallbackProps) => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const handleLoad = useCallback(() => {
      setIsLoading(false);
    }, []);

    const handleError = useCallback(
      (event: React.SyntheticEvent<HTMLImageElement>) => {
        setIsLoading(false);
        setHasError(true);
        handleImageError(event, errorHandlerOptions);
      },
      [errorHandlerOptions]
    );

    return (
      <div className="relative" style={{ width, height }}>
        {/* Loading state */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <ImageLoader
              size={Math.min(width, height) * 0.6}
              className="opacity-50"
            />
          </div>
        )}

        {/* Actual image */}
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={loading}
          className={`${className} ${
            isLoading ? "opacity-0" : "opacity-100"
          } transition-opacity duration-300`}
          onLoad={handleLoad}
          onError={handleError}
          style={{
            display: hasError ? "none" : "block",
          }}
        />
      </div>
    );
  }
);

ImageWithFallback.displayName = "ImageWithFallback";
