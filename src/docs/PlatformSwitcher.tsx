import { Monitor, Smartphone } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { usePlatform } from "./PlatformContext";
import { useLanguage } from "../i18n/LanguageContext";

const PLATFORMS = [
  { id: "desktop" as const, icon: Monitor, labelKey: "docs.platform.desktop" },
  { id: "mobile" as const, icon: Smartphone, labelKey: "docs.platform.mobile" },
];

export function PlatformSwitcher() {
  const { platform, setPlatform } = usePlatform();
  const { t } = useLanguage();
  const prefersReducedMotion = useReducedMotion();

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
            onClick={() => setPlatform(id)}
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
              {t(labelKey)}
            </span>
          </button>
        );
      })}
    </div>
  );
}
