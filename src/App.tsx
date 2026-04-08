import { motion } from "motion/react";
import {
  Mic,
  Users,
  Activity,
  Download,
  BookOpen,
  PartyPopper
} from "lucide-react";

const LOGO_URL = "https://lh3.googleusercontent.com/aida/ADBb0ugJLbKj5ZRS0MOFKG68Bw2kbCmsH5T3-vhwohu7pL7uvWIOlHRknjufa2aLfK36N253mn7Nvi4Cnf2gdXnaCow0na8x78qyV0gc3-XQtpo-SNZ-01IlqMeoOA5ZWpWpsP1Aj9ilyHSE9sbayEC2Mk6g63tqGGYeiULfBLLLOi3RLAIU9PJtKeP4i9CQeEg04s9fYXb-Go9GHPkKqZoDH6uGLqX4X-SXzVdR3kLD8mwtt3la4bwUYhNkg-s1p25Xo7e8mx-Y7L03Gw";

export default function App() {
  return (
    <div className="min-h-screen bg-community-bg text-on-surface font-sans selection:bg-vibrant-blue/20">
      {/* Navigation */}
      <nav className="w-full top-0 sticky z-50 bg-slate-950/80 backdrop-blur-xl h-24 flex items-center border-b border-white/5">
        <div className="flex justify-between items-center max-w-7xl mx-auto px-6 lg:px-10 w-full">
          <div className="flex items-center gap-4 lg:gap-5">
            <div className="h-10 w-10 lg:h-12 lg:w-12 bg-slate-800 rounded-xl overflow-hidden flex items-center justify-center shadow-lg shadow-black/40">
              <img
                alt="VoxLink Logo"
                className="h-11 w-11 lg:h-13 lg:w-13 object-cover"
                src={LOGO_URL}
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="text-xl lg:text-2xl font-bold tracking-tight text-white font-headline">VoxLink</span>
          </div>
          
          <div className="hidden lg:flex gap-12 items-center">
            {["Community", "Live Channels", "Global Nodes", "Guides"].map((item) => (
              <a 
                key={item}
                className="font-medium text-slate-300 hover:text-vibrant-blue transition-colors px-2 py-1" 
                href="#"
              >
                {item}
              </a>
            ))}
          </div>
          
          <button className="bg-vibrant-blue text-white px-6 lg:px-8 py-2.5 lg:py-3 rounded-full font-bold shadow-lg shadow-vibrant-blue/20 hover:scale-105 transition-all">
            Join the Club
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
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-slate-800 rounded-full mb-8 soft-shadow border border-white/10">
              <span className="flex h-3 w-3 rounded-full bg-vibrant-orange animate-pulse"></span>
              <span className="text-xs font-bold uppercase tracking-widest text-slate-300">Everyone's Online!</span>
            </div>
            
            <h1 className="text-5xl lg:text-[5.5rem] font-headline font-bold text-white tracking-tight leading-[1.1] lg:leading-[1.15] mb-8">
              Connect <br/> <span className="text-vibrant-blue">With Ease.</span>
            </h1>
            
            <p className="text-lg lg:text-2xl text-slate-400 max-w-xl mb-12 leading-relaxed mx-auto lg:mx-0">
              The friendliest way to explore global radio reflectors. Turn your device into a playful portal for voices around the world.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
              <button className="bg-vibrant-orange hover:bg-orange-500 text-white font-bold text-lg px-8 lg:px-10 py-4 lg:py-5 rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-vibrant-orange/20 transition-all hover:-translate-y-1">
                Start Chatting
                <PartyPopper className="w-6 h-6" />
              </button>
              <button className="bg-slate-800 hover:bg-slate-700 text-white font-bold text-lg px-8 lg:px-10 py-4 lg:py-5 rounded-2xl flex items-center justify-center gap-3 border border-white/10 soft-shadow transition-all hover:-translate-y-1">
                Explore Map
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
              className="w-full max-w-xs bg-slate-800 p-4 rounded-[3.5rem] soft-shadow border border-white/10 rotate-2"
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
      <section className="py-24 px-6 lg:px-8 bg-background border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 text-center">
            <h2 className="text-4xl lg:text-5xl font-headline font-bold text-white mb-6">Simple, Friendly Tools</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">Everything you need to stay connected with your community, designed to be as easy as sending a text.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {[
              { icon: Mic, title: "Voice First", color: "text-vibrant-blue", desc: "Crystal clear audio that makes you feel like you're in the same room, even if you're miles apart." },
              { icon: Users, title: "Global Rooms", color: "text-vibrant-orange", desc: "Join thousands of channels and reflectors worldwide with just a single tap." },
              { icon: Activity, title: "Smart Status", color: "text-indigo-400", desc: "See who's online and track your node's health with beautiful, easy-to-read charts." }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="bg-slate-800/40 p-10 rounded-[2.5rem] border border-white/5 hover:bg-slate-800/60 transition-all group"
              >
                <div className="w-16 h-16 rounded-2xl bg-slate-900 flex items-center justify-center mb-8 soft-shadow border border-white/5">
                  <feature.icon className={`w-8 h-8 ${feature.color}`} />
                </div>
                <h3 className="font-headline font-bold text-2xl mb-4 text-white">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32 px-6 lg:px-8 bg-community-bg relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#38BDF8 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto text-center relative z-10 bg-slate-900/60 backdrop-blur-md p-10 lg:p-24 rounded-[3rem] lg:rounded-[4rem] border border-white/10 shadow-2xl"
        >
          <img 
            alt="VoxLink Icon" 
            className="w-24 h-24 lg:w-32 lg:h-32 object-contain mb-12 mx-auto rounded-3xl shadow-2xl shadow-vibrant-blue/20" 
            src={LOGO_URL}
            referrerPolicy="no-referrer"
          />
          <h2 className="text-4xl lg:text-7xl font-headline font-bold mb-10 text-white tracking-tight">Join the Conversation</h2>
          <p className="text-slate-300 text-lg lg:text-2xl mb-16 leading-relaxed max-w-3xl mx-auto">
            Ready to jump in? Download the VoxLink app today and start connecting with radio enthusiasts globally. It's free, fun, and built for everyone.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 lg:gap-8 mb-24">
            <button className="w-full sm:w-auto bg-vibrant-blue hover:bg-vibrant-blue/90 text-white font-bold text-xl px-10 lg:px-12 py-5 lg:py-6 rounded-3xl flex items-center justify-center gap-4 transition-all shadow-xl shadow-vibrant-blue/20">
              Get the App
              <Download className="w-6 h-6" />
            </button>
            <button className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-white font-bold text-xl px-10 lg:px-12 py-5 lg:py-6 rounded-3xl flex items-center justify-center gap-4 transition-all border border-white/10">
              Community Docs
              <BookOpen className="w-6 h-6" />
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 lg:gap-12 pt-16 border-t border-white/10">
            <div>
              <div className="text-3xl lg:text-4xl font-headline font-bold text-vibrant-blue mb-2">14,200</div>
              <div className="text-xs lg:text-sm uppercase tracking-widest text-slate-400 font-bold">New Friends</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-headline font-bold text-vibrant-orange mb-2">99.9%</div>
              <div className="text-xs lg:text-sm uppercase tracking-widest text-slate-400 font-bold">Always On</div>
            </div>
            <div className="col-span-2 md:col-span-1">
              <div className="text-3xl lg:text-4xl font-headline font-bold text-indigo-400 mb-2">&lt;20ms</div>
              <div className="text-xs lg:text-sm uppercase tracking-widest text-slate-400 font-bold">Instant Talk</div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 py-16 border-t border-white/5">
        <div className="flex flex-col md:flex-row justify-between items-center px-6 lg:px-12 gap-10 max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <img 
              alt="VoxLink Logo" 
              className="h-8 w-8 object-contain" 
              src={LOGO_URL}
              referrerPolicy="no-referrer"
            />
            <span className="font-bold font-headline text-white text-2xl tracking-tight">VoxLink</span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 lg:gap-10">
            {["About Us", "Help Center", "Privacy", "Twitter"].map((link) => (
              <a 
                key={link}
                className="text-sm font-semibold text-slate-400 hover:text-vibrant-blue transition-colors" 
                href="#"
              >
                {link}
              </a>
            ))}
          </div>
          
          <div className="text-slate-500 text-sm font-medium text-center md:text-right">
            © 2024 VoxLink. Let's talk!
          </div>
        </div>
      </footer>
    </div>
  );
}
