import React, { useState, useCallback } from "react";
import { ImageLoader } from "./ImageLoader";
import {
  handleImageError,
  type ImageErrorHandlerOptions,
} from "@utils/imageFallback";

interface ImageWithFallbackProps {
  src?: string;
  srcSet?: string;
  sizes?: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: "lazy" | "eager";
  errorHandlerOptions: ImageErrorHandlerOptions;
}

export const ImageWithFallback = React.memo(
  ({
    src,
    srcSet,
    sizes,
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
      [errorHandlerOptions],
    );

    const style = width && height ? { width, height } : {};

    if (hasError || !src) {
      return (
        <div style={style} className={`bg-gray-100 rounded ${className}`} />
      );
    }

    return (
      <div style={style} className={`relative ${className}`}>
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <ImageLoader
              size={width && height ? Math.min(width, height) * 0.6 : 64}
              className="opacity-50"
            />
          </div>
        )}
        <img
          src={src}
          srcSet={srcSet}
          sizes={sizes}
          alt={alt}
          width={width}
          height={height}
          loading={loading}
          className={`w-full h-full object-contain transition-opacity duration-300 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
          onLoad={handleLoad}
          onError={handleError}
        />
      </div>
    );
  },
);

ImageWithFallback.displayName = "ImageWithFallback";
