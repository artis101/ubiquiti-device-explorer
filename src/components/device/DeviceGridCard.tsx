import React from 'react';

interface DeviceGridCardProps {
  imageUrl: string;
  modelName: string;
  deviceName: string;
  shortName: string;
}

export const DeviceGridCard: React.FC<DeviceGridCardProps> = ({
  imageUrl,
  modelName,
  deviceName,
  shortName,
}) => {
  return (
    <div className="flex flex-col gap-2 pb-2 border border-ui-gray-200 rounded-lg">
      <div className="relative flex justify-center items-center h-[100px] bg-ui-gray-50 rounded-t-lg">
        <img src={imageUrl} alt={deviceName} className="w-[100px] h-[100px] mix-blend-darken" />
        <div className="absolute top-1 right-1 px-1 py-0.5 bg-ui-white rounded">
          <span className="text-xs font-medium text-ui-blue-primary">{shortName}</span>
        </div>
      </div>
      <div className="flex flex-col px-2">
        <span className="h-10 text-sm text-ui-text-primary">{deviceName}</span>
        <span className="text-xs text-ui-text-subtle">{modelName}</span>
      </div>
    </div>
  );
};
