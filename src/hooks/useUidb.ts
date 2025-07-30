import { useState, useEffect } from "react";
import type { NormalizedDevice, SchemaWarning } from "../types/uidb";
import { normalizeDevices, parseUidbResponse } from "../utils/uidb";
import { getUidbUrl } from "../config/constants";
import sampleData from "../data/sample.json";

export interface UseUidbResult {
  devices: NormalizedDevice[];
  warnings: SchemaWarning[];
  loading: boolean;
  error?: string;
  refetch: () => void;
}

export function useUidb(): UseUidbResult {
  const [devices, setDevices] = useState<NormalizedDevice[]>([]);
  const [warnings, setWarnings] = useState<SchemaWarning[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();

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
          throw new Error(
            `Failed to fetch UIDB data: ${response.status} ${response.statusText}`,
          );
        }
        data = await response.json();
      } catch (fetchError) {
        // Fallback to sample data if fetch fails
        console.warn(
          "Failed to fetch UIDB data, using sample data:",
          fetchError,
        );
        data = sampleData;
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

      // Fallback to sample data on error
      try {
        const { normalized, warnings: fallbackWarnings } = normalizeDevices(
          sampleData.devices,
        );
        setDevices(normalized);
        setWarnings(fallbackWarnings);
      } catch (fallbackErr) {
        console.error("Sample data parse error:", fallbackErr);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    devices,
    warnings,
    loading,
    error,
    refetch: fetchData,
  };
}
