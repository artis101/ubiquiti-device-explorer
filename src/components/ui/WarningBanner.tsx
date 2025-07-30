import { useState } from "react";
import type { SchemaWarning } from "@types/uidb";

interface WarningBannerProps {
  warnings: SchemaWarning[];
}

export function WarningBanner({ warnings }: WarningBannerProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  if (warnings.length === 0 || isDismissed) {
    return null;
  }

  const showFirstFive = warnings.slice(0, 5);
  const remainingCount = warnings.length - 5;

  const handleViewInConsole = () => {
    console.group("📊 UIDB Schema Warnings");
    console.log(`Total warnings: ${warnings.length}`);
    console.table(warnings);
    console.groupEnd();
  };

  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <svg
            className="h-5 w-5 text-yellow-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>
        <div className="ml-3 flex-1">
          <h3 className="text-sm font-medium text-yellow-800">
            Schema Warnings ({warnings.length})
          </h3>
          <div className="mt-2 text-sm text-yellow-700">
            <p>
              Some devices have missing or invalid fields. The application will
              continue to work, but some features may be limited.
            </p>

            {isExpanded && (
              <div className="mt-3 space-y-1">
                {showFirstFive.map((warning, index) => (
                  <div
                    key={index}
                    className="text-xs bg-yellow-100 p-2 rounded"
                  >
                    <span className="font-medium">Device:</span>{" "}
                    {warning.deviceId} -
                    <span className="font-medium"> Field:</span> {warning.field}{" "}
                    -<span className="font-medium"> Reason:</span>{" "}
                    {warning.reason}
                  </div>
                ))}
                {remainingCount > 0 && (
                  <div className="text-xs text-yellow-600">
                    ...and {remainingCount} more warnings.
                  </div>
                )}
              </div>
            )}

            <div className="mt-3 flex flex-wrap gap-2">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-xs text-yellow-800 underline hover:text-yellow-900"
              >
                {isExpanded
                  ? "Show Less"
                  : `Show First ${Math.min(5, warnings.length)}`}
              </button>

              <button
                onClick={handleViewInConsole}
                className="text-xs text-yellow-800 underline hover:text-yellow-900"
              >
                View All in Console
              </button>

              <button
                onClick={() => setIsDismissed(true)}
                className="text-xs text-yellow-600 hover:text-yellow-800"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}