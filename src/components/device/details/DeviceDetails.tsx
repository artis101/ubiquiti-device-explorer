import { useState } from "react";
import { useUidbData } from "@hooks/useUidbData";
import { RawJsonViewer } from "@components/ui/RawJsonViewer";
import type { NormalizedDevice } from "types/uidb";

interface DeviceDetailsProps {
  deviceId: string;
}

export function DeviceDetails({ deviceId }: DeviceDetailsProps) {
  const [showJson, setShowJson] = useState(false);
  const { devices } = useUidbData();
  const device = devices.find((d: NormalizedDevice) => d.id === deviceId);

  if (!device) {
    return null; // Or a loading/error state
  }

  return (
    <div className="p-8 overflow-y-auto">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column - Image */}
        <div className="flex-shrink-0 w-full lg:w-1/3 flex justify-center items-center bg-gray-50 rounded-lg p-4">
          <img
            src="/figma-assets/product-card-image.png"
            alt={device.displayName}
            className="max-w-full h-auto"
          />
        </div>

        {/* Right Column - Details */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {device.displayName}
          </h1>
          <h2 className="text-lg text-gray-600 mb-6">
            {device.line?.name || "N/A"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-8">
            <div>
              <p className="text-gray-700 text-sm font-semibold">
                Product Line
              </p>
              <p className="text-gray-600 text-sm">
                {device.line?.name || "N/A"}
              </p>
            </div>
            <div>
              <p className="text-gray-700 text-sm font-semibold">ID</p>
              <p className="text-gray-600 text-sm">{device.id}</p>
            </div>
            <div>
              <p className="text-gray-700 text-sm font-semibold">Name</p>
              <p className="text-gray-600 text-sm">{device.displayName}</p>
            </div>
            <div>
              <p className="text-gray-700 text-sm font-semibold">Short Name</p>
              <p className="text-gray-600 text-sm">
                {device.shortnames?.[0] || "N/A"}
              </p>
            </div>
          </div>

          {/* See All Details as JSON Button */}
          <button
            onClick={() => setShowJson(true)}
            className="text-blue-600 hover:text-blue-800 text-sm font-semibold flex items-center"
          >
            See All Details as JSON
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="ml-1"
            >
              <path
                d="M6 12L10 8L6 4"
                stroke="#006FFF"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {showJson && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden">
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold">Raw JSON Data</h2>
                  <button
                    onClick={() => setShowJson(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <div className="flex-1 overflow-auto p-4">
                  <RawJsonViewer data={device} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
