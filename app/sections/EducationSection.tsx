'use client';

import { useSpring, animated } from '@react-spring/web';
import AnimatedBorder from '../components/AnimatedBorder';
import ScrollReveal from '../components/ScrollReveal';
import ArtifactSlot from '../components/ArtifactSlot';
import useInViewport from '../hooks/useInViewport';

const ACCENT = '#AEEA00';

const METHODOLOGIES = [
  {
    code: 'CLT',
    name: 'Communicative Language Teaching',
    desc: 'Structuring realistic, high-impact communicative goals that prioritize meaning negotiation over mechanical accuracy. Lessons are built around authentic discourse scenarios, such as information gaps, role-plays, and opinion exchanges, that force genuine target-language production rather than scripted repetition.',
  },
  {
    code: 'PPP',
    name: 'Presentation → Practice → Production',
    desc: 'Designing systematic lessons through a clean three-phase architecture: controlled Presentation of target structures, guided Practice through scaffolded activities, and autonomous Production where learners deploy acquired language in unscripted, communicative contexts with decreasing teacher intervention.',
  },
  {
    code: 'PREPARE',
    name: 'UNESCO PREPARE Framework',
    desc: 'Utilizing structured UNESCO metrics to generate equitable, high-impact lesson outlines and acoustic educational materials. This framework emphasizes inclusive design, ensuring lesson accessibility across diverse learner profiles while maintaining rigorous pedagogical standards and measurable learning outcomes.',
  },
];

