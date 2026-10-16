'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { ACCENTS, MARQUEE_ITEMS, NAV, PROFILE } from '../../data/profile';

function useLocalTime() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: PROFILE.timezone });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);
  return time;
}

export default function SiteFooter() {
  const time = useLocalTime();
  const year = new Date().getFullYear();

  return (
    <footer className="no-print relative z-10 mt-24 border-t border-white/10 bg-[#050505]/80 backdrop-blur-xl">
      {/* Marquee (kept from the original home page) */}
      <div className="group relative overflow-hidden border-b border-white/10 py-5" aria-hidden>
        <div className="flex w-max whitespace-nowrap animate-marquee group-hover:[animation-play-state:paused]">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="mx-10 flex items-center gap-5 font-mono text-xs font-medium uppercase tracking-widest text-neutral-500 transition-colors duration-300 hover:text-white md:text-sm">
              {item} <span className="text-neutral-800">{'//'}</span>
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto grid max-w-screen-2xl gap-14 px-6 py-16 sm:px-8 md:grid-cols-12 md:px-16">
        <div className="md:col-span-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-neutral-500">Open channel</p>
          <a href={`mailto:${PROFILE.email}`} className="group mt-5 inline-flex flex-wrap items-baseline gap-x-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
            <span className="bg-gradient-to-r from-white to-white bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size] duration-700 ease-expo group-hover:bg-[length:100%_1px]">
              {PROFILE.email}
            </span>
            <ArrowUpRight className="h-7 w-7 text-neutral-500 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white" />
          </a>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-neutral-400">
            Talk AI language models, modern pedagogy, or simply say hello.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="glass rounded-full px-5 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-300 transition-colors hover:text-white">
              LinkedIn // Network
            </a>
            <a href={`mailto:${PROFILE.email}`} className="glass rounded-full px-5 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-300 transition-colors hover:text-white">
              Email // Direct channel
            </a>
          </div>
        </div>

        <nav aria-label="Footer" className="md:col-span-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-neutral-500">Index</p>
          <ul className="mt-5 space-y-2.5">
            {NAV.map((n, i) => (
              <li key={n.href}>
                <Link href={n.href} className="group flex items-center gap-3 text-sm text-neutral-400 transition-colors hover:text-white">
                  <span className="font-mono text-[10px] text-neutral-600">{String(i + 1).padStart(2, '0')}</span>
                  <span className="h-1 w-1 rounded-full transition-transform duration-300 group-hover:scale-[2]" style={{ backgroundColor: ACCENTS[n.accent] }} />
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-neutral-500">Base</p>
          <p className="mt-5 text-sm text-neutral-300">{PROFILE.locationFull}</p>
          <p className="mt-1 font-mono text-sm tabular-nums text-neutral-500" suppressHydrationWarning>
            {time || '--:--:--'} <span className="text-neutral-700">TRT</span>
          </p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="glass group mt-8 inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-xs text-neutral-400 transition-colors hover:text-white"
          >
            <ArrowUp className="h-3.5 w-3.5 transition-transform duration-500 group-hover:-translate-y-0.5" /> Back to top
          </button>
        </div>
      </div>

      <div className="mx-auto flex max-w-screen-2xl flex-col gap-2 border-t border-white/5 px-6 py-6 font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-600 sm:flex-row sm:items-center sm:justify-between sm:px-8 md:px-16">
        <span>© {year} {PROFILE.name}{' // All rights reserved'}</span>
        <span>
          {PROFILE.location}{' // '}{PROFILE.year} · END_TRANSMISSION
        </span>
      </div>
    </footer>
  );
}
