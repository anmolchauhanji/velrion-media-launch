import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Menu, X, CheckCircle, Zap, Target, Users, Flame,
  Trophy, TrendingUp, Star, ChevronDown, Activity, ArrowRight,
  Crosshair, Layers, UserCircle
} from "lucide-react";
import { BrandLogo } from "@/components/ui/brand-logo";

export const Route = createFileRoute("/")({
  component: Index,
});

/* ─────────────────────────────────────────
   Shared waitlist modal
───────────────────────────────────────── */
function WaitlistModal({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const overlayRef = useRef<HTMLDivElement>(null);

  // Close on overlay click
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: "007d77ca-1ca1-470e-8e35-c37d1dd77da2",
          email,
          subject: "New Waitlist Submission for Velrion",
          from_name: "Velrion Landing Page",
        }),
      });
      const data = await res.json();
      if (data.success) { setStatus("success"); setEmail(""); }
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
    >
      <div className="relative w-full max-w-md glass-card border-[#00e5ff]/30 p-10 rounded-[2rem] shadow-2xl shadow-[#00e5ff]/10 animate-in zoom-in-95 duration-300">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-white/40 hover:text-white hover:bg-white/10 transition-all"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {status === "success" ? (
          <div className="flex flex-col items-center gap-4 py-6 text-center">
            <div className="w-16 h-16 rounded-full bg-[#39ff14]/20 flex items-center justify-center animate-bounce">
              <CheckCircle className="text-[#39ff14]" size={32} />
            </div>
            <p className="font-bold text-2xl text-[#39ff14]">You're on the waitlist!</p>
            <p className="text-white/60">Keep an eye on your inbox. We'll reach out soon.</p>
            <button onClick={onClose} className="mt-4 px-6 py-3 bg-white/10 rounded-xl font-medium hover:bg-white/20 transition-all">
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="mb-8 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#00e5ff]/30 bg-[#00e5ff]/10 text-[#00e5ff] text-xs font-bold tracking-widest uppercase mb-4">
                <span className="flex h-1.5 w-1.5 rounded-full bg-[#00e5ff] animate-pulse" />
                Early Access
              </div>
              <h3 className="font-display text-3xl font-bold mb-2">Join the Waitlist</h3>
              <p className="text-white/50 text-sm">Be first in line. No spam. Just your spot.</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="email"
                required
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-[#00e5ff] transition-colors"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full py-4 bg-[#00e5ff] text-black font-bold rounded-2xl hover:bg-white transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {status === "loading" ? "Joining..." : (<>Join Waitlist <ArrowRight size={18} /></>)}
              </button>
            </form>

            {status === "error" && (
              <p className="text-red-400 mt-3 text-sm text-center">Something went wrong. Please try again.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

/* Global modal state via a module-level event emitter pattern */
let _openModal: (() => void) | null = null;
export function openWaitlistModal() { _openModal?.(); }

function useWaitlistModal() {
  const [open, setOpen] = useState(false);
  useEffect(() => { _openModal = () => setOpen(true); return () => { _openModal = null; }; }, []);
  return { open, setOpen };
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Features", href: "#features" },
    { label: "How it Works", href: "#how-it-works" },
    { label: "Community", href: "#community" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "py-4 backdrop-blur-xl bg-background/80 border-b border-white/5" : "py-6 bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <BrandLogo variant="horizontal" height={36} className="hover:scale-105 transition-transform" />
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-white/70 hover:text-[#00e5ff] transition-colors">
              {l.label}
            </a>
          ))}
          <button onClick={openWaitlistModal} className="text-sm font-bold px-6 py-2.5 rounded-full bg-[#00e5ff] text-black hover:bg-white transition-all hover:scale-105 active:scale-95">
            Join Waitlist
          </button>
        </div>

        <button className="md:hidden text-white" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden mt-4 mx-6 p-6 rounded-2xl glass-card flex flex-col gap-5 border border-white/10">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-white/80 hover:text-[#00e5ff] font-medium text-lg">
              {l.label}
            </a>
          ))}
          <button onClick={openWaitlistModal} className="mt-2 w-full font-bold px-6 py-3 rounded-xl bg-[#00e5ff] text-black hover:bg-white transition-all">
            Join Waitlist
          </button>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 px-6 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 -left-64 w-96 h-96 bg-[#00e5ff]/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-[#9d4edd]/20 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Content */}
        <div className="text-left reveal">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-8 backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-[#39ff14] animate-pulse" />
            <span className="text-xs font-semibold tracking-wider text-white/90">BUILT FOR INDIAN BEGINNERS</span>
          </div>

          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.1] mb-6 tracking-tight">
            Stop restarting fitness. <br />
            <span className="gradient-text">Start playing it.</span>
          </h1>

          <p className="text-lg text-white/60 mb-10 max-w-lg leading-relaxed font-medium">
            Velrion is a gamified fitness consistency app. Hit daily missions, build streaks, earn XP, and stay accountable with squads. It's fitness, turned into a game.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button onClick={openWaitlistModal} className="group relative px-8 py-4 bg-[#00e5ff] text-black font-bold rounded-2xl overflow-hidden hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2">
              <span className="relative z-10 flex items-center gap-2">Join the Waitlist <ArrowRight size={20} /></span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
            </button>
          </div>

          <div className="mt-10 flex items-center gap-4 text-sm text-white/40 font-medium">
            <div className="flex -space-x-3">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-[#1a1c23] flex items-center justify-center overflow-hidden">
                  <UserCircle size={20} className="text-white/20" />
                </div>
              ))}
            </div>
            <p>Join 1,000+ others waiting</p>
          </div>
        </div>

        {/* Right Mockup */}
        <div className="relative reveal delay-200">
          <div className="relative mx-auto w-full max-w-[340px] aspect-[1/2] rounded-[40px] border-8 border-[#1a1c23] bg-background overflow-hidden shadow-2xl shadow-[#00e5ff]/10">
            {/* Phone Top Notch */}
            <div className="absolute top-0 inset-x-0 h-6 bg-[#1a1c23] rounded-b-3xl w-40 mx-auto z-20" />
            
            {/* App UI */}
            <div className="absolute inset-0 bg-[#0a0a0f] p-6 pt-12 flex flex-col gap-6 overflow-hidden">
              
              {/* Header */}
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-display font-bold text-xl">Level 12</h3>
                  <p className="text-[#00e5ff] text-sm font-bold">2,450 XP to Next</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                  <Flame className="text-[#ff5e00]" fill="currentColor" size={24} />
                  <span className="absolute -bottom-2 -right-1 bg-white text-black text-[10px] font-bold px-1.5 rounded-full border border-black">14</span>
                </div>
              </div>

              {/* Mission Board */}
              <div className="glass-card p-4 border-[#00e5ff]/30 bg-white/[0.02]">
                <div className="flex items-center gap-3 mb-4">
                  <Target className="text-[#00e5ff]" size={20} />
                  <h4 className="font-bold">Daily Missions</h4>
                </div>
                <div className="space-y-3">
                  {['Workout (45m)', '10k Steps', '120g Protein', 'Sleep 8h'].map((m, i) => (
                    <div key={m} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                      <span className="text-sm font-medium">{m}</span>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${i < 2 ? 'bg-[#39ff14] border-[#39ff14] text-black' : 'border-white/20'}`}>
                        {i < 2 && <CheckCircle size={14} strokeWidth={3} />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Squad Widget */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-[#9d4edd]/20 to-transparent border border-[#9d4edd]/30">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="text-[#9d4edd]" size={18} />
                  <span className="font-bold text-sm">Squad: Alpha Wolves</span>
                </div>
                <div className="flex gap-2">
                   <div className="flex-1 bg-white/10 h-2 rounded-full overflow-hidden mt-2">
                     <div className="h-full w-[70%] bg-[#9d4edd] rounded-full" />
                   </div>
                </div>
                <p className="text-xs text-white/50 mt-2">2nd place this week</p>
              </div>

            </div>
          </div>
          
          {/* Floating Elements */}
          <div className="absolute -right-12 top-20 glass-card p-4 flex items-center gap-3 border-[#39ff14]/30 animate-[bounce_4s_infinite]">
            <Trophy className="text-[#39ff14]" size={24} />
            <div>
              <p className="text-xs text-white/50 font-bold">New Badge</p>
              <p className="font-bold text-sm">Consistency King</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

function Problem() {
  const problems = [
    { title: "You quit after 3 days", desc: "Starting is easy. Staying consistent without a system is where you fail." },
    { title: "Boring trackers", desc: "Spreadsheets and generic habit apps feel like chores, not motivation." },
    { title: "Zero accountability", desc: "No one cares if you miss a workout. No social pressure to keep going." }
  ];

  return (
    <section className="py-24 px-6 relative bg-white/[0.01] border-y border-white/5">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16 reveal">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">Why you keep restarting</h2>
          <p className="text-white/50 max-w-2xl mx-auto text-lg">You don't lack motivation. You lack a system that makes fitness addictive.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {problems.map((p, i) => (
            <div key={i} className="glass-card p-8 text-center reveal" style={{ transitionDelay: `${i * 100}ms` }}>
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 text-white/40">
                <X size={24} />
              </div>
              <h3 className="font-bold text-xl mb-3 text-white/90">{p.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { icon: Crosshair, title: "1. Set Targets", desc: "Define your goal: fat loss, muscle gain, or general consistency." },
    { icon: Layers, title: "2. Daily Missions", desc: "Get actionable tasks for workout, protein, steps, and sleep." },
    { icon: Zap, title: "3. Earn XP & Streaks", desc: "Check in daily to build your streak and level up your profile." },
    { icon: Trophy, title: "4. Compete in Squads", desc: "Join small accountability pods and rank on the leaderboards." }
  ];

  return (
    <section id="how-it-works" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20 reveal">
          <div className="inline-block px-3 py-1 rounded-full border border-[#9d4edd]/30 bg-[#9d4edd]/10 text-[#9d4edd] text-xs font-bold tracking-widest uppercase mb-4">The Loop</div>
          <h2 className="font-display text-4xl md:text-5xl font-bold">How Velro works</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((s, i) => (
            <div key={i} className="relative reveal" style={{ transitionDelay: `${i * 100}ms` }}>
              {i !== steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-px bg-gradient-to-r from-white/20 to-transparent border-dashed" />
              )}
              <div className="w-16 h-16 rounded-2xl bg-[#0a0a0f] border border-white/10 flex items-center justify-center mb-6 relative z-10 shadow-lg shadow-black">
                <s.icon className="text-[#00e5ff]" size={28} />
              </div>
              <h3 className="font-bold text-xl mb-3">{s.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  const feats = [
    { icon: Target, title: "Daily Mission Board", desc: "Check off your daily workout, protein, steps, and sleep." },
    { icon: Flame, title: "XP, Levels & Streaks", desc: "Earn rewards for consistency and build streak pressure so you don't quit." },
    { icon: Users, title: "Squads / Pods", desc: "Get placed in small accountability groups with similar goals." },
    { icon: Activity, title: "Challenges", desc: "Join fitness challenges like 30-day protein challenge or workout streaks." },
    { icon: Trophy, title: "Leaderboards", desc: "Compare progress with others and stay motivated by competition." },
    { icon: TrendingUp, title: "Progress Dashboard", desc: "Track streaks, weight trends, and completion rates." }
  ];

  return (
    <section id="features" className="py-32 px-6 relative bg-[#0a0a0f]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 reveal">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">More than a tracker.<br/>An accountability engine.</h2>
          <p className="text-white/50 text-lg">Everything you need to stop quitting.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {feats.map((f, i) => (
            <div key={i} className="glass-card p-8 reveal hover:border-[#00e5ff]/50" style={{ transitionDelay: `${i * 50}ms` }}>
              <f.icon className="text-[#9d4edd] mb-6" size={32} />
              <h3 className="font-bold text-xl mb-3">{f.title}</h3>
              <p className="text-white/50 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Comparison() {
  return (
    <section className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16 reveal">
          <h2 className="font-display text-4xl md:text-5xl font-bold">Why it's different</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-10 rounded-[2rem] bg-white/5 border border-white/10 reveal">
            <h3 className="font-display text-2xl text-white/40 mb-8 line-through">Normal Fitness Apps</h3>
            <ul className="space-y-6">
              {['Random workouts', 'Boring trackers', 'No accountability', 'No social pressure', 'Easy to quit'].map((item) => (
                <li key={item} className="flex items-center gap-3 text-white/50">
                  <X className="text-red-500/50" size={20} /> {item}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="p-10 rounded-[2rem] bg-gradient-to-b from-[#00e5ff]/10 to-transparent border border-[#00e5ff]/30 reveal shadow-2xl shadow-[#00e5ff]/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Activity size={120} />
            </div>
            <h3 className="font-display text-3xl font-bold text-[#00e5ff] mb-8">Velrion</h3>
            <ul className="space-y-6 relative z-10">
              {['Daily missions', 'Streaks + XP', 'Challenge deadlines', 'Squads and competition', 'Consistency-focused system'].map((item) => (
                <li key={item} className="flex items-center gap-3 text-white font-medium">
                  <CheckCircle className="text-[#39ff14]" size={20} /> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Personas() {
  const personas = [
    { title: "The Restarter", desc: "You've started going to the gym 10 times but always quit by day 14." },
    { title: "Skinny-Fat Student", desc: "You want to build muscle and lose belly fat but lack structure." },
    { title: "Fat-loss Struggler", desc: "You know what to do, but you can't stay consistent with your diet and steps." },
  ];

  return (
    <section className="py-24 px-6 bg-[#0a0a0f]">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-4xl md:text-5xl font-bold text-center mb-16 reveal">Who is Velrion for?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {personas.map((p, i) => (
            <div key={i} className="glass-card p-8 reveal" style={{ transitionDelay: `${i * 100}ms` }}>
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-5">
                <UserCircle size={20} className="text-white/60" />
              </div>
              <h3 className="font-bold text-xl mb-3 text-white/90">{p.title}</h3>
              <p className="text-white/50 text-sm">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PaidCohort() {
  return (
    <section id="community" className="py-32 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#9d4edd]/5 to-transparent pointer-events-none" />
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="inline-block px-4 py-1.5 rounded-full border border-[#9d4edd] bg-[#9d4edd]/10 text-[#9d4edd] text-sm font-bold tracking-wider uppercase mb-8 reveal">
          Premium Offering
        </div>
        
        <h2 className="font-display text-4xl md:text-6xl font-bold mb-6 reveal">Join the next Velrion batch</h2>
        <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto reveal">
          30 days. One squad. One challenge. Real accountability with serious people.
        </p>

        <div className="grid sm:grid-cols-2 gap-6 text-left mb-12 reveal">
          {[
            'Monthly batch / cohort',
            'Small private squads',
            'One unified mission system',
            'Higher commitment, real results'
          ].map(item => (
            <div key={item} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="p-2 bg-[#9d4edd]/20 rounded-lg"><Star className="text-[#9d4edd]" size={16} /></div>
              <span className="font-medium text-white/80">{item}</span>
            </div>
          ))}
        </div>

        <button onClick={openWaitlistModal} className="px-10 py-5 bg-[#9d4edd] text-white font-bold text-lg rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-lg shadow-[#9d4edd]/30 reveal">
          Reserve your spot
        </button>
      </div>
    </section>
  );
}

function AppPreview() {
  return (
    <section className="py-32 px-6 overflow-hidden bg-[#050508]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 reveal">
          <h2 className="font-display text-4xl md:text-5xl font-bold">Inside the app</h2>
        </div>

        <div className="flex justify-center gap-8 px-4 flex-wrap md:flex-nowrap reveal">
          {/* Dashboard */}
          <div className="w-full md:w-1/3 aspect-[9/19] max-w-[300px] rounded-[2rem] bg-[#0f1115] border border-white/10 p-5 flex flex-col gap-4 shadow-2xl relative mt-0 md:mt-12 overflow-hidden hover:-translate-y-2 transition-transform duration-500">
             <div className="flex justify-between items-center mb-2">
               <div>
                 <div className="text-xs text-white/50 font-bold uppercase tracking-wider">Level 12</div>
                 <div className="font-display font-bold text-lg">Pro Athlete</div>
               </div>
               <div className="w-10 h-10 rounded-full bg-[#00e5ff]/20 flex items-center justify-center border border-[#00e5ff]/50 shadow-[0_0_15px_rgba(0,229,255,0.2)]">
                 <Trophy className="text-[#00e5ff]" size={20} />
               </div>
             </div>
             <div className="p-4 bg-gradient-to-br from-[#00e5ff]/20 to-[#00e5ff]/5 border border-[#00e5ff]/20 rounded-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-[#00e5ff]/20 blur-3xl rounded-full" />
               <div className="text-sm text-white/70 mb-1 relative z-10">Current Streak</div>
               <div className="text-3xl font-display font-bold text-[#00e5ff] flex items-center gap-2 relative z-10">
                 14 <Flame className="text-[#00e5ff]" size={24} />
               </div>
             </div>
             <div className="flex-1" />
             <div className="p-4 bg-white/5 rounded-2xl flex items-center justify-between border border-white/5">
               <div className="text-sm font-medium">Weekly XP</div>
               <div className="text-[#39ff14] font-bold">1,450</div>
             </div>
             <div className="p-4 bg-white/5 rounded-2xl flex items-center justify-between border border-white/5">
               <div className="text-sm font-medium">Next Level</div>
               <div className="text-white/50 text-sm">250 XP left</div>
             </div>
             <div className="text-center text-xs text-white/40 mt-2 font-bold uppercase tracking-widest">Dashboard</div>
          </div>
          
          {/* Mission */}
          <div className="w-full md:w-1/3 aspect-[9/19] max-w-[300px] rounded-[2rem] bg-[#0f1115] border border-[#9d4edd]/40 p-5 flex flex-col gap-4 shadow-[0_0_40px_rgba(157,78,221,0.15)] z-10 hover:-translate-y-2 transition-transform duration-500">
             <div className="text-center pb-3 border-b border-white/10">
               <div className="text-xs text-white/50 font-bold uppercase tracking-wider mb-1">Today</div>
               <div className="font-display font-bold text-xl">Daily Missions</div>
             </div>
             <div className="space-y-3 mt-2">
               {['Hit 10k Steps', 'Workout 45m', 'Eat 120g Protein', 'Sleep 8 Hours'].map((task, i) => (
                 <div key={i} className={`p-3 rounded-xl flex items-center justify-between border transition-colors ${i < 2 ? 'bg-[#39ff14]/10 border-[#39ff14]/30' : 'bg-white/5 border-white/10'}`}>
                   <span className={`text-sm font-medium ${i < 2 ? 'text-[#39ff14]' : 'text-white/70'}`}>{task}</span>
                   {i < 2 ? <CheckCircle size={18} className="text-[#39ff14]" /> : <div className="w-4 h-4 rounded-full border-2 border-white/20" />}
                 </div>
               ))}
             </div>
             <div className="flex-1" />
             <button className="h-12 w-full bg-[#39ff14] text-black font-bold rounded-xl flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(57,255,20,0.2)] hover:scale-[1.02] transition-transform">
               Check In <CheckCircle size={18} />
             </button>
             <div className="text-center text-xs text-white/40 mt-2 font-bold uppercase tracking-widest">Missions</div>
          </div>

          {/* Squad */}
          <div className="w-full md:w-1/3 aspect-[9/19] max-w-[300px] rounded-[2rem] bg-[#0f1115] border border-white/10 p-5 flex flex-col gap-4 shadow-2xl mt-0 md:mt-12 overflow-hidden hover:-translate-y-2 transition-transform duration-500">
             <div className="flex gap-3 items-center pb-4 border-b border-white/10">
               <div className="w-10 h-10 rounded-full bg-[#9d4edd]/20 flex items-center justify-center border border-[#9d4edd]/50 shadow-[0_0_15px_rgba(157,78,221,0.2)]">
                 <Users className="text-[#9d4edd]" size={20} />
               </div>
               <div>
                 <div className="font-bold text-sm">Alpha Squad</div>
                 <div className="text-xs text-[#9d4edd]">Rank #2 this week</div>
               </div>
             </div>
             <div className="mt-2 space-y-3">
               {[
                 { name: 'Alex M.', xp: '4,200', active: false },
                 { name: 'You', xp: '3,850', active: true },
                 { name: 'Sarah J.', xp: '3,100', active: false },
               ].map((u, i) => (
                 <div key={i} className={`p-3 rounded-xl flex items-center justify-between border ${u.active ? 'bg-white/10 border-white/20' : 'bg-white/5 border-transparent'}`}>
                   <div className="flex items-center gap-3">
                     <div className="text-white/40 text-xs font-bold w-4">{i + 1}</div>
                     <div className="w-8 h-8 rounded-full bg-gradient-to-br from-white/20 to-white/5" />
                     <span className="text-sm font-medium">{u.name}</span>
                   </div>
                   <span className="text-xs font-bold text-[#00e5ff]">{u.xp}</span>
                 </div>
               ))}
             </div>
             <div className="flex-1" />
             <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                <div className="text-xs text-white/60">Squad Goal Progress</div>
                <div className="h-1.5 w-full bg-white/10 rounded-full mt-2 overflow-hidden">
                   <div className="h-full w-[80%] bg-[#9d4edd] rounded-full" />
                </div>
             </div>
             <div className="text-center text-xs text-white/40 mt-2 font-bold uppercase tracking-widest">Leaderboard</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const faqs = [
    { q: "Is Velrion a workout app?", a: "No. Velrion is an accountability and consistency system. We give you missions, you do the work using your preferred routine, and check in here." },
    { q: "Do I need a gym?", a: "No. Your missions can be customized. If your goal is home workouts or just step counts, Velrion works perfectly." },
    { q: "Is it for beginners?", a: "Yes, it is designed specifically for beginners who struggle to stay consistent." },
    { q: "How do squads work?", a: "You are matched with a small group of users with similar goals. You compete on a private leaderboard and keep each other accountable." },
    { q: "What's included in the paid batch?", a: "The paid cohort gives you access to a premium squad, a strict 30-day challenge, and a highly serious environment." },
  ];

  return (
    <section id="faq" className="py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-display text-4xl md:text-5xl font-bold text-center mb-16 reveal">Questions?</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <details key={i} className="group glass-card p-6 reveal cursor-pointer" style={{ transitionDelay: `${i * 100}ms` }}>
              <summary className="flex justify-between items-center font-bold text-lg list-none text-white/90 group-open:text-[#00e5ff]">
                {faq.q}
                <ChevronDown className="transform group-open:rotate-180 transition-transform" size={20} />
              </summary>
              <p className="mt-4 text-white/50 leading-relaxed text-sm">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section id="cta" className="py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[#00e5ff]/5" />
      <div className="max-w-4xl mx-auto text-center relative z-10 glass-card p-12 md:p-20 border-[#00e5ff]/30 reveal">
        <h2 className="font-display text-5xl md:text-7xl font-bold mb-6">Stop restarting.<br/>Join Velrion.</h2>
        <p className="text-xl text-[#00e5ff] font-medium mb-12">Daily missions. Streaks. Squads. Accountability.</p>
        <button
          onClick={openWaitlistModal}
          className="px-10 py-5 bg-[#00e5ff] text-black font-bold text-lg rounded-2xl hover:bg-white hover:scale-105 active:scale-95 transition-all shadow-lg shadow-[#00e5ff]/30 flex items-center gap-2 mx-auto"
        >
          Join the Waitlist <ArrowRight size={20} />
        </button>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-white/10 bg-[#050508]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <BrandLogo variant="horizontal" height={30} />
        </div>
        
        <div className="flex gap-8 text-sm font-medium text-white/50">
          <a href="#" className="hover:text-white">Twitter</a>
          <a href="https://insta.openinapp.co/mi87s" target="_blank" rel="noopener noreferrer" className="hover:text-white">Instagram</a>
          <a href="mailto:velrionmedia@gmail.com" className="hover:text-white">Contact</a>
        </div>
        
        <div className="text-sm text-white/30">
          © {new Date().getFullYear()} Velrion. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Index() {
  useReveal();
  const { open, setOpen } = useWaitlistModal();
  return (
    <div className="relative min-h-screen bg-background text-foreground selection:bg-[#00e5ff]/30">
      {open && <WaitlistModal onClose={() => setOpen(false)} />}
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <HowItWorks />
        <Features />
        <Comparison />
        <Personas />
        <PaidCohort />
        <AppPreview />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
