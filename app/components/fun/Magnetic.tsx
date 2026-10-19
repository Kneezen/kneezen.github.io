'use client';

import { useRef } from 'react';

/** Wrapper that gently pulls its child toward the mouse cursor. Mouse only; touch is untouched. */
export default function Magnetic({ children, strength = 0.28 }: { children: React.ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || e.pointerType !== 'mouse') return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * strength;
    const y = (e.clientY - (r.top + r.height / 2)) * strength;
    el.style.transition = 'transform 120ms ease-out';
    el.style.transform = `translate(${x}px, ${y}px)`;
  };
  const reset = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = 'transform 700ms cubic-bezier(.16,1,.3,1)';
    el.style.transform = '';
  };

  return (
    <span ref={ref} onPointerMove={onMove} onPointerLeave={reset} className="inline-flex">
      {children}
    </span>
  );
}
