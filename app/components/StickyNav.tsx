'use client';

import { useEffect, useState, Fragment } from 'react';
import Link from 'next/link';

const NAV_ITEMS = [
  { label: 'About', href: '/about', isAnchor: false },
  { label: 'Vitae', href: '/cv', isAnchor: false },
  { label: 'Certs', href: '/certifications', isAnchor: false },
];

export default function StickyNav() {
  const [activeSection, setActiveSection] = useState('');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // ONLY track the sections that are on the main page (isAnchor = true)
    // This prevents the DOMException when trying to query '/about' etc.
    const sectionEls = NAV_ITEMS
      .filter(item => item.isAnchor)
      .map((item) => document.querySelector(item.href) as HTMLElement)
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.1, rootMargin: '-80px 0px -50% 0px' }
    );

    sectionEls.forEach((el) => observer.observe(el));

    const handleScroll = () => {
      setScrolled(window.scrollY > 60);

      // Clear active highlight when in the hero area
      if (window.scrollY < 300) {
        setActiveSection('');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`sticky top-0 left-0 right-0 z-50 w-full border-b border-white/10 px-8 md:px-16 py-5 flex justify-between items-center font-mono text-xs font-semibold tracking-wider text-neutral-400 uppercase transition-all duration-500 ${
        scrolled ? 'bg-black/80 backdrop-blur-xl shadow-2xl shadow-black/30' : 'bg-transparent'
      }`}
    >
      <a
        href="#hero"
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className="hover:text-white transition-colors duration-500 cursor-pointer hidden md:block"
      >
        STATUS // LIVE ARCHIVE
      </a>
      <a
        href="#hero"
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className="hover:text-white transition-colors duration-500 cursor-pointer block md:hidden"
      >
        ARCHIVE
      </a>

      <div className="flex items-center gap-4 md:gap-6">
        {NAV_ITEMS.map((item, idx) => (
          <Fragment key={item.href}>
            {idx > 0 && <span className="text-neutral-800 hidden sm:inline">//</span>}
            {item.isAnchor ? (
              <a
                href={item.href}
                onClick={(e) => handleAnchorClick(e, item.href)}
                className={`relative transition-colors duration-500 ${
                  activeSection === item.href.slice(1)
                    ? 'text-white'
                    : 'hover:text-white'
                }`}
              >
                {item.label}
                {/* Active indicator underline */}
                <span
                  className={`absolute -bottom-1.5 left-0 h-px transition-all duration-500 ${
                    activeSection === item.href.slice(1)
                      ? 'w-full bg-white/60'
                      : 'w-0 bg-transparent'
                  }`}
                />
              </a>
            ) : (
              <Link
                href={item.href}
                className="relative transition-colors duration-500 hover:text-white"
              >
                {item.label}
              </Link>
            )}
          </Fragment>
        ))}
        <span className="text-neutral-800 hidden lg:inline">//</span>
        <span className="hidden lg:inline">ANKARA, TR // 2026</span>
      </div>
    </nav>
  );
}
