'use client';

import { useSpring, animated } from '@react-spring/web';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import AnimatedBorder from '../components/AnimatedBorder';
import ScrollReveal from '../components/ScrollReveal';

const ACCENT = '#FFB300';

const CERTIFICATIONS = [
  {
    tag: 'WEB 2.0 TOOL INTEGRATION',
    content: 'Completed advanced certification focused on deploying and managing modern Web 2.0 digital ecosystems in educational environments. Mastery of integrating platforms like Wordwall, Bubbl.us, Canva, and StoryJumper into systematic inquiry-based language learning modules.',
    metrics: ['Digital Ecosystems', 'EdTech Deployment', 'Interactive Tooling', 'System Integration'],
    image: '/houston_web2_certificate.png',
  },
  {
    tag: 'TEACHING TIPS FOR TRICKY ENGLISH GRAMMAR',
    content: 'Specialized credentialing in addressing high-friction grammatical concepts. Focused on utilizing structured Presentation-Practice-Production (PPP) pipelines and contextual scaffolding to resolve persistent learner errors in complex syntax and morphosyntactic structures.',
    metrics: ['Syntax Resolution', 'Contextual Scaffolding', 'PPP Pipelines', 'Error Remediation'],
    image: '/uci_grammar_certificate.png',
  },
  {
    tag: 'IBM SKILLSBUILD // BUILD YOUR FIRST CHATBOT',
    content: 'Completed rigorous technical training within the IBM SkillsBuild enterprise framework to architect and deploy intelligent conversational agents. This certification covers the end-to-end lifecycle of chatbot development, including intent classification, entity extraction, dialogue flow design, and integration with Watson assistant technologies to handle complex, multi-turn user interactions.',
    metrics: ['Conversational AI', 'IBM SkillsBuild', 'Dialogue Flow', 'Watson Technologies'],
    image: '/ibm_chatbot_badge.png',
  },
  {
    tag: 'IBM SKILLSBUILD // GRANITE MODELS FOR SOFTWARE DEVELOPMENT',
    content: 'Mastered the application of IBM\'s proprietary Granite foundational models designed specifically for enterprise-grade software engineering. The certification focuses on leveraging highly-specialized large language models to accelerate code generation, optimize software architectures, and streamline complex development workflows within secure, professional environments.',
    metrics: ['IBM Granite Models', 'LLM Deployment', 'Code Generation', 'Enterprise AI'],
    image: '/ibm_granite_badge.png',
  },
  {
    tag: 'LINKEDIN LEARNING // CRITICAL THINKING & DECISION MAKING',
    content: 'Advanced professional credentialing focused on high-stakes analytical reasoning and strategic decision-making frameworks. Mastery of neutralizing cognitive biases, structuring complex problem-solving architectures, and executing data-driven judgments within fast-paced enterprise environments.',
    metrics: ['Analytical Reasoning', 'Cognitive Architecture', 'Decision-Making', 'Strategic Framing'],
    image: '/linkedin_critical_thinking.png',
  },
  {
    tag: 'IBM SKILLSBUILD // BUILD AN AI AGENT',
    content: 'Completed advanced architectural training in designing and deploying autonomous AI agents. Expertise in integrating large language models with tool-use capabilities, orchestrating multi-agent systems, and building robust, production-ready AI frameworks capable of executing complex, multi-step reasoning workflows independently.',
    metrics: ['Autonomous Agents', 'LLM Orchestration', 'Multi-Agent Systems', 'Tool Integration'],
    image: '/ibm_ai_agent.png',
  },
  {
    tag: 'IBM SKILLSBUILD // WEB DEVELOPMENT FUNDAMENTALS',
    content: 'Earned professional certification in core web development principles through IBM\'s SkillsBuild platform. Comprehensive mastery of HTML5, CSS3, and JavaScript fundamentals, along with responsive design methodologies, accessibility standards, and modern front-end development workflows essential for building production-grade web applications.',
    metrics: ['HTML5 & CSS3', 'JavaScript', 'Responsive Design', 'Front-End Architecture'],
    image: '/Screenshot 2026-06-25 162819.png',
  },
  {
    tag: 'IBM SKILLSBUILD // ARTIFICIAL INTELLIGENCE FUNDAMENTALS',
    content: 'Completed foundational certification in artificial intelligence through IBM\'s enterprise learning ecosystem. Deep understanding of core AI concepts including machine learning paradigms, neural network architectures, natural language processing pipelines, and the ethical frameworks governing responsible AI deployment across industry verticals.',
    metrics: ['Machine Learning', 'Neural Networks', 'NLP Pipelines', 'AI Ethics'],
    image: '/Screenshot 2026-06-25 162838.png',
  },
  {
    tag: 'LINKEDIN LEARNING // WHAT IS GENERATIVE AI?',
    content: 'Advanced professional credentialing in the foundational principles and enterprise applications of generative artificial intelligence. Mastery of large language model architectures, diffusion-based generation systems, prompt engineering methodologies, and the strategic frameworks for evaluating and deploying generative AI solutions within professional workflows.',
    metrics: ['Generative AI', 'LLM Architecture', 'Prompt Engineering', 'AI Strategy'],
    image: '/Screenshot 2026-06-25 162755.png',
  }
];

