import type { Metadata } from 'next';
import PageHero from '../components/site/PageHero';
import ScrollReveal from '../components/ScrollReveal';
import Spotlight from '../components/ui/Spotlight';
import MediaGrid from '../components/ui/MediaGrid';
import ScrollRail from '../components/ui/ScrollRail';
import { CardTitle, Rule, SignOff, Tag } from '../components/ui/Bits';
import { ACCENTS, TIMELINE } from '../data/profile';

export const metadata: Metadata = {
  title: 'Experience',
  description: 'Professional chronology: AI model training and administration at Outlier, technology journalism at Technopat, and examination invigilation at British Side.',
  alternates: { canonical: '/experience' },
};

const ACCENT = ACCENTS.cyan;

export default function ExperiencePage() {
  return (
    <>
      <PageHero
        section="CHRONOLOGY"
        title="Professional Chronology"
        subtitle="Active System Logs"
        accent={ACCENT}
        video="experience"
        videoOpacity={0.28}
        stats={[
          { value: String(TIMELINE.length), label: 'Roles' },
          { value: String(TIMELINE.filter((t) => t.status === 'ACTIVE').length), label: 'Active' },
          { value: '2024', label: 'Since' },
          { value: '<1%', label: 'Error tolerance' },
        ]}
      />

      <div className="relative z-10 mx-auto w-full max-w-screen-2xl space-y-16 px-5 sm:px-8 md:px-16">
        <ol className="relative space-y-10 pl-8 sm:pl-14">
          <ScrollRail accent={ACCENT} className="left-[7px] sm:left-[15px]" />
          {TIMELINE.map((entry, idx) => (
            <li key={entry.id} id={entry.id} className="relative scroll-mt-28">
              <span
                aria-hidden
                className="absolute -left-8 top-10 grid h-4 w-4 place-items-center rounded-full border sm:-left-14 sm:h-8 sm:w-8"
                style={{ borderColor: `${ACCENT}66`, background: '#050505' }}
              >
                <span className="h-1.5 w-1.5 rounded-full sm:h-2 sm:w-2" style={{ backgroundColor: ACCENT, boxShadow: `0 0 10px ${ACCENT}` }} />
              </span>
              <ScrollReveal delay={idx * 60}>
                <Spotlight accent={ACCENT} as="article" className="overflow-hidden">
                  <div className="space-y-7 p-7 sm:p-10 lg:p-14">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      <div className="space-y-2">
                        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-500">LOG_{String(idx + 1).padStart(2, '0')}</p>
                        <CardTitle accent={ACCENT}>{entry.tag}</CardTitle>
                      </div>
                      <div className="flex shrink-0 items-center gap-3">
                        <span className="font-mono text-sm font-medium uppercase tracking-wide text-neutral-300">{entry.period}</span>
                        <span
                          className="inline-flex items-center gap-2 rounded-full px-3 py-1 font-mono text-xs font-medium uppercase tracking-wide"
                          style={{ color: entry.status === 'ACTIVE' ? ACCENT : '#888', border: `1px solid ${entry.status === 'ACTIVE' ? `${ACCENT}55` : '#333'}` }}
                        >
                          {entry.status === 'ACTIVE' && <span className="h-1.5 w-1.5 animate-pulse rounded-full" style={{ backgroundColor: ACCENT }} />}
                          {entry.status}
                        </span>
                      </div>
                    </div>
                    <Rule accent={ACCENT} />
                    <p className="max-w-4xl text-base leading-[1.85] text-neutral-300 sm:text-lg">{entry.content}</p>
                    <div className="flex flex-wrap gap-2.5">
                      {entry.metrics.map((m) => (
                        <Tag key={m} accent={ACCENT}>
                          {m}
                        </Tag>
                      ))}
                    </div>
                  </div>
                  <div className="px-7 pb-7 sm:px-10 sm:pb-10 lg:px-14 lg:pb-14">
                    <MediaGrid items={entry.media} accent={ACCENT} layout={entry.layout} />
                  </div>
                </Spotlight>
              </ScrollReveal>
            </li>
          ))}
        </ol>

        <ScrollReveal>
          <SignOff accent={ACCENT}>END_LOG // CHRONOLOGY_STREAM</SignOff>
        </ScrollReveal>
      </div>
    </>
  );
}
