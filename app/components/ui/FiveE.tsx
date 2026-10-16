'use client';

import { useState } from 'react';
import type { FIVE_E_STAGES } from '../../data/profile';

/** Interactive 5E Instructional Architecture: hover or tap a stage to read it. */
export default function FiveE({ stages, accent }: { stages: typeof FIVE_E_STAGES; accent: string }) {
  const [active, setActive] = useState(0);
  return (
    <div className="space-y-4">
      <p className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-neutral-500">5E Instructional Architecture //</p>
      <div role="tablist" aria-label="5E stages" className="grid grid-cols-5 gap-1.5 sm:gap-2">
        {stages.map((s, i) => {
          const on = i === active;
          return (
            <button
              key={s.code}
              role="tab"
              type="button"
              aria-selected={on}
              aria-controls={`five-e-${i}`}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              className="relative overflow-hidden rounded-xl border px-2 py-3 text-left transition-all duration-500 ease-expo sm:px-4 sm:py-4"
              style={{ borderColor: on ? `${accent}80` : 'rgba(255,255,255,0.08)', background: on ? `${accent}14` : 'rgba(255,255,255,0.02)' }}
            >
              <span className="absolute inset-x-0 top-0 h-0.5 origin-left transition-transform duration-700 ease-expo" style={{ background: accent, transform: `scaleX(${i <= active ? 1 : 0})` }} />
              <span className="block font-mono text-[11px] font-bold tracking-[0.1em] sm:text-sm" style={{ color: accent }}>
                {s.code}
              </span>
              <span className={`mt-1 block truncate text-xs font-medium sm:text-sm ${on ? 'text-white' : 'text-neutral-400'}`}>{s.name}</span>
            </button>
          );
        })}
      </div>
      <div className="grid">
        {stages.map((s, i) => (
          <p
            key={s.code}
            id={`five-e-${i}`}
            role="tabpanel"
            className={`[grid-area:1/1] text-base leading-relaxed text-neutral-300 transition-all duration-500 ease-expo ${i === active ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-2 opacity-0'}`}
          >
            <span className="font-semibold text-white">{s.name}.</span> {s.desc}
          </p>
        ))}
      </div>
    </div>
  );
}
