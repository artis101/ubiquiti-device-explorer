import { useState, useEffect } from "react";

export type ConnectionStatus =
  | "live" // Green: Live data from API with freshness
  | "offline" // Yellow: Fresh data but device offline
  | "cached"; // Dark amber: Offline and using cached/fallback data

export interface ConnectionInfo {
  status: ConnectionStatus;
  lastFetch?: Date;
  dataSource: "api" | "cache" | "fallback";
  isOnline: boolean;
}

export function useConnectionStatus() {
  const [connectionInfo, setConnectionInfo] = useState<ConnectionInfo>({
    status: "cached",
    dataSource: "cache",
    isOnline: navigator.onLine,
  });

  // Listen for online/offline events
  useEffect(() => {
    const handleOnline = () => {
      setConnectionInfo((prev) => ({
        ...prev,
        isOnline: true,
        // If we have fresh data and come back online, we're live again
        status: prev.dataSource === "api" ? "live" : prev.status,
      }));
    };

    const handleOffline = () => {
      setConnectionInfo((prev) => ({
        ...prev,
        isOnline: false,
        // If we go offline but have fresh API data, show yellow
        status: prev.dataSource === "api" ? "offline" : "cached",
      }));
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const updateConnectionStatus = (
    dataSource: "api" | "cache" | "fallback",
    lastModified?: string | Date,
  ) => {
    const lastFetch = lastModified ? new Date(lastModified) : new Date();
    const isOnline = navigator.onLine;

    let status: ConnectionStatus;

    if (dataSource === "api" && isOnline) {
      status = "live";
    } else if (dataSource === "api" && !isOnline) {
      status = "offline";
    } else {
      status = "cached";
    }

    setConnectionInfo({
      status,
      lastFetch,
      dataSource,
      isOnline,
    });
  };

  return {
    connectionInfo,
    updateConnectionStatus,
  };
}
