import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Menu, X, Instagram, Mail, ArrowRight, Sparkles, Users, Target,
  BarChart3, Megaphone, Video, Handshake, TrendingUp, Award,
  ShieldCheck, Heart, Zap, FileText, UserCheck, Rocket,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

const CREATOR_FORM = "https://docs.google.com/forms/d/17RI1Ta7Xb5aDlQZHpwM6ng76HFMSBUw5fL8jlcMhvo8/edit?usp=forms_home&ouid=102656956247665461918&ths=true";
const BRAND_FORM = "https://docs.google.com/forms/d/1Ohi85Ti5AgKYrv1b101Wg3Lj90wDeiUxne7YwXrHYKE/edit?usp=forms_home&ouid=102656956247665461918&ths=true";
const INSTAGRAM_URL = "https://www.instagram.com/velrionmedia/";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3 backdrop-blur-xl bg-background/70 border-b border-[oklch(0.78_0.13_85/0.15)]" : "py-6 bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#home" className="font-display text-2xl tracking-wide">
          <span className="gradient-gold-text font-semibold">Velrion</span>
          <span className="text-foreground/90 ml-1.5 font-light">Media</span>
        </a>

        <div className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-muted-foreground hover:text-gold transition-colors tracking-wide">
              {l.label}
            </a>
          ))}
          <a href={CREATOR_FORM} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-gold transition-colors tracking-wide">
            Join as Creator
          </a>
          <a href={BRAND_FORM} target="_blank" rel="noopener noreferrer" className="text-sm px-5 py-2 rounded-full border border-gold text-gold hover:bg-gold hover:text-primary-foreground transition-all">
            Join as Brand
          </a>
        </div>

        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden mt-4 mx-6 p-6 rounded-2xl glass-card flex flex-col gap-4">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-foreground/80 hover:text-gold">
              {l.label}
            </a>
          ))}
          <a href={CREATOR_FORM} target="_blank" rel="noopener noreferrer" className="text-foreground/80 hover:text-gold">Join as Creator</a>
          <a href={BRAND_FORM} target="_blank" rel="noopener noreferrer" className="text-gold">Join as Brand</a>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
      <div className="absolute inset-0" style={{ background: "var(--gradient-radial-gold)" }} />
      <div className="grain-overlay" />

      {/* Particles */}
      {Array.from({ length: 18 }).map((_, i) => (
        <span
          key={i}
          className="particle"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 6}s`,
            animationDuration: `${5 + Math.random() * 6}s`,
          }}
        />
      ))}

      <div className="relative max-w-5xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/30 bg-gold/5 mb-8 reveal">
          <Sparkles size={14} className="text-gold" />
          <span className="text-xs tracking-[0.2em] uppercase text-gold/90">Where Fitness Meets Influence</span>
        </div>

        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-light leading-[1.05] mb-6 reveal">
          India's Premier
          <br />
          <span className="gradient-gold-text italic">Fitness Influencer</span>
          <br />
          Network
        </h1>

        <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-10 reveal">
          We connect fitness creators with brands that match their vision — building campaigns that move audiences and revenue.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center reveal">
          <a
            href={CREATOR_FORM}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gold text-primary-foreground font-medium hover:shadow-[0_0_40px_oklch(0.78_0.13_85/0.55)] transition-all"
          >
            Join as Creator
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href={BRAND_FORM}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-gold/50 text-gold hover:bg-gold/10 transition-all"
          >
            Partner as Brand
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}

function About() {
  const stats = [
    { num: "50+", label: "Creators" },
    { num: "20+", label: "Brands" },
    { num: "5M+", label: "Combined Reach" },
    { num: "100+", label: "Campaigns" },
  ];
  return (
    <section id="about" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20 reveal">
          <p className="text-xs tracking-[0.3em] uppercase text-gold mb-4">About Us</p>
          <h2 className="font-display text-4xl md:text-6xl font-light leading-tight max-w-3xl mx-auto">
            A boutique agency built for the <span className="italic gradient-gold-text">fitness era</span>.
          </h2>
          <p className="text-muted-foreground mt-6 max-w-2xl mx-auto">
            Velrion Media is India's specialised fitness influencer agency — pairing disciplined creators with ambitious brands. We craft campaigns rooted in performance, aesthetics, and trust.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.label} className="reveal glass-card p-8 text-center">
              <div className="font-display text-4xl md:text-5xl gradient-gold-text mb-2">{s.num}</div>
              <div className="text-sm text-muted-foreground tracking-wide">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  const services = [
    { icon: Megaphone, title: "Influencer Marketing Campaigns", desc: "Full-funnel creator campaigns engineered for reach, engagement, and conversion." },
    { icon: Video, title: "UGC Content Creation", desc: "Authentic, high-performing user-generated content from vetted fitness creators." },
    { icon: Handshake, title: "Brand & Creator Matchmaking", desc: "We pair brands with creators whose audience and ethos align perfectly." },
    { icon: Target, title: "Campaign Strategy & Execution", desc: "From concept to delivery — handled end-to-end by our in-house team." },
    { icon: BarChart3, title: "Performance Reporting", desc: "Transparent dashboards covering reach, engagement, and ROI." },
    { icon: TrendingUp, title: "Social Media Growth", desc: "Strategic content frameworks that compound creator reach over time." },
  ];
  return (
    <section id="services" className="relative py-32 px-6 bg-[oklch(0.1_0.006_60)]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 reveal">
          <p className="text-xs tracking-[0.3em] uppercase text-gold mb-4">Services</p>
          <h2 className="font-display text-4xl md:text-6xl font-light max-w-3xl mx-auto">
            Everything your <span className="italic gradient-gold-text">campaign</span> needs.
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <div key={s.title} className="reveal glass-card p-8">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gold/10 border border-gold/20 mb-6">
                <s.icon className="text-gold" size={22} />
              </div>
              <h3 className="font-display text-2xl mb-3">{s.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const creator = [
    { icon: FileText, title: "Fill the form", desc: "Apply through our short creator application." },
    { icon: UserCheck, title: "Get onboarded", desc: "Our team reviews, onboards, and positions you." },
    { icon: Rocket, title: "Start getting brand deals", desc: "We bring matched brand collaborations to you." },
  ];
  const brand = [
    { icon: FileText, title: "Share your brief", desc: "Tell us your goals, audience, and budget." },
    { icon: Handshake, title: "We match you with creators", desc: "We curate the right roster for your campaign." },
    { icon: Rocket, title: "Campaign goes live", desc: "We execute, monitor, and report end-to-end." },
  ];

  const Step = ({ step, icon: Icon, title, desc }: { step: number; icon: any; title: string; desc: string }) => (
    <div className="reveal glass-card p-8 relative">
      <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gold text-primary-foreground font-display text-xl flex items-center justify-center shadow-[var(--shadow-gold-sm)]">
        {step}
      </div>
      <Icon className="text-gold mb-5 mt-2" size={28} />
      <h4 className="font-display text-2xl mb-2">{title}</h4>
      <p className="text-muted-foreground text-sm">{desc}</p>
    </div>
  );

  return (
    <section className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto space-y-24">
        <div>
          <div className="text-center mb-16 reveal">
            <p className="text-xs tracking-[0.3em] uppercase text-gold mb-4">For Creators</p>
            <h2 className="font-display text-4xl md:text-5xl font-light">From application to <span className="italic gradient-gold-text">paid deals</span></h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {creator.map((s, i) => <Step key={s.title} step={i + 1} {...s} />)}
          </div>
        </div>

        <div>
          <div className="text-center mb-16 reveal">
            <p className="text-xs tracking-[0.3em] uppercase text-gold mb-4">For Brands</p>
            <h2 className="font-display text-4xl md:text-5xl font-light">From brief to <span className="italic gradient-gold-text">campaign live</span></h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {brand.map((s, i) => <Step key={s.title} step={i + 1} {...s} />)}
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyVelrion() {
  const points = [
    { icon: Award, title: "Fitness Niche Experts", desc: "We live in this category. We know what converts." },
    { icon: ShieldCheck, title: "End-to-End Management", desc: "Strategy, creators, content, reporting — all in-house." },
    { icon: BarChart3, title: "Transparent Reporting", desc: "Real numbers. Real dashboards. No vanity metrics." },
    { icon: Heart, title: "Creator-First Approach", desc: "Long-term relationships, not transactional gigs." },
  ];
  return (
    <section className="relative py-32 px-6 bg-[oklch(0.1_0.006_60)]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 reveal">
          <p className="text-xs tracking-[0.3em] uppercase text-gold mb-4">Why Velrion</p>
          <h2 className="font-display text-4xl md:text-6xl font-light">Built different. <span className="italic gradient-gold-text">On purpose.</span></h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {points.map((p) => (
            <div key={p.title} className="reveal glass-card p-8">
              <p.icon className="text-gold mb-5" size={26} />
              <h4 className="font-display text-xl mb-2">{p.title}</h4>
              <p className="text-muted-foreground text-sm">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const items = [
    { name: "Arjun Mehra", role: "Fitness Creator · 480K", quote: "Velrion landed me three brand deals in my first month. They actually understand creators." },
    { name: "Nutrabuilt", role: "Sports Nutrition Brand", quote: "ROI was 4.2x on our launch campaign. The creator selection was surgical." },
    { name: "Riya Kapoor", role: "Pilates Coach · 220K", quote: "Finally an agency that treats fitness creators with the seriousness we deserve." },
  ];
  const brands = ["NUTRABUILT", "IRONFORGE", "PROTEINX", "FLEXCO", "ALPHA WHEY", "MOVE/WEAR"];
  return (
    <section className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 reveal">
          <p className="text-xs tracking-[0.3em] uppercase text-gold mb-4">Social Proof</p>
          <h2 className="font-display text-4xl md:text-5xl font-light">Trusted by creators & brands</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {items.map((t) => (
            <div key={t.name} className="reveal glass-card p-8">
              <div className="text-gold text-2xl font-display mb-4">"</div>
              <p className="text-foreground/90 mb-6 leading-relaxed">{t.quote}</p>
              <div className="border-t border-gold/20 pt-4">
                <div className="font-medium">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="reveal flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-60">
          {brands.map((b) => (
            <span key={b} className="font-display text-xl tracking-[0.2em] text-muted-foreground hover:text-gold transition-colors">
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function JoinUs() {
  return (
    <section className="relative py-32 px-6 bg-[oklch(0.1_0.006_60)]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 reveal">
          <p className="text-xs tracking-[0.3em] uppercase text-gold mb-4">Join Us</p>
          <h2 className="font-display text-4xl md:text-6xl font-light">
            Pick your <span className="italic gradient-gold-text">side</span>.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="reveal glass-card p-10 lg:p-14 text-center">
            <Users className="text-gold mx-auto mb-6" size={36} />
            <h3 className="font-display text-3xl md:text-4xl mb-4">For Creators</h3>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Get paired with fitness brands that fit your audience. Reliable deals, real money, real growth.
            </p>
            <a
              href={CREATOR_FORM}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gold text-primary-foreground font-medium hover:shadow-[0_0_40px_oklch(0.78_0.13_85/0.55)] transition-all"
            >
              Join as Creator <ArrowRight size={18} />
            </a>
          </div>

          <div className="reveal glass-card p-10 lg:p-14 text-center">
            <Zap className="text-gold mx-auto mb-6" size={36} />
            <h3 className="font-display text-3xl md:text-4xl mb-4">For Brands</h3>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Run influencer campaigns that actually move the needle. Vetted creators, end-to-end execution.
            </p>
            <a
              href={BRAND_FORM}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-gold text-gold hover:bg-gold hover:text-primary-foreground transition-all"
            >
              Partner with Us <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="relative py-32 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-xs tracking-[0.3em] uppercase text-gold mb-4 reveal">Contact</p>
        <h2 className="font-display text-4xl md:text-6xl font-light mb-8 reveal">
          Let's <span className="italic gradient-gold-text">talk</span>.
        </h2>
        <p className="text-muted-foreground mb-10 reveal">
          Whether you're a creator ready to scale or a brand ready to launch — we're one message away.
        </p>
        <div className="reveal flex flex-col sm:flex-row items-center justify-center gap-6">
          <a
            href="mailto:velrionmedia@gmail.com"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full glass-card text-foreground hover:text-gold"
          >
            <Mail size={18} className="text-gold" />
            velrionmedia@gmail.com
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 py-4 rounded-full glass-card text-foreground hover:text-gold"
            aria-label="Instagram"
          >
            <Instagram size={18} className="text-gold" />
            Instagram
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative border-t border-gold/15 py-14 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-center md:text-left">
          <div className="font-display text-2xl">
            <span className="gradient-gold-text font-semibold">Velrion</span>
            <span className="text-foreground/90 ml-1.5 font-light">Media</span>
          </div>
          <p className="text-xs text-muted-foreground tracking-wider mt-1">Where Fitness Meets Influence</p>
        </div>

        <div className="flex items-center gap-6">
          <a href="mailto:velrionmedia@gmail.com" className="text-muted-foreground hover:text-gold transition-colors" aria-label="Email">
            <Mail size={18} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-gold transition-colors" aria-label="Instagram">
            <Instagram size={18} />
          </a>
        </div>

        <div className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Velrion Media. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

function CursorGlow() {
  useEffect(() => {
    const el = document.createElement("div");
    el.className = "cursor-glow";
    document.body.appendChild(el);
    const move = (e: MouseEvent) => {
      el.style.left = e.clientX + "px";
      el.style.top = e.clientY + "px";
    };
    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
      el.remove();
    };
  }, []);
  return null;
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
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Index() {
  useReveal();
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <CursorGlow />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <HowItWorks />
        <WhyVelrion />
        <Testimonials />
        <JoinUs />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
