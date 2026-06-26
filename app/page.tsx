'use client';

import { useSpring, animated } from '@react-spring/web';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const PILLARS = [
  {
    tag: '01 // ENGINE',
    title: 'AI Language Architect',
    desc: 'Training advanced large language models to master contextual nuance, reasoning, and human-like interaction at Outlier.',
    href: '/experience',
  },
  {
    tag: '02 // DESIGN',
    title: 'Educational Innovator',
    desc: 'Revolutionizing English Language Teaching at TED University through digital storytelling, interactive frameworks, and modern pedagogy.',
    href: '/education',
  },
  {
    tag: '03 // EDTECH ARCHITECTURE',
    title: 'Digital Learning Architect',
    desc: 'Blending custom 3D game engines, 5E storytelling frameworks, and Web 2.0 micro-portals to revolutionize grammar retention and learner engagement.',
    href: '/projects',
  }
];

const MARQUEE_ITEMS = ['AI Training', 'ELT Pedagogy', 'Tech Journalism', 'Software Architecture', '3D Printing', 'Hardware Analytics'];

export default function HomePage() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setLoaded(true); }, []);

  const fadeIn = useSpring({
    opacity: loaded ? 1 : 0,
    transform: loaded ? 'translateY(0px)' : 'translateY(30px)',
    config: { mass: 1, tension: 120, friction: 26 },
    delay: 200
  });

  const heroTitle = useSpring({
    opacity: loaded ? 1 : 0,
    transform: loaded ? 'translateY(0px)' : 'translateY(50px)',
    config: { mass: 1.2, tension: 100, friction: 28 },
    delay: 100
  });

  const hereSub = useSpring({
    opacity: loaded ? 1 : 0,
    transform: loaded ? 'translateY(0px)' : 'translateY(30px)',
    config: { mass: 1, tension: 120, friction: 26 },
    delay: 500
  });

  return (
    <div className="min-h-screen w-full bg-[#050505] text-white font-inter flex flex-col justify-between selection:bg-white selection:text-black antialiased relative">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee { animation: marquee 35s linear infinite; }
      `}</style>

      {/* FULL-SCREEN AMBIENT BACKGROUND LAYER */}
      <div
        className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden opacity-20 mix-blend-screen select-none"
        style={{
          maskImage: 'radial-gradient(circle at center, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 80%)',
          WebkitMaskImage: 'radial-gradient(circle at center, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 80%)'
        }}
      >
        <img
          src="/pacto-visual-cWOzOnSoh6Q-unsplash.jpg"
          alt="Ambient Background"
          className="w-full h-full object-cover object-center img-rendering-crisp"
        />
      </div>

      {/* Top Navigation Bar Component */}
      <div className="w-full border-b border-white/10 px-8 md:px-16 py-5 flex justify-between items-center font-mono text-xs font-semibold tracking-wider text-neutral-400 uppercase">
        <div>STATUS // LIVE ARCHIVE</div>
        <div className="flex items-center gap-6">
          <Link href="/about" className="hover:text-white transition-colors duration-500">
            About
          </Link>
          <span className="text-neutral-800">//</span>
          <Link href="/cv" className="hover:text-white transition-colors duration-500">
            Vitae
          </Link>
          <span className="text-neutral-800">//</span>
          <Link href="/certifications" className="hover:text-white transition-colors duration-500">
            Certs
          </Link>
          <span className="text-neutral-800">//</span>
          <span>ANKARA, TR // 2026</span>
        </div>
      </div>

      {/* Main Hero Header Canvas */}
      <div className="w-full max-w-screen-2xl mx-auto px-8 md:px-16 pt-32 pb-24 flex flex-col items-center text-center flex-grow justify-center">
        <div className="space-y-8">
          <animated.div style={heroTitle}>
            <h1 className="text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] font-black tracking-[-0.06em] text-white selection:bg-white selection:text-black leading-[0.9] relative w-full z-10 block overflow-visible">
              <span className="relative z-10">Ozan Özen</span>
            </h1>
          </animated.div>
          <animated.div style={fadeIn}>
            <div className="h-px w-20 bg-white/30 mx-auto" />
          </animated.div>
          <animated.div style={hereSub}>
            <p className="max-w-3xl text-base md:text-lg lg:text-xl text-neutral-400 font-sans leading-relaxed tracking-[0.02em] mx-auto">
              Shaping the frontier of language and logic. English Language Educator, AI Model Trainer, and Tech Journalist bridging the gap between human expression and machine intelligence.
            </p>
          </animated.div>
        </div>
      </div>

      {/* Interactive Feature Matrix Grid */}
      <div className="w-full border-t border-white/10 bg-black/40 backdrop-blur-md">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-3 border-x border-white/10 divide-y md:divide-y-0 md:divide-x divide-white/10">
          {PILLARS.map((pillar, idx) => (
            <Link
              key={idx}
              href={pillar.href}
              className="group relative p-10 md:p-14 lg:p-16 flex flex-col justify-between transition-all duration-700 hover:bg-white/[0.015] cursor-pointer overflow-hidden min-h-[320px]"
            >
              {/* Layer 1: Premium Ambient Radial Bloom */}
              <div
                className="absolute inset-0 opacity-0 transition-opacity duration-1000 group-hover:opacity-100 pointer-events-none"
                style={{ background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.05) 0%, transparent 80%)' }}
              />
              {/* Layer 2: Top-Edge Highlight Line */}
              <div
                className="absolute top-0 left-0 right-0 h-px opacity-0 transition-opacity duration-700 group-hover:opacity-60 pointer-events-none"
                style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)' }}
              />

              <div className="relative z-10 flex flex-col h-full w-full">
                <div className="flex justify-between items-center w-full mb-10">
                  <span className="font-mono text-xs md:text-sm text-neutral-400 font-medium tracking-widest uppercase">{pillar.tag}</span>
                  <span className="text-neutral-600 opacity-0 group-hover:opacity-100 group-hover:text-white group-hover:translate-x-1.5 transition-all duration-500 text-sm">→</span>
                </div>

                <div className="space-y-5 flex-grow">
                  <h3 className="text-2xl md:text-3xl font-semibold tracking-[-0.02em] text-white group-hover:text-zinc-200 transition-colors duration-500">
                    {pillar.title}
                  </h3>
                  <p className="text-base md:text-lg text-neutral-400 leading-[1.7] font-sans tracking-[0.01em]">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Modern Infinite Smooth Scroll Marquee Footer */}
      <div className="w-full py-5 bg-black border-t border-white/10 overflow-hidden group">
        <div className="flex whitespace-nowrap animate-marquee group-hover:[animation-play-state:paused] cursor-default">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="mx-12 font-mono text-xs md:text-sm font-medium uppercase tracking-widest text-neutral-400 hover:text-white transition-colors duration-300 flex items-center gap-5">
              {item} <span className="text-neutral-800 text-xs">//</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}