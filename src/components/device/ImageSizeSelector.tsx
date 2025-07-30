import React from 'react';
import { IMAGE_SIZES, type ImageSize } from '@config/constants';

interface ImageSizeSelectorProps {
  value: ImageSize;
  onChange: (size: ImageSize) => void;
  className?: string;
}

export const ImageSizeSelector = React.memo(({
  value,
  onChange,
  className = ""
}: ImageSizeSelectorProps) => {
  const handleChange = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(Number(e.target.value) as ImageSize);
  }, [onChange]);

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <label htmlFor="image-size-detail" className="text-sm text-gray-600">
        Size:
      </label>
      <select
        id="image-size-detail"
        value={value}
        onChange={handleChange}
        className="text-sm border border-gray-300 rounded px-2 py-1"
      >
        {IMAGE_SIZES.map((size) => (
          <option key={size} value={size}>
            {size}px
          </option>
        ))}
      </select>
    </div>
  );
});

ImageSizeSelector.displayName = 'ImageSizeSelector';