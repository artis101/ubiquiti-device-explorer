// Base URLs
export const UI_STATIC_BASE_URL = "https://static.ui.com";
export const UI_IMAGES_SVC_URL = "https://images.svc.ui.com";

// UIDB configuration constants
export const DEFAULT_UIDB_URL = `${UI_STATIC_BASE_URL}/fingerprint/ui/public.json`;

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

// Image configuration
export const UI_IMAGES_BASE_URL = `${UI_STATIC_BASE_URL}/fingerprint/ui/images`;

export const IMAGE_TYPES = ["default", "nopadding", "topology", "icon"] as const;
export type ImageType = typeof IMAGE_TYPES[number];

export const IMAGE_SIZES = [256, 512, 1024] as const;
export type ImageSize = typeof IMAGE_SIZES[number];

export const DEFAULT_IMAGE_SIZE = 512;
export const IMAGE_QUALITY = 75;
