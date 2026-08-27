'use client';

import { useState, useEffect } from 'react';
import { 
  ExternalLink, 
  Code2, 
  Palette, 
  Database,
  Globe,
  Mail,
  ArrowRight,
  Star,
  Cpu,
  Layers,
  Sparkles,
  Terminal as TerminalIcon
} from 'lucide-react';
import Image from 'next/image';

// Component Imports
import Navbar from '@/components/Navbar';
import ContactForm from '@/components/ContactForm';
import InteractiveBackground from '@/components/InteractiveBackground';
import BuildConsole from '@/components/BuildConsole';
import BaklavaQueenSimulator from '@/components/BaklavaQueenSimulator';
import ThermostatSimulator from '@/components/ThermostatSimulator';
import NodeGraph from '@/components/NodeGraph';

const Github = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Linkedin = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

interface Skill {
  category: string;
  icon: React.ReactNode;
  technologies: string[];
}

export default function StackBuildr() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // 1. Scroll Progress Handler
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? (window.scrollY / scrollHeight) * 100 : 0;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // 2. IntersectionObserver for Reveal Animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-active');
            observer.unobserve(entry.target); // trigger once
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -30px 0px' }
    );

    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    revealElements.forEach((el) => {
      // Safely apply reveal-init styles only when JS runs on the client
      el.classList.add('reveal-init');
      observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const skills: Skill[] = [
    {
      category: "Frontend",
      icon: <Code2 className="w-5 h-5 text-purple-400" />,
      technologies: ["React 19", "Next.js", "TypeScript", "JavaScript", "HTML5 Canvas", "Tailwind CSS"]
    },
    {
      category: "Backend",
      icon: <Database className="w-5 h-5 text-cyan-400" />,
      technologies: ["Node.js", "Supabase", "REST APIs", "Firebase", "PostgreSQL", "SQL databases", "Java and Spring Boot"]
    },
    {
      category: "Design and layout",
      icon: <Palette className="w-5 h-5 text-pink-400" />,
      technologies: ["CSS animations", "Responsive design", "Glassmorphic styling", "Tailwind CSS"]
    },
    {
      category: "Tools",
      icon: <Globe className="w-5 h-5 text-emerald-400" />,
      technologies: ["Git and GitHub", "Square SDK", "Resend API", "Vercel", "Continuous deployment"]
    }
  ];

  return (
    <div className="relative min-h-screen text-white select-none selection:bg-purple-500/30 selection:text-white">
      {/* Interactive Canvas Background */}
      <InteractiveBackground />

      {/* Scroll Progress Indicator */}
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      {/* Floating Blueprint Grids */}
      <div className="absolute inset-0 grid-bg pointer-events-none z-0" />

      {/* Navigation Header */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 pt-16 pb-24 md:py-32 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Intro */}
        <div className="lg:col-span-6 space-y-6 animate-hero-fade">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-950/20 text-xs font-mono text-purple-300">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            I am currently accepting freelance work.
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight">
            Building the
            <span className="block mt-1 text-purple-400 glow-title">
              future stack
            </span>
            one build at a time.
          </h1>

          <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-lg">
            I am <strong className="text-white">Amber Parker</strong>, a full stack developer. I build websites and web applications using modern technologies. I focus on clean code and interactive designs.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <a 
              href="#projects" 
              className="px-6 py-3 rounded-xl bg-purple-500 hover:bg-purple-600 text-black font-mono text-xs font-bold transition-all flex items-center gap-1.5 interactive shadow-[0_0_15px_rgba(168,85,247,0.3)]"
            >
              Explore Projects <ArrowRight className="w-4 h-4" />
            </a>
            <a 
              href="#contact" 
              className="px-6 py-3 rounded-xl border border-zinc-700 bg-zinc-950/60 text-white font-mono text-xs hover:border-zinc-500 transition-colors flex items-center gap-1.5 interactive"
            >
              <Mail className="w-4 h-4" /> Connect
            </a>
          </div>

          <div className="flex items-center gap-4 pt-4">
            <a 
              href="https://github.com/ambxrp" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-zinc-500 hover:text-white transition-colors interactive"
              aria-label="GitHub Profile"
            >
              <Github className="w-5 h-5" />
            </a>
            <a 
              href="https://www.linkedin.com/in/amber-parker-2a3480229/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-zinc-500 hover:text-white transition-colors interactive"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Console Terminal */}
        <div className="lg:col-span-6 animate-hero-fade-delayed">
          <BuildConsole />
        </div>
      </section>

      {/* Projects Grid Section (Alternating Sides) */}
      <section id="projects" className="relative z-10 max-w-6xl mx-auto px-6 py-20 border-t border-zinc-900">
        <div className="text-center mb-20 reveal-on-scroll">
          <h2 className="text-3xl md:text-4xl font-bold font-mono tracking-wider flex justify-center items-center gap-2">
            <Layers className="w-6 h-6 text-purple-400" />
            Projects
          </h2>
          <p className="text-zinc-500 text-xs md:text-sm font-mono mt-2 uppercase tracking-widest">
            You can click on the cards to interact with the simulations.
          </p>
        </div>

        <div className="space-y-32">
          
          {/* Project 1: filmbysabryna.com */}
          <div className="max-w-3xl mx-auto space-y-5 reveal-on-scroll bg-zinc-950/20 border border-zinc-900/60 p-6 sm:p-8 rounded-2xl">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <h3 className="text-2xl font-bold font-mono">
                filmbysabryna.com
              </h3>
              <span className="text-[10px] bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 font-mono px-2 py-0.5 rounded">Live</span>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed">
              I built a clean photography portfolio website for photographer. It has a contact form, pricing menu with services, and handles high resolution image layouts smoothly.
            </p>
            <div className="flex flex-wrap gap-1.5 font-mono text-[10px]">
              {["Next.js", "React", "Tailwind CSS", "Vercel"].map(t => (
                <span key={t} className="px-2 py-0.5 bg-zinc-900 border border-zinc-800 rounded text-zinc-300">{t}</span>
              ))}
            </div>
            <ul className="space-y-1.5 font-mono text-xs text-zinc-500">
              <li className="flex items-center gap-2"><Star className="w-3.5 h-3.5 text-purple-400 shrink-0" /> Interactive camera shutter simulator</li>
              <li className="flex items-center gap-2"><Star className="w-3.5 h-3.5 text-purple-400 shrink-0" /> Clean thirty five millimeter film strip previews</li>
              <li className="flex items-center gap-2"><Star className="w-3.5 h-3.5 text-purple-400 shrink-0" /> Optimized search engine visibility and image loading</li>
            </ul>
            <div className="pt-2 flex gap-3">
              <a 
                href="https://filmbysabryna.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-mono flex items-center gap-1.5 interactive"
              >
                <ExternalLink className="w-3.5 h-3.5" /> Visit Site
              </a>
            </div>
          </div>

          {/* Project 2: Baklava Queen */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center reveal-on-scroll">
            <div className="lg:col-span-7 order-2 lg:order-1">
              <BaklavaQueenSimulator />
            </div>
            <div className="lg:col-span-5 space-y-5 order-1 lg:order-2">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <h3 className="text-2xl font-bold font-mono">
                  Baklava Queen
                </h3>
                <span className="text-[10px] bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 font-mono px-2 py-0.5 rounded">Live</span>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed">
                I built a website for Baklava Queen, a local bakery in Boerne, Texas. The stack uses Next.js, Supabase, and Square for payments.
              </p>
              <div className="flex flex-wrap gap-1.5 font-mono text-[10px]">
                {["Next.js", "Supabase", "Square API", "Resend API"].map(t => (
                  <span key={t} className="px-2 py-0.5 bg-zinc-900 border border-zinc-800 rounded text-zinc-300">{t}</span>
                ))}
              </div>
              <ul className="space-y-1.5 font-mono text-xs text-zinc-500">
                <li className="flex items-center gap-2"><Star className="w-3.5 h-3.5 text-cyan-400 shrink-0" /> Row level database security</li>
                <li className="flex items-center gap-2"><Star className="w-3.5 h-3.5 text-cyan-400 shrink-0" /> Square merchant payment integrations</li>
                <li className="flex items-center gap-2"><Star className="w-3.5 h-3.5 text-cyan-400 shrink-0" /> Automatic emails sent to owner and customer upon purchase</li>
              </ul>
              <div className="pt-2">
                <a 
                  href="https://baklavaqueen.store" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-mono inline-flex items-center gap-1.5 interactive"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> Visit Site
                </a>
              </div>
            </div>
          </div>

          {/* Project 3: AC & Heating */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center reveal-on-scroll">
            <div className="lg:col-span-5 space-y-5 lg:order-1">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <h3 className="text-2xl font-bold font-mono">
                  A+ Air Conditioning & Heating
                </h3>
                <span className="text-[10px] bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 font-mono px-2 py-0.5 rounded">Live</span>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed">
                I built a website for A+ Air Conditioning & Heating, a local air conditioning and heating company in San Antonio, Texas.
              </p>
              <div className="flex flex-wrap gap-1.5 font-mono text-[10px]">
                {["Next.js", "React", "Tailwind CSS", "Map"].map(t => (
                  <span key={t} className="px-2 py-0.5 bg-zinc-900 border border-zinc-800 rounded text-zinc-300">{t}</span>
                ))}
              </div>
              <ul className="space-y-1.5 font-mono text-xs text-zinc-500">
                <li className="flex items-center gap-2"><Star className="w-3.5 h-3.5 text-amber-500 shrink-0" /> Thermostat simulator dial</li>
                <li className="flex items-center gap-2"><Star className="w-3.5 h-3.5 text-amber-500 shrink-0" /> Custom map integration for service area</li>
                <li className="flex items-center gap-2"><Star className="w-3.5 h-3.5 text-amber-500 shrink-0" /> Clean mobile friendly website</li>
              </ul>
              <div className="pt-2">
                <a 
                  href="https://aplsac.us" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-mono inline-flex items-center gap-1.5 interactive"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> Visit Site
                </a>
              </div>
            </div>
            <div className="lg:col-span-7 lg:order-2">
              <ThermostatSimulator />
            </div>
          </div>

          {/* Project 4: StackBuildr Portfolio */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center reveal-on-scroll">
            <div className="lg:col-span-7 order-2 lg:order-1">
              <NodeGraph />
            </div>
            <div className="lg:col-span-5 space-y-5 order-1 lg:order-2">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <h3 className="text-2xl font-bold font-mono">
                  StackBuildr Portfolio
                </h3>
                <span className="text-[10px] bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 font-mono px-2 py-0.5 rounded">Live</span>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed">
                This is my personal portfolio website. I built it to showcase my projects and play around with interactive animations.
              </p>
              <div className="flex flex-wrap gap-1.5 font-mono text-[10px]">
                {["Next.js", "React", "HTML5 Canvas", "Lucide Icons"].map(t => (
                  <span key={t} className="px-2 py-0.5 bg-zinc-900 border border-zinc-800 rounded text-zinc-300">{t}</span>
                ))}
              </div>
              <ul className="space-y-1.5 font-mono text-xs text-zinc-500">
                <li className="flex items-center gap-2"><Star className="w-3.5 h-3.5 text-purple-400 shrink-0" /> Particle constellation background</li>
                <li className="flex items-center gap-2"><Star className="w-3.5 h-3.5 text-purple-400 shrink-0" /> Simulated terminal console</li>
                <li className="flex items-center gap-2"><Star className="w-3.5 h-3.5 text-purple-400 shrink-0" /> Custom interactive cursor follower</li>
              </ul>
              <div className="pt-2">
                <a 
                  href="https://github.com/ambxrp/stackbuildr-freelance" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-mono inline-flex items-center gap-1.5 interactive"
                >
                  <Github className="w-3.5 h-3.5" /> Source Code
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="relative z-10 max-w-6xl mx-auto px-6 py-20 border-t border-zinc-900">
        <div className="text-center mb-16 reveal-on-scroll">
          <h2 className="text-3xl md:text-4xl font-bold font-mono tracking-wider flex justify-center items-center gap-2">
            <TerminalIcon className="w-6 h-6 text-cyan-400" />
            Skills
          </h2>
          <p className="text-zinc-500 text-xs md:text-sm font-mono mt-2 uppercase tracking-widest">
            These are the technologies and tools I use to build my web projects.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, idx) => (
            <div 
              key={skill.category}
              style={{ transitionDelay: `${idx * 0.05}s` }}
              className="reveal-on-scroll bg-zinc-950/40 border border-zinc-900 rounded-2xl p-6 glow-purple hover:border-purple-500/40 hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-zinc-900/80 border border-zinc-800 group-hover:scale-110 transition-transform">
                  {skill.icon}
                </div>
                <h3 className="text-sm font-bold font-mono tracking-wider text-white uppercase">{skill.category}</h3>
              </div>

              <div className="space-y-2">
                {skill.technologies.map(tech => (
                  <div 
                    key={tech}
                    className="font-mono text-xs text-zinc-400 py-1.5 px-3 bg-zinc-950/80 border border-zinc-900/60 rounded-lg group-hover:text-zinc-200 transition-colors"
                  >
                    {tech}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Profile Picture Highlight Card */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 py-12 reveal-on-scroll">
        <div className="bg-zinc-950/40 border border-purple-500/10 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8 shadow-xl">
          <div className="relative w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden border-2 border-purple-500/30 p-1 bg-black/60 shadow-[0_0_20px_rgba(168,85,247,0.2)] shrink-0">
            <div className="w-full h-full rounded-full overflow-hidden bg-zinc-900 relative">
              <Image 
                src="/amber-photo.png" 
                alt="Amber Parker Profile" 
                fill
                sizes="(max-width: 768px) 128px, 144px"
                className="object-cover object-top hover:scale-110 transition-transform duration-500"
              />
            </div>
          </div>
          <div className="space-y-3 text-center md:text-left">
            <h4 className="text-2xl font-bold font-mono text-white">Amber Parker</h4>
            <p className="text-purple-400 font-mono text-xs uppercase tracking-widest">Full Stack Developer</p>
            <p className="text-zinc-400 text-sm leading-relaxed font-sans max-w-xl">
              I study computer science and build web applications. I like working with Next.js, Supabase, Resend, Cloudfare, and much more. I am always trying to learn new coding frameworks and technologies. I love working on new projects!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative z-10 max-w-4xl mx-auto px-6 py-20 border-t border-zinc-900 reveal-on-scroll">
        <div className="bg-zinc-950/40 border border-purple-500/15 rounded-3xl p-8 md:p-12 shadow-xl glow-cyan">
          <div className="text-center mb-10 space-y-2">
            <h2 className="text-3xl font-bold font-mono tracking-tight text-white flex justify-center items-center gap-2">
              <Mail className="w-6 h-6 text-cyan-400 animate-pulse" />
              Contact
            </h2>
            <p className="text-zinc-400 text-xs md:text-sm max-w-md mx-auto">
              Send me a message if you want to work together on a project.
            </p>
          </div>

          <div className="max-w-md mx-auto">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-zinc-900 py-12">
        <div className="max-w-6xl mx-auto px-6 text-center space-y-4">
          <div className="flex justify-center items-center gap-2 select-none">
            <Cpu className="w-5 h-5 text-purple-400 animate-pulse" />
            <span className="text-2xl font-bold tracking-wider led-font led-text">
              stackbuildr
            </span>
          </div>
          <p className="text-xs text-zinc-600 font-mono">
            DESIGNED & COMPILED BY AMBER PARKER // {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}