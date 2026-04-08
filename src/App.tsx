import { motion } from "motion/react";
import {
  Mic,
  Activity,
  Download,
  BookOpen,
  Radio,
  Wifi
} from "lucide-react";

const LOGO_URL = "https://lh3.googleusercontent.com/aida/ADBb0ugJLbKj5ZRS0MOFKG68Bw2kbCmsH5T3-vhwohu7pL7uvWIOlHRknjufa2aLfK36N253mn7Nvi4Cnf2gdXnaCow0na8x78qyV0gc3-XQtpo-SNZ-01IlqMeoOA5ZWpWpsP1Aj9ilyHSE9sbayEC2Mk6g63tqGGYeiULfBLLLOi3RLAIU9PJtKeP4i9CQeEg04s9fYXb-Go9GHPkKqZoDH6uGLqX4X-SXzVdR3kLD8mwtt3la4bwUYhNkg-s1p25Xo7e8mx-Y7L03Gw";

const logoSizes = {
  sm: { container: "h-8 w-8 rounded-lg", img: "h-10 w-10" },
  md: { container: "h-10 w-10 lg:h-12 lg:w-12 rounded-xl", img: "h-12 w-12 lg:h-14 lg:w-14" },
  lg: { container: "h-20 w-20 lg:h-24 lg:w-24 rounded-2xl", img: "h-24 w-24 lg:h-28 lg:w-28" },
} as const;

