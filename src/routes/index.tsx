import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  CheckCircle, Hammer, Paintbrush, Zap, Wrench,
  Home, ChefHat, Grid3X3, Star, ChevronDown,
  ArrowRight, Phone, User, MapPin, MessageCircle
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

/* ─────────────────────────────────────────
   Components
───────────────────────────────────────── */

function Background() {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none">
      <div className="absolute top-0 left-0 w-full h-full bg-navy" />
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-primary/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-orange-accent/10 rounded-full blur-[120px]" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(white 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />
    </div>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? "py-4 bg-navy/80 backdrop-blur-xl border-b border-white/10 shadow-2xl" : "py-8 bg-transparent"
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="text-2xl md:text-3xl font-black tracking-tighter text-white flex items-center gap-2">
          VELRION
        </div>
        <div className="hidden md:flex items-center gap-10">
          <a href="#how-it-works" className="text-sm font-bold text-white/60 hover:text-white transition-colors">Kaise Kaam Karta Hai?</a>
          <a href="#benefits" className="text-sm font-bold text-white/60 hover:text-white transition-colors">Fayde</a>
          <a href="#registration" className="px-7 py-3 bg-blue-primary text-white rounded-xl font-black hover:bg-blue-700 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-900/40">
            JOIN FREE
          </a>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  const [counts, setCounts] = useState({ contractors: 0, projects: 0 });
  const heroRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        let start = 0;
        const duration = 2000;
        const interval = setInterval(() => {
          start += 5;
          if (start <= 200) setCounts(prev => ({ ...prev, contractors: start }));
          if (start * 1000 <= 200000) setCounts(prev => ({ ...prev, projects: start * 1000 }));
          if (start >= 200) clearInterval(interval);
        }, 30);
      }
    }, { threshold: 0.5 });
    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={heroRef} className="relative pt-40 pb-24 px-6 min-h-screen flex items-center justify-center text-center">
      <div className="max-w-5xl mx-auto reveal">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
          <span className="flex h-2 w-2 rounded-full bg-orange-accent animate-pulse" />
          <span className="text-[10px] md:text-xs font-black tracking-[0.2em] text-white/80 uppercase">Delhi NCR's #1 Contractor App</span>
        </div>

        <h1 className="text-5xl md:text-8xl font-black mb-8 leading-[0.95] tracking-tight">
          Apka Kaam, <br />
          <span className="text-orange-accent">Hamari Reach</span>
        </h1>

        <p className="text-lg md:text-2xl text-white/50 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
          Delhi NCR ke verified contractors ke liye free platform — genuine customer leads, seedha aapke paas.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-5 justify-center mb-20">
          <a href="#registration" className="px-10 py-5 bg-blue-primary text-white font-black rounded-2xl text-xl hover:scale-105 transition-all shadow-2xl shadow-blue-900/40 flex items-center justify-center gap-3">
            Free Mein Join Karo <ArrowRight size={24} />
          </a>
          <a href="#how-it-works" className="px-10 py-5 bg-white/5 border border-white/10 text-white font-black rounded-2xl text-xl hover:bg-white/10 transition-all backdrop-blur-md">
            Kaise Kaam Karta Hai
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            { val: `${counts.contractors}+`, label: "Contractors Joined" },
            { val: `₹${(counts.projects/100000).toFixed(1)}L+`, label: "Avg Project Value" },
            { val: "Delhi NCR", label: "Active Region" }
          ].map((stat, i) => (
            <div key={i} className="glass-card p-8 rounded-3xl group hover:border-orange-accent/30 transition-all duration-500">
              <div className="text-4xl font-black text-orange-accent mb-2 group-hover:scale-110 transition-transform">{stat.val}</div>
              <div className="text-xs text-white/40 uppercase tracking-[0.2em] font-black">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  return (
    <div className="py-12 bg-black/40 border-y border-white/5 overflow-hidden whitespace-nowrap">
      <div className="flex gap-24 animate-marquee items-center">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex gap-24">
            <span className="text-2xl font-black text-white/10 uppercase tracking-[0.3em]">Verified Leads</span>
            <span className="text-2xl font-black text-white/10 uppercase tracking-[0.3em]">Zero Commission</span>
            <span className="text-2xl font-black text-white/10 uppercase tracking-[0.3em]">Direct Contact</span>
            <span className="text-2xl font-black text-white/10 uppercase tracking-[0.3em]">Delhi NCR Only</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function HowItWorks() {
  const steps = [
    { icon: User, title: "Profile Banao", desc: "Apna registration complete karein bilkul free, sirf 2 minute mein." },
    { icon: Zap, title: "Leads Payein", desc: "Aapke area aur kaam ke hisab se verified projects ki notification milegi." },
    { icon: Star, title: "Kaam Jeeto", desc: "Customer se direct baat karein, quote dein aur apna business badhayein." }
  ];

  return (
    <section id="how-it-works" className="py-40 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24 reveal">
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            Kaise Kaam <span className="text-orange-accent">Karta Hai?</span>
          </h2>
          <p className="text-white/40 text-lg max-w-xl mx-auto font-medium">Sirf 3 simple steps mein apna business badhayein.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-10">
          {steps.map((s, i) => (
            <div key={i} className="glass-card p-12 rounded-[2.5rem] reveal relative overflow-hidden group hover:bg-white/[0.08] transition-all duration-500">
              <div className="absolute -right-8 -top-8 text-[12rem] font-black text-white/[0.02] group-hover:text-blue-primary/10 transition-all duration-700">0{i+1}</div>
              <div className="w-20 h-20 bg-blue-primary rounded-3xl flex items-center justify-center mb-10 shadow-2xl shadow-blue-900/50 group-hover:rotate-6 transition-transform">
                <s.icon className="text-white" size={40} />
              </div>
              <h3 className="text-3xl font-black mb-6">{s.title}</h3>
              <p className="text-white/50 text-lg leading-relaxed font-medium">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Categories() {
  const cats = [
    { icon: Hammer, name: "Carpenter" },
    { icon: Paintbrush, name: "Painter" },
    { icon: Zap, name: "Electrician" },
    { icon: Wrench, name: "Plumber" },
    { icon: Home, name: "Interior Designer" },
    { icon: Grid3X3, name: "Civil Contractor" },
    { icon: ChefHat, name: "Modular Kitchen" },
    { icon: Star, name: "Tile & Flooring" }
  ];

  return (
    <section className="py-40 px-6 bg-black/30">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-black text-center mb-24 reveal">
          Kaun Join Kar <span className="text-orange-accent">Sakta Hai?</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {cats.map((c, i) => (
            <div key={i} className="glass-card p-10 rounded-3xl text-center hover:bg-blue-primary/10 hover:border-blue-primary transition-all duration-300 cursor-default reveal group">
              <c.icon className="mx-auto mb-6 text-blue-primary group-hover:scale-125 transition-transform duration-300" size={48} />
              <h4 className="font-black text-xl">{c.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Registration() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "007d77ca-1ca1-470e-8e35-c37d1dd77da2", // Bhai, yahan apni Web3Forms key daal dena
          ...data,
          subject: "New Velrion Contractor Registration - " + data.name
        })
      });
      if (res.ok) setStatus("success");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="registration" className="py-40 px-6 relative">
      <div className="max-w-3xl mx-auto reveal">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">Aaj Hi Join Karo — <span className="text-orange-accent">Bilkul Free</span></h2>
          <p className="text-white/40 text-xl font-medium">2 minute mein apni digital profile taiyar karein.</p>
        </div>

        <div className="glass-card p-8 md:p-16 rounded-[3rem] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-primary/10 blur-[100px] -z-10" />

          {status === "success" ? (
            <div className="text-center py-16 animate-in zoom-in-95 duration-500">
              <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-green-900/40">
                <CheckCircle className="text-white" size={48} />
              </div>
              <h3 className="text-4xl font-black mb-6 text-white">Dhanyawad!</h3>
              <p className="text-white/60 text-xl font-medium">Hamari team 24 ghante mein aapko call ya WhatsApp karegi.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-xs font-black text-white/40 uppercase tracking-widest ml-1">Pura Naam *</label>
                  <div className="relative">
                    <User className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20" size={20} />
                    <input name="name" required placeholder="e.g. Rajesh Singh" className="w-full bg-black/20 border border-white/10 rounded-2xl px-14 py-5 focus:border-blue-primary outline-none transition-all font-medium text-lg placeholder:text-white/10" />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-black text-white/40 uppercase tracking-widest ml-1">WhatsApp Number *</label>
                  <div className="relative">
                    <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20" size={20} />
                    <input name="phone" required pattern="[6789][0-9]{9}" placeholder="10-digit number" className="w-full bg-black/20 border border-white/10 rounded-2xl px-14 py-5 focus:border-blue-primary outline-none transition-all font-medium text-lg placeholder:text-white/10" />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-black text-white/40 uppercase tracking-widest ml-1">Trade Category *</label>
                <div className="relative">
                  <select name="category" required className="w-full bg-black/20 border border-white/10 rounded-2xl px-5 py-5 focus:border-blue-primary outline-none transition-all appearance-none font-medium text-lg text-white">
                    <option value="" className="bg-navy">-- Chunein --</option>
                    <option value="Carpenter" className="bg-navy">Carpenter</option>
                    <option value="Painter" className="bg-navy">Painter</option>
                    <option value="Electrician" className="bg-navy">Electrician</option>
                    <option value="Plumber" className="bg-navy">Plumber</option>
                    <option value="Interior Designer" className="bg-navy">Interior Designer</option>
                    <option value="Civil Contractor" className="bg-navy">Civil Contractor</option>
                    <option value="Modular Kitchen" className="bg-navy">Modular Kitchen</option>
                    <option value="Tile & Flooring" className="bg-navy">Tile & Flooring</option>
                  </select>
                  <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none" size={20} />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-black text-white/40 uppercase tracking-widest ml-1">Service Area / Pincode *</label>
                <div className="relative">
                  <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20" size={20} />
                  <input name="area" required placeholder="e.g. Laxmi Nagar, 110092" className="w-full bg-black/20 border border-white/10 rounded-2xl px-14 py-5 focus:border-blue-primary outline-none transition-all font-medium text-lg placeholder:text-white/10" />
                </div>
              </div>

              <button disabled={status === "loading"} className="w-full py-6 bg-blue-primary text-white font-black text-xl rounded-2xl hover:bg-blue-700 transition-all flex items-center justify-center gap-4 shadow-2xl shadow-blue-900/40 disabled:opacity-50 hover:scale-[1.02] active:scale-95">
                {status === "loading" ? "Registering..." : "Free Mein Register Karo →"}
              </button>

              <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-[10px] font-black text-white/30 uppercase tracking-[0.2em] pt-6">
                <span className="flex items-center gap-2"><CheckCircle className="text-blue-primary" size={14} /> Bilkul Free</span>
                <span className="flex items-center gap-2"><CheckCircle className="text-blue-primary" size={14} /> No Spam</span>
                <span className="flex items-center gap-2"><CheckCircle className="text-blue-primary" size={14} /> 2 Mins Setup</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const faqs = [
    { q: "Kya ye bilkul free hai?", a: "Haan, joining aur basic features bilkul free hain. Humara maqsad Delhi NCR ke contractors ko digital platform dena hai." },
    { q: "Kitne projects milenge?", a: "Ye aapke area aur category pe depend karta hai. Average hamare contractors ko mahine mein 3-5 verified leads milti hain." },
    { q: "Mujhe app download karni padegi?", a: "Nahi, abhi ke liye aap website se hi sara kaam kar sakte hain. Hamari mobile app jald hi launch hone wali hai." }
  ];

  return (
    <section className="py-40 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-black text-center mb-24 reveal">Sawal <span className="text-orange-accent">Jawab</span></h2>
        <div className="space-y-6">
          {faqs.map((f, i) => (
            <details key={i} className="group glass-card p-8 rounded-[2rem] cursor-pointer reveal transition-all hover:bg-white/[0.08]">
              <summary className="flex justify-between items-center font-black text-xl list-none text-white/80 group-open:text-orange-accent">
                {f.q}
                <ChevronDown className="transform group-open:rotate-180 transition-transform duration-300" size={24} />
              </summary>
              <p className="mt-6 text-white/40 text-lg leading-relaxed font-medium">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-24 px-6 border-t border-white/10 bg-black/40 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-primary via-orange-accent to-blue-primary opacity-50" />
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
        <div>
          <div className="text-3xl font-black tracking-tighter text-white mb-4">VELRION</div>
          <p className="text-white/40 text-lg font-medium">Delhi NCR ka #1 Contractor Marketplace</p>
        </div>
        <div className="flex gap-12 text-sm font-black text-white/40 uppercase tracking-widest">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
          <a href="#" className="hover:text-white transition-colors">Contact</a>
        </div>
        <div className="text-white/20 text-xs font-black tracking-widest">
          © 2025 VELRION | POWERED BY VELRION MEDIA
        </div>
      </div>
    </footer>
  );
}

function WhatsAppButton() {
  return (
    <a href="https://wa.me/918076538570" target="_blank" className="fixed bottom-8 right-8 w-16 h-16 md:w-20 md:h-20 bg-[#25D366] rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all z-[100] group active:scale-90">
      <MessageCircle className="text-white" size={36} />
      <span className="absolute right-24 bg-white text-black px-5 py-3 rounded-2xl font-black text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all shadow-2xl pointer-events-none translate-x-4 group-hover:translate-x-0">Baat Karein</span>
    </a>
  );
}

function MobileCTA() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 p-5 bg-navy/80 backdrop-blur-2xl border-t border-white/10 z-[90]">
      <a href="#registration" className="block w-full py-5 bg-blue-primary text-white text-center font-black rounded-2xl shadow-2xl text-lg active:scale-95 transition-all">JOIN FREE →</a>
    </div>
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
      { threshold: 0.1 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Index() {
  useReveal();
  return (
    <div className="min-h-screen bg-navy text-white selection:bg-orange-accent/30 font-sans">
      <Background />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <Marquee />
        <HowItWorks />
        <Categories />
        <Registration />
        <FAQ />
      </main>
      <Footer />
      <WhatsAppButton />
      <MobileCTA />
    </div>
  );
}
