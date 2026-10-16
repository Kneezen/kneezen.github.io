'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { ArrowUpRight, Bot, RotateCcw, Send, Sparkles, X } from 'lucide-react';
import { ask, type Reply } from './companion/engine';

const ACCENT = '#FFB300';

type Msg = { id: string; role: 'user' | 'assistant'; content: string };

const SUGGESTIONS = ['What is your teaching philosophy?', 'Tell me about your tech projects', 'Take me to the certifications page', 'How can I contact Ozan?'];

function load<T>(key: string, fallback: T): T {
  try {
    const v = sessionStorage.getItem(key);
    return v ? (JSON.parse(v) as T) : fallback;
  } catch {
    return fallback;
  }
}

function save(key: string, value: unknown) {
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable */
  }
}

export default function AiCompanion() {
  const router = useRouter();
  const pathname = usePathname();
  // Rendered client-only (see CompanionMount), so the tab's saved conversation can seed state directly.
  const [isOpen, setIsOpen] = useState(() => load<boolean>('companion:open', false));
  const [messages, setMessages] = useState<Msg[]>(() => load<Msg[]>('companion:messages', []));
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    save('companion:messages', messages);
  }, [messages]);

  useEffect(() => {
    save('companion:open', isOpen);
    if (isOpen) window.setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 250);
  }, [isOpen]);

  useEffect(() => {
    const onOpen = () => setIsOpen(true);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setIsOpen(false);
    window.addEventListener('companion:open', onOpen);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('companion:open', onOpen);
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, busy, isOpen]);

  const navigate = useCallback(
    (nav: NonNullable<Reply['navigate']>) => {
      const hash = nav.hash ? `#${nav.hash}` : '';
      if (pathname === nav.path) {
        if (nav.hash) document.getElementById(nav.hash)?.scrollIntoView({ behavior: 'smooth' });
        else window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      router.push(`${nav.path}${hash}`);
    },
    [pathname, router]
  );

  /** Reveals the reply a few characters at a time so it reads like it is being typed. */
  const typeOut = useCallback(async (id: string, text: string) => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setMessages((m) => m.map((x) => (x.id === id ? { ...x, content: text } : x)));
      return;
    }
    const step = Math.max(2, Math.ceil(text.length / 90));
    for (let i = step; i < text.length + step; i += step) {
      await new Promise((r) => window.setTimeout(r, 14));
      setMessages((m) => m.map((x) => (x.id === id ? { ...x, content: text.slice(0, i) } : x)));
    }
  }, []);

  const send = useCallback(
    async (text: string) => {
      const content = text.trim();
      if (!content || busy) return;
      const user: Msg = { id: `${Date.now()}-u`, role: 'user', content };
      const history = [...messages, user];
      setMessages(history);
      setInput('');
      setBusy(true);
      try {
        const [reply] = await Promise.all([ask(history.map(({ role, content }) => ({ role, content }))), new Promise((r) => window.setTimeout(r, 450))]);
        const id = `${Date.now()}-a`;
        setMessages((m) => [...m, { id, role: 'assistant', content: '' }]);
        setBusy(false);
        await typeOut(id, reply.text);
        if (reply.navigate) window.setTimeout(() => navigate(reply.navigate!), 350);
      } catch {
        setMessages((m) => [...m, { id: `${Date.now()}-e`, role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }]);
        setBusy(false);
      }
    },
    [busy, messages, navigate, typeOut]
  );

  return (
    <div data-companion className="no-print">
      {/* Launcher */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Open the AI companion"
        className={`group fixed bottom-4 right-4 z-[80] flex items-center gap-2 rounded-full p-2.5 sm:py-3 sm:pl-3 sm:pr-4 text-black shadow-[0_10px_40px_-10px_rgba(255,179,0,0.7)] transition-all duration-500 ease-expo hover:scale-[1.04] sm:bottom-6 sm:right-6 ${isOpen ? 'pointer-events-none scale-75 opacity-0' : 'scale-100 opacity-100'}`}
        style={{ backgroundColor: ACCENT }}
      >
        <span className="relative grid h-7 w-7 place-items-center rounded-full bg-black/10">
          <Sparkles className="h-4 w-4" />
          <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#FFB300] bg-emerald-500" />
        </span>
        <span className="hidden font-mono text-[11px] font-bold uppercase tracking-[0.14em] sm:inline">Ask AI</span>
      </button>

      {/* Panel */}
      <section
        aria-label="AI companion chat"
        aria-hidden={!isOpen}
        className={`glass-strong fixed inset-x-3 bottom-3 z-[96] flex h-[min(640px,calc(100dvh-24px))] flex-col overflow-hidden rounded-3xl shadow-2xl shadow-black/80 transition-all duration-500 ease-expo sm:inset-x-auto sm:bottom-6 sm:right-6 sm:w-[410px] ${
          isOpen ? 'pointer-events-auto translate-y-0 scale-100 opacity-100' : 'pointer-events-none translate-y-6 scale-[0.97] opacity-0'
        }`}
        style={{ transformOrigin: 'bottom right' }}
      >
        <header className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="relative grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/5">
              <Bot className="h-4 w-4" style={{ color: ACCENT }} />
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-[#0e0e10] bg-emerald-500" />
            </span>
            <div>
              <h2 className="font-mono text-sm font-bold uppercase tracking-widest text-white">COMPANION</h2>
              <p className="font-mono text-[11px] text-neutral-500">Online · knows Ozan&apos;s whole portfolio</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {messages.length > 0 && (
              <button type="button" onClick={() => setMessages([])} className="rounded-full p-2 text-neutral-500 transition-colors hover:bg-white/5 hover:text-white" aria-label="Clear conversation" title="Clear conversation">
                <RotateCcw className="h-4 w-4" />
              </button>
            )}
            <button type="button" onClick={() => setIsOpen(false)} className="rounded-full p-2 text-neutral-400 transition-colors hover:bg-white/5 hover:text-white" aria-label="Close chat">
              <X className="h-5 w-5" />
            </button>
          </div>
        </header>

        <div className="scrollbar-hide flex-1 space-y-5 overflow-y-auto px-5 py-5" aria-live="polite">
          {messages.length === 0 && (
            <div className="flex flex-col items-center space-y-5 pb-4 pt-2 text-center">
              <div className="relative">
                <div className="absolute inset-0 animate-ping rounded-full opacity-20" style={{ backgroundColor: ACCENT }} />
                <div className="relative grid h-14 w-14 place-items-center rounded-full border border-white/10 bg-white/5">
                  <Bot className="h-6 w-6" style={{ color: ACCENT }} />
                </div>
              </div>
              <div className="space-y-2">
                <p className="font-mono text-xs uppercase tracking-widest text-neutral-200">Welcome! I am COMPANION.</p>
                <p className="mx-auto max-w-[300px] text-xs leading-relaxed text-neutral-400">
                  I know Ozan&apos;s entire portfolio. I can answer questions about his background, or pilot your browser to the pages you want to explore. English or Türkçe.
                </p>
              </div>
              <div className="flex w-full flex-col gap-2 pt-2">
                <p className="mb-1 font-mono text-[10px] uppercase tracking-widest text-neutral-600">Try asking me:</p>
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => send(s)}
                    className="group flex items-center justify-between gap-3 rounded-xl border border-white/5 bg-white/[0.03] px-4 py-3 text-left text-xs text-neutral-300 transition-all hover:border-white/20 hover:bg-white/[0.07] hover:text-white"
                  >
                    {s}
                    <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-neutral-600 transition-colors group-hover:text-[#FFB300]" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className="flex max-w-[88%] items-end gap-2">
                {m.role === 'assistant' && (
                  <span className="mb-1 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-white/10 bg-white/5">
                    <Bot className="h-3 w-3" style={{ color: ACCENT }} />
                  </span>
                )}
                <div
                  className={`px-4 py-3 text-sm leading-relaxed ${m.role === 'user' ? 'rounded-2xl rounded-br-md bg-white text-black' : 'rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.05] text-neutral-200'}`}
                >
                  <div className="[&_a]:text-[#FFB300] [&_a]:underline [&_a]:underline-offset-2 [&_li]:mt-1 [&_ol]:ml-5 [&_ol]:list-decimal [&_p:last-child]:mb-0 [&_p]:mb-2 [&_strong]:font-semibold [&_ul]:ml-5 [&_ul]:list-disc">
                    <ReactMarkdown components={{ a: ({ href, children }) => <a href={href} target={href?.startsWith('mailto:') ? undefined : '_blank'} rel="noopener noreferrer">{children}</a> }}>
                      {m.content || '…'}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {busy && (
            <div className="flex items-end gap-2">
              <span className="mb-1 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-white/10 bg-white/5">
                <Bot className="h-3 w-3" style={{ color: ACCENT }} />
              </span>
              <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.05] px-4 py-3.5">
                {[0, 0.15, 0.3].map((d) => (
                  <span key={d} className="h-1.5 w-1.5 animate-bounce rounded-full bg-neutral-400" style={{ animationDelay: `${d}s` }} />
                ))}
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="border-t border-white/10 p-3"
        >
          <div className="relative flex items-center">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question…"
              aria-label="Message COMPANION"
              maxLength={500}
              className="w-full rounded-full border border-white/10 bg-white/[0.04] py-3 pl-4 pr-12 text-sm text-white placeholder:text-neutral-500 transition-colors focus:border-white/30 focus:outline-none"
            />
            <button
              type="submit"
              disabled={busy || !input.trim()}
              aria-label="Send"
              className="absolute right-1.5 grid h-9 w-9 place-items-center rounded-full transition-all disabled:opacity-40"
              style={{ backgroundColor: input.trim() ? ACCENT : 'transparent' }}
            >
              <Send className="h-4 w-4" style={{ color: input.trim() ? '#000' : ACCENT }} />
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
