import type { Metadata } from 'next';
import { ArrowUpRight, Mail, MapPin } from 'lucide-react';
import PageHero from '../components/site/PageHero';
import ScrollReveal from '../components/ScrollReveal';
import Spotlight from '../components/ui/Spotlight';
import { CardTitle, Linkedin, Rule, SignOff } from '../components/ui/Bits';
import { ACCENTS, CONTACT_BLURB, MANIFESTO, PROFILE } from '../data/profile';

export const metadata: Metadata = {
  title: 'About',
  description: 'Executive profile and philosophy: decode complexity, encode clarity, and deliver meaning with zero signal loss.',
  alternates: { canonical: '/about' },
};

const ACCENT = ACCENTS.silver;
const CITIES = [
  { city: 'Ankara', note: 'Home base' },
  { city: 'Tokyo', note: 'Daily life' },
  { city: 'Beijing', note: 'Daily life' },
];

export default function AboutPage() {
  const [mission, ...rest] = MANIFESTO;
  return (
    <>
      <PageHero section="PHILOSOPHY" title="Executive Profile & Philosophy" subtitle="Core Philosophy" accent={ACCENT} video="about" videoOpacity={0.35} />

      <div className="relative z-10 mx-auto w-full max-w-screen-2xl space-y-20 px-5 sm:px-8 md:space-y-28 md:px-16">
        {/* Mission as a pull quote */}
        <ScrollReveal>
          <figure className="relative">
            <span aria-hidden className="pointer-events-none absolute -left-2 -top-10 select-none font-serif text-[9rem] leading-none text-white/[0.06] sm:-left-6 sm:-top-16 sm:text-[14rem]">
              “
            </span>
            <figcaption className="mb-6 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-neutral-500">{mission.tag}</figcaption>
            <blockquote className="max-w-5xl text-2xl font-medium leading-[1.35] tracking-[-0.02em] text-neutral-200 sm:text-3xl lg:text-[2.6rem]">
              {mission.content.split('decode complexity, encode clarity, and deliver meaning with zero signal loss').map((part, i, arr) => (
                <span key={i}>
                  {part}
                  {i < arr.length - 1 && <span className="bg-gradient-to-r from-white via-neutral-300 to-neutral-500 bg-clip-text text-transparent">decode complexity, encode clarity, and deliver meaning with zero signal loss</span>}
                </span>
              ))}
            </blockquote>
          </figure>
        </ScrollReveal>

        {/* Remaining manifesto with a sticky index */}
        <div className="grid gap-10 lg:grid-cols-12">
          <aside className="hidden lg:col-span-4 lg:block">
            <div className="sticky top-32 space-y-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-neutral-500">Index //</p>
              <ol className="space-y-3">
                {rest.map((s, i) => (
                  <li key={s.tag}>
                    <a href={`#m-${i}`} className="group flex items-center gap-4 text-sm text-neutral-400 transition-colors hover:text-white">
                      <span className="font-mono text-[11px] text-neutral-600">{String(i + 2).padStart(2, '0')}</span>
                      <span className="h-px w-6 bg-white/20 transition-all duration-500 group-hover:w-10 group-hover:bg-white" />
                      {s.tag}
                    </a>
                  </li>
                ))}
              </ol>
              <div className="glass mt-10 rounded-2xl p-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500">Cross-cultural map</p>
                <ul className="mt-4 space-y-3">
                  {CITIES.map((c) => (
                    <li key={c.city} className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2 text-neutral-200">
                        <MapPin className="h-3.5 w-3.5 text-neutral-500" /> {c.city}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-neutral-600">{c.note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>

          <div className="space-y-6 lg:col-span-8">
            {rest.map((section, idx) => (
              <ScrollReveal key={section.tag} delay={idx * 80}>
                <Spotlight accent={ACCENT} as="article" className="scroll-mt-32 p-7 sm:p-10 lg:p-12" id={`m-${idx}`}>
                  <div className="flex items-center justify-between gap-4">
                    <CardTitle accent={ACCENT}>{section.tag}</CardTitle>
                    <span className="font-mono text-xs text-neutral-600">{String(idx + 2).padStart(2, '0')}</span>
                  </div>
                  <div className="my-6">
                    <Rule accent={ACCENT} />
                  </div>
                  <p className="text-base leading-[1.85] text-neutral-300 sm:text-lg">{section.content}</p>
                </Spotlight>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Contact + location */}
        <div className="grid gap-6 lg:grid-cols-2">
          <ScrollReveal>
            <Spotlight accent={ACCENT} as="section" className="flex h-full flex-col p-7 sm:p-10 lg:p-12">
              <CardTitle accent={ACCENT}>COMMUNICATIONS & NETWORK</CardTitle>
              <div className="my-6">
                <Rule accent={ACCENT} />
              </div>
              <p className="text-base leading-[1.8] text-neutral-300 sm:text-lg">{CONTACT_BLURB}</p>
              <div className="mt-auto grid gap-3 pt-10 sm:grid-cols-2 lg:grid-cols-1 2xl:grid-cols-2">
                <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="btn-accent flex items-center justify-between gap-3 rounded-2xl px-6 py-5 font-mono text-xs font-bold uppercase tracking-[0.15em]" style={{ '--btn': ACCENT } as React.CSSProperties}>
                  <span className="flex items-center gap-3">
                    <Linkedin className="h-4 w-4" /> LinkedIn // Network
                  </span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                <a href={`mailto:${PROFILE.email}`} className="btn-accent flex items-center justify-between gap-3 rounded-2xl px-6 py-5 font-mono text-xs font-bold uppercase tracking-[0.15em]" style={{ '--btn': ACCENT } as React.CSSProperties}>
                  <span className="flex items-center gap-3">
                    <Mail className="h-4 w-4" /> Email // Direct channel
                  </span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </Spotlight>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <Spotlight accent={ACCENT} as="section" className="flex h-full flex-col p-7 sm:p-10 lg:p-12">
              <div className="flex items-center justify-between">
                <CardTitle accent={ACCENT}>LOCATION</CardTitle>
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-neutral-500">{PROFILE.locationFull}</span>
              </div>
              <div className="my-6">
                <Rule accent={ACCENT} />
              </div>
              <div className="relative min-h-64 flex-1 overflow-hidden rounded-2xl border border-white/10">
                <iframe
                  title="Map of Ankara"
                  src="https://maps.google.com/maps?q=Ankara&t=&z=11&ie=UTF8&iwloc=&output=embed"
                  className="absolute inset-0 h-full w-full"
                  style={{ border: 0, filter: 'invert(100%) hue-rotate(180deg) contrast(90%) grayscale(30%)' }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Spotlight>
          </ScrollReveal>
        </div>

        <ScrollReveal>
          <SignOff accent={ACCENT}>END_TRANSMISSION // PHILOSOPHY_MODULE</SignOff>
        </ScrollReveal>
      </div>
    </>
  );
}
