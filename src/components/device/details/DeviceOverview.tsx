import type { NormalizedDevice } from "types/uidb";

interface DeviceOverviewProps {
  device: NormalizedDevice;
}

export function DeviceOverview({ device }: DeviceOverviewProps) {
  return (
    <div className="flex-1 min-w-0">
      <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
        {device.displayName}
      </h1>
      <h2 className="text-base sm:text-lg text-gray-600 mb-6">
        {device.line?.name || "N/A"}
      </h2>

      <div className="flex flex-col gap-y-4 mb-8">
        <div className="flex justify-between items-start">
          <div className="font-semibold text-gray-700 text-sm text-left">
            Product Line
          </div>
          <div className="text-gray-600 text-sm break-words text-right flex-grow">
            {device.line?.name || "N/A"}
          </div>
        </div>

        <div className="flex justify-between items-start">
          <div className="font-semibold text-gray-700 text-sm text-left">
            ID
          </div>
          <div className="text-gray-600 text-sm break-all text-right flex-grow">
            {device.id}
          </div>
        </div>

        <div className="flex justify-between items-start">
          <div className="font-semibold text-gray-700 text-sm text-left">
            Name
          </div>
          <div className="text-gray-600 text-sm break-words text-right flex-grow">
            {device.displayName}
          </div>
        </div>

        <div className="flex justify-between items-start">
          <div className="font-semibold text-gray-700 text-sm text-left">
            Short Name
          </div>
          <div className="text-gray-600 text-sm break-words text-right flex-grow">
            {device.shortnames?.[0] || "N/A"}
          </div>
        </div>
      </div>
    </div>
  );
}
