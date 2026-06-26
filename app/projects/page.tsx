'use client';

import { useSpring, animated } from '@react-spring/web';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import AnimatedBorder from '../components/AnimatedBorder';
import ScrollReveal from '../components/ScrollReveal';
import ArtifactSlot from '../components/ArtifactSlot';
import ImageLightbox from '../components/ImageLightbox';

const ACCENT = '#D500F7';

const FIVE_E_STAGES = [
  { code: 'E1', name: 'Engage', desc: 'Activate prior knowledge through mystery-driven prompts and visual storytelling hooks.' },
  { code: 'E2', name: 'Explore', desc: 'Guided investigation of narrative elements through collaborative pair and group tasks.' },
  { code: 'E3', name: 'Explain', desc: 'Explicit instruction on target grammar and vocabulary within the narrative context.' },
  { code: 'E4', name: 'Elaborate', desc: 'Extended production activities where learners create original story branches.' },
  { code: 'E5', name: 'Evaluate', desc: 'Formative and summative assessment through storytelling performance tasks.' },
];

interface Project {
  tag: string;
  content: string;
  metrics: string[];
  stages?: any[];
  link?: string;
  linkText?: string;
  dualImages?: { label: string; src: string; alt: string; }[];
  slideGrid?: { label: string; src: string; alt: string; }[];
  highResImage?: { src: string; alt: string; };
  artifact?: string;
  imageUrl?: string;
}

const PROJECTS: Project[] = [
  {
    tag: 'LINGUISTIC RACE ENGINE',
    content: 'A custom-developed, gamified racing game module engineered to supercharge classroom interaction. It leverages competitive, rapid-fire sequencing mechanics and real-time vocabulary matching to turn syntactic drills into an active, high-velocity learning experience.',
    metrics: ['Gamified Learning', 'Real-Time Sequencing', 'Syntactic Drills', 'Interactive Module'],
    dualImages: [
      {
        label: 'ENGINE METRICS // THREE.JS_WORKSPACE',
        src: '/The Three.js coin collection code view.jpg',
        alt: 'Three.js Code Workspace'
      },
      {
        label: 'CAPTURE MATRIX // 3D_DRIVING_VIEW',
        src: '/The 3D driving simulator view.jpg',
        alt: '3D Driving Simulator'
      }
    ]
  },
  {
    tag: 'THE "BACKPACK MYSTERIES" MODULE',
    content: 'A comprehensive digital storytelling narrative designed for 6th-grade learners, fully scaffolded via the 5E Model (Engage, Explore, Explain, Elaborate, Evaluate) to drive contextual grammar retention. Designed to transform passive grammar instruction into an immersive narrative experience.',
    metrics: ['Digital Storytelling', '5E Model', 'Grade 6', 'Contextual Grammar', 'Narrative Experience'],
    stages: FIVE_E_STAGES,
    link: 'https://gamma.app/docs/Backpack-Mysteries-Telling-What-Happened-s6pnsanpxvctzom',
    linkText: 'VIEW SLIDE DECK // GAMMA_ENGINE →',
    slideGrid: [
      { label: 'INSTRUCTIONAL CANVAS // SLIDE_01', src: '/Screenshot 2026-06-03 175203.png', alt: 'Gamma Slide 01' },
      { label: 'TASK SCAFOLDING // SLIDE_02', src: '/Screenshot 2026-06-03 175224.png', alt: 'Gamma Slide 02' },
      { label: 'GRAMMAR EXCEPTIONS // SLIDE_03', src: '/Screenshot 2026-06-03 175242.png', alt: 'Gamma Slide 03' },
      { label: 'PRACTICE ASSESSMENT // SLIDE_04', src: '/Screenshot 2026-06-03 175302.png', alt: 'Gamma Slide 04' }
    ]
  },
  {
    tag: '"WHOSE IS IT?" INTERACTIVE GRAMMAR ENGINE',
    content: 'An inductive, inquiry-based grammar portal custom-engineered for 3rd-grade language learners. The platform systematically integrates an ecosystem of digital tools, including Bubbl.us concept mapping, Canva designs, Wordwall modules, StoryJumper digital books, Google Forms evaluation metrics, and Suno.com auditory assets, allowing students to apply, analyze, and evaluate possessive pronoun constructs within an active clothing-themed communicative network.',
    metrics: ['Web 2.0 Ecosystem', 'Inquiry-Based Learning', 'Grade 3', 'Digital Orchestration'],
    highResImage: {
      src: '/Web.2.0.png',
      alt: 'Web 2.0 Interactive Grammar Engine'
    },
    link: 'https://sites.google.com/view/possessive-pronouns-clothes/main-page',
    linkText: 'LAUNCH LIVE PORTAL // EXTERNAL_LINK →'
  }
];

