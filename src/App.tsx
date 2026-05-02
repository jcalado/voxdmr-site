import type { CSSProperties } from "react";
import { motion } from "motion/react";
import {
  Mic,
  Activity,
  Download,
  BookOpen,
  Radio,
  Wifi,
  Layers,
  Cpu,
  MessageCircle
} from "lucide-react";
import { Logo } from "./Logo";
import { useLanguage } from "./i18n/LanguageContext";
import { LanguageSwitcher } from "./i18n/LanguageSwitcher";

export default function App() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-community-bg text-on-surface font-sans selection:bg-vibrant-blue/20">
      {/* Navigation */}
      <nav className="w-full top-0 sticky z-50 bg-slate-950/80 backdrop-blur-xl h-24 flex items-center border-b border-border">
        <div className="flex justify-between items-center max-w-7xl mx-auto px-6 lg:px-10 w-full">
          <div className="flex items-center gap-4 lg:gap-5">
            <Logo size="md" className="shadow-lg shadow-black/40" />
            <span className="text-xl lg:text-2xl font-bold tracking-tight text-white font-headline">VoxDMR</span>
          </div>

          <div className="hidden lg:flex gap-12 items-center">
            <a className="nav-link font-medium text-on-surface-muted hover:text-vibrant-red transition-colors px-2 py-1" href="#screenshots">{t("nav.screenshots")}</a>
            <a className="nav-link font-medium text-on-surface-muted hover:text-vibrant-red transition-colors px-2 py-1" href="#features">{t("nav.features")}</a>
            <a className="nav-link font-medium text-on-surface-muted hover:text-vibrant-red transition-colors px-2 py-1" href="/docs">{t("nav.docs")}</a>
          </div>

          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <a href="https://github.com/jcalado/voxdmr-site/releases/latest" target="_blank" rel="noopener noreferrer" className="btn-press bg-vibrant-red hover:bg-red-500 text-white px-6 lg:px-8 py-2.5 lg:py-3 rounded-2xl font-bold hover:scale-105 transition-all">
              {t("nav.getApp")}
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative overflow-hidden py-16 lg:py-32 px-6 lg:px-8">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-40">
          <motion.div
            animate={{ x: [0, 30, -20, 0], y: [0, -20, 10, 0], scale: [1, 1.1, 0.95, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 right-10 w-96 h-96 bg-sky-900 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ x: [0, -25, 15, 0], y: [0, 15, -25, 0], scale: [1, 0.95, 1.08, 1] }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-0 left-10 w-[500px] h-[500px] bg-slate-900 rounded-full blur-3xl"
          />
        </div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="z-10 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 bg-surface-raised/60 rounded-full mb-8 border border-border"
            >
              <span className="flex h-2.5 w-2.5 rounded-full bg-status-online animate-pulse"></span>
              <span className="text-xs font-bold uppercase tracking-widest text-on-surface-muted">{t("hero.badge")}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-5xl lg:text-[5.5rem] font-headline font-bold text-white tracking-tight leading-[1.1] lg:leading-[1.15] mb-8"
            >
              {t("hero.title1")} <br/> <span className="text-vibrant-red">{t("hero.title2")}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-lg lg:text-2xl text-on-surface-muted max-w-xl mb-12 leading-relaxed mx-auto lg:mx-0"
            >
              {t("hero.subtitle")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start"
            >
              <a href="https://github.com/jcalado/voxdmr-site/releases/latest" target="_blank" rel="noopener noreferrer" className="btn-press bg-vibrant-red hover:bg-red-500 text-white font-bold text-lg px-8 lg:px-10 py-4 lg:py-5 rounded-2xl flex items-center justify-center gap-3 transition-all hover:-translate-y-1">
                {t("nav.getApp")}
                <Download className="w-5 h-5" />
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center items-center"
          >
            <motion.div
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 m-auto w-3/4 h-3/4 bg-vibrant-blue/20 rounded-full blur-3xl"
            />
            <div className="relative z-10 bg-surface-raised p-2 rounded-3xl soft-shadow border border-border ring-1 ring-white/10">
              <picture>
                <source srcSet="/main-app.webp" type="image/webp" />
                <img
                  src="/main-app.png"
                  alt="VoxDMR main window: connected to BrandMeister, talkgroup picker with favorites and live activity dots"
                  className="w-full rounded-2xl"
                />
              </picture>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Screenshots Gallery */}
      <section id="screenshots" className="py-16 lg:py-24 px-6 lg:px-8 scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            className="mb-12 lg:mb-16 max-w-2xl"
          >
            <h2 className="text-4xl lg:text-5xl font-headline font-bold text-white mb-4 tracking-tight">{t("screenshots.heading")}</h2>
            <p className="text-on-surface-muted text-lg leading-relaxed">{t("screenshots.subheading")}</p>
          </motion.div>

          <div className="columns-1 lg:columns-2 gap-6 lg:gap-8">
            {[
              { src: "/screenshots/setup-card", alt: "VoxDMR first-launch setup card with firmware download button", label: t("screenshots.setup") },
              { src: "/screenshots/main-idle", alt: "VoxDMR main UI connected and ready to transmit", label: t("screenshots.main") },
              { src: "/screenshots/main-rx", alt: "VoxDMR receiving audio from a BrandMeister talkgroup", label: t("screenshots.rx") },
              { src: "/screenshots/settings-firmware", alt: "VoxDMR settings firmware tab showing valid firmware checksum", label: t("screenshots.firmware") },
              { src: "/screenshots/settings-connection", alt: "VoxDMR settings connection tab with BrandMeister master picker", label: t("screenshots.connection") },
            ].map((item, i) => (
              <motion.div
                key={item.src}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: (i % 2) * 0.1 }}
                className="break-inside-avoid flex flex-col gap-4 mb-6 lg:mb-8"
              >
                <div className="bg-surface-raised p-3 rounded-3xl soft-shadow border border-border">
                  <picture>
                    <source srcSet={`${item.src}.webp`} type="image/webp" />
                    <img
                      alt={item.alt}
                      className="w-full rounded-2xl"
                      src={`${item.src}.png`}
                      loading="lazy"
                    />
                  </picture>
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-on-surface-muted px-2">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 lg:py-32 px-6 lg:px-8 bg-surface border-y border-border scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            className="mb-16 lg:mb-24 max-w-2xl"
          >
            <h2 className="text-4xl lg:text-6xl font-headline font-bold text-white mb-6 tracking-tight">{t("features.heading")}</h2>
            <p className="text-on-surface-muted text-lg lg:text-xl leading-relaxed">{t("features.subheading")}</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
            {/* PTT. Hero feature */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -6 }}
              style={{ "--card-accent": "rgba(251, 146, 60, 0.25)" } as CSSProperties}
              className="feature-card lg:col-span-3 p-10 lg:p-14 rounded-3xl bg-surface-raised/40 border border-border hover:bg-surface-raised/60"
            >
              <Mic className="feature-icon w-10 h-10 text-vibrant-orange mb-8" />
              <h3 className="font-headline font-bold text-3xl lg:text-4xl mb-5 text-white">{t("features.ptt.title")}</h3>
              <p className="text-on-surface-muted text-lg leading-relaxed max-w-lg">{t("features.ptt.description")}</p>
            </motion.div>

            {/* AMBE+2 Vocoder */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -6 }}
              style={{ "--card-accent": "rgba(56, 189, 248, 0.25)" } as CSSProperties}
              className="feature-card lg:col-span-2 p-10 rounded-3xl bg-surface-raised/40 border border-border hover:bg-surface-raised/60"
            >
              <Activity className="feature-icon w-8 h-8 text-vibrant-blue mb-6" />
              <h3 className="font-headline font-bold text-2xl mb-3 text-white">{t("features.ambe.title")}</h3>
              <p className="text-on-surface-muted leading-relaxed">{t("features.ambe.description")}</p>
            </motion.div>

            {/* BrandMeister Talkgroups */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -6 }}
              style={{ "--card-accent": "rgba(129, 140, 248, 0.25)" } as CSSProperties}
              className="feature-card lg:col-span-2 p-10 rounded-3xl bg-surface-raised/40 border border-border hover:bg-surface-raised/60"
            >
              <Radio className="feature-icon w-8 h-8 text-accent-tertiary mb-6" />
              <h3 className="font-headline font-bold text-2xl mb-3 text-white">{t("features.talkgroups.title")}</h3>
              <p className="text-on-surface-muted leading-relaxed">{t("features.talkgroups.description")}</p>
            </motion.div>

            {/* Rewind Protocol. Hero feature */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ y: -6 }}
              style={{ "--card-accent": "rgba(251, 146, 60, 0.25)" } as CSSProperties}
              className="feature-card lg:col-span-3 p-10 lg:p-14 rounded-3xl bg-surface-raised/40 border border-border hover:bg-surface-raised/60"
            >
              <Wifi className="feature-icon w-10 h-10 text-vibrant-orange mb-8" />
              <h3 className="font-headline font-bold text-3xl lg:text-4xl mb-5 text-white">{t("features.rewind.title")}</h3>
              <p className="text-on-surface-muted text-lg leading-relaxed max-w-lg">{t("features.rewind.description")}</p>
            </motion.div>

            {/* Free to Use. Hero feature */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ y: -6 }}
              style={{ "--card-accent": "rgba(56, 189, 248, 0.25)" } as CSSProperties}
              className="feature-card lg:col-span-3 p-10 lg:p-14 rounded-3xl bg-surface-raised/40 border border-border hover:bg-surface-raised/60"
            >
              <Layers className="feature-icon w-10 h-10 text-vibrant-blue mb-8" />
              <h3 className="font-headline font-bold text-3xl lg:text-4xl mb-5 text-white">{t("features.free.title")}</h3>
              <p className="text-on-surface-muted text-lg leading-relaxed max-w-lg">{t("features.free.description")}</p>
            </motion.div>

            {/* Cross-platform */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: 0.5 }}
              whileHover={{ y: -6 }}
              style={{ "--card-accent": "rgba(251, 146, 60, 0.25)" } as CSSProperties}
              className="feature-card lg:col-span-2 p-10 rounded-3xl bg-surface-raised/40 border border-border hover:bg-surface-raised/60"
            >
              <Cpu className="feature-icon w-8 h-8 text-vibrant-orange mb-6" />
              <h3 className="font-headline font-bold text-2xl mb-3 text-white">{t("features.crossPlatform.title")}</h3>
              <p className="text-on-surface-muted leading-relaxed">{t("features.crossPlatform.description")}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32 px-6 lg:px-8 bg-community-bg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Logo size="lg" className="mx-auto mb-12" />
          </motion.div>
          <h2 className="text-4xl lg:text-7xl font-headline font-bold mb-8 text-white tracking-tight">{t("cta.heading")}</h2>
          <p className="text-on-surface-muted text-lg lg:text-xl mb-6 leading-relaxed max-w-2xl mx-auto">
            {t("cta.description")}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <a href="https://github.com/jcalado/voxdmr-site/releases/latest" target="_blank" rel="noopener noreferrer" className="btn-press w-full sm:w-auto bg-vibrant-red hover:bg-red-500 text-white font-bold text-lg px-8 lg:px-10 py-4 lg:py-5 rounded-2xl flex items-center justify-center gap-3 transition-all hover:-translate-y-1">
              {t("nav.getApp")}
              <Download className="w-5 h-5" />
            </a>
            <a href="/docs" className="btn-press w-full sm:w-auto bg-surface-raised hover:bg-surface-raised/80 text-white font-bold text-lg px-8 lg:px-10 py-4 lg:py-5 rounded-2xl flex items-center justify-center gap-3 transition-all border border-border hover:-translate-y-1">
              {t("cta.setupGuide")}
              <BookOpen className="w-5 h-5" />
            </a>
            <a href="https://t.me/+6-ncS_eluTUxNmU0" target="_blank" rel="noopener noreferrer" className="btn-press w-full sm:w-auto bg-surface-raised hover:bg-surface-raised/80 text-white font-bold text-lg px-8 lg:px-10 py-4 lg:py-5 rounded-2xl flex items-center justify-center gap-3 transition-all border border-border hover:-translate-y-1">
              {t("cta.joinCommunity")}
              <MessageCircle className="w-5 h-5" />
            </a>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 py-16 border-t border-border">
        <div className="flex flex-col md:flex-row justify-between items-center px-6 lg:px-12 gap-10 max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <Logo size="sm" />
            <span className="font-bold font-headline text-white text-2xl tracking-tight">VoxDMR</span>
          </div>

          <div className="flex flex-wrap justify-center gap-6 lg:gap-10">
            {[
              { label: t("footer.aboutUs"), href: "#" },
              { label: t("footer.docs"), href: "/docs" },
              { label: t("footer.privacy"), href: "/privacy" },
            ].map((link) => (
              <a key={link.href} className="text-sm font-semibold text-on-surface-muted hover:text-vibrant-red transition-colors" href={link.href}>
                {link.label}
              </a>
            ))}
          </div>

          <div className="text-on-surface-muted text-sm font-medium text-center md:text-right">
            {t("footer.copyright")}
          </div>
        </div>
      </footer>
    </div>
  );
}
