import type { NormalizedDevice } from "types/uidb";

interface DeviceJsonModalProps {
  device: NormalizedDevice;
  onClose: () => void;
}

export function DeviceJsonModal({ device, onClose }: DeviceJsonModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Raw JSON Data</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                navigator.clipboard.writeText(JSON.stringify(device, null, 2));
              }}
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Copy JSON
            </button>
            <button
              onClick={onClose}
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
  );
}
