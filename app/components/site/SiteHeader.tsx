'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState, useSyncExternalStore } from 'react';
import { Command, Menu, X } from 'lucide-react';
import { ACCENTS, NAV, PROFILE } from '../../data/profile';

export const openPalette = () => window.dispatchEvent(new CustomEvent('palette:open'));

export default function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isMac = useSyncExternalStore(
    () => () => {},
    () => /Mac|iPhone|iPad/.test(navigator.userAgent),
    () => true
  );
  const [prevPath, setPrevPath] = useState(pathname);
  if (pathname !== prevPath) {
    setPrevPath(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > 320 && y > last + 4);
      if (y < last - 4) setHidden(false);
      last = y;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const active = NAV.find((n) => pathname === n.href || pathname.startsWith(n.href + '/'));

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-black">
        Skip to content
      </a>
      <header
        style={{ viewTransitionName: 'site-header' }}
        className={`no-print fixed inset-x-0 top-0 z-[90] transition-transform duration-500 ease-expo ${hidden && !menuOpen ? '-translate-y-full' : 'translate-y-0'}`}
      >
        <div className={`mx-auto flex max-w-screen-2xl items-center justify-between gap-4 px-4 transition-all duration-500 ease-expo sm:px-8 ${scrolled ? 'py-3' : 'py-5'}`}>
          <Link href="/" data-egg="logo" aria-label={`${PROFILE.name}, home`} className="group flex items-center gap-3">
            <span className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-full border border-white/15 bg-white/[0.04] backdrop-blur-md transition-colors duration-500 group-hover:border-white/40">
              <span className="font-mono text-[13px] font-bold tracking-tight">OÖ</span>
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </span>
            <span className="hidden flex-col leading-none md:flex">
              <span className="text-sm font-semibold tracking-tight">{PROFILE.name}</span>
              <span className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500">{active ? `// ${active.code}` : '// LIVE ARCHIVE'}</span>
            </span>
          </Link>

          <nav aria-label="Main" className={`hidden items-center gap-1 rounded-full p-1.5 transition-all duration-500 lg:flex ${scrolled ? 'glass-strong shadow-2xl shadow-black/50' : 'glass'}`}>
            {NAV.map((item) => {
              const isActive = active?.href === item.href;
              const color = ACCENTS[item.accent];
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-medium transition-colors duration-300 ${isActive ? 'bg-white/[0.08] text-white' : 'text-neutral-400 hover:text-white'}`}
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full transition-all duration-500"
                    style={{ backgroundColor: color, opacity: isActive ? 1 : 0.35, boxShadow: isActive ? `0 0 10px ${color}` : 'none' }}
                  />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={openPalette}
              className="glass hidden items-center gap-2 rounded-full px-3.5 py-2 text-[13px] text-neutral-400 transition-colors hover:text-white sm:flex"
              aria-label="Open command menu"
            >
              <Command className="h-3.5 w-3.5" />
              <span>Search</span>
              <kbd className="rounded-md border border-white/10 px-1.5 py-0.5 font-mono text-[10px] text-neutral-500">{isMac ? '⌘K' : 'Ctrl K'}</kbd>
            </button>
            <a
              href={`mailto:${PROFILE.email}`}
              className="hidden rounded-full bg-white px-4 py-2 text-[13px] font-semibold text-black transition-transform duration-300 hover:scale-[1.03] md:inline-flex"
            >
              Get in touch
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              className="glass grid h-10 w-10 place-items-center rounded-full lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu sheet */}
      <div
        id="mobile-menu"
        className={`no-print fixed inset-0 z-[85] bg-[#050505]/95 backdrop-blur-2xl transition-all duration-500 ease-expo lg:hidden ${menuOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}
      >
        <nav aria-label="Mobile" className="flex h-full flex-col justify-between px-6 pb-10 pt-28">
          <ul className="space-y-1">
            {[{ label: 'Home', href: '/', accent: 'silver' as const, code: 'CANVAS' }, ...NAV].map((item, i) => {
              const isActive = item.href === '/' ? pathname === '/' : active?.href === item.href;
              return (
                <li
                  key={item.href}
                  className="transition-all duration-700 ease-expo"
                  style={{ transitionDelay: menuOpen ? `${80 + i * 45}ms` : '0ms', opacity: menuOpen ? 1 : 0, transform: menuOpen ? 'none' : 'translateY(16px)' }}
                >
                  <Link href={item.href} className="flex items-baseline justify-between border-b border-white/5 py-4">
                    <span className={`text-3xl font-semibold tracking-tight ${isActive ? 'text-white' : 'text-neutral-400'}`}>{item.label}</span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: ACCENTS[item.accent] }}>
                      {String(i).padStart(2, '0')}{' // '}{item.code}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="flex flex-col gap-3">
            <button type="button" onClick={openPalette} className="glass flex items-center justify-center gap-2 rounded-full py-3.5 text-sm text-neutral-300">
              <Command className="h-4 w-4" /> Search everything
            </button>
            <a href={`mailto:${PROFILE.email}`} className="rounded-full bg-white py-3.5 text-center text-sm font-semibold text-black">
              Get in touch
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
