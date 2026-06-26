'use client';

import { useSpring, animated } from '@react-spring/web';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import AnimatedBorder from '../components/AnimatedBorder';
import ScrollReveal from '../components/ScrollReveal';
import ArtifactSlot from '../components/ArtifactSlot';
import ImageLightbox from '../components/ImageLightbox';

const ACCENT = '#00E5FF';

interface TimelineEntry {
  tag: string;
  period: string;
  status: string;
  content: string;
  metrics: string[];
  artifact?: string;
  dualImages?: { label: string; src: string; alt: string; className?: string; }[];
  singleImage?: { label: string; src: string; alt: string; className?: string; };
  verticalStack?: { label: string; src: string; alt: string; className?: string; }[];
}

const TIMELINE: TimelineEntry[] = [
  {
    tag: 'OUTLIER // ADMINISTRATOR & AI MODEL TRAINER',
    period: '2024 – Present',
    status: 'ACTIVE',
    content:
      'Evaluate and curate dataset training environments for high-tier large language models within the Milky Way and Lightspeed tracking frameworks. Monitor model accuracy benchmarks, linguistic alignment, metadata validation, and conversational reasoning pipelines. Responsible for routing complex multi-turn dialogue evaluations and maintaining strict error tolerance across prompt-response pairs in advanced reasoning tasks.',
    metrics: ['Milky Way Framework', 'Lightspeed Accuracy', 'Multi-Turn Dialogue', 'Sub-1% Error Tolerance'],
    dualImages: [
      {
        label: 'CORPORATE IDENTITY // FRONTIER_ALIGNMENT',
        src: '/32476_32476_OutlierAIlogo.webp',
        alt: 'Outlier AI Logo'
      },
      {
        label: 'SYSTEM ENVIRONMENT // HUMAN_BRILLIANCE_INTERFACE',
        src: '/z6BS3awu1NyauoW9fWBXTFepDo.png',
        alt: 'Outlier UI Capture'
      }
    ]
  },
  {
    tag: 'TECHNOPAT // TECHNOLOGY JOURNALIST',
    period: '2024 – 2026',
    status: 'COMPLETED',
    content:
      'Translate hardware innovations, processing breakthroughs, and digital ecosystem trends into sharp, accessible technical narratives for consumers. Conduct hands-on RTX graphics hardware testing and benchmarking, write in-depth Fedora Linux kernel optimization guides, and analyze next-generation processing stacks, including AMD Zen architectures and Intel hybrid core topologies. Ensure editorial accuracy across GPU tier-lists and thermal performance deep-dives.',
    metrics: ['RTX Benchmarking', 'Linux Kernel Guides', 'GPU Analytics', 'Thermal Analysis'],
    verticalStack: [
      {
        label: 'EDITORIAL MASTHEAD // HARDWARE_LOGS',
        src: '/Technopat-Logo-1619x1080.jpg',
        alt: 'Technopat Master Logo',
        className: 'w-full h-auto object-contain img-rendering-crisp border border-cyan-500/10'
      },
      {
        label: 'COMMUNITY PLATFORM // SOCIAL_INTERFACE_CAPTURE',
        src: '/Screenshot 2026-06-03 181414.png',
        alt: 'Technopat Social Interface Overview',
        className: 'w-full h-auto object-contain border border-cyan-500/10 shadow-lg img-rendering-crisp'
      }
    ]
  },
  {
    tag: 'BRITISH SIDE // EXAMINATION INVIGILATOR',
    period: '2024 – Present',
    status: 'ACTIVE',
    content:
      'Managed operational compliance and security for international English-language examinations under British Council standardized protocols. Ensured strict adherence to regulatory frameworks, covering candidate identity verification, test-center conditions, synchronized timing, and the secure handling of post-examination materials.',
    metrics: ['British Council Protocol', 'Chain-of-Custody', 'Compliance Audit', 'Timing Sync'],
    verticalStack: [
      {
        label: 'REGULATORY PROTOCOL // INTERFACE_PORTAL',
        src: '/Screenshot 2026-06-03 175834.png',
        alt: 'British Side Portal Capture'
      },
      {
        label: 'ADMINISTRATIVE ALIGNMENT // CREDENTIAL_LOGS',
        src: '/Screenshot 2026-06-03 180009.png',
        alt: 'British Side Verification Capture'
      }
    ]
  },
];

