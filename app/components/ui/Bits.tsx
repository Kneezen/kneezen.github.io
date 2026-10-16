// Small presentational pieces shared across pages.

export function Tag({ children, accent }: { children: React.ReactNode; accent: string }) {
  return (
    <span
      className="inline-flex items-center rounded-full px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.12em] transition-colors duration-500 hover:bg-white/5"
      style={{ color: `${accent}cc`, border: `1px solid ${accent}2e` }}
    >
      {children}
    </span>
  );
}

export function Kicker({ children, accent, pulse = false }: { children: React.ReactNode; accent: string; pulse?: boolean }) {
  return (
    <div className="flex items-center gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-neutral-400">
      <span className="relative flex h-2 w-2">
        {pulse && <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60" style={{ backgroundColor: accent }} />}
        <span className="relative inline-flex h-2 w-2 rounded-full" style={{ backgroundColor: accent }} />
      </span>
      {children}
    </div>
  );
}

export function CardTitle({ children, accent, as: As = 'h2' }: { children: React.ReactNode; accent: string; as?: 'h2' | 'h3' }) {
  return (
    <As className="font-mono text-lg font-semibold uppercase leading-snug tracking-[0.06em] sm:text-xl lg:text-2xl" style={{ color: accent }}>
      {children}
    </As>
  );
}

export function Rule({ accent }: { accent: string }) {
  return <div className="h-px w-full" style={{ background: `linear-gradient(90deg, ${accent}40, ${accent}08 60%, transparent)` }} />;
}

export function MediaLabel({ children, accent }: { children: React.ReactNode; accent: string }) {
  return (
    <span className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] sm:text-[11px]" style={{ color: `${accent}d0` }}>
      {children}
    </span>
  );
}

export function SignOff({ children, accent }: { children: React.ReactNode; accent: string }) {
  return (
    <div className="flex items-center gap-6 pt-4">
      <div className="h-px flex-grow" style={{ backgroundColor: `${accent}22` }} />
      <span className="text-center font-mono text-[10px] font-medium uppercase tracking-[0.25em] text-neutral-500 sm:text-xs">{children}</span>
      <div className="h-px flex-grow" style={{ backgroundColor: `${accent}22` }} />
    </div>
  );
}

export function ExternalButton({ href, children, accent }: { href: string; children: React.ReactNode; accent: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="btn-accent inline-flex items-center gap-3 rounded-full px-6 py-3.5 font-mono text-[11px] font-bold uppercase tracking-[0.16em] sm:text-xs"
      style={{ '--btn': accent } as React.CSSProperties}
    >
      {children}
    </a>
  );
}

/** LinkedIn mark (brand icons are not part of lucide-react v1). */
export function Linkedin({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}
