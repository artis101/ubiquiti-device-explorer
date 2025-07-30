import { useState } from "react";
import type { NormalizedDevice } from "../types/uidb";
import { CopyButton } from "./CopyButton";

interface RawJsonViewerProps {
  data: NormalizedDevice;
}

export function RawJsonViewer({ data }: RawJsonViewerProps) {
  const [showRawJson, setShowRawJson] = useState(false);

  return (
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
            {JSON.stringify(data, null, 2)}
          </pre>
          <CopyButton 
            textToCopy={JSON.stringify(data, null, 2)} 
            className="mt-2"
          />
        </div>
      )}
    </div>
  );
}