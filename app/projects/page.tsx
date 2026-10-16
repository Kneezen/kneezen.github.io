import type { Metadata } from 'next';
import PageHero from '../components/site/PageHero';
import ScrollReveal from '../components/ScrollReveal';
import Spotlight from '../components/ui/Spotlight';
import MediaGrid from '../components/ui/MediaGrid';
import FiveE from '../components/ui/FiveE';
import { CardTitle, ExternalButton, Rule, SignOff, Tag } from '../components/ui/Bits';
import { ACCENTS, PROJECTS } from '../data/profile';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Selected works: the Linguistic Race Engine, the 5E “Backpack Mysteries” storytelling module, and the “Whose Is It?” Web 2.0 grammar portal.',
  alternates: { canonical: '/projects' },
};

const ACCENT = ACCENTS.magenta;

export default function ProjectsPage() {
  return (
    <>
      <PageHero section="ARCHIVE" title="Selected Works & Research" subtitle="Dissertations & Modules" accent={ACCENT} video="projects" videoOpacity={0.4} />

      <div className="relative z-10 mx-auto w-full max-w-screen-2xl space-y-10 px-5 sm:px-8 md:px-16">
        {/* Quick index */}
        <ScrollReveal>
          <nav aria-label="Projects" className="grid gap-3 sm:grid-cols-3">
            {PROJECTS.map((p) => (
              <a key={p.id} href={`#${p.id}`} className="glass group flex items-center gap-4 rounded-2xl px-5 py-4 transition-colors hover:border-white/20">
                <span className="font-mono text-2xl font-bold tracking-tight" style={{ color: `${ACCENT}aa` }}>
                  {p.index}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold text-white">{p.title}</span>
                  <span className="block truncate text-xs text-neutral-500">{p.kicker}</span>
                </span>
              </a>
            ))}
          </nav>
        </ScrollReveal>

        {PROJECTS.map((project) => (
          <ScrollReveal key={project.id}>
            <Spotlight accent={ACCENT} as="article" id={project.id} className="scroll-mt-28 overflow-hidden">
              <div className="grid gap-10 p-7 sm:p-10 lg:grid-cols-12 lg:p-14">
                <div className="lg:col-span-4">
                  <span aria-hidden className="block font-mono text-7xl font-black leading-none tracking-tighter sm:text-8xl" style={{ color: 'transparent', WebkitTextStroke: `1px ${ACCENT}66` }}>
                    {project.index}
                  </span>
                  <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-500">{project.kicker}</p>
                </div>
                <div className="space-y-7 lg:col-span-8">
                  <CardTitle accent={ACCENT}>{project.tag}</CardTitle>
                  <Rule accent={ACCENT} />
                  <p className="text-base leading-[1.85] text-neutral-300 sm:text-lg">{project.content}</p>
                  {project.link && (
                    <ExternalButton href={project.link} accent={ACCENT}>
                      {project.linkText}
                    </ExternalButton>
                  )}
                  {project.stages && <FiveE stages={project.stages} accent={ACCENT} />}
                  <div className="flex flex-wrap gap-2.5">
                    {project.metrics.map((m) => (
                      <Tag key={m} accent={ACCENT}>
                        {m}
                      </Tag>
                    ))}
                  </div>
                </div>
              </div>
              <div className="px-7 pb-7 sm:px-10 sm:pb-10 lg:px-14 lg:pb-14">
                <MediaGrid items={project.media} accent={ACCENT} layout={project.layout} />
              </div>
            </Spotlight>
          </ScrollReveal>
        ))}

        <ScrollReveal>
          <div className="pt-8">
            <SignOff accent={ACCENT}>END_ARCHIVE // PROJECT_INDEX</SignOff>
          </div>
        </ScrollReveal>
      </div>
    </>
  );
}
