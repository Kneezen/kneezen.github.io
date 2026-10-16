'use client';

import { useEffect, useRef } from 'react';

/** Paragraph whose words light up one by one as it scrolls through the viewport. */
export default function MissionScroll({ text, highlight }: { text: string; highlight: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = text.split(' ');
  const hiStart = text.indexOf(highlight);
  const starts = words.map((_, i) => words.slice(0, i).reduce((n, w) => n + w.length + 1, 0));
  const marked = words.map((w, i) => ({ w, hi: hiStart >= 0 && starts[i] >= hiStart && starts[i] < hiStart + highlight.length }));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const spans = Array.from(el.querySelectorAll<HTMLSpanElement>('[data-w]'));
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      spans.forEach((s) => (s.style.opacity = '1'));
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.35)));
      const lit = Math.floor(p * spans.length * 1.05);
      spans.forEach((s, i) => (s.style.opacity = i < lit ? '1' : '0.16'));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <p ref={ref} className="text-[1.65rem] font-medium leading-[1.3] tracking-[-0.025em] sm:text-4xl lg:text-[3.1rem]">
      {marked.map(({ w, hi }, i) => (
        <span key={i} data-w className={`transition-opacity duration-300 ${hi ? 'text-cyan-200' : 'text-white'}`} style={{ opacity: 0.16 }}>
          {w}{' '}
        </span>
      ))}
    </p>
  );
}
