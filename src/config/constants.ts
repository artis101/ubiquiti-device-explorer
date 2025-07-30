// UIDB configuration constants
export const DEFAULT_UIDB_URL =
  "https://static.ui.com/fingerprint/ui/public.json";

// Build timestamp - set at build time for production, current time for dev
export const BUILD_TIMESTAMP =
  import.meta.env.VITE_BUILD_TIMESTAMP || new Date().toISOString();

// Get the current UIDB URL (environment override or default)
export function getUidbUrl(): string {
  return import.meta.env.VITE_UIDB_URL || DEFAULT_UIDB_URL;
}

// Get build time as Date object
export function getBuildTime(): Date {
  return new Date(BUILD_TIMESTAMP);
}
