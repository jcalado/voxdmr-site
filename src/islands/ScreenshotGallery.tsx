import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Monitor, Smartphone, X } from "lucide-react";
import { getT, type Lang } from "@/src/i18n/t";
import { usePlatformStore } from "./platformStore";
import type { Platform } from "@/src/lib/platform";

interface ScreenshotGalleryProps {
  lang: Lang;
}

const PLATFORMS = [
  { id: "desktop" as const, icon: Monitor, labelKey: "docs.platform.desktop" },
  { id: "mobile" as const, icon: Smartphone, labelKey: "docs.platform.mobile" },
];

/**
 * Screenshot gallery + lightbox + platform toggle. The toggle writes to the
 * shared module store (`platformStore`) so the hero island swaps in sync,
 * matching the original single-island behaviour. Owns the zoom lightbox state
 * (Escape handler, scroll-lock, FLIP crossfade via layoutId).
 */
export default function ScreenshotGallery({ lang }: ScreenshotGalleryProps) {
  const t = getT(lang);
  const { platform, setPlatform } = usePlatformStore();
  const prefersReducedMotion = useReducedMotion();

  const galleryShots =
    platform === "mobile"
      ? [
          { src: "/screenshots/android-main", alt: t("screenshots.alt.main.mobile"), label: t("screenshots.main") },
          { src: "/screenshots/android-main-rx", alt: t("screenshots.alt.rx.mobile"), label: t("screenshots.rx") },
          { src: "/screenshots/android-talkgroups", alt: t("screenshots.alt.talkgroups.mobile"), label: t("screenshots.talkgroups") },
          { src: "/screenshots/android-settings-connection", alt: t("screenshots.alt.connection.mobile"), label: t("screenshots.connection") },
          { src: "/screenshots/android-settings-firmware", alt: t("screenshots.alt.firmware.mobile"), label: t("screenshots.firmware") },
        ]
      : [
          { src: "/screenshots/desktop-main", alt: t("screenshots.alt.main.desktop"), label: t("screenshots.main") },
          { src: "/screenshots/desktop-main-rx", alt: t("screenshots.alt.rx.desktop"), label: t("screenshots.rx") },
          { src: "/screenshots/desktop-talkgroups", alt: t("screenshots.alt.talkgroups.desktop"), label: t("screenshots.talkgroups") },
          { src: "/screenshots/desktop-settings-connection", alt: t("screenshots.alt.connection.desktop"), label: t("screenshots.connection") },
          { src: "/screenshots/desktop-settings-firmware", alt: t("screenshots.alt.firmware.desktop"), label: t("screenshots.firmware") },
        ];

  const galleryColumns =
    platform === "mobile"
      ? "columns-2 sm:columns-3 lg:columns-3"
      : "columns-1 lg:columns-2";

  const [zoomed, setZoomed] = useState<{ src: string; alt: string; label: string } | null>(null);

  useEffect(() => {
    if (!zoomed) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setZoomed(null); };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [zoomed]);

  useEffect(() => {
    if (zoomed) setZoomed(null);
    // Close the lightbox if the user toggles platform while it's open —
    // the thumbnail it would FLIP back into no longer exists.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [platform]);

  const zoomLayoutTransition = prefersReducedMotion
    ? { duration: 0 }
    : { type: "tween" as const, duration: 0.42, ease: [0.16, 1, 0.3, 1] as const };

  const slideTransition = prefersReducedMotion
    ? { duration: 0 }
    : { type: "tween" as const, duration: 0.32, ease: [0.16, 1, 0.3, 1] as const };

  return (
    <>
      <div className="mb-12 lg:mb-16 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <h2 className="text-4xl lg:text-5xl font-headline font-bold text-white mb-4 tracking-tight">{t("screenshots.heading")}</h2>
          <p className="text-on-surface-muted text-lg leading-relaxed">{t("screenshots.subheading")}</p>
        </div>
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
                onClick={() => setPlatform(id as Platform)}
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
      </div>

      <div key={platform} className={`${galleryColumns} gap-6 lg:gap-8`}>
        {galleryShots.map((item, i) => {
          const isZoomed = zoomed?.src === item.src;
          return (
            <motion.div
              key={item.src}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 2) * 0.1 }}
              className="break-inside-avoid flex flex-col gap-4 mb-6 lg:mb-8"
            >
              <motion.button
                type="button"
                layoutId={`zoom-${item.src}`}
                onClick={() => setZoomed(item)}
                animate={{ opacity: isZoomed ? 0 : 1 }}
                transition={zoomLayoutTransition}
                aria-label={`${t("screenshots.zoomOpen")} ${item.label}`}
                className="group block bg-surface-raised p-3 rounded-3xl soft-shadow border border-border cursor-zoom-in text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-vibrant-red focus-visible:ring-offset-2 focus-visible:ring-offset-community-bg"
              >
                <picture>
                  <source srcSet={`${item.src}.webp`} type="image/webp" />
                  <img
                    alt={item.alt}
                    className="w-full rounded-2xl transition-transform duration-300 ease-out group-hover:scale-[1.02]"
                    src={`${item.src}.png`}
                    loading="lazy"
                  />
                </picture>
              </motion.button>
              <span className="text-xs font-bold uppercase tracking-widest text-on-surface-muted px-2">{item.label}</span>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {zoomed && (
          <motion.div
            key="zoom-overlay"
            role="dialog"
            aria-modal="true"
            aria-label={zoomed.alt}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.22, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => setZoomed(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-10 bg-community-bg/85 backdrop-blur-md cursor-zoom-out"
          >
            <motion.div
              layoutId={`zoom-${zoomed.src}`}
              onClick={(e) => e.stopPropagation()}
              transition={zoomLayoutTransition}
              className="bg-surface-raised p-3 rounded-3xl soft-shadow border border-border cursor-default max-w-[min(72rem,100%)] max-h-full"
            >
              <picture>
                <source srcSet={`${zoomed.src}.webp`} type="image/webp" />
                <img
                  src={`${zoomed.src}.png`}
                  alt={zoomed.alt}
                  className="rounded-2xl max-h-[calc(100vh-6rem)] w-auto max-w-full"
                />
              </picture>
            </motion.div>
            <motion.button
              type="button"
              onClick={() => setZoomed(null)}
              aria-label={t("screenshots.zoomClose")}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.22, delay: prefersReducedMotion ? 0 : 0.15 }}
              className="absolute top-4 right-4 lg:top-6 lg:right-6 inline-flex items-center justify-center w-10 h-10 rounded-full bg-surface-raised border border-border text-white hover:bg-vibrant-red hover:border-vibrant-red transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-vibrant-red focus-visible:ring-offset-2 focus-visible:ring-offset-community-bg"
            >
              <X className="w-5 h-5" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
