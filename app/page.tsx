import Link from 'next/link';
import { ArrowRight, ArrowUpRight, GraduationCap, Mail } from 'lucide-react';
import Hero from './components/home/Hero';
import CountUp from './components/home/CountUp';
import MissionScroll from './components/home/MissionScroll';
import ExperienceTabs from './components/home/ExperienceTabs';
import TiltCard from './components/home/TiltCard';
import ScrollReveal from './components/ScrollReveal';
import Spotlight from './components/ui/Spotlight';
import Img from './components/ui/Img';
import { Kicker, Linkedin } from './components/ui/Bits';
import { ACCENTS, CERTIFICATIONS, ERASMUS, INSTITUTION, MANIFESTO, PILLARS, PROFILE, PROJECTS, TIMELINE } from './data/profile';

function SectionHead({ index, label, title, accent, href, cta }: { index: string; label: string; title: string; accent: string; href?: string; cta?: string }) {
  return (
    <div className="mb-10 flex flex-col gap-6 sm:mb-14 md:flex-row md:items-end md:justify-between">
      <div>
        <Kicker accent={accent}>
          {index}{' // '}{label}
        </Kicker>
        <h2 className="mt-5 max-w-3xl text-4xl font-black leading-[0.95] tracking-[-0.045em] text-white sm:text-5xl lg:text-6xl">{title}</h2>
      </div>
      {href && (
        <Link href={href} className="group inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-white/15 px-5 py-2.5 text-sm text-neutral-300 transition-all hover:border-white hover:bg-white hover:text-black md:self-auto">
          {cta}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  );
}

export default function HomePage() {
  const stats = [
    { to: TIMELINE.length, label: 'Professional roles', suffix: '' },
    { to: CERTIFICATIONS.length, label: 'Certifications', suffix: '' },
    { to: PROJECTS.length, label: 'Flagship modules', suffix: '' },
    { to: 2024, label: 'Training LLMs since', suffix: '' },
  ];

  return (
    <>
      <Hero />

      <div className="relative z-10 mx-auto w-full max-w-screen-2xl px-5 sm:px-8 md:px-16">
        {/* Pillars */}
        <section id="pillars" aria-label="What I do" className="scroll-mt-24 pt-16 sm:pt-24">
          <div className="grid gap-4 md:grid-cols-3">
            {PILLARS.map((p, i) => (
              <ScrollReveal key={p.tag} delay={i * 100} className="h-full">
                <TiltCard href={p.href} accent={ACCENTS[p.accent]} className="flex h-full min-h-[300px] flex-col justify-between p-8 sm:p-10">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] font-medium uppercase tracking-widest text-neutral-400">{p.tag}</span>
                    <ArrowUpRight className="h-5 w-5 text-neutral-600 transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
                  </div>
                  <div className="mt-16 space-y-4">
                    <span className="block h-px w-12 transition-all duration-700 ease-expo group-hover:w-24" style={{ background: ACCENTS[p.accent] }} />
                    <h3 className="text-2xl font-semibold tracking-[-0.02em] text-white sm:text-3xl">{p.title}</h3>
                    <p className="text-[15px] leading-[1.75] text-neutral-400 sm:text-base">{p.desc}</p>
                  </div>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Stats */}
        <ScrollReveal>
          <section aria-label="At a glance" className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="bg-[#070708]/90 px-6 py-8 sm:px-8 sm:py-10">
                <p className="text-4xl font-black tracking-[-0.04em] text-white sm:text-5xl">
                  <CountUp to={s.to} suffix={s.suffix} duration={s.to > 100 ? 1800 : 1200} />
                </p>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500 sm:text-[11px]">{s.label}</p>
              </div>
            ))}
          </section>
        </ScrollReveal>

        {/* Mission */}
        <section aria-label="Mission" className="py-28 sm:py-40">
          <Kicker accent={ACCENTS.silver}>00 // {MANIFESTO[0].tag}</Kicker>
          <div className="mt-10 max-w-6xl">
            <MissionScroll text={MANIFESTO[0].content} highlight="decode complexity, encode clarity, and deliver meaning with zero signal loss." />
          </div>
          <Link href="/about" className="group mt-12 inline-flex items-center gap-2 text-sm text-neutral-400 transition-colors hover:text-white">
            Read the full philosophy <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </section>

        {/* Experience */}
        <section id="experience" aria-label="Experience" className="scroll-mt-24">
          <ScrollReveal>
            <SectionHead index="01" label="Chronology" title="Professional Chronology" accent={ACCENTS.cyan} href="/experience" cta="All system logs" />
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <ExperienceTabs />
          </ScrollReveal>
        </section>

        {/* Education */}
        <section id="education" aria-label="Education" className="scroll-mt-24 pt-28 sm:pt-40">
          <ScrollReveal>
            <SectionHead index="02" label="Academia" title="Academic Foundations & Theory" accent={ACCENTS.lime} href="/education" cta="Academic matrix" />
          </ScrollReveal>
          <div className="grid gap-4 lg:grid-cols-5">
            <ScrollReveal className="h-full lg:col-span-3">
              <Link href="/education" className="group relative block h-full min-h-[340px] overflow-hidden rounded-3xl border border-white/10">
                <Img src={INSTITUTION.image.src} alt={INSTITUTION.image.alt} sizes="(min-width: 1024px) 60vw, 100vw" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.6s] ease-expo group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 space-y-4 p-7 sm:p-10">
                  <span className="inline-flex items-center gap-2 rounded-full bg-black/60 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-lime-300 backdrop-blur-md">
                    <GraduationCap className="h-3.5 w-3.5" /> {INSTITUTION.facts[2][1]}
                  </span>
                  <p className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">{INSTITUTION.name}</p>
                  <p className="text-neutral-300">
                    {INSTITUTION.facts[1][1]} · {INSTITUTION.facts[3][1]}
                  </p>
                </div>
              </Link>
            </ScrollReveal>
            <ScrollReveal delay={100} className="h-full lg:col-span-2">
              <Spotlight accent={ACCENTS.lime} className="flex h-full flex-col justify-between gap-8 p-7 sm:p-10">
                <div className="space-y-4">
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-lime-300">{ERASMUS.title}</p>
                  <p className="text-[15px] leading-[1.8] text-neutral-300 sm:text-base">{ERASMUS.content}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['CLT', 'PPP', 'PREPARE', '5E Model'].map((c) => (
                    <span key={c} className="rounded-full border border-lime-300/25 px-3 py-1 font-mono text-[11px] text-lime-300/90">
                      {c}
                    </span>
                  ))}
                </div>
              </Spotlight>
            </ScrollReveal>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" aria-label="Projects" className="scroll-mt-24 pt-28 sm:pt-40">
          <ScrollReveal>
            <SectionHead index="03" label="Archive" title="Selected Works & Research" accent={ACCENTS.magenta} href="/projects" cta="Project index" />
          </ScrollReveal>
          <div className="grid gap-4 md:grid-cols-3">
            {PROJECTS.map((p, i) => (
              <ScrollReveal key={p.id} delay={i * 100} className="h-full">
                <TiltCard href={`/projects#${p.id}`} accent={ACCENTS.magenta} className="flex h-full flex-col">
                  <div className="relative aspect-[16/11] overflow-hidden border-b border-white/5 bg-black">
                    <Img src={p.cover} alt={p.title} sizes="(min-width: 768px) 33vw, 100vw" className="h-full w-full object-cover object-top opacity-85 transition-all duration-[1.2s] ease-expo group-hover:scale-105 group-hover:opacity-100" />
                    <span className="absolute left-4 top-4 rounded-full bg-black/70 px-3 py-1 font-mono text-[11px] font-bold text-fuchsia-300 backdrop-blur-md">{p.index}</span>
                  </div>
                  <div className="flex flex-1 flex-col gap-3 p-7">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500">{p.kicker}</p>
                    <h3 className="text-xl font-semibold tracking-tight text-white">{p.title}</h3>
                    <p className="line-clamp-3 text-sm leading-relaxed text-neutral-400">{p.content}</p>
                    <span className="mt-auto inline-flex items-center gap-2 pt-3 text-sm text-fuchsia-300">
                      Explore module <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Certifications wall */}
        <section aria-label="Certifications" className="pt-28 sm:pt-40">
          <ScrollReveal>
            <SectionHead index="04" label="Credentials" title="Credentials & Mastery" accent={ACCENTS.amber} href="/certifications" cta={`All ${CERTIFICATIONS.length} certificates`} />
          </ScrollReveal>
        </section>
      </div>

      <ScrollReveal>
        <div className="group relative z-10 overflow-hidden py-2 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
          <div className="flex w-max gap-4 animate-marquee [animation-duration:60s] group-hover:[animation-play-state:paused]">
            {[...CERTIFICATIONS, ...CERTIFICATIONS].map((c, i) => (
              <Link
                key={i}
                href="/certifications"
                aria-hidden={i >= CERTIFICATIONS.length}
                tabIndex={i >= CERTIFICATIONS.length ? -1 : undefined}
                className="glass w-[280px] shrink-0 overflow-hidden rounded-2xl transition-colors hover:border-amber-300/40 sm:w-[320px]"
              >
                <div className="bg-black/40 p-3">
                  <Img src={c.image} alt={c.title} sizes="320px" className="aspect-[4/3] w-full rounded-lg object-contain" />
                </div>
                <div className="space-y-1 p-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-amber-300/80">{c.issuer}</p>
                  <p className="truncate text-sm font-medium text-white">{c.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* Contact CTA */}
      <div className="relative z-10 mx-auto w-full max-w-screen-2xl px-5 pt-28 sm:px-8 sm:pt-40 md:px-16">
        <ScrollReveal>
          <section aria-label="Contact" className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#08080a] px-7 py-16 text-center sm:px-12 sm:py-24">
            <div aria-hidden className="absolute inset-0 bg-grid opacity-60 [mask-image:radial-gradient(ellipse_at_center,#000_20%,transparent_70%)]" />
            <div aria-hidden className="absolute left-1/2 top-0 h-64 w-[70%] -translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl" />
            <div className="relative">
              <div className="flex justify-center">
                <Kicker accent={ACCENTS.cyan} pulse>
                  Open to collaboration
                </Kicker>
              </div>
              <h2 className="mx-auto mt-6 max-w-4xl text-4xl font-black leading-[0.95] tracking-[-0.05em] text-white sm:text-6xl lg:text-7xl">Let&apos;s build something that speaks clearly.</h2>
              <p className="mx-auto mt-6 max-w-xl text-neutral-400">AI language models, modern pedagogy, or simply saying hello. My inbox is open.</p>
              <div className="mt-10 flex flex-wrap justify-center gap-3">
                <a href={`mailto:${PROFILE.email}`} className="inline-flex items-center gap-2.5 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-black transition-shadow hover:shadow-[0_0_40px_-6px_rgba(255,255,255,0.6)]">
                  <Mail className="h-4 w-4" /> {PROFILE.email}
                </a>
                <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 rounded-full border border-white/20 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white hover:text-black">
                  <Linkedin className="h-4 w-4" /> LinkedIn
                </a>
              </div>
            </div>
          </section>
        </ScrollReveal>
      </div>
    </>
  );
}
