import { useState } from "react";
import { useUidbData } from "@hooks/useUidbData";
import { useHeaderHeight } from "@hooks/useHeaderHeight";
import { useImageUrl } from "@hooks/useImageUrl";
import { useUrlState } from "@hooks/useUrlState";
import type { NormalizedDevice } from "types/uidb";

interface DeviceDetailsProps {
  deviceId: string;
}

export function DeviceDetails({ deviceId }: DeviceDetailsProps) {
  const [showJson, setShowJson] = useState(false);
  const { devices } = useUidbData();
  const { headerHeight } = useHeaderHeight();
  const { updateState } = useUrlState();
  const device = devices.find((d: NormalizedDevice) => d.id === deviceId);
  const { src: imageUrl } = useImageUrl({ device, size: 512 });

  const handleBack = () => {
    updateState({ select: undefined });
  };

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
          {/* Back Button - Frame 23170 */}
          <button
            onClick={handleBack}
            className="flex items-center p-1 mb-12 w-14 h-7 bg-white rounded shadow-sm hover:shadow-md transition-shadow"
            style={{
              boxShadow:
                "0px 0px 1px rgba(0, 0, 0, 0.06), 0px 8px 24px rgba(0, 0, 0, 0.08)",
            }}
          >
            <div className="flex items-center justify-center w-5 h-5">
              <svg
                width="6"
                height="12"
                viewBox="0 0 6 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-neutral-600"
                style={{ color: "#838691" }}
              >
                <path
                  d="M5 1L1 6L5 11"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span
              className="ml-1 text-sm leading-5 flex items-center"
              style={{
                fontFamily: "UI Sans_v7, system-ui, sans-serif",
                color: "rgba(0, 0, 0, 0.45)",
              }}
            >
              Back
            </span>
          </button>
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* Left Column - Image */}
            <div className="flex-shrink-0 w-full lg:w-1/3 flex justify-center items-center bg-gray-50 rounded-lg p-4">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={device.displayName}
                  className="max-w-full h-auto max-h-64 lg:max-h-full object-contain"
                />
              ) : (
                <div className="w-full h-32 lg:h-64 bg-gray-200 rounded flex items-center justify-center text-gray-500">
                  No Image Available
                </div>
              )}
            </div>

            {/* Right Column - Details */}
            <div className="flex-1 min-w-0">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                {device.displayName}
              </h1>
              <h2 className="text-base sm:text-lg text-gray-600 mb-6">
                {device.line?.name || "N/A"}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 lg:gap-x-8 gap-y-4 mb-8">
                <div>
                  <p className="text-gray-700 text-sm font-semibold">
                    Product Line
                  </p>
                  <p className="text-gray-600 text-sm break-words">
                    {device.line?.name || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-700 text-sm font-semibold">ID</p>
                  <p className="text-gray-600 text-sm break-all">{device.id}</p>
                </div>
                <div>
                  <p className="text-gray-700 text-sm font-semibold">Name</p>
                  <p className="text-gray-600 text-sm break-words">
                    {device.displayName}
                  </p>
                </div>
                <div>
                  <p className="text-gray-700 text-sm font-semibold">
                    Short Name
                  </p>
                  <p className="text-gray-600 text-sm break-words">
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
              </button>

              {showJson && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                  <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] flex flex-col overflow-hidden">
                    <div className="flex items-center justify-between p-4 border-b border-gray-200">
                      <h2 className="text-lg font-semibold">Raw JSON Data</h2>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(
                              JSON.stringify(device, null, 2)
                            );
                          }}
                          className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                        >
                          Copy JSON
                        </button>
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
                    </div>
                    <div className="flex-1 overflow-auto p-4 bg-gray-50">
                      <pre className="text-sm font-mono text-gray-800 whitespace-pre-wrap break-words">
                        {JSON.stringify(device, null, 2)}
                      </pre>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
