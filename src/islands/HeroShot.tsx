import { getT, type Lang } from "@/src/i18n/t";
import { usePlatformStore } from "./platformStore";

interface HeroShotProps {
  lang: Lang;
}

/**
 * The hero screenshot. Split into its own tiny island because it swaps
 * desktop/mobile in sync with the gallery's platform toggle (shared module
 * store). Static SSR markup matches the "desktop" default; this hydrates and
 * reconciles to the stored/UA platform on mount.
 */
export default function HeroShot({ lang }: HeroShotProps) {
  const t = getT(lang);
  const { platform } = usePlatformStore();

  const heroShot =
    platform === "mobile"
      ? { src: "/screenshots/android-main-rx", alt: t("hero.imageAlt.mobile") }
      : { src: "/screenshots/desktop-main-rx", alt: t("hero.imageAlt.desktop") };

  return (
    <div
      className={`relative z-10 bg-surface-raised p-2 rounded-3xl soft-shadow border border-border ring-1 ring-white/10 ${
        platform === "mobile" ? "max-w-[18rem]" : ""
      }`}
    >
      <picture>
        <source srcSet={`${heroShot.src}.webp`} type="image/webp" />
        <img src={`${heroShot.src}.png`} alt={heroShot.alt} className="w-full rounded-2xl" />
      </picture>
    </div>
  );
}
