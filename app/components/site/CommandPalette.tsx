'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Award, Bot, Briefcase, Copy, FileText, FolderGit2, GraduationCap, Home, Mail, Printer, Search, User } from 'lucide-react';
import { ACCENTS, CERTIFICATIONS, NAV, PROFILE, PROJECTS, TIMELINE } from '../../data/profile';
import { certAnchor } from '../../data/anchors';
import { Linkedin } from '../ui/Bits';

type Item = {
  id: string;
  title: string;
  hint: string;
  group: 'Pages' | 'Experience' | 'Projects' | 'Certifications' | 'Actions';
  icon: React.ComponentType<{ className?: string }>;
  accent: string;
  keywords?: string;
  run: () => void;
};

const PAGE_ICONS: Record<string, Item['icon']> = {
  '/about': User,
  '/experience': Briefcase,
  '/education': GraduationCap,
  '/projects': FolderGit2,
  '/certifications': Award,
  '/cv': FileText,
};

function score(item: Item, q: string) {
  if (!q) return 1;
  const hay = `${item.title} ${item.hint} ${item.group} ${item.keywords ?? ''}`.toLowerCase();
  const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
  let s = 0;
  for (const t of terms) {
    const i = hay.indexOf(t);
    if (i < 0) return 0;
    s += i === 0 || item.title.toLowerCase().startsWith(t) ? 3 : 1;
  }
  return s;
}

