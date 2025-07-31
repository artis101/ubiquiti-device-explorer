import { forwardRef } from "react";
import { WarningBanner } from "@components/ui/WarningBanner";
import type { SchemaWarning } from "types/uidb";
import type { ConnectionInfo } from "@hooks/useConnectionStatus";

interface AppHeaderProps {
  warnings: SchemaWarning[];
  connectionInfo: ConnectionInfo;
}

export const AppHeader = forwardRef<HTMLDivElement, AppHeaderProps>(
  ({ warnings, connectionInfo }, ref) => {
    return (
      <div ref={ref}>
        {/* Header - Matching Figma Design Exactly */}
        <header className="bg-ui-gray-100 border-b border-ui-gray-200">
          <div className="flex items-center justify-between px-8 py-2">
            <div className="flex items-center gap-4">
              {/* Logo from public/logo.png */}
              <div className="flex items-center justify-center">
                <img
                  src="/logo.png"
                  alt="Ubiquiti Logo"
                  className="w-8 h-8"
                  onError={(e) => {
                    const img = e.target as HTMLImageElement;
                    img.style.display = "none";
                  }}
                />
              </div>

              {/* Devices Title */}
              <h1 className="text-sm font-normal text-ui-gray-500">Devices</h1>
            </div>

            {/* Right Side - Author and Live Status */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-normal text-ui-gray-500">
                Artis Avotins
              </span>
              <div className="flex items-center gap-1 relative group">
                <div
                  className={`w-2 h-2 rounded-full cursor-help ${
                    connectionInfo.status === "live"
                      ? "bg-ui-green-primary"
                      : connectionInfo.status === "offline"
                      ? "bg-ui-yellow-primary"
                      : "bg-ui-amber-600"
                  }`}
                  title="Data freshness information"
                ></div>

                {/* Tooltip */}
                <div className="absolute right-0 top-full mt-2 w-64 bg-ui-white border border-ui-gray-200 rounded-lg shadow-lg p-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="text-sm space-y-2">
                    <div className="font-medium text-ui-gray-700">
                      Data Freshness
                    </div>
                    <div className="text-ui-gray-600">
                      <div className="flex justify-between">
                        <span>Status:</span>
                        <span className="capitalize font-medium">
                          {connectionInfo.status === "live"
                            ? "Live Data"
                            : connectionInfo.status === "offline"
                            ? "Fresh Data (Offline)"
                            : "Cached Data"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Source:</span>
                        <span className="capitalize font-medium">
                          {connectionInfo.dataSource === "api"
                            ? "API"
                            : connectionInfo.dataSource === "cache"
                            ? "Cache"
                            : "Fallback"}
                        </span>
                      </div>
                      {connectionInfo.lastFetch && (
                        <div className="flex justify-between">
                          <span>Last Updated:</span>
                          <span className="font-medium">
                            {connectionInfo.lastFetch.toLocaleString()}
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span>Connection:</span>
                        <span
                          className={`font-medium ${
                            connectionInfo.isOnline
                              ? "text-ui-green-600"
                              : "text-ui-red-primary"
                          }`}
                        >
                          {connectionInfo.isOnline ? "Online" : "Offline"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Warning Banner */}
        <WarningBanner warnings={warnings} />
      </div>
    );
  }
);
