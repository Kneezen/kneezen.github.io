'use client';

import { useSpring, animated } from '@react-spring/web';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import AnimatedBorder from '../components/AnimatedBorder';
import ScrollReveal from '../components/ScrollReveal';

const ACCENT = '#FFB300';

const CV_SECTIONS = [
  {
    category: 'EDUCATION & ENGAGEMENT',
    entries: [
      { label: 'Institution', value: 'TED University, Ankara, Türkiye' },
      { label: 'Program', value: 'English Language Teaching (ELT)' },
      { label: 'Status', value: '3rd-Year Undergraduate' },
      { label: 'Track', value: 'Teacher Education & Applied Linguistics' },
      { label: 'Mobility', value: 'Erasmus+ Cleared (2025–2026)' },
      { label: 'Society', value: 'Directorate of Social and Cultural Affairs Engagement' },
    ],
  },
  {
    category: 'EXPERIENCE',
    entries: [
      { label: 'Outlier', value: 'Project Administrator (2024–Present)' },
      { label: 'Outlier', value: 'AI Language Model Trainer (2024–Present)' },
      { label: 'Technopat', value: 'Technology Journalist (2024–2026)' },
      { label: 'British Side', value: 'Examination Invigilator (2024–Present)' },
      { label: 'Freelance', value: 'Digital Architecture & UI/UX Design' },
      { label: 'Academic', value: 'Pedagogical Materials Developer' },
    ],
  },
  {
    category: 'PROJECTS & MODULES',
    entries: [
      { label: 'Race Engine', value: 'Linguistic Race Engine | Gamified Syntax & Vocabulary Module' },
      { label: 'Storytelling', value: <span className="inline-flex items-center gap-3 flex-wrap">Backpack Mysteries | 5E Model Narrative Framework <a href="https://gamma.app/docs/Backpack-Mysteries-Telling-What-Happened-s6pnsanpxvctzom" target="_blank" rel="noopener noreferrer" className="font-mono text-xs font-semibold tracking-wide px-3 py-1.5 border transition-colors hover:bg-white hover:text-black shrink-0" style={{ borderColor: 'rgba(255,255,255,0.2)' }}>GAMMA_ENGINE</a></span> as any },
      { label: 'Suite', value: 'Interactive Engagement Suite | Kahoot, Design-a-Creature, Robot Architecture' },
      { label: 'Grammar', value: <span className="inline-flex items-center gap-3 flex-wrap">Whose Is It? Interactive Grammar Engine <a href="https://sites.google.com/view/possessive-pronouns-clothes/main-page" target="_blank" rel="noopener noreferrer" className="font-mono text-xs font-semibold tracking-wide px-3 py-1.5 border transition-colors hover:bg-white hover:text-black shrink-0" style={{ borderColor: 'rgba(255,255,255,0.2)' }}>LIVE LINK</a></span> as any },
    ],
  },
  {
    category: 'TECHNICAL COMPETENCIES',
    entries: [
      { label: 'AI/ML', value: 'LLM Training, Dataset Curation, Prompt Engineering, Accuracy Benchmarking' },
      { label: 'Journalism', value: 'Technical Writing, Hardware Analysis, Trend Reporting, GPU Benchmarking' },
      { label: 'Fabrication', value: '3D Printing, Rapid Prototyping, CAD Modeling' },
      { label: 'Software', value: 'Web Architecture, Next.js, TypeScript, Modern Frameworks' },
      { label: 'Systems', value: 'Fedora Linux, Kernel Optimization, CLI Workflows' },
    ],
  },
  {
    category: 'METHODOLOGICAL STACK',
    entries: [
      { label: 'CLT', value: 'Communicative Language Teaching | Meaning-Focused Interaction' },
      { label: 'PPP', value: 'Presentation → Practice → Production Pipeline' },
      { label: 'PREPARE', value: 'UNESCO Equitable Lesson Framework & Acoustic Materials' },
      { label: '5E Model', value: 'Engage → Explore → Explain → Elaborate → Evaluate' },
    ],
  },
];

