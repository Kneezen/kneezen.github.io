'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { ACCENTS, TIMELINE } from '../../data/profile';
import Img from '../ui/Img';
import { Tag } from '../ui/Bits';

const ACCENT = ACCENTS.cyan;

export default function ExperienceTabs() {
  const [active, setActive] = useState(0);
  const entry = TIMELINE[active];

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <div role="tablist" aria-label="Roles" aria-orientation="vertical" className="flex gap-2 overflow-x-auto scrollbar-hide lg:col-span-4 lg:flex-col">
        {TIMELINE.map((t, i) => {
          const on = i === active;
          return (
            <button
              key={t.id}
              role="tab"
              type="button"
              id={`exp-tab-${t.id}`}
              aria-selected={on}
              aria-controls="exp-panel"
              onClick={() => setActive(i)}
              className={`group relative min-w-[230px] shrink-0 overflow-hidden rounded-2xl border p-5 text-left transition-all duration-500 ease-expo lg:min-w-0 ${on ? 'border-cyan-300/40 bg-cyan-300/[0.06]' : 'border-white/10 bg-white/[0.02] hover:border-white/20'}`}
            >
              <span className="absolute inset-y-0 left-0 w-0.5 origin-top transition-transform duration-700 ease-expo" style={{ background: ACCENT, transform: `scaleY(${on ? 1 : 0})` }} />
              <span className="flex items-center justify-between gap-3">
                <span className={`text-lg font-semibold tracking-tight ${on ? 'text-white' : 'text-neutral-300'}`}>{t.company}</span>
                {t.status === 'ACTIVE' && <span className="h-1.5 w-1.5 animate-pulse rounded-full" style={{ backgroundColor: ACCENT }} />}
              </span>
              <span className="mt-1 block text-sm text-neutral-500">{t.role}</span>
              <span className="mt-3 block font-mono text-[11px] uppercase tracking-[0.15em] text-neutral-500">{t.period}</span>
            </button>
          );
        })}
      </div>

      <div id="exp-panel" role="tabpanel" aria-labelledby={`exp-tab-${entry.id}`} className="glass relative overflow-hidden rounded-3xl lg:col-span-8">
        <div key={entry.id} className="grid animate-[lightboxImageIn_600ms_var(--ease-expo)_both] md:grid-cols-5">
          <div className="space-y-6 p-7 sm:p-9 md:col-span-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em]" style={{ color: ACCENT }}>
              {entry.tag}
            </p>
            <p className="text-[15px] leading-[1.8] text-neutral-300 sm:text-base">{entry.content}</p>
            <div className="flex flex-wrap gap-2">
              {entry.metrics.map((m) => (
                <Tag key={m} accent={ACCENT}>
                  {m}
                </Tag>
              ))}
            </div>
            <Link href={`/experience#${entry.id}`} className="group inline-flex items-center gap-2 text-sm font-medium text-white">
              Full log
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="flex flex-col justify-center gap-4 border-t border-white/5 bg-black/30 p-6 md:col-span-2 md:border-l md:border-t-0">
            {entry.media.map((m) => (
              <div key={m.src} className="overflow-hidden rounded-xl border border-white/10 bg-black/40">
                <Img src={m.src} alt={m.alt} sizes="(min-width: 1024px) 25vw, 100vw" className="h-auto w-full object-contain" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
