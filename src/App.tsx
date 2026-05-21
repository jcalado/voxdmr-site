import { useEffect, useState, type CSSProperties } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import {
  Mic,
  Activity,
  BookOpen,
  Radio,
  Wifi,
  Layers,
  Cpu,
  MessageCircle,
  Coffee,
  Smartphone,
  Monitor,
  Headphones,
  Plane,
  LifeBuoy,
  ChevronDown,
  X,
} from "lucide-react";
import { Logo } from "./Logo";
import { useLanguage } from "./i18n/LanguageContext";
import { LanguageSwitcher } from "./i18n/LanguageSwitcher";
import { usePlatform } from "./docs/PlatformContext";
import { PlatformSwitcher } from "./docs/PlatformSwitcher";

export default function App() {
  const { t } = useLanguage();
  const { platform } = usePlatform();

  const heroShot = platform === "mobile"
    ? { src: "/screenshots/android-main-rx", alt: t("hero.imageAlt.mobile") }
    : { src: "/screenshots/desktop-main-rx", alt: t("hero.imageAlt.desktop") };

  const galleryShots = platform === "mobile"
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

  const galleryColumns = platform === "mobile"
    ? "columns-2 sm:columns-3 lg:columns-3"
    : "columns-1 lg:columns-2";

  const [zoomed, setZoomed] = useState<{ src: string; alt: string; label: string } | null>(null);
  const prefersReducedMotion = useReducedMotion();

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

  const [openFaqs, setOpenFaqs] = useState<Set<number>>(new Set());
  const toggleFaq = (n: number) =>
    setOpenFaqs((prev) => {
      const next = new Set(prev);
      next.has(n) ? next.delete(n) : next.add(n);
      return next;
    });

  const faqOpenTransition = prefersReducedMotion
    ? { duration: 0 }
    : { type: "tween" as const, duration: 0.34, ease: [0.16, 1, 0.3, 1] as const };
  const faqCloseTransition = prefersReducedMotion
    ? { duration: 0 }
    : { type: "tween" as const, duration: 0.24, ease: [0.16, 1, 0.3, 1] as const };

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
            <a href="#download" className="btn-press bg-vibrant-red hover:bg-red-500 text-white px-6 lg:px-8 py-2.5 lg:py-3 rounded-2xl font-bold hover:scale-105 transition-all">
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
              className="flex flex-col sm:flex-row gap-6 sm:gap-8 justify-center lg:justify-start"
            >
              <div className="flex flex-col gap-2.5 items-center sm:items-start">
                <span className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-on-surface-muted">{t("cta.onPhone")}</span>
                <a href="https://play.google.com/store/apps/details?id=com.jcalado.voxdmr" target="_blank" rel="noopener noreferrer" className="btn-press bg-vibrant-red hover:bg-red-500 text-white font-bold text-lg px-8 lg:px-10 py-4 lg:py-5 rounded-2xl flex items-center justify-center gap-3 transition-all hover:-translate-y-1 whitespace-nowrap">
                  {t("cta.getAndroid")}
                  <Smartphone className="w-5 h-5" />
                </a>
              </div>
              <div className="flex flex-col gap-2.5 items-center sm:items-start">
                <span className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-on-surface-muted">{t("cta.onDesktop")}</span>
                <a href="https://github.com/jcalado/voxdmr-site/releases/latest" target="_blank" rel="noopener noreferrer" className="btn-press bg-surface-raised hover:bg-surface-raised/80 text-white font-bold text-lg px-8 lg:px-10 py-4 lg:py-5 rounded-2xl flex items-center justify-center gap-3 transition-all border border-border hover:border-vibrant-red/50 hover:-translate-y-1 whitespace-nowrap">
                  {t("cta.getDesktop")}
                  <Monitor className="w-5 h-5" />
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-6 flex justify-center lg:justify-start"
            >
              <a href="https://t.me/+6-ncS_eluTUxNmU0" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-on-surface-muted hover:text-white font-semibold text-sm transition-colors">
                <MessageCircle className="w-4 h-4" />
                {t("cta.joinCommunity")}
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
            <div className={`relative z-10 bg-surface-raised p-2 rounded-3xl soft-shadow border border-border ring-1 ring-white/10 ${platform === "mobile" ? "max-w-[18rem]" : ""}`}>
              <picture>
                <source srcSet={`${heroShot.src}.webp`} type="image/webp" />
                <img
                  src={`${heroShot.src}.png`}
                  alt={heroShot.alt}
                  className="w-full rounded-2xl"
                />
              </picture>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Use Cases */}
      <section className="py-20 lg:py-28 px-6 lg:px-8 bg-community-bg border-t border-border">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            className="mb-14 lg:mb-20 max-w-2xl"
          >
            <h2 className="text-4xl lg:text-5xl font-headline font-bold text-white mb-4 tracking-tight">{t("useCases.heading")}</h2>
            <p className="text-on-surface-muted text-lg leading-relaxed">{t("useCases.subheading")}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-y-12 md:gap-y-0">
            {[
              { icon: Headphones, title: t("useCases.case1.title"), description: t("useCases.case1.description") },
              { icon: Plane, title: t("useCases.case2.title"), description: t("useCases.case2.description") },
              { icon: LifeBuoy, title: t("useCases.case3.title"), description: t("useCases.case3.description") },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`flex flex-col gap-5 md:px-8 lg:px-10 ${i > 0 ? "md:border-l md:border-border" : ""}`}
                >
                  <Icon className="w-8 h-8 text-vibrant-red" strokeWidth={1.5} />
                  <h3 className="font-headline font-bold text-xl lg:text-2xl text-white tracking-tight leading-tight">{item.title}</h3>
                  <p className="text-on-surface-muted leading-relaxed">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Screenshots Gallery */}
      <section id="screenshots" className="py-16 lg:py-24 px-6 lg:px-8 scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            className="mb-12 lg:mb-16 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
          >
            <div className="max-w-2xl">
              <h2 className="text-4xl lg:text-5xl font-headline font-bold text-white mb-4 tracking-tight">{t("screenshots.heading")}</h2>
              <p className="text-on-surface-muted text-lg leading-relaxed">{t("screenshots.subheading")}</p>
            </div>
            <PlatformSwitcher />
          </motion.div>

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

            {/* DMR Talkgroups */}
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

      {/* FAQ */}
      <section className="py-20 lg:py-28 px-6 lg:px-8 bg-community-bg">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-4xl lg:text-5xl font-headline font-bold text-white mb-4 tracking-tight">{t("faq.heading")}</h2>
            <p className="text-on-surface-muted text-lg leading-relaxed">{t("faq.subheading")}</p>
          </motion.div>

          <div className="border-y border-border">
            {[1, 2, 3, 4, 5].map((n, i) => {
              const isOpen = openFaqs.has(n);
              return (
                <motion.div
                  key={n}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className={i > 0 ? "border-t border-border" : ""}
                >
                  <h3>
                    <button
                      type="button"
                      onClick={() => toggleFaq(n)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${n}`}
                      id={`faq-question-${n}`}
                      className="group w-full flex items-center justify-between gap-6 py-6 cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-vibrant-red focus-visible:rounded-md"
                    >
                      <span className={`font-headline font-semibold text-lg lg:text-xl tracking-tight transition-colors group-hover:text-vibrant-red ${isOpen ? "text-vibrant-red" : "text-white"}`}>
                        {t(`faq.q${n}.question`)}
                      </span>
                      <motion.span
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={faqOpenTransition}
                        className={`shrink-0 inline-flex items-center justify-center transition-colors group-hover:text-vibrant-red ${isOpen ? "text-vibrant-red" : "text-on-surface-muted"}`}
                      >
                        <ChevronDown className="w-5 h-5" />
                      </motion.span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="answer"
                        id={`faq-answer-${n}`}
                        role="region"
                        aria-labelledby={`faq-question-${n}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{
                          height: "auto",
                          opacity: 1,
                          transition: {
                            height: faqOpenTransition,
                            opacity: { ...faqOpenTransition, delay: prefersReducedMotion ? 0 : 0.08 },
                          },
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                          transition: {
                            height: faqCloseTransition,
                            opacity: { ...faqCloseTransition, duration: prefersReducedMotion ? 0 : 0.16 },
                          },
                        }}
                        className="overflow-hidden"
                      >
                        <p className="text-on-surface-muted leading-relaxed pb-6 pr-8 max-w-2xl">{t(`faq.q${n}.answer`)}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="download" className="py-24 lg:py-32 px-6 lg:px-8 bg-community-bg scroll-mt-24">
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

          <div className="flex flex-col sm:flex-row items-stretch sm:items-end justify-center gap-6 sm:gap-8">
            <div className="flex flex-col gap-2.5 items-center">
              <span className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-on-surface-muted">{t("cta.onPhone")}</span>
              <a href="https://play.google.com/store/apps/details?id=com.jcalado.voxdmr" target="_blank" rel="noopener noreferrer" className="btn-press w-full sm:w-auto bg-vibrant-red hover:bg-red-500 text-white font-bold text-lg px-8 lg:px-10 py-4 lg:py-5 rounded-2xl flex items-center justify-center gap-3 transition-all hover:-translate-y-1 whitespace-nowrap">
                {t("cta.getAndroid")}
                <Smartphone className="w-5 h-5" />
              </a>
            </div>
            <div className="flex flex-col gap-2.5 items-center">
              <span className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-on-surface-muted">{t("cta.onDesktop")}</span>
              <a href="https://github.com/jcalado/voxdmr-site/releases/latest" target="_blank" rel="noopener noreferrer" className="btn-press w-full sm:w-auto bg-vibrant-red/90 hover:bg-red-500 text-white font-bold text-lg px-8 lg:px-10 py-4 lg:py-5 rounded-2xl flex items-center justify-center gap-3 transition-all hover:-translate-y-1 whitespace-nowrap">
                {t("cta.getDesktop")}
                <Monitor className="w-5 h-5" />
              </a>
            </div>
          </div>
          <div className="mt-6 flex justify-center">
            <a href="/docs" className="inline-flex items-center gap-2 text-vibrant-blue hover:text-sky-300 font-semibold transition-colors">
              <BookOpen className="w-4 h-4" />
              {t("cta.setupGuide")}
            </a>
          </div>
        </motion.div>
      </section>

      {/* Support / Ko-fi */}
      <section className="py-16 lg:py-20 px-6 lg:px-8 bg-community-bg border-t border-border">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-vibrant-orange/10 text-vibrant-orange mb-6">
            <Coffee className="w-7 h-7" />
          </div>
          <h2 className="text-3xl lg:text-4xl font-headline font-bold mb-4 text-white tracking-tight">
            {t("support.heading")}
          </h2>
          <p className="text-on-surface-muted text-base lg:text-lg mb-8 leading-relaxed">
            {t("support.description")}
          </p>
          <a
            href="https://ko-fi.com/jcalado"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-press inline-flex items-center gap-3 bg-vibrant-orange hover:bg-orange-400 text-community-bg font-bold text-base lg:text-lg px-7 lg:px-8 py-3.5 lg:py-4 rounded-2xl transition-all hover:-translate-y-1"
          >
            <Coffee className="w-5 h-5" />
            {t("support.cta")}
          </a>
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
              { label: t("footer.docs"), href: "/docs" },
              { label: t("footer.privacy"), href: "/privacy" },
              { label: t("footer.github"), href: "https://github.com/jcalado/dmr-input", external: true },
            ].map((link) => (
              <a
                key={link.href}
                className="text-sm font-semibold text-on-surface-muted hover:text-vibrant-red transition-colors"
                href={link.href}
                {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="text-on-surface-muted text-sm font-medium text-center md:text-right">
            {t("footer.copyright")}
          </div>
        </div>
      </footer>

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
    </div>
  );
}
