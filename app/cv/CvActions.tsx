'use client';

import { useEffect, useState } from 'react';
import { Check, Copy, Printer } from 'lucide-react';
import { PROFILE } from '../data/profile';

export default function CvActions({ accent }: { accent: string }) {
  const [copied, setCopied] = useState(false);

  // The command menu's "Download CV as PDF" lands here with ?print=1
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('print') === '1') {
      window.history.replaceState(null, '', window.location.pathname);
      const t = window.setTimeout(() => window.print(), 900);
      return () => window.clearTimeout(t);
    }
  }, []);

  return (
    <div className="no-print flex flex-wrap gap-3">
      <button
        type="button"
        onClick={() => window.print()}
        className="btn-accent inline-flex items-center gap-2.5 rounded-full px-5 py-3 font-mono text-xs font-bold uppercase tracking-[0.15em]"
        style={{ '--btn': accent } as React.CSSProperties}
      >
        <Printer className="h-4 w-4" /> Download PDF
      </button>
      <button
        type="button"
        onClick={() => navigator.clipboard?.writeText(PROFILE.email).then(() => {
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1600);
        })}
        className="glass inline-flex items-center gap-2.5 rounded-full px-5 py-3 font-mono text-xs font-bold uppercase tracking-[0.15em] text-neutral-300 transition-colors hover:text-white"
      >
        {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
        {copied ? 'Copied' : 'Copy email'}
      </button>
    </div>
  );
}
