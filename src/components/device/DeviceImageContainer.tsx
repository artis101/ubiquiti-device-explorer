import React from "react";

interface DeviceImageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const DeviceImageContainer = React.memo(
  ({ children, className = "" }: DeviceImageContainerProps) => {
    return (
      <div className={`flex-shrink-0 ${className}`}>
        <div className="bg-[var(--ui-gray-50)] rounded-lg p-3 border border-[var(--ui-gray-200)] flex justify-center items-center">
          {children}
        </div>
      </div>
    );
  },
);

DeviceImageContainer.displayName = "DeviceImageContainer";
