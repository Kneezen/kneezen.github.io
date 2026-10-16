'use client';

import { useEffect, useRef } from 'react';

/** Vertical line that fills with the accent colour as its parent scrolls through the viewport. */
export default function ScrollRail({ accent, className = '' }: { accent: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const fill = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current?.parentElement;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh * 0.6 - r.top) / r.height));
      if (fill.current) fill.current.style.transform = `scaleY(${p})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} aria-hidden className={`absolute bottom-0 top-0 w-px bg-white/10 ${className}`}>
      <div ref={fill} className="absolute inset-0 origin-top" style={{ transform: 'scaleY(0)', background: `linear-gradient(to bottom, ${accent}, ${accent}55)`, boxShadow: `0 0 12px ${accent}` }} />
    </div>
  );
}