export default function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [cursor, setCursor] = useState(0);
  const [toast, setToast] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const go = useCallback((href: string) => router.push(href), [router]);

  const items = useMemo<Item[]>(() => {
    const pages: Item[] = [
      { id: 'home', title: 'Home', hint: 'The canvas', group: 'Pages', icon: Home, accent: ACCENTS.silver, run: () => go('/') },
      ...NAV.map((n) => ({
        id: n.href,
        title: n.label,
        hint: `// ${n.code}`,
        group: 'Pages' as const,
        icon: PAGE_ICONS[n.href] ?? ArrowRight,
        accent: ACCENTS[n.accent],
        keywords: n.href === '/cv' ? 'resume vitae master matrix' : n.href === '/certifications' ? 'credentials badges' : '',
        run: () => go(n.href),
      })),
    ];
    const experience: Item[] = TIMELINE.map((t) => ({
      id: `exp-${t.id}`,
      title: t.company,
      hint: `${t.role} · ${t.period}`,
      group: 'Experience',
      icon: Briefcase,
      accent: ACCENTS.cyan,
      keywords: t.metrics.join(' '),
      run: () => go(`/experience#${t.id}`),
    }));
    const projects: Item[] = PROJECTS.map((p) => ({
      id: `proj-${p.id}`,
      title: p.title,
      hint: p.kicker,
      group: 'Projects',
      icon: FolderGit2,
      accent: ACCENTS.magenta,
      keywords: p.metrics.join(' '),
      run: () => go(`/projects#${p.id}`),
    }));
    const certs: Item[] = CERTIFICATIONS.map((c, i) => ({
      id: `cert-${i}`,
      title: c.title,
      hint: c.issuer,
      group: 'Certifications',
      icon: Award,
      accent: ACCENTS.amber,
      keywords: c.metrics.join(' '),
      run: () => go(`/certifications#${certAnchor(c)}`),
    }));
    const actions: Item[] = [
      {
        id: 'copy-email',
        title: 'Copy email address',
        hint: PROFILE.email,
        group: 'Actions',
        icon: Copy,
        accent: ACCENTS.silver,
        keywords: 'contact mail',
        run: () => {
          navigator.clipboard?.writeText(PROFILE.email).then(() => setToast('Email copied'));
        },
      },
      { id: 'mail', title: 'Send an email', hint: PROFILE.email, group: 'Actions', icon: Mail, accent: ACCENTS.silver, keywords: 'contact', run: () => (window.location.href = `mailto:${PROFILE.email}`) },
      { id: 'linkedin', title: 'Open LinkedIn', hint: 'Connect professionally', group: 'Actions', icon: Linkedin, accent: ACCENTS.silver, keywords: 'contact network', run: () => window.open(PROFILE.linkedin, '_blank', 'noopener') },
      { id: 'companion', title: 'Ask the AI companion', hint: 'Chat about Ozan', group: 'Actions', icon: Bot, accent: ACCENTS.amber, keywords: 'chat ai bot help', run: () => window.dispatchEvent(new CustomEvent('companion:open')) },
      {
        id: 'print',
        title: 'Download CV as PDF',
        hint: 'Opens the print dialog',
        group: 'Actions',
        icon: Printer,
        accent: ACCENTS.amber,
        keywords: 'resume pdf print',
        run: () => {
          go('/cv?print=1');
        },
      },
    ];
    return [...pages, ...experience, ...projects, ...certs, ...actions];
  }, [go]);

  const results = useMemo(
    () =>
      items
        .map((it) => ({ it, s: score(it, query) }))
        .filter((r) => r.s > 0)
        .sort((a, b) => (query ? b.s - a.s : 0))
        .map((r) => r.it),
    [items, query]
  );

  const show = useCallback(() => {
    setQuery('');
    setCursor(0);
    setOpen(true);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (open) setOpen(false);
        else show();
      } else if (e.key === '/' && !open && !(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)) {
        e.preventDefault();
        show();
      }
    };
    const onOpen = () => show();
    window.addEventListener('keydown', onKey);
    window.addEventListener('palette:open', onOpen);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('palette:open', onOpen);
    };
  }, [open, show]);

  useEffect(() => {
    if (open) {
      const t = window.setTimeout(() => inputRef.current?.focus(), 40);
      return () => window.clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(''), 1800);
    return () => window.clearTimeout(t);
  }, [toast]);

  useEffect(() => {
    listRef.current?.querySelector(`[data-index="${cursor}"]`)?.scrollIntoView({ block: 'nearest' });
  }, [cursor]);

  const run = (item: Item) => {
    setOpen(false);
    item.run();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setCursor((c) => Math.min(c + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setCursor((c) => Math.max(c - 1, 0));
    } else if (e.key === 'Enter' && results[cursor]) {
      e.preventDefault();
      run(results[cursor]);
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  return (
    <>
      <div
        className={`no-print fixed inset-0 z-[200] flex items-start justify-center px-4 pt-[12vh] transition-all duration-300 ${open ? 'visible opacity-100' : 'invisible opacity-0'}`}
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Command menu"
          onClick={(e) => e.stopPropagation()}
          className={`glass-strong relative w-full max-w-xl overflow-hidden rounded-2xl shadow-2xl shadow-black transition-all duration-500 ease-expo ${open ? 'translate-y-0 scale-100' : '-translate-y-4 scale-[0.98]'}`}
        >
          <div className="flex items-center gap-3 border-b border-white/10 px-5">
            <Search className="h-4 w-4 shrink-0 text-neutral-500" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setCursor(0);
              }}
              onKeyDown={onKeyDown}
              placeholder="Search pages, roles, projects, certificates…"
              className="h-14 w-full bg-transparent text-[15px] text-white placeholder:text-neutral-500 focus:outline-none"
              role="combobox"
              aria-expanded="true"
              aria-controls="palette-list"
              aria-activedescendant={results[cursor] ? `pal-${results[cursor].id}` : undefined}
            />
            <kbd className="hidden rounded-md border border-white/10 px-1.5 py-0.5 font-mono text-[10px] text-neutral-500 sm:block">ESC</kbd>
          </div>
          <ul id="palette-list" ref={listRef} role="listbox" className="scrollbar-hide max-h-[min(60vh,440px)] overflow-y-auto p-2">
            {results.length === 0 && <li className="px-4 py-10 text-center text-sm text-neutral-500">Nothing matches “{query}”. Try the AI companion.</li>}
            {results.map((item, i) => {
              const header = item.group !== results[i - 1]?.group ? item.group : null;
              const Icon = item.icon;
              const selected = i === cursor;
              return (
                <li key={item.id}>
                  {header && <div className="px-3 pb-1.5 pt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-600">{header}</div>}
                  <div
                    id={`pal-${item.id}`}
                    role="option"
                    aria-selected={selected}
                    data-index={i}
                    onMouseMove={() => setCursor(i)}
                    onClick={() => run(item)}
                    className={`flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 transition-colors ${selected ? 'bg-white/[0.07]' : ''}`}
                  >
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/[0.03]" style={{ color: item.accent }}>
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm text-white">{item.title}</span>
                      <span className="block truncate text-xs text-neutral-500">{item.hint}</span>
                    </span>
                    {selected && <ArrowRight className="h-4 w-4 shrink-0 text-neutral-400" />}
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="flex items-center justify-between border-t border-white/10 px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.15em] text-neutral-600">
            <span>↑↓ navigate · ↵ open</span>
            <span>{results.length} results</span>
          </div>
        </div>
      </div>
      <div
        role="status"
        className={`no-print fixed bottom-24 left-1/2 z-[210] -translate-x-1/2 rounded-full bg-white px-4 py-2 text-sm font-medium text-black shadow-xl transition-all duration-500 ease-expo ${toast ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'}`}
      >
        {toast}
      </div>
    </>
  );
}
