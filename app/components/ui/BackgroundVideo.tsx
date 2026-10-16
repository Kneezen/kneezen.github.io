'use client';

import { useEffect, useRef, useState } from 'react';
import { asset } from '../../data/asset';

interface BackgroundVideoProps {
  name: string;
  opacity?: number;
  className?: string;
  fixed?: boolean;
}

/**
 * Ambient looping video. Shows the poster instantly, loads the (small) video after the page is idle,
 * pauses when the tab is hidden or the element is off-screen, and never plays for reduced-motion users.
 */
export default function BackgroundVideo({ name, opacity = 0.3, className = '', fixed = true }: BackgroundVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (conn?.saveData) return;
    const idle = (window as Window & { requestIdleCallback?: (cb: () => void) => number }).requestIdleCallback;
    const id = idle ? idle(() => setLoad(true)) : window.setTimeout(() => setLoad(true), 300);
    return () => {
      if (!idle) window.clearTimeout(id);
    };
  }, []);

  useEffect(() => {
    const v = ref.current;
    if (!v || !load) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !document.hidden) v.play().catch(() => {});
      else v.pause();
    });
    io.observe(v);
    const onVis = () => (document.hidden ? v.pause() : v.play().catch(() => {}));
    document.addEventListener('visibilitychange', onVis);
    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [load]);

  const pos = fixed ? 'fixed' : 'absolute';
  return (
    <div aria-hidden className={`${pos} inset-0 z-0 overflow-hidden pointer-events-none ${className}`} style={{ opacity }}>
      <img src={asset(`/media/${name}-poster.webp`)} alt="" className="absolute inset-0 h-full w-full object-cover" decoding="async" />
      {load && (
        <video
          ref={ref}
          muted
          loop
          playsInline
          autoPlay
          preload="auto"
          poster={asset(`/media/${name}-poster.webp`)}
          onCanPlay={() => setReady(true)}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-1000"
          style={{ opacity: ready ? 1 : 0 }}
        >
          <source src={asset(`/media/${name}.mp4`)} type="video/mp4" />
        </video>
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/40 via-transparent to-[#050505]" />
    </div>
  );
}
