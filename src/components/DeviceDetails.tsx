import { useState } from "react";
import type { NormalizedDevice } from "../types/uidb";

interface DeviceDetailsProps {
  device: NormalizedDevice;
  onClose: () => void;
}

export function DeviceDetails({ device, onClose }: DeviceDetailsProps) {
  const [showRawJson, setShowRawJson] = useState(false);
  const [imageSize, setImageSize] = useState(512);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // Simple success feedback - in production might want toast notifications
      const button = document.activeElement as HTMLButtonElement;
      if (button) {
        const originalText = button.textContent;
        button.textContent = "Copied!";
        setTimeout(() => {
          button.textContent = originalText;
        }, 1000);
      }
    } catch (err) {
      console.error("Failed to copy to clipboard:", err);
    }
  };

  const getImageUrl = (size: number = 512) => {
    if (!device.images) return device.imageUrl;

    const imageTypes = ["default", "nopadding", "topology", "icon"] as const;

    for (const type of imageTypes) {
      const hash = device.images[type];
      if (hash) {
        const baseUrl = `https://static.ui.com/fingerprint/ui/images/${device.id}/${type}/${hash}.png`;
        const encodedUrl = encodeURIComponent(baseUrl);
        return `https://images.svc.ui.com/?u=${encodedUrl}&w=${size}&q=75`;
      }
    }

    return device.imageUrl;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            {device.displayName}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close details"
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

        <div className="flex flex-col lg:flex-row">
          {/* Hero Image */}
          <div className="lg:w-1/2 p-6 bg-gray-50">
            <div className="text-center">
              <img
                src={getImageUrl(imageSize)}
                alt={device.displayName}
                className="max-w-full h-auto mx-auto border border-gray-200 rounded-lg"
                style={{ maxHeight: "400px" }}
              />
              <div className="mt-4 flex items-center justify-center gap-2">
                <label
                  htmlFor="image-size-detail"
                  className="text-sm text-gray-600"
                >
                  Size:
                </label>
                <select
                  id="image-size-detail"
                  value={imageSize}
                  onChange={(e) => setImageSize(Number(e.target.value))}
                  className="text-sm border border-gray-300 rounded px-2 py-1"
                >
                  <option value={256}>256px</option>
                  <option value={512}>512px</option>
                  <option value={1024}>1024px</option>
                </select>
              </div>
            </div>
          </div>

          {/* Metadata */}
          <div className="lg:w-1/2 p-6 overflow-y-auto">
            <div className="space-y-4">
              {/* Core Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Device Information
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">
                      ID:
                    </span>
                    <div className="flex items-center gap-2">
                      <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {device.id}
                      </code>
                      <button
                        onClick={() => copyToClipboard(device.id)}
                        className="text-xs text-blue-600 hover:text-blue-800"
                        title="Copy ID"
                      >
                        Copy
                      </button>
                    </div>
                  </div>

                  {device.sku && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600">
                        SKU:
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{device.sku}</span>
                        <button
                          onClick={() => copyToClipboard(device.sku!)}
                          className="text-xs text-blue-600 hover:text-blue-800"
                          title="Copy SKU"
                        >
                          Copy
                        </button>
                      </div>
                    </div>
                  )}

                  {device.line && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600">
                        Product Line:
                      </span>
                      <span className="text-sm">
                        {device.line.name || device.line.id}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Aliases */}
              {device.shortnames && device.shortnames.length > 0 && (
                <div>
                  <h4 className="text-md font-medium text-gray-900 mb-2">
                    Aliases
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {device.shortnames.map((name, index) => (
                      <span
                        key={index}
                        className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                      >
                        {name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Triplets */}
              {device.triplets && device.triplets.length > 0 && (
                <div>
                  <h4 className="text-md font-medium text-gray-900 mb-2">
                    Triplets
                  </h4>
                  <div className="space-y-1">
                    {device.triplets.map((triplet, index) => (
                      <div
                        key={index}
                        className="text-sm bg-gray-50 p-2 rounded"
                      >
                        {triplet.k1 && (
                          <span className="mr-2">K1: {triplet.k1}</span>
                        )}
                        {triplet.k2 && (
                          <span className="mr-2">K2: {triplet.k2}</span>
                        )}
                        {triplet.k3 && <span>K3: {triplet.k3}</span>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Image URLs */}
              {device.images && (
                <div>
                  <h4 className="text-md font-medium text-gray-900 mb-2">
                    Images
                  </h4>
                  <div className="space-y-1">
                    {Object.entries(device.images).map(([type, hash]) => (
                      <div
                        key={type}
                        className="flex items-center justify-between text-xs"
                      >
                        <span className="font-medium">{type}:</span>
                        <div className="flex items-center gap-2">
                          <code className="bg-gray-100 px-1 py-0.5 rounded truncate max-w-32">
                            {hash}
                          </code>
                          <button
                            onClick={() => copyToClipboard(getImageUrl() || "")}
                            className="text-blue-600 hover:text-blue-800"
                            title={`Copy ${type} image URL`}
                          >
                            Copy URL
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Raw JSON Toggle */}
              <div className="border-t pt-4">
                <button
                  onClick={() => setShowRawJson(!showRawJson)}
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800"
                >
                  <svg
                    className={`w-4 h-4 transition-transform ${showRawJson ? "rotate-90" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  Raw JSON
                </button>

                {showRawJson && (
                  <div className="mt-2">
                    <pre className="text-xs bg-gray-100 p-3 rounded overflow-auto max-h-64">
                      {JSON.stringify(device, null, 2)}
                    </pre>
                    <button
                      onClick={() =>
                        copyToClipboard(JSON.stringify(device, null, 2))
                      }
                      className="mt-2 text-xs text-blue-600 hover:text-blue-800"
                    >
                      Copy JSON
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