export default function CertificationsPage() {
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
        src="/235285.mp4"
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
          <span>SECTION: CERTIFICATIONS</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow flex flex-col items-center justify-start px-8 md:px-16 py-28 relative z-10">
        <div className="w-full max-w-screen-2xl space-y-24">
          {/* Title Block */}
          <div className="space-y-6">
            <animated.div style={titleReveal}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-[-0.05em] text-white leading-[0.95]">
                Credentials & Mastery
              </h1>
            </animated.div>
            <animated.div style={subtitleReveal}>
              <div className="h-px w-20" style={{ backgroundColor: `${ACCENT}60` }} />
            </animated.div>
            <animated.div style={subtitleReveal}>
              <p className="font-mono text-xs md:text-sm tracking-widest text-neutral-400 font-medium uppercase">
                Professional Accreditations
              </p>
            </animated.div>
          </div>

          {/* Render Certifications Array */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {CERTIFICATIONS.slice(0, -1).map((cert, idx) => (
              <ScrollReveal key={idx} delay={idx * 150} className="h-full">
                <AnimatedBorder delay={400 + idx * 250} accentColor={ACCENT}>
                  <div className="backdrop-blur-md bg-zinc-950/40 p-10 md:p-14 lg:p-16 space-y-8 h-full">
                    <div className="flex items-center gap-4">
                      <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: ACCENT }} />
                      <span className="font-mono text-xl md:text-2xl lg:text-3xl tracking-[0.08em] font-bold uppercase leading-tight" style={{ color: ACCENT }}>
                        {cert.tag}
                      </span>
                    </div>
                    <div className="h-px w-full" style={{ backgroundColor: `${ACCENT}10` }} />

                    <p className="text-base md:text-lg lg:text-xl text-neutral-300 leading-[1.9] font-sans tracking-[0.01em]">
                      {cert.content}
                    </p>

                    {/* Certificate Image */}
                    {cert.image && (
                      <div className="pt-6 pb-2">
                        <div className="relative w-full overflow-hidden border border-white/10 shadow-2xl group">
                          <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />
                          <img 
                            src={cert.image} 
                            alt={`${cert.tag} Certificate`}
                            className="w-full h-auto object-contain img-rendering-crisp transition-transform duration-700 group-hover:scale-[1.02]"
                          />
                        </div>
                      </div>
                    )}

                    {/* Metric Tags */}
                    <div className="flex flex-wrap gap-3 pt-4">
                      {cert.metrics.map((tag, i) => (
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
                </AnimatedBorder>
              </ScrollReveal>
            ))}
          </div>

          {/* Centered Last Certification */}
          {(() => {
            const cert = CERTIFICATIONS[CERTIFICATIONS.length - 1];
            const idx = CERTIFICATIONS.length - 1;
            return (
              <div className="flex justify-center -mt-14">
                <div className="w-full md:w-1/2">
                  <ScrollReveal delay={idx * 150} className="h-full">
                    <AnimatedBorder delay={400 + idx * 250} accentColor={ACCENT}>
                      <div className="backdrop-blur-md bg-zinc-950/40 p-10 md:p-14 lg:p-16 space-y-8 h-full">
                        <div className="flex items-center gap-4">
                          <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: ACCENT }} />
                          <span className="font-mono text-xl md:text-2xl lg:text-3xl tracking-[0.08em] font-bold uppercase leading-tight" style={{ color: ACCENT }}>
                            {cert.tag}
                          </span>
                        </div>
                        <div className="h-px w-full" style={{ backgroundColor: `${ACCENT}10` }} />

                        <p className="text-base md:text-lg lg:text-xl text-neutral-300 leading-[1.9] font-sans tracking-[0.01em]">
                          {cert.content}
                        </p>

                        {cert.image && (
                          <div className="pt-6 pb-2">
                            <div className="relative w-full overflow-hidden border border-white/10 shadow-2xl group">
                              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />
                              <img 
                                src={cert.image} 
                                alt={`${cert.tag} Certificate`}
                                className="w-full h-auto object-contain img-rendering-crisp transition-transform duration-700 group-hover:scale-[1.02]"
                              />
                            </div>
                          </div>
                        )}

                        <div className="flex flex-wrap gap-3 pt-4">
                          {cert.metrics.map((tag, i) => (
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
                    </AnimatedBorder>
                  </ScrollReveal>
                </div>
              </div>
            );
          })()}

          {/* Signature Divider */}
          <ScrollReveal delay={200}>
            <div className="flex items-center gap-6 pt-8">
              <div className="h-px flex-grow" style={{ backgroundColor: `${ACCENT}15` }} />
              <span className="font-mono text-xs md:text-sm tracking-widest text-neutral-400 font-medium uppercase">
                END_ARCHIVE // CERTIFICATIONS_INDEX
              </span>
              <div className="h-px flex-grow" style={{ backgroundColor: `${ACCENT}15` }} />
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full border-t border-white/10 bg-black/40 backdrop-blur-sm px-8 md:px-16 py-5 flex justify-between items-center font-mono text-xs font-semibold tracking-wider text-neutral-400 uppercase relative z-10">
        <div>CREDENTIALS // MASTERY INDEX</div>
        <div>ANKARA, TR // 2026</div>
      </div>
    </div>
  );
}
