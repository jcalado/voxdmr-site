export type Platform = "desktop" | "mobile";

const STORAGE_KEY = "voxdmr-docs-platform";

/** Client-only: resolve the initial platform from the stored choice, else UA. */
export function detectDefaultPlatform(): Platform {
  if (typeof window === "undefined") return "desktop";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "desktop" || stored === "mobile") return stored;
  const ua = window.navigator.userAgent || "";
  return /Android|iPhone|iPad|iPod|Mobile/i.test(ua) ? "mobile" : "desktop";
}

export function storePlatform(platform: Platform) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, platform);
}
