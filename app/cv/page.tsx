import type { Metadata } from 'next';
import { ArrowUpRight } from 'lucide-react';
import PageHero from '../components/site/PageHero';
import ScrollReveal from '../components/ScrollReveal';
import Spotlight from '../components/ui/Spotlight';
import { CardTitle, Rule, SignOff } from '../components/ui/Bits';
import { ACCENTS, CV_SECTIONS, PROFILE } from '../data/profile';
import CvActions from './CvActions';

export const metadata: Metadata = {
  title: 'CV',
  description: `Curriculum vitae (Master Matrix) of ${PROFILE.name}: education, experience, projects, technical competencies and methodological stack.`,
  alternates: { canonical: '/cv' },
};

const ACCENT = ACCENTS.amber;

export default function CVPage() {
  return (
    <>
      <div className="no-print">
        <PageHero section="VITAE" title="Master Matrix" subtitle="Curriculum Vitae" accent={ACCENT} video="cv" videoOpacity={0.26} />
      </div>

      <div className="print-plain relative z-10 mx-auto w-full max-w-screen-2xl space-y-10 px-5 sm:px-8 md:px-16">
        {/* Print-only letterhead */}
        <div className="hidden print:block">
          <h1 className="text-3xl font-bold">{PROFILE.name}</h1>
          <p className="mt-1 text-sm">{PROFILE.roles.join(' · ')}</p>
          <p className="mt-1 text-sm">
            {PROFILE.locationFull} · {PROFILE.email} · {PROFILE.siteUrl.replace('https://', '')}
          </p>
          <hr className="mt-4" />
        </div>

        <div className="no-print flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-sm leading-relaxed text-neutral-400">Everything on one page. Save it as a PDF for your records, or print it straight from here.</p>
          <CvActions accent={ACCENT} />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 print:grid-cols-1 print:gap-4">
          {CV_SECTIONS.map((section, idx) => (
            <ScrollReveal key={section.category} delay={idx * 70} className={`h-full ${idx === CV_SECTIONS.length - 1 && CV_SECTIONS.length % 2 === 1 ? 'md:col-span-2' : ''}`}>
              <Spotlight accent={ACCENT} as="section" className="print-break h-full p-7 sm:p-10 lg:p-12 print:rounded-none print:border-0 print:p-0">
                <div className="flex items-center justify-between gap-3">
                  <CardTitle accent={ACCENT}>{section.category}</CardTitle>
                  <span className="font-mono text-xs text-neutral-600 print:hidden">{String(idx + 1).padStart(2, '0')}</span>
                </div>
                <div className="my-6 print:my-2">
                  <Rule accent={ACCENT} />
                </div>
                <dl className={idx === CV_SECTIONS.length - 1 && CV_SECTIONS.length % 2 === 1 ? 'md:grid md:grid-cols-2 md:gap-x-10' : ''}>
                  {section.entries.map((entry, i) => (
                    <div key={`${entry.label}-${i}`} className="group/row -mx-3 flex flex-col gap-1.5 rounded-lg border-b border-white/5 px-3 py-4 transition-colors duration-500 last:border-b-0 hover:bg-white/[0.025] sm:flex-row sm:items-baseline sm:gap-5 print:py-1.5">
                      <dt className="min-w-[110px] shrink-0 font-mono text-[11px] font-bold uppercase tracking-widest text-neutral-500">{entry.label}</dt>
                      <dd className="flex flex-wrap items-center gap-3 text-base leading-[1.6] text-neutral-200 md:text-[17px]">
                        {entry.value}
                        {entry.link && (
                          <a
                            href={entry.link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex shrink-0 items-center gap-1 rounded-full border border-white/20 px-3 py-1 font-mono text-[10px] font-semibold tracking-wide transition-colors hover:bg-white hover:text-black"
                          >
                            {entry.link.text} <ArrowUpRight className="h-3 w-3" />
                          </a>
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Spotlight>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className="pt-8 print:hidden">
            <SignOff accent={ACCENT}>END_MATRIX // VITAE_COMPLETE</SignOff>
          </div>
        </ScrollReveal>
      </div>
    </>
  );
}
