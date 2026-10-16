import { Kicker } from '../ui/Bits';
import BackgroundVideo from '../ui/BackgroundVideo';

interface PageHeroProps {
  section: string;
  title: string;
  subtitle: string;
  accent: string;
  video: string;
  videoOpacity?: number;
  intro?: string;
  stats?: { value: string; label: string }[];
}

/** Shared page opening: ambient video, accent glow, kinetic headline and optional stat row. */
export default function PageHero({ section, title, subtitle, accent, video, videoOpacity = 0.32, intro, stats }: PageHeroProps) {
  const words = title.split(' ');
  return (
    <>
      <BackgroundVideo name={video} opacity={videoOpacity} />
      <div
        aria-hidden
        className="glow-pulse pointer-events-none fixed left-1/2 top-0 z-0 h-[800px] w-[1400px] max-w-[200vw] -translate-x-1/2"
        style={{ background: `radial-gradient(ellipse at 50% 0%, ${accent}14 0%, transparent 65%)` }}
      />
      <section className="relative z-10 mx-auto w-full max-w-screen-2xl px-5 pb-16 pt-36 sm:px-8 md:px-16 md:pb-20 md:pt-44">
        <Kicker accent={accent} pulse>
          SECTION: {section}
        </Kicker>
        <h1 className="mt-8 max-w-5xl text-[2.6rem] font-black leading-[0.95] tracking-[-0.05em] text-white sm:text-6xl md:text-7xl lg:text-8xl">
          {words.map((w, i) => (
            <span key={i} className="rise mr-[0.22em] inline-block overflow-hidden pb-[0.08em] align-bottom last:mr-0">
              <span style={{ animationDelay: `${120 + i * 70}ms` }}>{w}</span>
            </span>
          ))}
        </h1>
        <div className="mt-8 flex items-center gap-4">
          <div className="h-px w-16" style={{ backgroundColor: `${accent}80` }} />
          <p className="font-mono text-xs font-medium uppercase tracking-[0.22em] text-neutral-400 sm:text-sm">{subtitle}</p>
        </div>
        {intro && <p className="mt-8 max-w-2xl text-base leading-relaxed text-neutral-400 sm:text-lg">{intro}</p>}
        {stats && (
          <dl className="mt-12 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="bg-[#070707]/85 px-5 py-4 backdrop-blur-md">
                <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500">{s.label}</dt>
                <dd className="mt-1.5 text-2xl font-semibold tracking-tight" style={{ color: accent }}>
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        )}
      </section>
    </>
  );
}
