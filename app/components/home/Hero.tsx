'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowRight, Sparkles } from 'lucide-react';
import { PROFILE } from '../../data/profile';
import BackgroundVideo from '../ui/BackgroundVideo';
import NeuralField from './NeuralField';
import Scramble from './Scramble';
import RoleTicker from './RoleTicker';
import { asset } from '../../data/asset';

function useClock() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: PROFILE.timezone });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 15000);
    return () => window.clearInterval(id);
  }, []);
  return time;
}

const CTAS = [
  { href: '/about', label: 'About Me' },
  { href: '/cv', label: 'Curriculum Vitae' },
  { href: '/certifications', label: 'Certifications' },
];

export default function Hero() {
  const time = useClock();
  const stage = useRef<HTMLDivElement>(null);

  // The original site's cat lives on as a flashlight easter egg: move the cursor across the hero to find it.
  useEffect(() => {
    const el = stage.current;
    if (!el || !window.matchMedia('(pointer: fine)').matches) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        el.style.setProperty('--fx', `${e.clientX - r.left}px`);
        el.style.setProperty('--fy', `${e.clientY - r.top}px`);
        el.style.setProperty('--fr', '260px');
        el.dataset.flash = 'on';
      });
    };
    const onLeave = () => {
      el.style.setProperty('--fr', '0px');
      el.dataset.flash = 'off';
    };
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section aria-label="Introduction" className="relative px-3 pt-24 sm:px-5 sm:pt-28">
      <div
        ref={stage}
        className="relative isolate mx-auto flex min-h-[calc(100svh-7rem)] max-w-screen-2xl flex-col overflow-hidden rounded-[28px] border border-white/10 bg-[#070708] sm:rounded-[36px]"
        style={{ '--fx': '50%', '--fy': '50%', '--fr': '0px' } as React.CSSProperties}
      >
        <BackgroundVideo name="hero" opacity={0.55} fixed={false} />
        <NeuralField className="absolute inset-0 z-0 h-full w-full opacity-70" color="0, 229, 255" />

        {/* Cat flashlight */}
        <div
          aria-hidden
          className="cat-light pointer-events-none absolute inset-0 z-0 hidden bg-cover bg-center opacity-30"
          style={{
            backgroundImage: `url('${asset('/img/pacto-visual-cwozonsoh6q-unsplash-1600.webp')}')`,
            maskImage: 'radial-gradient(circle var(--fr) at var(--fx) var(--fy), #000 0%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(circle var(--fr) at var(--fx) var(--fy), #000 0%, transparent 100%)',
          }}
        />

        {/* Vignette and top glow */}
        <div aria-hidden className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#050505_95%)]" />
        <div aria-hidden className="pointer-events-none absolute -top-40 left-1/2 z-0 h-80 w-[60%] -translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl" />

        {/* Status rail */}
        <div className="relative z-10 flex items-center justify-between gap-4 border-b border-white/[0.07] px-5 py-4 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-400 sm:px-8 sm:text-xs">
          <span className="flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Status<span className="hidden sm:inline">{' // Live archive'}</span>
          </span>
          <span suppressHydrationWarning>
            {PROFILE.location}{' // '}{time || PROFILE.year}
          </span>
        </div>

        {/* Floating data labels, echoing the reference layout */}
        <div aria-hidden className="pointer-events-none absolute inset-0 z-10 hidden xl:block">
          {[
            { t: 'LLM // Training', s: 'Outlier', pos: 'left-[4%] top-[16%]' },
            { t: 'ELT // Pedagogy', s: 'TED University', pos: 'right-[4%] top-[16%]' },
            { t: 'Tech // Journalism', s: 'Technopat', pos: 'left-[4%] bottom-[16%]' },
            { t: 'Erasmus+ // 25–26', s: 'Mobility', pos: 'right-[4%] bottom-[16%]' },
          ].map((l, i) => (
            <div key={l.t} className={`animate-float absolute ${l.pos}`} style={{ animationDelay: `${i * 1.3}s` }}>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_#67e8f9]" />
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-neutral-300">{l.t}</span>
              </div>
              <span className="ml-3.5 font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-600">{l.s}</span>
            </div>
          ))}
        </div>

        {/* Centre stage */}
        <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-5 py-16 text-center sm:px-10">
          <Link
            href="/experience"
            className="glass mb-8 inline-flex items-center gap-2 rounded-full py-1.5 pl-1.5 pr-4 text-xs text-neutral-300 transition-colors hover:text-white"
          >
            <span className="rounded-full bg-white/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-cyan-200">Now</span>
            Training high-tier LLMs at Outlier
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>

          <h1 className="text-[clamp(3.2rem,13vw,11rem)] font-black leading-[0.88] tracking-[-0.06em] text-white">
            <Scramble text={PROFILE.name} delay={200} duration={1100} />
          </h1>

          <p className="mt-6 font-mono text-sm uppercase tracking-[0.2em] text-cyan-200/90 sm:text-base">
            <RoleTicker roles={PROFILE.roles} />
          </p>

          <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-neutral-400 sm:text-lg">{PROFILE.tagline}</p>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {CTAS.map((c, i) => (
              <Link
                key={c.href}
                href={c.href}
                className={`group inline-flex items-center gap-3 rounded-full px-6 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] transition-all duration-500 sm:text-xs ${
                  i === 0 ? 'bg-white text-black hover:shadow-[0_0_40px_-6px_rgba(255,255,255,0.6)]' : 'border border-white/20 text-white hover:border-white hover:bg-white hover:text-black'
                }`}
              >
                <span className={`h-1.5 w-1.5 rounded-full transition-colors duration-500 ${i === 0 ? 'bg-black' : 'bg-white group-hover:bg-black'}`} />
                {c.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent('companion:open'))}
              className="inline-flex items-center gap-2 rounded-full border border-[#FFB300]/40 px-5 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[#FFB300] transition-all duration-500 hover:bg-[#FFB300] hover:text-black sm:text-xs"
            >
              <Sparkles className="h-3.5 w-3.5" /> Ask my AI
            </button>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="relative z-10 grid grid-cols-1 items-center border-t border-white/[0.07] px-5 py-4 font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500 sm:grid-cols-3 sm:px-8">
          <span className="hidden sm:inline">Decode complexity // Encode clarity</span>
          <a href="#pillars" className="group flex items-center justify-center gap-3 transition-colors hover:text-white">
            Scroll
            <span className="relative block h-7 w-4 overflow-hidden rounded-full border border-white/20">
              <span className="animate-scroll-cue absolute left-1/2 top-1 h-2 w-0.5 -translate-x-1/2 rounded-full bg-white/70" />
            </span>
            <ArrowDown className="h-3 w-3 transition-transform group-hover:translate-y-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