function Logo({ size = "md", className = "" }: { size?: keyof typeof logoSizes; className?: string }) {
  const s = logoSizes[size];
  return (
    <div className={`${s.container} bg-surface-raised overflow-hidden flex items-center justify-center ${className}`}>
      <img alt="VoxLink Logo" className={`${s.img} object-cover`} src={LOGO_URL} referrerPolicy="no-referrer" />
    </div>
  );
}

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
            {["Reflectors", "Talkgroups", "Nodes", "Setup Guide"].map((item) => (
              <a 
                key={item}
                className="font-medium text-on-surface-muted hover:text-vibrant-blue transition-colors px-2 py-1" 
                href="#"
              >
                {item}
              </a>
            ))}
          </div>
          
          <button className="bg-vibrant-blue text-white px-6 lg:px-8 py-2.5 lg:py-3 rounded-full font-bold hover:scale-105 transition-all">
            Get the App
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative overflow-hidden py-16 lg:py-32 px-6 lg:px-8">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-40">
          <div className="absolute top-0 right-10 w-96 h-96 bg-sky-900 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-10 w-[500px] h-[500px] bg-slate-900 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="z-10 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-surface-raised/60 rounded-full mb-8 border border-border">
              <span className="flex h-2.5 w-2.5 rounded-full bg-status-online animate-pulse"></span>
              <span className="text-xs font-bold uppercase tracking-widest text-on-surface-muted">Free to Download</span>
            </div>
            
            <h1 className="text-5xl lg:text-[5.5rem] font-headline font-bold text-white tracking-tight leading-[1.1] lg:leading-[1.15] mb-8">
              Talk to the <br/> <span className="text-vibrant-blue">World.</span>
            </h1>

            <p className="text-lg lg:text-2xl text-on-surface-muted max-w-xl mb-12 leading-relaxed mx-auto lg:mx-0">
              Connect to radio reflectors worldwide from your phone. VoxLink gives you PTT access to thousands of channels — no extra hardware needed.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
              <button className="bg-vibrant-orange hover:bg-orange-500 text-white font-bold text-lg px-8 lg:px-10 py-4 lg:py-5 rounded-2xl flex items-center justify-center gap-3 transition-all hover:-translate-y-1">
                Get the App
                <Download className="w-5 h-5" />
              </button>
              <button className="bg-surface-raised hover:bg-surface-raised/80 text-white font-bold text-lg px-8 lg:px-10 py-4 lg:py-5 rounded-2xl flex items-center justify-center gap-3 border border-border transition-all hover:-translate-y-1">
                View Reflectors
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center"
          >
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="w-full max-w-xs bg-surface-raised p-4 rounded-[3.5rem] soft-shadow border border-border rotate-2"
            >
              <img
                alt="VoxLink App Screenshot"
                className="w-full rounded-[3rem]"
                src="/app-screenshot.png"
              />
            </motion.div>
          </motion.div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-24 lg:py-32 px-6 lg:px-8 bg-surface border-y border-border">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 lg:mb-24 max-w-2xl">
            <h2 className="text-4xl lg:text-6xl font-headline font-bold text-white mb-6 tracking-tight">Built for Radio</h2>
            <p className="text-on-surface-muted text-lg lg:text-xl leading-relaxed">Everything you need to stay on the air, right from your pocket.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
            {/* PTT Modes — hero feature */}
            <motion.div
              whileHover={{ y: -6 }}
              className="lg:col-span-3 p-10 lg:p-14 rounded-3xl bg-surface-raised/40 border border-border hover:bg-surface-raised/60 transition-all"
            >
              <Mic className="w-10 h-10 text-vibrant-orange mb-8" />
              <h3 className="font-headline font-bold text-3xl lg:text-4xl mb-5 text-white">3 PTT Modes</h3>
              <p className="text-on-surface-muted text-lg leading-relaxed max-w-lg">Latch, Hold, or VOX — transmit however feels natural. Configurable timeout timer with vibration warning so you never overstay your turn.</p>
            </motion.div>

            {/* Opus Audio */}
            <motion.div
              whileHover={{ y: -6 }}
              className="lg:col-span-2 p-10 rounded-3xl bg-surface-raised/40 border border-border hover:bg-surface-raised/60 transition-all"
            >
              <Activity className="w-8 h-8 text-vibrant-blue mb-6" />
              <h3 className="font-headline font-bold text-2xl mb-3 text-white">Opus Wideband Audio</h3>
              <p className="text-on-surface-muted leading-relaxed">16 kHz Opus codec with adaptive jitter buffer and packet loss concealment. RX/TX level metering in dB, adjustable mic gain, and 3 output routes.</p>
            </motion.div>

            {/* Multi-Server */}
            <motion.div
              whileHover={{ y: -6 }}
              className="lg:col-span-2 p-10 rounded-3xl bg-surface-raised/40 border border-border hover:bg-surface-raised/60 transition-all"
            >
              <Radio className="w-8 h-8 text-accent-tertiary mb-6" />
              <h3 className="font-headline font-bold text-2xl mb-3 text-white">Multi-Server Profiles</h3>
              <p className="text-on-surface-muted leading-relaxed">Save multiple reflector configs and switch between them instantly. JSON import/export to share setups with your club.</p>
            </motion.div>

            {/* Always On */}
            <motion.div
              whileHover={{ y: -6 }}
              className="lg:col-span-3 p-10 lg:p-14 rounded-3xl bg-surface-raised/40 border border-border hover:bg-surface-raised/60 transition-all"
            >
              <Wifi className="w-10 h-10 text-vibrant-orange mb-8" />
              <h3 className="font-headline font-bold text-3xl lg:text-4xl mb-5 text-white">Always On</h3>
              <p className="text-on-surface-muted text-lg leading-relaxed max-w-lg">Runs as a foreground service with wake and WiFi locks — no dropped connections when your screen is off. Auto-reconnects on network changes with heartbeat monitoring.</p>
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
          <Logo size="lg" className="mx-auto mb-12" />
          <h2 className="text-4xl lg:text-7xl font-headline font-bold mb-8 text-white tracking-tight">Get on the Air</h2>
          <p className="text-on-surface-muted text-lg lg:text-xl mb-6 leading-relaxed max-w-2xl mx-auto">
            Download VoxLink and connect to reflectors worldwide. Available on Android — free, no registration required.
          </p>

          <p className="text-on-surface-muted text-sm font-mono mb-12">
            <span className="text-vibrant-orange font-bold">14,200</span> operators · <span className="text-vibrant-blue font-bold">99.9%</span> uptime · <span className="text-accent-tertiary font-bold">&lt;20ms</span> latency
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <button className="w-full sm:w-auto bg-vibrant-orange hover:bg-orange-500 text-white font-bold text-lg px-8 lg:px-10 py-4 lg:py-5 rounded-2xl flex items-center justify-center gap-3 transition-all hover:-translate-y-1">
              Get the App
              <Download className="w-5 h-5" />
            </button>
            <button className="w-full sm:w-auto bg-surface-raised hover:bg-surface-raised/80 text-white font-bold text-lg px-8 lg:px-10 py-4 lg:py-5 rounded-2xl flex items-center justify-center gap-3 transition-all border border-border hover:-translate-y-1">
              Setup Guide
              <BookOpen className="w-5 h-5" />
            </button>
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
            {["About Us", "Help Center", "Privacy", "Twitter"].map((link) => (
              <a 
                key={link}
                className="text-sm font-semibold text-on-surface-muted hover:text-vibrant-blue transition-colors" 
                href="#"
              >
                {link}
              </a>
            ))}
          </div>
          
          <div className="text-on-surface-muted text-sm font-medium text-center md:text-right">
            © 2025 VoxLink. Let's talk!
          </div>
        </div>
      </footer>
    </div>
  );
}
