'use client';

import { useState } from 'react';
import { PROFILE } from '../../data/profile';
import Scramble from '../home/Scramble';
import { PeekingCat } from './Cats';
import { startParade } from './Delight';

const MEOWS = ['meow?', 'mrrp!', 'purr…', 'MEOW!'];

/**
 * The hero name with a cat hiding behind it. Hover the name (or tap it on a phone) and the cat peeks out;
 * pat the cat a few times and its friends come running.
 */
export default function NameWithCat() {
  const [peek, setPeek] = useState(false);
  const [pats, setPats] = useState(0);

  const pat = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = pats + 1;
    setPats(next);
    if (next % 4 === 0) startParade();
  };

  return (
    <span
      className="group/name relative inline-block"
      onPointerEnter={(e) => e.pointerType === 'mouse' && setPeek(true)}
      onPointerLeave={(e) => e.pointerType === 'mouse' && setPeek(false)}
      onClick={() => setPeek((p) => !p)}
    >
      <Scramble text={PROFILE.name} delay={200} duration={1100} />
      <span aria-hidden className="pointer-events-none absolute bottom-[calc(100%-0.16em)] right-[0.2em] h-[0.5em] w-[0.6em] overflow-hidden">
        <button
          type="button"
          tabIndex={-1}
          onClick={pat}
          className={`pointer-events-auto absolute inset-x-0 top-0 block h-[0.5em] w-[0.6em] cursor-pointer transition-transform duration-500 ease-expo ${peek ? 'translate-y-[0.06em]' : 'translate-y-full'}`}
        >
          <PeekingCat className="h-full w-full" />
        </button>
      </span>
      {pats > 0 && (
        <span
          key={pats}
          aria-hidden
          className="cat-meow pointer-events-none absolute bottom-[calc(100%+0.3em)] right-0 rounded-full bg-white px-3 py-1 font-mono text-xs font-bold tracking-normal text-black"
        >
          {MEOWS[(pats - 1) % MEOWS.length]}
        </span>
      )}
    </span>
  );
}
