import type { CSSProperties } from "react";
import { motion } from "motion/react";
import {
  Mic,
  Activity,
  Download,
  BookOpen,
  Radio,
  Wifi,
  MessageCircle,
  Layers,
  Disc
} from "lucide-react";
import { Logo } from "./Logo";

export default function App() {
  return (
    <div className="min-h-screen bg-community-bg text-on-surface font-sans selection:bg-vibrant-blue/20">
      {/* Navigation */}
      <nav className="w-full top-0 sticky z-50 bg-slate-950/80 backdrop-blur-xl h-24 flex items-center border-b border-border">
        <div className="flex justify-between items-center max-w-7xl mx-auto px-6 lg:px-10 w-full">
          <div className="flex items-center gap-4 lg:gap-5">
            <Logo size="md" className="shadow-lg shadow-black/40" />
            <span className="text-xl lg:text-2xl font-bold tracking-tight text-white font-headline">VoxLink</span>
          </div>
          
          <div className="hidden lg:flex gap-12 items-center">
            <a className="nav-link font-medium text-on-surface-muted hover:text-vibrant-red transition-colors px-2 py-1" href="#screenshots">Screenshots</a>
            <a className="nav-link font-medium text-on-surface-muted hover:text-vibrant-red transition-colors px-2 py-1" href="#features">Features</a>
            <a className="nav-link font-medium text-on-surface-muted hover:text-vibrant-red transition-colors px-2 py-1" href="/docs">Docs</a>
          </div>
          
          <a href="https://play.google.com/store/apps/details?id=com.jcalado.voxlink" target="_blank" rel="noopener noreferrer" className="btn-press bg-vibrant-red hover:bg-red-500 text-white px-6 lg:px-8 py-2.5 lg:py-3 rounded-2xl font-bold hover:scale-105 transition-all">
            Get the App
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <header id="screenshots" className="relative overflow-hidden py-16 lg:py-32 px-6 lg:px-8 scroll-mt-24">
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
              <span className="text-xs font-bold uppercase tracking-widest text-on-surface-muted">Free to Download</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-5xl lg:text-[5.5rem] font-headline font-bold text-white tracking-tight leading-[1.1] lg:leading-[1.15] mb-8"
            >
              Talk to the <br/> <span className="text-vibrant-red">World.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-lg lg:text-2xl text-on-surface-muted max-w-xl mb-12 leading-relaxed mx-auto lg:mx-0"
            >
              Connect to SvxLink reflectors worldwide from your phone. VoxLink gives you push-to-talk access to any talkgroup — no extra hardware needed.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start"
            >
              <a href="https://play.google.com/store/apps/details?id=com.jcalado.voxlink" target="_blank" rel="noopener noreferrer" className="btn-press bg-vibrant-red hover:bg-red-500 text-white font-bold text-lg px-8 lg:px-10 py-4 lg:py-5 rounded-2xl flex items-center justify-center gap-3 transition-all hover:-translate-y-1">
                Get the App
                <Download className="w-5 h-5" />
              </a>
              <a href="#" className="btn-press bg-surface-raised hover:bg-surface-raised/80 text-white font-bold text-lg px-8 lg:px-10 py-4 lg:py-5 rounded-2xl flex items-center justify-center gap-3 border border-border transition-all hover:-translate-y-1">
                <MessageCircle className="w-5 h-5" />
                Join the Community
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center"
          >
            <motion.div
              animate={{ opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 m-auto w-64 h-80 bg-vibrant-blue/20 rounded-full blur-3xl"
            />
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="w-full max-w-xs bg-surface-raised p-4 rounded-[3.5rem] soft-shadow border border-border rotate-2"
            >
              <picture>
                <source srcSet="/app-screenshot.webp" type="image/webp" />
                <img
                  alt="VoxLink App Screenshot"
                  className="w-full rounded-[3rem]"
                  src="/app-screenshot.png"
                  width={1080}
                  height={2424}
                />
              </picture>
            </motion.div>
          </motion.div>
        </div>
      </header>

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
            <h2 className="text-4xl lg:text-6xl font-headline font-bold text-white mb-6 tracking-tight">Built for Radio</h2>
            <p className="text-on-surface-muted text-lg lg:text-xl leading-relaxed">Everything you need to stay on the air, right from your pocket.</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
            {/* PTT Modes — hero feature */}
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
              <h3 className="font-headline font-bold text-3xl lg:text-4xl mb-5 text-white">3 PTT Modes</h3>
              <p className="text-on-surface-muted text-lg leading-relaxed max-w-lg">Latch, Hold, or VOX — transmit however feels natural. VOX includes a visual threshold slider so you can dial in sensitivity on the fly. Configurable timeout timer with vibration warning so you never overstay your turn.</p>
            </motion.div>

            {/* Opus Audio */}
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
              <h3 className="font-headline font-bold text-2xl mb-3 text-white">Opus Wideband Audio</h3>
              <p className="text-on-surface-muted leading-relaxed">Crystal-clear 16 kHz Opus codec that handles network hiccups gracefully. Live RX/TX level meters, adjustable mic gain, multiple input sources, and output to speaker, earpiece, or Bluetooth.</p>
            </motion.div>

            {/* Multi-Server */}
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
              <h3 className="font-headline font-bold text-2xl mb-3 text-white">Multi-Server Profiles</h3>
              <p className="text-on-surface-muted leading-relaxed">Save multiple reflector setups with talkgroup presets for each server. Label your favorites, reorder them, and switch instantly. Import and export configs as JSON to share with your club.</p>
            </motion.div>

            {/* Always On */}
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
              <h3 className="font-headline font-bold text-3xl lg:text-4xl mb-5 text-white">Always On</h3>
              <p className="text-on-surface-muted text-lg leading-relaxed max-w-lg">Stays connected in the background — no dropped connections when your screen is off or you switch apps. Automatically reconnects when your network changes between WiFi and cellular.</p>
            </motion.div>

            {/* TG Monitoring */}
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
              <h3 className="font-headline font-bold text-3xl lg:text-4xl mb-5 text-white">Talkgroup Monitoring</h3>
              <p className="text-on-surface-muted text-lg leading-relaxed max-w-lg">Listen to multiple talkgroups at once while staying on your primary. Pick which groups to monitor, and see their activity live on your PTT screen.</p>
            </motion.div>

            {/* Recording */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: 0.5 }}
              whileHover={{ y: -6 }}
              style={{ "--card-accent": "rgba(251, 146, 60, 0.25)" } as CSSProperties}
              className="feature-card lg:col-span-2 p-10 rounded-3xl bg-surface-raised/40 border border-border hover:bg-surface-raised/60"
            >
              <Disc className="feature-icon w-8 h-8 text-vibrant-orange mb-6" />
              <h3 className="font-headline font-bold text-2xl mb-3 text-white">Recording</h3>
              <p className="text-on-surface-muted leading-relaxed">Record your QSOs with one tap. Browse, play back, and share saved recordings from a built-in library.</p>
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
          <h2 className="text-4xl lg:text-7xl font-headline font-bold mb-8 text-white tracking-tight">Get on the Air</h2>
          <p className="text-on-surface-muted text-lg lg:text-xl mb-6 leading-relaxed max-w-2xl mx-auto">
            Free on Android, no account needed. Install VoxLink, add your reflector, and you're on the air.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <a href="https://play.google.com/store/apps/details?id=com.jcalado.voxlink" target="_blank" rel="noopener noreferrer" className="btn-press w-full sm:w-auto bg-vibrant-red hover:bg-red-500 text-white font-bold text-lg px-8 lg:px-10 py-4 lg:py-5 rounded-2xl flex items-center justify-center gap-3 transition-all hover:-translate-y-1">
              Get the App
              <Download className="w-5 h-5" />
            </a>
            <a href="/docs" className="btn-press w-full sm:w-auto bg-surface-raised hover:bg-surface-raised/80 text-white font-bold text-lg px-8 lg:px-10 py-4 lg:py-5 rounded-2xl flex items-center justify-center gap-3 transition-all border border-border hover:-translate-y-1">
              Setup Guide
              <BookOpen className="w-5 h-5" />
            </a>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 py-16 border-t border-border">
        <div className="flex flex-col md:flex-row justify-between items-center px-6 lg:px-12 gap-10 max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <Logo size="sm" />
            <span className="font-bold font-headline text-white text-2xl tracking-tight">VoxLink</span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 lg:gap-10">
            {[
              { label: "About Us", href: "#" },
              { label: "Docs", href: "/docs" },
              { label: "Privacy", href: "/privacy" },
              { label: "Twitter", href: "#" },
            ].map((link) => (
              <a key={link.label} className="text-sm font-semibold text-on-surface-muted hover:text-vibrant-red transition-colors" href={link.href}>
                {link.label}
              </a>
            ))}
          </div>
          
          <div className="text-on-surface-muted text-sm font-medium text-center md:text-right">
            © 2026 VoxLink. Let's talk!
          </div>
        </div>
      </footer>
    </div>
  );
}
