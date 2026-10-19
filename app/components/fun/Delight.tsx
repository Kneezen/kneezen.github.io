'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { PAW_SVG, RunningCat } from './Cats';

const KONAMI = ['arrowup', 'arrowup', 'arrowdown', 'arrowdown', 'arrowleft', 'arrowright', 'arrowleft', 'arrowright', 'b', 'a'];
const SPARK_COLORS = ['#00E5FF', '#AEEA00', '#D500F7', '#FFB300', '#ECEFF1'];

export const startParade = () => window.dispatchEvent(new CustomEvent('egg:parade'));

const isTyping = (t: EventTarget | null) =>
  t instanceof HTMLElement && (t.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(t.tagName));

/**
 * Site-wide playful layer: scroll progress, click sparks and three hidden easter eggs.
 * - Type "meow" (or the Konami code) for a cat parade.
 * - Click the OÖ logo five times to toggle paw-print mode.
 * Everything is imperative DOM + WAAPI so it never re-renders the page.
 */
export default function Delight() {
  const bar = useRef<HTMLDivElement>(null);
  const layer = useRef<HTMLDivElement>(null);
  const [parade, setParade] = useState(0);
  const [toast, setToast] = useState<{ id: number; text: string } | null>(null);
  const paws = useRef(false);

  const say = useCallback((text: string) => setToast({ id: Date.now(), text }), []);

  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(() => setToast(null), 3200);
    return () => window.clearTimeout(id);
  }, [toast]);

  useEffect(() => {
    if (!parade) return;
    const id = window.setTimeout(() => setParade(0), 7000);
    return () => window.clearTimeout(id);
  }, [parade]);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Scroll progress
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const runParade = () => {
      setParade(Date.now());
      say(reduced ? 'Meow! You found the secret cats.' : 'Meow! You found the secret cats 🐾');
    };

    // Typed secrets
    let typed = '';
    let keys: string[] = [];
    const onKey = (e: KeyboardEvent) => {
      if (isTyping(e.target) || e.metaKey || e.ctrlKey || e.altKey) return;
      const k = e.key.toLowerCase();
      keys = [...keys, k].slice(-KONAMI.length);
      if (keys.join() === KONAMI.join()) {
        keys = [];
        runParade();
        return;
      }
      if (k.length === 1) {
        typed = (typed + k).slice(-8);
        if (typed.endsWith('meow') || typed.endsWith('miyav')) {
          typed = '';
          runParade();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('egg:parade', runParade);

    // Logo clicks toggle paw mode
    let clicks: number[] = [];
    const onClick = (e: MouseEvent) => {
      const logo = (e.target as HTMLElement | null)?.closest('[data-egg="logo"]');
      if (!logo) return;
      const now = Date.now();
      clicks = [...clicks.filter((t) => now - t < 2500), now];
      if (clicks.length >= 5) {
        clicks = [];
        paws.current = !paws.current;
        say(paws.current ? 'Paw mode on. A cat is following you 🐾' : 'Paw mode off.');
      }
    };
    document.addEventListener('click', onClick, true);

    // Click sparks + paw prints on tap
    const spawn = (x: number, y: number) => {
      const host = layer.current;
      if (!host || reduced) return;
      for (let i = 0; i < 8; i++) {
        const s = document.createElement('span');
        const a = (i / 8) * Math.PI * 2 + Math.random() * 0.4;
        const d = 22 + Math.random() * 22;
        s.className = 'spark';
        s.style.left = `${x}px`;
        s.style.top = `${y}px`;
        s.style.background = SPARK_COLORS[i % SPARK_COLORS.length];
        host.appendChild(s);
        s.animate(
          [
            { transform: 'translate(-50%,-50%) scale(1)', opacity: 1 },
            { transform: `translate(calc(-50% + ${Math.cos(a) * d}px), calc(-50% + ${Math.sin(a) * d}px)) scale(0)`, opacity: 0 },
          ],
          { duration: 520 + Math.random() * 200, easing: 'cubic-bezier(.16,1,.3,1)' }
        ).onfinish = () => s.remove();
      }
    };
    let side = 1;
    const paw = (x: number, y: number, angle: number) => {
      const host = layer.current;
      if (!host) return;
      const p = document.createElement('span');
      side *= -1;
      const ox = Math.cos(angle + Math.PI / 2) * 9 * side;
      const oy = Math.sin(angle + Math.PI / 2) * 9 * side;
      p.className = 'paw';
      p.innerHTML = PAW_SVG;
      p.style.left = `${x + ox}px`;
      p.style.top = `${y + oy}px`;
      p.style.setProperty('--r', `${(angle * 180) / Math.PI + 90}deg`);
      host.appendChild(p);
      p.animate([{ opacity: 0.55 }, { opacity: 0.55, offset: 0.6 }, { opacity: 0 }], { duration: 1600, easing: 'ease-out' }).onfinish = () => p.remove();
    };
    const onDown = (e: PointerEvent) => {
      if (e.button !== 0 || isTyping(e.target)) return;
      spawn(e.clientX, e.clientY);
      if (paws.current && e.pointerType !== 'mouse') paw(e.clientX, e.clientY, -Math.PI / 2);
    };
    let last = { x: 0, y: 0 };
    const onMove = (e: PointerEvent) => {
      if (!paws.current || e.pointerType !== 'mouse') return;
      const dx = e.clientX - last.x;
      const dy = e.clientY - last.y;
      if (dx * dx + dy * dy < 46 * 46) return;
      paw(e.clientX, e.clientY, Math.atan2(dy, dx));
      last = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('pointerdown', onDown, { passive: true });
    window.addEventListener('pointermove', onMove, { passive: true });

    // A hello for the curious
    console.log(
      '%cOÖ%c  Hi there, fellow inspector of source code.\nTry typing "meow" anywhere on the page, or clicking the OÖ logo five times.',
      'background:#00E5FF;color:#000;font-weight:900;padding:4px 8px;border-radius:6px',
      'color:#aaa'
    );

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('egg:parade', runParade);
      document.removeEventListener('click', onClick, true);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, [say]);

  return (
    <div className="no-print">
      <div aria-hidden className="fixed inset-x-0 top-0 z-[91] h-[2px] origin-left bg-gradient-to-r from-cyan-300 via-fuchsia-500 to-amber-400" ref={bar} style={{ transform: 'scaleX(0)' }} />
      <div aria-hidden ref={layer} className="pointer-events-none fixed inset-0 z-[94] overflow-hidden" />
      {parade > 0 && (
        <div key={parade} aria-hidden className="pointer-events-none fixed inset-x-0 bottom-0 z-[95] h-48 overflow-hidden">
          {[
            { size: 'w-36', bottom: '8px', delay: 0, dur: 5.2 },
            { size: 'w-24', bottom: '70px', delay: 0.5, dur: 4.4 },
            { size: 'w-28', bottom: '24px', delay: 1.1, dur: 5.8 },
            { size: 'w-16', bottom: '110px', delay: 1.6, dur: 4 },
            { size: 'w-20', bottom: '40px', delay: 2.2, dur: 4.8 },
          ].map((c, i) => (
            <div key={i} className="cat-runner absolute left-0" style={{ bottom: c.bottom, animationDelay: `${c.delay}s`, animationDuration: `${c.dur}s` }}>
              {i === 0 && <span className="cat-meow absolute -top-8 left-2 rounded-full bg-white px-3 py-1 font-mono text-xs font-bold text-black">meow!</span>}
              <RunningCat className={`${c.size} h-auto`} />
            </div>
          ))}
        </div>
      )}
      <div role="status" aria-live="polite" className="pointer-events-none fixed inset-x-0 top-20 z-[97] flex justify-center px-4">
        {toast && (
          <span key={toast.id} className="toast-in glass-strong rounded-full px-5 py-2.5 text-sm text-white shadow-2xl shadow-black/60">
            {toast.text}
          </span>
        )}
      </div>
    </div>
  );
}
