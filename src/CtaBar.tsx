import { Smartphone, Monitor, MessageCircle, Coffee } from "lucide-react";
import { useLanguage } from "./i18n/LanguageContext";

const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.jcalado.voxdmr";
const RELEASES_URL = "https://github.com/jcalado/voxdmr-site/releases/latest";
const TELEGRAM_URL = "https://t.me/+6-ncS_eluTUxNmU0";
const KOFI_URL = "https://ko-fi.com/jcalado";

const SEGMENT =
  "btn-press inline-flex items-center justify-center gap-2.5 rounded-full text-base px-6 py-4 transition-colors whitespace-nowrap " +
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-vibrant-red focus-visible:ring-offset-2 focus-visible:ring-offset-community-bg";

interface CtaBarProps {
  /** Extra classes for the outer track (e.g. layout/width overrides at the call site). */
  className?: string;
}

/**
 * The primary action bar: Android + Desktop downloads paired with Community + Donate.
 * Renders as a single segmented pill from `sm` up, and a tidy 2x2 grid on mobile.
 * Positioning and entrance animation are left to the caller.
 */
export function CtaBar({ className = "" }: CtaBarProps) {
  const { t } = useLanguage();
  return (
    <div
      className={`grid w-full grid-cols-2 gap-1.5 rounded-3xl border border-border bg-surface-raised/40 p-1.5 sm:inline-flex sm:w-auto sm:flex-wrap sm:items-center sm:gap-1.5 sm:rounded-full ${className}`}
    >
      <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" className={`${SEGMENT} bg-vibrant-red hover:bg-red-500 text-white font-bold`}>
        <Smartphone className="w-5 h-5" aria-hidden="true" />
        {t("cta.android")}
      </a>
      <a href={RELEASES_URL} target="_blank" rel="noopener noreferrer" className={`${SEGMENT} bg-white/10 hover:bg-white/[0.15] text-white font-bold`}>
        <Monitor className="w-5 h-5" aria-hidden="true" />
        {t("cta.desktop")}
      </a>
      <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" className={`${SEGMENT} bg-white/5 hover:bg-white/10 text-on-surface font-semibold`}>
        <MessageCircle className="w-5 h-5" aria-hidden="true" />
        {t("cta.community")}
      </a>
      <a href={KOFI_URL} target="_blank" rel="noopener noreferrer" className={`${SEGMENT} bg-vibrant-orange/15 hover:bg-vibrant-orange/25 text-vibrant-orange font-semibold`}>
        <Coffee className="w-5 h-5" aria-hidden="true" />
        {t("cta.donate")}
      </a>
    </div>
  );
}
