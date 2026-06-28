'use client';

import ScrollReveal from './ScrollReveal';

interface SectionDividerProps {
  label?: string;
  accentColor?: string;
}

export default function SectionDivider({
  label,
  accentColor = 'rgba(255,255,255,0.08)',
}: SectionDividerProps) {
  return (
    <ScrollReveal>
      <div className="w-full max-w-screen-2xl mx-auto px-8 md:px-16 py-6">
        <div className="flex items-center gap-6">
          <div
            className="h-px flex-grow"
            style={{ backgroundColor: accentColor }}
          />
          {label && (
            <span className="font-mono text-[10px] tracking-[0.2em] text-neutral-600 uppercase font-medium shrink-0">
              {label}
            </span>
          )}
          <div
            className="h-px flex-grow"
            style={{ backgroundColor: accentColor }}
          />
        </div>
      </div>
    </ScrollReveal>
  );
}
