import { useState, useEffect } from "react";
import type { NormalizedDevice, SchemaWarning } from "types/uidb";
import { normalizeDevices, parseUidbResponse } from "@utils/uidb";
import { getUidbUrl } from "../config/constants";
import {
  useConnectionStatus,
  type ConnectionInfo,
} from "./useConnectionStatus";

export interface UseUidbResult {
  devices: NormalizedDevice[];
  warnings: SchemaWarning[];
  loading: boolean;
  error?: string;
  connectionInfo: ConnectionInfo;
  refetch: () => void;
}

export function useUidb(): UseUidbResult {
  const [devices, setDevices] = useState<NormalizedDevice[]>([]);
  const [warnings, setWarnings] = useState<SchemaWarning[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();
  const { connectionInfo, updateConnectionStatus } = useConnectionStatus();

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(undefined);

      const uidbUrl = getUidbUrl();
      let data;

      try {
        // Fetch from configured URL or default
        const response = await fetch(uidbUrl);
        if (!response.ok) {
          // If fetching from the primary source fails, try fetching the local public.json
          const fallbackResponse = await fetch("/public.json");
          if (!fallbackResponse.ok) {
            throw new Error(
              `Failed to fetch UIDB data: ${response.status} ${response.statusText}`,
            );
          }
          data = await fallbackResponse.json();
          setError(
            `API fetch failed: ${response.status} ${response.statusText}. Using fallback data.`,
          );
          updateConnectionStatus("fallback");
        } else {
          data = await response.json();
          const lastModified =
            response.headers.get("last-modified") ||
            response.headers.get("date") ||
            new Date().toISOString();
          updateConnectionStatus("api", lastModified);
        }
      } catch (fetchError) {
        // Fallback to cached data if fetch fails
        const errorMessage =
          fetchError instanceof Error
            ? fetchError.message
            : "Unknown network error";
        setError(`Network error: ${errorMessage}. Using fallback data.`);
        console.warn(
          "Failed to fetch UIDB data, using cached data:",
          fetchError,
        );
        data = (await import("../data/public.json")).default;
        updateConnectionStatus("fallback");
      }

      // Parse and validate the response
      const parseResult = parseUidbResponse(data);
      if (parseResult.error) {
        throw new Error(`UIDB parse error: ${parseResult.error}`);
      }

      // Normalize devices and collect warnings
      const { normalized, warnings: normWarnings } = normalizeDevices(
        parseResult.devices,
      );

      setDevices(normalized);
      setWarnings([...parseResult.warnings, ...normWarnings]);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Unknown error occurred";
      setError(errorMessage);
      console.error("UIDB fetch error:", err);

      // Fallback to cached data on error
      try {
        const cachedData = (await import("../data/public.json")).default;
        const { normalized, warnings: fallbackWarnings } = normalizeDevices(
          cachedData.devices,
        );
        setDevices(normalized);
        setWarnings(fallbackWarnings);
        updateConnectionStatus("fallback");
      } catch (fallbackErr) {
        console.error("Cached data parse error:", fallbackErr);
        updateConnectionStatus("fallback");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    devices,
    warnings,
    loading,
    error,
    connectionInfo,
    refetch: fetchData,
  };
}
