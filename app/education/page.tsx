import type { Metadata } from 'next';
import { Globe2, Users, Layers } from 'lucide-react';
import PageHero from '../components/site/PageHero';
import ScrollReveal from '../components/ScrollReveal';
import Spotlight from '../components/ui/Spotlight';
import ImageLightbox from '../components/ImageLightbox';
import Img from '../components/ui/Img';
import { CardTitle, MediaLabel, Rule, SignOff } from '../components/ui/Bits';
import { ACCENTS, ERASMUS, INSTITUTION, METHODOLOGIES, PEDAGOGY_STATEMENT, SOCIETIES } from '../data/profile';

export const metadata: Metadata = {
  title: 'Education',
  description: 'Academic foundations at TED University: English Language Teaching, CLT, PPP and UNESCO PREPARE methodologies, and Erasmus+ mobility for 2025–2026.',
  alternates: { canonical: '/education' },
};

const ACCENT = ACCENTS.lime;
const SOCIETY_ICONS = [Users, Layers];

export default function EducationPage() {
  return (
    <>
      <PageHero section="ACADEMIA" title="Academic Foundations & Theory" subtitle="TED University // ELT Division" accent={ACCENT} video="education" videoOpacity={0.3} />

      <div className="relative z-10 mx-auto w-full max-w-screen-2xl space-y-8 px-5 sm:px-8 md:px-16">
        {/* Institutional profile */}
        <ScrollReveal>
          <Spotlight accent={ACCENT} as="section" className="overflow-hidden">
            <div className="grid lg:grid-cols-2">
              <div className="space-y-7 p-7 sm:p-10 lg:p-14">
                <CardTitle accent={ACCENT}>INSTITUTIONAL PROFILE</CardTitle>
                <Rule accent={ACCENT} />
                <p className="text-3xl font-semibold tracking-[-0.02em] text-white md:text-4xl">{INSTITUTION.name}</p>
                <dl className="divide-y divide-white/5">
                  {INSTITUTION.facts.map(([label, value]) => (
                    <div key={label} className="flex flex-col gap-1 py-3.5 sm:flex-row sm:items-baseline sm:gap-6">
                      <dt className="min-w-[100px] font-mono text-[11px] font-bold uppercase tracking-widest text-neutral-500">{label}</dt>
                      <dd className="text-base text-neutral-200 md:text-lg">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <figure className="relative min-h-72 border-t border-white/5 lg:border-l lg:border-t-0">
                <ImageLightbox src={INSTITUTION.image.src} alt={INSTITUTION.image.alt} className="h-full">
                  <Img src={INSTITUTION.image.src} alt={INSTITUTION.image.alt} className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] ease-expo group-hover/lightbox:scale-105" />
                  <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                </ImageLightbox>
                <figcaption className="pointer-events-none absolute left-5 top-5 rounded-full bg-black/70 px-3 py-1.5 backdrop-blur-md">
                  <MediaLabel accent={ACCENT}>{INSTITUTION.image.label}</MediaLabel>
                </figcaption>
              </figure>
            </div>
          </Spotlight>
        </ScrollReveal>

        {/* Pedagogy statement */}
        <ScrollReveal>
          <Spotlight accent={ACCENT} as="section" className="p-7 sm:p-10 lg:p-14">
            <CardTitle accent={ACCENT}>PEDAGOGICAL METHODOLOGIES</CardTitle>
            <div className="my-7">
              <Rule accent={ACCENT} />
            </div>
            <p className="max-w-5xl text-lg leading-[1.8] text-neutral-300 sm:text-xl">{PEDAGOGY_STATEMENT}</p>
          </Spotlight>
        </ScrollReveal>

        {/* Theoretical frameworks */}
        <section className="pt-10">
          <ScrollReveal>
            <p className="mb-6 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-neutral-500">Theoretical Frameworks //</p>
          </ScrollReveal>
          <div className="grid gap-6 lg:grid-cols-3">
            {METHODOLOGIES.map((m, idx) => (
              <ScrollReveal key={m.code} delay={idx * 100} className="h-full">
                <Spotlight accent={ACCENT} as="article" className="flex h-full flex-col p-7 sm:p-9">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full px-3 py-1.5 font-mono text-xs font-bold tracking-[0.1em]" style={{ color: ACCENT, border: `1px solid ${ACCENT}40` }}>
                      {m.code}
                    </span>
                    <span className="font-mono text-xs text-neutral-600">{String(idx + 1).padStart(2, '0')}</span>
                  </div>
                  <h3 className="mt-6 text-xl font-semibold tracking-[-0.01em] text-white">{m.name}</h3>
                  <p className="mt-4 border-l-2 pl-5 text-[15px] leading-[1.8] text-neutral-400" style={{ borderColor: `${ACCENT}30` }}>
                    {m.desc}
                  </p>
                </Spotlight>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Societies */}
        <ScrollReveal>
          <Spotlight accent={ACCENT} as="section" className="p-7 sm:p-10 lg:p-14">
            <CardTitle accent={ACCENT}>SOCIETIES & LEADERSHIP ENGAGEMENT</CardTitle>
            <div className="my-7">
              <Rule accent={ACCENT} />
            </div>
            <div className="grid gap-10 md:grid-cols-2">
              {SOCIETIES.map((s, i) => {
                const Icon = SOCIETY_ICONS[i] ?? Users;
                return (
                  <div key={s.title} className="space-y-4">
                    <span className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/[0.03]" style={{ color: ACCENT }}>
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="text-xl font-semibold tracking-[-0.01em] text-white md:text-2xl">{s.title}</h3>
                    <p className="text-base leading-[1.8] text-neutral-400 md:text-lg">{s.desc}</p>
                  </div>
                );
              })}
            </div>
          </Spotlight>
        </ScrollReveal>

        {/* Erasmus+ */}
        <ScrollReveal>
          <Spotlight accent={ACCENT} as="section" className="relative overflow-hidden p-7 sm:p-10 lg:p-14">
            <Globe2 aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 opacity-[0.06]" style={{ color: ACCENT }} strokeWidth={0.6} />
            <CardTitle accent={ACCENT}>{ERASMUS.title}</CardTitle>
            <div className="my-7">
              <Rule accent={ACCENT} />
            </div>
            <p className="max-w-4xl text-lg leading-[1.8] text-neutral-300 sm:text-xl">{ERASMUS.content}</p>
            <div className="mt-8 inline-flex items-center gap-3 rounded-full px-4 py-2" style={{ border: `1px solid ${ACCENT}40`, background: `${ACCENT}0d` }}>
              <span className="h-2.5 w-2.5 animate-pulse rounded-full" style={{ backgroundColor: ACCENT }} />
              <span className="font-mono text-xs font-semibold uppercase tracking-wide" style={{ color: ACCENT }}>
                {ERASMUS.badge}
              </span>
            </div>
          </Spotlight>
        </ScrollReveal>

        <ScrollReveal>
          <div className="pt-8">
            <SignOff accent={ACCENT}>END_STREAM // ACADEMIC_MATRIX</SignOff>
          </div>
        </ScrollReveal>
      </div>
    </>
  );
}
