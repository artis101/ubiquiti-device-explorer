import { formatDistanceToNow } from "date-fns";
import type { ConnectionInfo } from "../hooks/useConnectionStatus";
import { getBuildTime } from "../config/constants";

interface ConnectionStatusIndicatorProps {
  connectionInfo: ConnectionInfo;
}

const formatLastFetch = (date?: Date) => {
  if (!date) return "Unknown";

  try {
    return formatDistanceToNow(date, { addSuffix: true });
  } catch {
    return "Recently";
  }
};

const statusConfig = {
  live: {
    color: "bg-green-500",
    textColor: "text-green-700",
    label: "Live Data",
    getDetailedStatus: ({ lastFetch }: ConnectionInfo) =>
      `Fresh data from API • Updated ${formatLastFetch(lastFetch)}`,
  },
  offline: {
    color: "bg-yellow-500",
    textColor: "text-yellow-700",
    label: "Offline",
    getDetailedStatus: ({ lastFetch }: ConnectionInfo) =>
      `Fresh API data • Device offline • Updated ${formatLastFetch(lastFetch)}`,
  },
  cached: {
    color: "bg-amber-600",
    textColor: "text-amber-700",
    label: "Cached Data",
    getDetailedStatus: ({ dataSource, lastFetch, isOnline }: ConnectionInfo) =>
      dataSource === "fallback"
        ? `Using cached data • Built ${formatLastFetch(getBuildTime())} • ${
            isOnline ? "API unreachable" : "Device offline"
          }`
        : `Using cached data • Updated ${formatLastFetch(lastFetch)}`,
  },
};

export function ConnectionStatusIndicator({
  connectionInfo,
}: ConnectionStatusIndicatorProps) {
  const config = statusConfig[connectionInfo.status];
  const detailedStatus = config.getDetailedStatus(connectionInfo);

  return (
    <div className="flex cursor-help items-center gap-2 group relative">
      <div
        className={`w-2 h-2 ${config.color} rounded-full ${
          connectionInfo.status === "live" ? "animate-pulse" : ""
        }`}
      />
      <span className={`text-sm font-medium ${config.textColor}`}>
        {config.label}
      </span>

      {/* Tooltip on hover */}
      <div className="absolute top-full right-0 mt-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
        <div className="absolute bottom-full right-4 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
        <div className="font-medium">{config.label}</div>
        <div className="text-gray-300 mt-1">{detailedStatus}</div>
      </div>
    </div>
  );
}
