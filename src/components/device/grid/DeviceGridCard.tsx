import React, { useCallback, useMemo } from "react";

interface DeviceGridCardProps {
  imageUrl: string;
  productLineName: string;
  deviceName: string;
  shortName: string;
  isSelected?: boolean;
  onClick?: () => void;
  tabIndex?: number;
}

export const DeviceGridCard: React.FC<DeviceGridCardProps> = ({
  imageUrl,
  productLineName,
  deviceName,
  shortName,
  isSelected = false,
  onClick,
  tabIndex = 0,
}) => {
  const handleClick = useCallback(() => {
    onClick?.();
  }, [onClick]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onClick?.();
      }
    },
    [onClick],
  );

  const cardClassName = useMemo(
    () =>
      `group flex flex-col gap-2 pb-2 w-[263px] h-[174px] transition-colors duration-200 rounded-card ${
        isSelected
          ? "bg-ui-gray-50 border border-ui-blue-primary"
          : "border border-ui-gray-200 hover:bg-ui-gray-50 hover:border-ui-gray-200"
      }`,
    [isSelected],
  );

  const imageContainerClassName = useMemo(
    () =>
      `relative flex justify-center items-center bg-ui-gray-50 rounded-t-card transition-colors duration-200 ${
        isSelected ? "bg-ui-gray-100" : "group-hover:bg-ui-gray-100"
      }`,
    [isSelected],
  );

  return (
    <button
      type="button"
      className={`${cardClassName} focus:outline-none focus:border focus:border-ui-blue-primary text-left`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-selected={isSelected}
      aria-label={`${productLineName} - ${deviceName}`}
      tabIndex={tabIndex}
    >
      <div className={imageContainerClassName}>
        <img
          src={imageUrl}
          alt={deviceName}
          className="w-25 h-25 object-contain"
        />
        <div className="absolute top-2 right-2 px-1 py-0.5 bg-ui-white rounded text-xs font-normal text-ui-blue-primary">
          {productLineName}
        </div>
      </div>
      <div className="flex flex-col px-2">
        <span className="text-sm font-normal text-ui-text-primary h-10 leading-16 truncate whitespace-nowrap">
          {deviceName}
        </span>
        <span className="text-xs font-normal text-ui-text-subtle truncate whitespace-nowrap">
          {shortName}
        </span>
      </div>
    </button>
  );
};