export default function CVPage() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setLoaded(true); }, []);

  const titleReveal = useSpring({
    opacity: loaded ? 1 : 0,
    transform: loaded ? 'translateY(0px)' : 'translateY(50px)',
    config: { mass: 1.2, tension: 100, friction: 28 },
    delay: 200,
  });

  const subtitleReveal = useSpring({
    opacity: loaded ? 1 : 0,
    transform: loaded ? 'translateY(0px)' : 'translateY(30px)',
    config: { mass: 1, tension: 120, friction: 26 },
    delay: 500,
  });

  return (
    <div className="min-h-screen w-full bg-transparent text-white font-inter flex flex-col selection:bg-white selection:text-black antialiased relative">
      {/* GLOBAL FIXED VIDEO FLOOR */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed top-0 left-0 w-screen h-screen object-cover pointer-events-none opacity-30"
        style={{ zIndex: 0 }}
        src="/272517.mp4"
      />

      {/* Ambient page glow */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[700px] pointer-events-none glow-pulse"
        style={{ background: `radial-gradient(ellipse at 50% 0%, ${ACCENT}09 0%, transparent 70%)` }}
      />

      {/* Back Navigation */}
      <Link
        href="/"
        className="fixed top-6 left-8 z-50 font-mono text-xs font-semibold tracking-wider text-neutral-400 uppercase hover-flicker transition-colors duration-500"
      >
        ← RETURN TO CANVAS
      </Link>

      {/* Page Header */}
      <div className="w-full border-b border-white/10 bg-black/40 backdrop-blur-sm px-8 md:px-16 py-5 flex justify-end items-center font-mono text-xs md:text-sm text-neutral-400 font-medium tracking-widest uppercase relative z-10">
        <div className="flex items-center gap-3">
          <span className="inline-block w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: ACCENT }} />
          <span>SECTION: VITAE</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow flex flex-col items-center justify-start px-8 md:px-16 py-28 relative z-10">
        <div className="w-full max-w-screen-2xl space-y-24">
          {/* Title Block */}
          <div className="space-y-6">
            <animated.div style={titleReveal}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-[-0.05em] text-white leading-[0.95]">
                Master Matrix
              </h1>
            </animated.div>
            <animated.div style={subtitleReveal}>
              <div className="h-px w-20" style={{ backgroundColor: `${ACCENT}60` }} />
            </animated.div>
            <animated.div style={subtitleReveal}>
              <p className="font-mono text-xs md:text-sm tracking-widest text-neutral-400 font-medium uppercase">
                Curriculum Vitae
              </p>
            </animated.div>
          </div>

          {/* CV Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {CV_SECTIONS.map((section, idx) => (
              <ScrollReveal key={idx} delay={idx * 120}>
                <AnimatedBorder delay={400 + idx * 200} accentColor={ACCENT}>
                  <div className="backdrop-blur-md bg-zinc-950/40 p-10 md:p-14 lg:p-16 space-y-8 h-full">
                    <div className="flex items-center gap-4">
                      <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: ACCENT }} />
                      <span className="font-mono text-xl md:text-2xl lg:text-3xl tracking-[0.08em] font-bold uppercase leading-tight" style={{ color: ACCENT }}>
                        {section.category}
                      </span>
                    </div>
                    <div className="h-px w-full" style={{ backgroundColor: `${ACCENT}10` }} />
                    <div className="space-y-0">
                      {section.entries.map((entry, eidx) => (
                        <div
                          key={eidx}
                          className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-5 py-4 border-b border-white/5 last:border-b-0 group/row hover:bg-white/[0.02] transition-colors duration-500 -mx-3 px-3 rounded-sm"
                        >
                          <span className="font-mono text-xs font-bold tracking-widest text-neutral-400/90 uppercase shrink-0 min-w-[100px]">
                            {entry.label}
                          </span>
                          <span className="text-base md:text-lg text-neutral-300 font-sans tracking-[0.01em] leading-[1.6]">
                            {entry.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </AnimatedBorder>
              </ScrollReveal>
            ))}
          </div>

          {/* Signature Divider */}
          <ScrollReveal delay={200}>
            <div className="flex items-center gap-6 pt-8">
              <div className="h-px flex-grow" style={{ backgroundColor: `${ACCENT}15` }} />
              <span className="font-mono text-xs md:text-sm tracking-widest text-neutral-400 font-medium uppercase">
                END_MATRIX // VITAE_COMPLETE
              </span>
              <div className="h-px flex-grow" style={{ backgroundColor: `${ACCENT}15` }} />
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full border-t border-white/10 bg-black/40 backdrop-blur-sm px-8 md:px-16 py-5 flex justify-between items-center font-mono text-xs font-semibold tracking-wider text-neutral-400 uppercase relative z-10">
        <div>CV // MASTER MATRIX</div>
        <div>ANKARA, TR // 2026</div>
      </div>
    </div>
  );
}
