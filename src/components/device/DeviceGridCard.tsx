import React from "react";

interface DeviceGridCardProps {
  imageUrl: string;
  productLineName: string;
  deviceName: string;
  shortName: string;
}

export const DeviceGridCard: React.FC<DeviceGridCardProps> = ({
  imageUrl,
  productLineName,
  deviceName,
  shortName,
}) => {
  return (
    <div className="flex flex-col gap-2 pb-2 border border-ui-gray-200 rounded-card w-[263px] h-[174px]">
      <div className="relative flex justify-center items-center bg-ui-gray-50 rounded-t-card">
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
    </div>
  );
};
