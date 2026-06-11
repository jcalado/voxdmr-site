import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { useLanguage } from "./i18n/LanguageContext";
import { LanguageSwitcher } from "./i18n/LanguageSwitcher";

const linkClass =
  "nav-link font-medium text-on-surface-muted hover:text-vibrant-red transition-colors px-2 py-1";

/**
 * Shared top navigation used across the site. Section anchors are root-relative
 * (`/#features`) so they resolve from any route, not just the landing page.
 */
export function SiteNav() {
  const { t } = useLanguage();

  return (
    <nav className="w-full top-0 sticky z-50 bg-slate-950/80 backdrop-blur-xl h-24 flex items-center border-b border-border">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-6 lg:px-10 w-full">
        <Link to="/" className="flex items-center gap-4 lg:gap-5">
          <Logo size="md" className="shadow-lg shadow-black/40" />
          <span className="text-xl lg:text-2xl font-bold tracking-tight text-white font-headline">VoxDMR</span>
        </Link>

        <div className="hidden lg:flex gap-12 items-center">
          <a className={linkClass} href="/#screenshots">{t("nav.screenshots")}</a>
          <a className={linkClass} href="/#features">{t("nav.features")}</a>
          <a className={linkClass} href="/docs">{t("nav.docs")}</a>
          <a className={linkClass} href="/radios">{t("nav.radios")}</a>
        </div>

        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <a
            href="/#download"
            className="btn-press bg-vibrant-red hover:bg-red-500 text-white px-6 lg:px-8 py-2.5 lg:py-3 rounded-2xl font-bold hover:scale-105 transition-all"
          >
            {t("nav.getApp")}
          </a>
        </div>
      </div>
    </nav>
  );
}
