// UIDB configuration constants
export const DEFAULT_UIDB_URL =
  "https://static.ui.com/fingerprint/ui/public.json";

// Get the current UIDB URL (environment override or default)
export function getUidbUrl(): string {
  return import.meta.env.VITE_UIDB_URL || DEFAULT_UIDB_URL;
}

// Check if we're using live data (not sample data)
export function isUsingLiveData(): boolean {
  const currentUrl = getUidbUrl();
  return currentUrl !== "/src/data/public.json";
}
