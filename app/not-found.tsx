import Link from 'next/link';
import type { Metadata } from 'next';
import BackgroundVideo from './components/ui/BackgroundVideo';
import { NAV, ACCENTS } from './data/profile';

export const metadata: Metadata = {
  title: 'Signal lost',
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden px-5 pt-28">
      <BackgroundVideo name="rain" opacity={0.5} />
      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-neutral-500">ERROR_404 // SIGNAL_LOST</p>
        <h1 className="mt-6 text-[clamp(5rem,22vw,13rem)] font-black leading-none tracking-[-0.06em] text-white">
          4<span className="text-neutral-700">0</span>4
        </h1>
        <p className="mx-auto mt-6 max-w-md text-neutral-400">This page decoded into nothing. The rest of the archive is intact, so pick a channel below.</p>
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          <Link href="/" className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black">
            Return to canvas
          </Link>
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="glass flex items-center gap-2 rounded-full px-4 py-2.5 text-sm text-neutral-300 transition-colors hover:text-white">
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: ACCENTS[n.accent] }} />
              {n.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