export default function ExperiencePage() {
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
        src="/113380-697718104.mp4"
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
          <span>SECTION: CHRONOLOGY</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow flex flex-col items-center justify-start px-8 md:px-16 py-28 relative z-10">
        <div className="w-full max-w-screen-2xl space-y-24 relative z-10">
          {/* Title Block */}
          <div className="space-y-6">
            <animated.div style={titleReveal}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-[-0.05em] text-white leading-[0.95]">
                Professional Chronology
              </h1>
            </animated.div>
            <animated.div style={subtitleReveal}>
              <div className="h-px w-20" style={{ backgroundColor: `${ACCENT}60` }} />
            </animated.div>
            <animated.div style={subtitleReveal}>
              <p className="font-mono text-xs md:text-sm tracking-widest text-neutral-400 font-medium uppercase">
                Active System Logs
              </p>
            </animated.div>
          </div>

          {/* Timeline Entries */}
          <div className="space-y-16">
            {TIMELINE.map((entry, idx) => (
              <ScrollReveal key={idx} delay={idx * 150}>
                <AnimatedBorder delay={400 + idx * 300} accentColor={ACCENT}>
                  <div className="backdrop-blur-md bg-zinc-950/40">
                    <div className="p-10 md:p-14 lg:p-16 space-y-8">
                      {/* Tag + Period + Status */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: ACCENT }} />
                          <span className="font-mono text-xl md:text-2xl lg:text-3xl tracking-[0.08em] font-bold uppercase leading-tight" style={{ color: ACCENT }}>
                            {entry.tag}
                          </span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="font-mono text-sm font-medium tracking-wide text-neutral-300 uppercase">
                            {entry.period}
                          </span>
                          <span
                            className="font-mono text-sm font-medium tracking-wide text-neutral-300 uppercase px-3 py-1"
                            style={{
                              color: entry.status === 'ACTIVE' ? ACCENT : '#666',
                              border: `1px solid ${entry.status === 'ACTIVE' ? `${ACCENT}40` : '#333'}`,
                            }}
                          >
                            {entry.status}
                          </span>
                        </div>
                      </div>

                      <div className="h-px w-full" style={{ backgroundColor: `${ACCENT}10` }} />

                      {/* Body paragraph */}
                      <p className="text-base md:text-lg lg:text-xl text-neutral-300 leading-[1.9] font-sans tracking-[0.01em]">
                        {entry.content}
                      </p>

                      {/* Metric Tags */}
                      <div className="flex flex-wrap gap-3 pt-2">
                        {entry.metrics.map((metric, midx) => (
                          <span
                            key={midx}
                            className="font-mono text-xs font-semibold tracking-wide uppercase px-3 py-1.5 hover:bg-white/5 transition-colors duration-500 cursor-default"
                            style={{ color: `${ACCENT}99`, border: `1px solid ${ACCENT}25` }}
                          >
                            {metric}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Artifact Media Section */}
                    {entry.dualImages ? (
                      <div className="px-10 md:px-14 lg:px-16 pb-10 md:pb-14 lg:pb-16">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mt-8">
                          {entry.dualImages.map((img, i) => (
                            <div key={i} className="flex flex-col gap-4">
                              <span 
                                className="font-mono text-xs md:text-sm tracking-widest font-medium uppercase" 
                                style={{ color: ACCENT }}
                              >
                                {img.label}
                              </span>
                              <div className="relative w-full h-auto overflow-hidden bg-zinc-950/40">
                                <ImageLightbox src={img.src} alt={img.alt}>
                                  <img 
                                    src={img.src} 
                                    alt={img.alt} 
                                    className="w-full h-auto object-contain img-rendering-crisp border border-cyan-500/20 shadow-md" 
                                  />
                                </ImageLightbox>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : entry.singleImage ? (
                      <div className="px-10 md:px-14 lg:px-16 pb-10 md:pb-14 lg:pb-16">
                        <div className="flex flex-col gap-4 w-full mt-8">
                          <span 
                            className="font-mono text-xs md:text-sm tracking-widest font-medium uppercase" 
                            style={{ color: ACCENT }}
                          >
                            {entry.singleImage.label}
                          </span>
                          <div className="relative w-full h-auto overflow-hidden bg-zinc-950/40">
                            <ImageLightbox src={entry.singleImage.src} alt={entry.singleImage.alt}>
                              <img 
                                src={entry.singleImage.src} 
                                alt={entry.singleImage.alt} 
                                className="w-full h-auto object-contain img-rendering-crisp border border-cyan-500/10" 
                              />
                            </ImageLightbox>
                          </div>
                        </div>
                      </div>
                    ) : entry.verticalStack ? (
                      <div className="px-10 md:px-14 lg:px-16 pb-10 md:pb-14 lg:pb-16">
                        <div className="flex flex-col gap-8 w-full mt-8">
                          {entry.verticalStack.map((img, i) => (
                            <div key={i} className="flex flex-col gap-4">
                              <span 
                                className="font-mono text-xs md:text-sm tracking-widest font-medium uppercase" 
                                style={{ color: ACCENT }}
                              >
                                {img.label}
                              </span>
                              <div className="relative w-full h-auto overflow-hidden bg-zinc-950/40">
                                <ImageLightbox src={img.src} alt={img.alt}>
                                  <img 
                                    src={img.src} 
                                    alt={img.alt} 
                                    className={img.className || "w-full h-auto object-contain img-rendering-crisp border border-cyan-500/20"} 
                                  />
                                </ImageLightbox>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="px-10 md:px-14 lg:px-16 pb-10 md:pb-14 lg:pb-16">
                        <ArtifactSlot label={entry.artifact} accentColor={ACCENT} />
                      </div>
                    )}
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
                END_LOG // CHRONOLOGY_STREAM
              </span>
              <div className="h-px flex-grow" style={{ backgroundColor: `${ACCENT}15` }} />
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full border-t border-white/10 bg-black/40 backdrop-blur-sm px-8 md:px-16 py-5 flex justify-between items-center font-mono text-xs font-semibold tracking-wider text-neutral-400 uppercase relative z-10">
        <div>EXPERIENCE // SYSTEM LOGS</div>
        <div>ANKARA, TR // 2026</div>
      </div>
    </div>
  );
}
