'use client';

import { useEffect, useState } from 'react';

/** Types each role, holds, deletes, moves to the next. */
export default function RoleTicker({ roles, className = '' }: { roles: string[]; className?: string }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(roles[0]);
  const [phase, setPhase] = useState<'hold' | 'delete' | 'type'>('hold');

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const word = roles[index];
    const t = window.setTimeout(
      () => {
        if (phase === 'hold') setPhase('delete');
        else if (phase === 'delete') {
          if (text.length > 1) setText(text.slice(0, -1));
          else {
            setText('');
            setIndex((index + 1) % roles.length);
            setPhase('type');
          }
        } else if (text.length < word.length) {
          const next = word.slice(0, text.length + 1);
          setText(next);
          if (next === word) setPhase('hold');
        }
      },
      phase === 'hold' ? 2200 : phase === 'delete' ? 28 : 55
    );
    return () => window.clearTimeout(t);
  }, [phase, text, index, roles]);

  return (
    <span className={className}>
      <span className="sr-only">{roles.join(', ')}</span>
      <span aria-hidden>
        {text}
        <span className="caret ml-0.5 inline-block h-[1em] w-[2px] translate-y-[0.12em] bg-current" />
      </span>
    </span>
  );
}