export default function ProjectsPage() {
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
        style={{ zIndex: -20 }}
        src="/26797-359604163.mp4"
      />

      {/* Ambient page glow */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[1400px] h-[900px] pointer-events-none glow-pulse"
        style={{ background: `radial-gradient(ellipse at 50% 0%, ${ACCENT}0B 0%, transparent 70%)` }}
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
          <span>SECTION: ARCHIVE</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow flex flex-col items-center justify-start px-8 md:px-16 py-28 relative z-10">
        <div className="w-full max-w-screen-2xl space-y-24">
          {/* Title Block */}
          <div className="space-y-6">
            <animated.div style={titleReveal}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-[-0.05em] text-white leading-[0.95]">
                Selected Works & Research
              </h1>
            </animated.div>
            <animated.div style={subtitleReveal}>
              <div className="h-px w-20" style={{ backgroundColor: `${ACCENT}60` }} />
            </animated.div>
            <animated.div style={subtitleReveal}>
              <p className="font-mono text-xs md:text-sm tracking-widest text-neutral-400 font-medium uppercase">
                Dissertations & Modules
              </p>
            </animated.div>
          </div>

          {/* Render Projects Array */}
          {PROJECTS.map((project, idx) => (
            <ScrollReveal key={idx} delay={idx * 150}>
              <AnimatedBorder delay={400 + idx * 250} accentColor={ACCENT}>
                <div className="backdrop-blur-md bg-zinc-950/40">
                  <div className="p-10 md:p-14 lg:p-16 space-y-8">
                    <div className="flex items-center gap-4">
                      <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: ACCENT }} />
                      <span className="font-mono text-xl md:text-2xl lg:text-3xl tracking-[0.08em] font-bold uppercase leading-tight" style={{ color: ACCENT }}>
                        {project.tag}
                      </span>
                    </div>
                    <div className="h-px w-full" style={{ backgroundColor: `${ACCENT}10` }} />

                    <p className="text-base md:text-lg lg:text-xl text-neutral-300 leading-[1.9] font-sans tracking-[0.01em]">
                      {project.content}
                    </p>

                    {/* Live Link Button Injection */}
                    {project.link && (
                      <div className="pt-2">
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block font-mono text-xs md:text-sm tracking-[0.15em] font-bold px-6 py-4 uppercase transition-all duration-500 group/link"
                          style={{
                            color: ACCENT,
                            border: `1px solid ${ACCENT}`,
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = ACCENT;
                            e.currentTarget.style.color = '#000';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = ACCENT;
                          }}
                        >
                          {project.linkText}
                        </a>
                      </div>
                    )}

                    {/* Optional 5E Model Visual Breakdown */}
                    {project.stages && (
                      <div className="space-y-5 pt-2">
                        <p className="font-mono text-xs md:text-sm tracking-widest text-neutral-400 font-medium uppercase">
                          5E Instructional Architecture //
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                          {project.stages.map((stage, sidx) => (
                            <div
                              key={sidx}
                              className="p-5 md:p-6 space-y-3 backdrop-blur-sm bg-zinc-900/60 hover:bg-zinc-900/90 transition-colors duration-500"
                              style={{ borderTop: `2px solid ${ACCENT}40` }}
                            >
                              <span
                                className="font-mono text-xs md:text-sm font-bold tracking-[0.1em]"
                                style={{ color: ACCENT }}
                              >
                                {stage.code}
                              </span>
                              <p className="text-sm md:text-base font-medium text-white">{stage.name}</p>
                              <p className="text-sm text-neutral-500 leading-[1.7] font-sans">{stage.desc}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Metric Tags */}
                    <div className="flex flex-wrap gap-3 pt-2">
                      {project.metrics.map((tag, i) => (
                        <span
                          key={i}
                          className="font-mono text-xs font-semibold tracking-wide uppercase px-3 py-1.5 hover:bg-white/5 transition-colors duration-500 cursor-default"
                          style={{ color: `${ACCENT}99`, border: `1px solid ${ACCENT}25` }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Artifact Media Section */}
                  {project.dualImages ? (
                    <div className="px-10 md:px-14 lg:px-16 pb-10 md:pb-14 lg:pb-16">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full mt-8">
                        {project.dualImages.map((img, i) => (
                          <div key={i} className="flex flex-col gap-4">
                            <span 
                              className="font-mono text-[11px] tracking-[0.2em] font-medium uppercase" 
                              style={{ color: ACCENT }}
                            >
                              {img.label}
                            </span>
                            {/* High-res container wrapper */}
                            <ImageLightbox src={img.src} alt={img.alt}>
                              <div className="relative w-full h-auto overflow-hidden bg-zinc-950/40">
                                <img 
                                  src={img.src} 
                                  alt={img.alt} 
                                  className="w-full h-auto object-contain rounded-none border border-purple-500/30 shadow-lg img-rendering-crisp" 
                                />
                              </div>
                            </ImageLightbox>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : project.slideGrid ? (
                    <div className="px-10 md:px-14 lg:px-16 pb-10 md:pb-14 lg:pb-16">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mt-8">
                        {project.slideGrid.map((img, i) => (
                          <div key={i} className="flex flex-col gap-4">
                            <span 
                              className="font-mono text-[11px] tracking-[0.2em] font-medium uppercase" 
                              style={{ color: ACCENT }}
                            >
                              {img.label}
                            </span>
                            <ImageLightbox src={img.src} alt={img.alt}>
                              <img 
                                src={img.src} 
                                alt={img.alt} 
                                className="w-full h-auto object-contain img-rendering-crisp border border-emerald-500/20 shadow-lg" 
                              />
                            </ImageLightbox>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : project.highResImage ? (
                    <div className="px-10 md:px-14 lg:px-16 pb-10 md:pb-14 lg:pb-16">
                      <div className="relative w-full h-auto overflow-hidden group shadow-lg">
                        <ImageLightbox src={project.highResImage.src} alt={project.highResImage.alt}>
                          <img 
                            src={project.highResImage.src} 
                            alt={project.highResImage.alt} 
                            className="w-full h-auto object-contain img-rendering-crisp border border-white/10 transition-all duration-700 group-hover:border-[#D500F7]/50" 
                          />
                          <div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10"
                            style={{
                              background: `linear-gradient(180deg, transparent 0%, ${ACCENT}20 50%, transparent 100%)`,
                            }}
                          />
                        </ImageLightbox>
                      </div>
                    </div>
                  ) : (
                    <div className="px-10 md:px-14 lg:px-16 pb-10 md:pb-14 lg:pb-16">
                      <ArtifactSlot label={project.artifact} accentColor={ACCENT} imageUrl={project.imageUrl} />
                    </div>
                  )}
                </div>
              </AnimatedBorder>
            </ScrollReveal>
          ))}

          {/* Signature Divider */}
          <ScrollReveal delay={200}>
            <div className="flex items-center gap-6 pt-8">
              <div className="h-px flex-grow" style={{ backgroundColor: `${ACCENT}15` }} />
              <span className="font-mono text-xs md:text-sm tracking-widest text-neutral-400 font-medium uppercase">
                END_ARCHIVE // PROJECT_INDEX
              </span>
              <div className="h-px flex-grow" style={{ backgroundColor: `${ACCENT}15` }} />
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full border-t border-white/10 bg-black/40 backdrop-blur-sm px-8 md:px-16 py-5 flex justify-between items-center font-mono text-xs font-semibold tracking-wider text-neutral-400 uppercase relative z-10">
        <div>PROJECTS // ARCHIVE INDEX</div>
        <div>ANKARA, TR // 2026</div>
      </div>
    </div>
  );
}
