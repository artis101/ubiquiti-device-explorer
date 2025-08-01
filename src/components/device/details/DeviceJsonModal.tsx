import { useEffect } from "react";
import type { NormalizedDevice } from "types/uidb";
import { X } from "lucide-react";
import { CopyButton } from "@components/ui/CopyButton";

interface DeviceJsonModalProps {
  device: NormalizedDevice;
  onClose: () => void;
}

export function DeviceJsonModal({ device, onClose }: DeviceJsonModalProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const jsonString = JSON.stringify(device, null, 2);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Raw JSON Data</h2>
          <div className="flex items-center gap-2">
            <CopyButton
              textToCopy={jsonString}
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            />
            <button
              onClick={onClose}
              className="p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              aria-label="Close JSON view"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-auto p-4 bg-gray-50">
          <pre
            className="text-sm font-mono text-gray-800 whitespace-pre-wrap break-words"
            role="complementary"
            aria-label="Raw JSON Data"
          >
            {jsonString}
          </pre>
        </div>
      </div>
    </div>
  );
}