export default function EducationSection() {
  const { ref, hasBeenInView } = useInViewport({ threshold: 0.03 });

  const titleReveal = useSpring({
    opacity: hasBeenInView ? 1 : 0,
    transform: hasBeenInView ? 'scale(1)' : 'scale(0.9)',
    config: { mass: 1.2, tension: 100, friction: 28 },
    delay: 200,
  });

  const subtitleReveal = useSpring({
    opacity: hasBeenInView ? 1 : 0,
    transform: hasBeenInView ? 'scale(1)' : 'scale(0.95)',
    config: { mass: 1, tension: 120, friction: 26 },
    delay: 500,
  });

  return (
    <section id="education" ref={ref} className="relative">
      {/* Section accent glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1400px] h-[900px] pointer-events-none glow-pulse"
        style={{ background: `radial-gradient(ellipse at 50% 0%, ${ACCENT}0A 0%, transparent 70%)` }}
      />

      {/* Section Header Label */}
      <div className="w-full border-b border-white/10 bg-black/40 backdrop-blur-sm px-8 md:px-16 py-5 flex justify-end items-center font-mono text-xs md:text-sm text-neutral-400 font-medium tracking-widest uppercase relative z-10">
        <div className="flex items-center gap-3">
          <span className="inline-block w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: ACCENT }} />
          <span>SECTION: ACADEMIA</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-start px-8 md:px-16 py-28 relative z-10">
        <div className="w-full max-w-screen-2xl space-y-24">
          {/* Title Block */}
          <div className="space-y-6">
            <animated.div style={titleReveal}>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-[-0.05em] text-white leading-[0.95]">
                Academic Foundations &amp; Theory
              </h2>
            </animated.div>
            <animated.div style={subtitleReveal}>
              <div className="h-px w-20" style={{ backgroundColor: `${ACCENT}60` }} />
            </animated.div>
            <animated.div style={subtitleReveal}>
              <p className="font-mono text-xs md:text-sm tracking-widest text-neutral-400 font-medium uppercase">
                TED University // ELT Division
              </p>
            </animated.div>
          </div>

          {/* Institutional Profile + Artifact */}
          <ScrollReveal>
            <AnimatedBorder delay={400} accentColor={ACCENT}>
              <div className="backdrop-blur-md bg-zinc-950/40">
                <div className="p-10 md:p-14 lg:p-16 space-y-8">
                  <div className="flex items-center gap-4">
                    <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: ACCENT }} />
                    <span className="font-mono text-xl md:text-2xl lg:text-3xl tracking-[0.08em] font-bold uppercase leading-tight" style={{ color: ACCENT }}>
                      INSTITUTIONAL PROFILE
                    </span>
                  </div>
                  <div className="h-px w-full" style={{ backgroundColor: `${ACCENT}10` }} />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-5">
                      <p className="text-2xl md:text-3xl font-semibold tracking-[-0.02em] text-white">
                        TED University
                      </p>
                      <div className="space-y-3">
                        {[
                          ['Location', 'Ankara, Türkiye'],
                          ['Program', 'English Language Teaching (ELT)'],
                          ['Status', '3rd-Year Undergraduate'],
                          ['Track', 'Teacher Education & Applied Linguistics'],
                        ].map(([label, value], i) => (
                          <div key={i} className="flex items-baseline gap-4">
                            <span className="font-mono text-xs font-bold tracking-widest text-neutral-400/90 uppercase min-w-[90px]">{label}</span>
                            <span className="text-base md:text-lg text-neutral-300 font-sans">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <ArtifactSlot label="ARTIFACT_IMG_01 // CAMPUS_OVERVIEW" accentColor={ACCENT} imageUrl="image_d874e4.jpg" />
                  </div>
                </div>
              </div>
            </AnimatedBorder>
          </ScrollReveal>

          {/* Pedagogical Methodologies */}
          <ScrollReveal delay={100} variant="scaleFade">
            <AnimatedBorder delay={600} accentColor={ACCENT}>
              <div className="backdrop-blur-md bg-zinc-950/40 p-10 md:p-14 lg:p-16 space-y-8">
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: ACCENT }} />
                  <span className="font-mono text-xl md:text-2xl lg:text-3xl tracking-[0.08em] font-bold uppercase leading-tight" style={{ color: ACCENT }}>
                    PEDAGOGICAL METHODOLOGIES
                  </span>
                </div>
                <div className="h-px w-full" style={{ backgroundColor: `${ACCENT}10` }} />
                <p className="text-base md:text-lg lg:text-xl text-neutral-300 leading-[1.9] font-sans tracking-[0.01em]">
                  Training centers around deploying student-centered frameworks that prioritize active target-language production, moving decisively away from archaic rote memorization paradigms. The pedagogical philosophy is grounded in the belief that language acquisition occurs most effectively when learners are immersed in authentic communicative contexts with structured scaffolding that is gradually removed as competence develops.
                </p>
              </div>
            </AnimatedBorder>
          </ScrollReveal>

          {/* Theoretical Frameworks */}
          <div className="space-y-8">
            <ScrollReveal delay={50}>
              <p className="font-mono text-xs md:text-sm tracking-widest text-neutral-400 font-medium uppercase">
                Theoretical Frameworks //
              </p>
            </ScrollReveal>

            {METHODOLOGIES.map((method, idx) => (
              <ScrollReveal key={idx} delay={100 + idx * 120} variant="scaleFade">
                <AnimatedBorder delay={700 + idx * 250} accentColor={ACCENT}>
                  <div className="backdrop-blur-md bg-zinc-950/40 p-10 md:p-14 lg:p-16 space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      <span
                        className="font-mono text-[12px] font-bold tracking-[0.1em] uppercase px-3 py-1.5"
                        style={{ color: ACCENT, border: `1px solid ${ACCENT}30` }}
                      >
                        {method.code}
                      </span>
                      <span className="text-lg md:text-xl font-medium text-white tracking-[-0.01em]">
                        {method.name}
                      </span>
                    </div>
                    <p
                      className="text-base md:text-lg text-neutral-400 leading-[1.9] font-sans tracking-[0.01em] pl-6"
                      style={{ borderLeft: `2px solid ${ACCENT}20` }}
                    >
                      {method.desc}
                    </p>
                  </div>
                </AnimatedBorder>
              </ScrollReveal>
            ))}
          </div>

          {/* Societies & Leadership Engagement */}
          <ScrollReveal delay={150} variant="scaleFade">
            <AnimatedBorder delay={800} accentColor={ACCENT}>
              <div className="backdrop-blur-md bg-zinc-950/40 p-10 md:p-14 lg:p-16 space-y-8">
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: ACCENT }} />
                  <span className="font-mono text-xl md:text-2xl lg:text-3xl tracking-[0.08em] font-bold uppercase leading-tight" style={{ color: ACCENT }}>
                    SOCIETIES &amp; LEADERSHIP ENGAGEMENT
                  </span>
                </div>
                <div className="h-px w-full" style={{ backgroundColor: `${ACCENT}10` }} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-4">
                    <h3 className="text-xl md:text-2xl font-semibold text-white tracking-[-0.01em]">Institutional Footprint</h3>
                    <p className="text-base md:text-lg text-neutral-400 leading-[1.8] font-sans">
                      Active engagement within the TED University Directorate of Social and Cultural Affairs, participating in campus ecosystems focused on democratic participation, peer mentoring, and community building.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-xl md:text-2xl font-semibold text-white tracking-[-0.01em]">Competency Frameworks</h3>
                    <p className="text-base md:text-lg text-neutral-400 leading-[1.8] font-sans">
                      Researching and implementing digital competency frameworks and sustainable development goals (SDGs) to bridge the gap between regional student societies and global academic standards.
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedBorder>
          </ScrollReveal>

          {/* Erasmus+ Milestone */}
          <ScrollReveal delay={200} variant="scaleFade">
            <AnimatedBorder delay={1000} accentColor={ACCENT}>
              <div className="backdrop-blur-md bg-zinc-950/40 p-10 md:p-14 lg:p-16 space-y-8">
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: ACCENT }} />
                  <span className="font-mono text-xl md:text-2xl lg:text-3xl tracking-[0.08em] font-bold uppercase leading-tight" style={{ color: ACCENT }}>
                    GLOBAL MOBILITY CLEARANCE
                  </span>
                </div>
                <div className="h-px w-full" style={{ backgroundColor: `${ACCENT}10` }} />
                <p className="text-base md:text-lg lg:text-xl text-neutral-300 leading-[1.9] font-sans tracking-[0.01em]">
                  Successfully vetted and cleared for the international Erasmus+ Student Mobility tracks for the 2025–2026 academic calendar. This milestone validates cross-institutional academic standing and opens pathways for embedded pedagogical research within European university systems.
                </p>
                <div className="flex items-center gap-4 pt-2">
                  <span className="inline-block w-2.5 h-2.5 rounded-full animate-pulse" style={{ backgroundColor: ACCENT }} />
                  <span className="font-mono text-xs font-semibold tracking-wide uppercase" style={{ color: ACCENT }}>
                    Erasmus+ Cleared // 2025–2026
                  </span>
                </div>
              </div>
            </AnimatedBorder>
          </ScrollReveal>

          {/* Signature Divider */}
          <ScrollReveal delay={300}>
            <div className="flex items-center gap-6 pt-8">
              <div className="h-px flex-grow" style={{ backgroundColor: `${ACCENT}15` }} />
              <span className="font-mono text-xs md:text-sm tracking-widest text-neutral-400 font-medium uppercase">
                END_STREAM // ACADEMIC_MATRIX
              </span>
              <div className="h-px flex-grow" style={{ backgroundColor: `${ACCENT}15` }} />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
