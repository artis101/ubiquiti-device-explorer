import { useState } from "react";
import { useUidbData } from "@hooks/useUidbData";
import { useHeaderHeight } from "@hooks/useHeaderHeight";
import type { NormalizedDevice } from "types/uidb";
import { DeviceDetailsHeader } from "./DeviceDetailsHeader";
import { DeviceImageDisplay } from "./DeviceImageDisplay";
import { DeviceOverview } from "./DeviceOverview";
import { DeviceJsonModal } from "./DeviceJsonModal";

interface DeviceDetailsProps {
  deviceId: string;
}

export function DeviceDetails({ deviceId }: DeviceDetailsProps) {
  const [showJson, setShowJson] = useState(false);
  const { devices } = useUidbData();
  const { headerHeight } = useHeaderHeight();
  const device = devices.find((d: NormalizedDevice) => d.id === deviceId);

  if (!device) {
    return null; // Or a loading/error state
  }

  return (
    <div
      className="fixed inset-x-0 bottom-0 bg-white z-40 flex flex-col"
      style={{ top: `${headerHeight}px` }}
    >
      {/* Modal content that covers full screen except header */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <DeviceDetailsHeader />
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
              <DeviceImageDisplay device={device} />
              <DeviceOverview device={device} />
            </div>
            <div className="pt-4 text-center">
              {/* See All Details as JSON Button */}
              <button
                onClick={() => setShowJson(true)}
                className="inline-block text-blue-600 hover:text-blue-800 text-sm p-0.5 font-semibold focus-within:ring-1 focus-within:ring-blue-500 focus:outline-none focus:rounded"
              >
                See All Details as JSON
              </button>
            </div>

            {showJson && (
              <DeviceJsonModal
                device={device}
                onClose={() => setShowJson(false)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
