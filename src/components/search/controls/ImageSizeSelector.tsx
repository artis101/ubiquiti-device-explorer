import React from "react";

const IMAGE_SIZES = [
  { value: 128, label: "M" },
  { value: 256, label: "L" },
  { value: 512, label: "XL" },
];

interface ImageSizeSelectorProps {
  imageSize: number;
  onImageSizeChange: (size: number) => void;
}

export function ImageSizeSelector({
  imageSize,
  onImageSizeChange,
}: ImageSizeSelectorProps) {
  return (
    <div className="flex items-center">
      <span className="text-sm font-medium text-gray-700 mr-2">
        Image Size:
      </span>
      <div className="flex items-center space-x-1 bg-gray-200 rounded-lg p-1">
        {IMAGE_SIZES.map((size) => (
          <button
            key={size.value}
            onClick={() => onImageSizeChange(size.value)}
            className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
              imageSize === size.value
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-600 hover:bg-gray-300"
            }`}
          >
            {size.label}
          </button>
        ))}
      </div>
    </div>
  );
}
