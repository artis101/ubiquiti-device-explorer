import { ToggleSwitch } from "@components/ui/ToggleSwitch";

const IMAGE_SIZES = [
  { value: 128, label: "M", "aria-label": "Medium" },
  { value: 256, label: "L", "aria-label": "Large" },
  { value: 512, label: "XL", "aria-label": "Extra Large" },
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
    <ToggleSwitch
      options={IMAGE_SIZES}
      selectedValue={imageSize}
      onValueChange={onImageSizeChange}
      label="Image Size"
    />
  );
}
