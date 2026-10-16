'use client';

import Link from 'next/link';
import { useRef } from 'react';

/** Link card that tilts toward the cursor in 3D and catches a moving highlight. */
export default function TiltCard({ href, className = '', children, accent }: { href: string; className?: string; children: React.ReactNode; accent: string }) {
  const ref = useRef<HTMLAnchorElement>(null);

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || e.pointerType !== 'mouse') return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.transform = `perspective(900px) rotateX(${(0.5 - y) * 7}deg) rotateY(${(x - 0.5) * 9}deg) translateZ(0)`;
    el.style.setProperty('--mx', `${x * 100}%`);
    el.style.setProperty('--my', `${y * 100}%`);
  };
  const reset = () => {
    if (ref.current) ref.current.style.transform = '';
  };

  return (
    <Link
      ref={ref}
      href={href}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className={`group relative block overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0c] transition-[transform,border-color] duration-500 ease-expo will-change-transform hover:border-white/25 ${className}`}
      style={{ '--accent': accent } as React.CSSProperties}
    >
      {children}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `radial-gradient(500px circle at var(--mx,50%) var(--my,50%), ${accent}1f, transparent 45%)` }}
      />
    </Link>
  );
}
