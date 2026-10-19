/** Hand-drawn SVG cats shared by the easter eggs. Dark fur, cyan eyes, to match the site. */

export function PeekingCat({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 100" className={className} aria-hidden>
      <path d="M22 46 L30 6 L54 30 Z" fill="#0d0d0f" stroke="rgba(255,255,255,.35)" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M98 46 L90 6 L66 30 Z" fill="#0d0d0f" stroke="rgba(255,255,255,.35)" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M30 18 L34 34 L44 30 Z" fill="#D500F7" opacity=".35" />
      <path d="M90 18 L86 34 L76 30 Z" fill="#D500F7" opacity=".35" />
      <ellipse cx="60" cy="64" rx="44" ry="36" fill="#0d0d0f" stroke="rgba(255,255,255,.35)" strokeWidth="2.5" />
      <g className="cat-blink">
        <ellipse cx="43" cy="60" rx="7" ry="9" fill="#00E5FF" />
        <ellipse cx="77" cy="60" rx="7" ry="9" fill="#00E5FF" />
        <ellipse cx="44.5" cy="61" rx="2.2" ry="6" fill="#050505" />
        <ellipse cx="78.5" cy="61" rx="2.2" ry="6" fill="#050505" />
      </g>
      <path d="M56 74 L64 74 L60 79 Z" fill="#ff8fb1" />
      <g stroke="rgba(255,255,255,.45)" strokeWidth="1.6" strokeLinecap="round">
        <path d="M30 74 L6 70" />
        <path d="M30 79 L8 82" />
        <path d="M90 74 L114 70" />
        <path d="M90 79 L112 82" />
      </g>
    </svg>
  );
}

export function RunningCat({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 170 96" className={className} aria-hidden>
      <path className="cat-tail" d="M132 40 C150 30 158 12 150 4" fill="none" stroke="#0d0d0f" strokeWidth="9" strokeLinecap="round" />
      <path className="cat-tail" d="M132 40 C150 30 158 12 150 4" fill="none" stroke="rgba(255,255,255,.3)" strokeWidth="1.5" strokeLinecap="round" />
      <g className="cat-leg cat-leg-a"><rect x="44" y="52" width="9" height="34" rx="4.5" fill="#0d0d0f" stroke="rgba(255,255,255,.3)" strokeWidth="1.5" /></g>
      <g className="cat-leg cat-leg-b"><rect x="60" y="52" width="9" height="34" rx="4.5" fill="#0d0d0f" stroke="rgba(255,255,255,.3)" strokeWidth="1.5" /></g>
      <g className="cat-leg cat-leg-b"><rect x="108" y="52" width="9" height="34" rx="4.5" fill="#0d0d0f" stroke="rgba(255,255,255,.3)" strokeWidth="1.5" /></g>
      <g className="cat-leg cat-leg-a"><rect x="124" y="52" width="9" height="34" rx="4.5" fill="#0d0d0f" stroke="rgba(255,255,255,.3)" strokeWidth="1.5" /></g>
      <ellipse cx="90" cy="48" rx="50" ry="20" fill="#0d0d0f" stroke="rgba(255,255,255,.3)" strokeWidth="1.5" />
      <path d="M18 26 L22 2 L36 18 Z M44 22 L48 0 L58 20 Z" fill="#0d0d0f" stroke="rgba(255,255,255,.3)" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="36" cy="36" r="22" fill="#0d0d0f" stroke="rgba(255,255,255,.3)" strokeWidth="1.5" />
      <ellipse cx="28" cy="33" rx="3.5" ry="4.5" fill="#00E5FF" />
      <path d="M14 42 L4 40 M14 46 L5 48" stroke="rgba(255,255,255,.4)" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

/** Paw print as a string, so the paw trail can stamp it with plain DOM. */
export const PAW_SVG =
  '<svg viewBox="0 0 40 40" width="100%" height="100%" fill="currentColor"><ellipse cx="20" cy="27" rx="9" ry="8"/><ellipse cx="8" cy="16" rx="4" ry="5"/><ellipse cx="16" cy="9" rx="4" ry="5"/><ellipse cx="25" cy="9" rx="4" ry="5"/><ellipse cx="33" cy="16" rx="4" ry="5"/></svg>';
