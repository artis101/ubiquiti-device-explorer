import React from "react";

interface DeviceImageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const DeviceImageContainer = React.memo(
  ({ children, className = "" }: DeviceImageContainerProps) => {
    return (
      <div className={`flex-shrink-0 ${className}`}>
        <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
          {children}
        </div>
      </div>
    );
  },
);

DeviceImageContainer.displayName = "DeviceImageContainer";
