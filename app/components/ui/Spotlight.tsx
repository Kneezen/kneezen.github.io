'use client';

import { useCallback, useRef } from 'react';

interface SpotlightProps extends React.HTMLAttributes<HTMLDivElement> {
  accent?: string;
  as?: 'div' | 'article' | 'section' | 'li';
}

/** Glass card with a cursor-following glow and edge highlight in the card's accent colour. */
export default function Spotlight({ accent, as = 'div', className = '', style, children, ...rest }: SpotlightProps) {
  const ref = useRef<HTMLElement>(null);
  const onMove = useCallback((e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  }, []);
  const Tag = as as 'div';
  return (
    <Tag
      ref={ref as React.Ref<HTMLDivElement>}
      onPointerMove={onMove}
      className={`spotlight glass rounded-3xl ${className}`}
      style={{ ...(accent ? ({ '--accent': accent } as React.CSSProperties) : null), ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
