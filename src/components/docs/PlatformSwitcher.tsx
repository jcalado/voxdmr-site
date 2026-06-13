import { useState, useEffect } from "react";
import { Monitor, Smartphone } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { detectDefaultPlatform, storePlatform, type Platform } from "@/src/lib/platform";
import { getT, type Lang } from "@/src/i18n/t";

const PLATFORMS = [
  { id: "desktop" as const, icon: Monitor, labelKey: "docs.platform.desktop" },
  { id: "mobile" as const, icon: Smartphone, labelKey: "docs.platform.mobile" },
];

/**
 * Standalone docs platform toggle. The only hydrated island in the docs view:
 * the nav, sidebar, content, and prev/next are static .astro. Reads/writes the
 * `data-platform-filter` attribute on <html> (the CSS rule in docs.css hides the
 * non-active platform's content) and persists the choice to localStorage. A
 * pre-paint inline script in DocsLayout.astro sets the initial attribute to
 * avoid a flash.
 */
export function PlatformSwitcher({ lang }: { lang: Lang }) {
  const t = getT(lang);
  const prefersReducedMotion = useReducedMotion();
  const [platform, setPlatformState] = useState<Platform>("desktop");

  // Reconcile to the stored/UA value on mount (SSR renders the desktop default).
  useEffect(() => {
    setPlatformState(detectDefaultPlatform());
  }, []);

  const select = (p: Platform) => {
    setPlatformState(p);
    storePlatform(p);
    document.documentElement.dataset.platformFilter = p;
  };

  const slideTransition = prefersReducedMotion
    ? { duration: 0 }
    : { type: "tween" as const, duration: 0.32, ease: [0.16, 1, 0.3, 1] as const };

  return (
    <div
      role="group"
      aria-label={t("docs.platform.label")}
      className="inline-flex items-center rounded-full bg-surface-raised/60 border border-border p-0.5"
    >
      {PLATFORMS.map(({ id, icon: Icon, labelKey }) => {
        const isActive = platform === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => select(id)}
            aria-pressed={isActive}
            className={`relative flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold [transition:color_280ms_cubic-bezier(0.16,1,0.3,1)] ${
              isActive ? "text-white" : "text-on-surface-muted hover:text-white"
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="platform-toggle-indicator"
                aria-hidden
                className="absolute inset-0 bg-vibrant-red rounded-full"
                transition={slideTransition}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              <Icon className="w-3.5 h-3.5" />
              {/* On mobile, only the active platform shows its text label;
                  the inactive one collapses to icon-only. Always full on sm+. */}
              <span className={isActive ? undefined : "hidden sm:inline"}>{t(labelKey)}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default PlatformSwitcher;
