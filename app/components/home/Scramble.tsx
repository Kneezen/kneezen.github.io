'use client';

import { useEffect, useState } from 'react';

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZÖÇŞĞÜİ0123456789/<>_#';

/** Text that "decodes" from random glyphs into the real string (decode complexity, encode clarity). */
export default function Scramble({ text, delay = 0, duration = 1200, className = '' }: { text: string; delay?: number; duration?: number; className?: string }) {
  const [out, setOut] = useState(text);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    let start = 0;
    const tick = (t: number) => {
      if (!start) start = t + delay;
      const p = Math.min(1, Math.max(0, (t - start) / duration));
      const settled = Math.floor(p * text.length);
      setOut(
        text
          .split('')
          .map((ch, i) => (ch === ' ' || i < settled ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0]))
          .join('')
      );
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text, delay, duration]);

  return (
    <span className={className} aria-label={text}>
      <span aria-hidden>{out}</span>
    </span>
  );
}
