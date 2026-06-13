import { useEffect, useState } from "react";
import {
  detectDefaultPlatform,
  storePlatform,
  type Platform,
} from "@/src/lib/platform";

/**
 * Tiny vanilla pub/sub store for the landing-page platform toggle.
 *
 * The landing's hero screenshot and the screenshot gallery live in two
 * SEPARATE Astro islands (separate React roots), so a React context provider
 * cannot span both. This module-level store lets the gallery's
 * PlatformSwitcher drive both islands, preserving the old single-island
 * behaviour where toggling platform swapped the hero image too.
 *
 * SSR-safe: the initial value is "desktop" (matching detectDefaultPlatform's
 * server fallback and the static markup rendered at build time); each island
 * reconciles to the real value (localStorage / UA) on mount.
 */

let current: Platform = "desktop";
let initialized = false;
const listeners = new Set<(p: Platform) => void>();

function ensureInitialized() {
  if (initialized || typeof window === "undefined") return;
  initialized = true;
  current = detectDefaultPlatform();
}

export function getPlatform(): Platform {
  return current;
}

export function setPlatform(p: Platform) {
  if (p === current) return;
  current = p;
  storePlatform(p);
  listeners.forEach((l) => l(p));
}

export function subscribePlatform(listener: (p: Platform) => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/**
 * React hook: returns the current platform and re-renders on change.
 * On mount it reconciles to the stored/UA-detected value (and notifies any
 * island that mounted first), so multiple islands stay in sync.
 */
export function usePlatformStore(): {
  platform: Platform;
  setPlatform: (p: Platform) => void;
} {
  const [platform, setLocal] = useState<Platform>(current);

  useEffect(() => {
    ensureInitialized();
    // Reconcile to the resolved initial value (may differ from SSR default).
    if (current !== platform) {
      setLocal(current);
    }
    const unsub = subscribePlatform(setLocal);
    return unsub;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { platform, setPlatform };
}
