'use client';

import { useMemo, useState } from 'react';
import ImageLightbox from '../components/ImageLightbox';
import Img from '../components/ui/Img';
import Spotlight from '../components/ui/Spotlight';
import { CardTitle, Rule, Tag } from '../components/ui/Bits';
import { CERTIFICATIONS } from '../data/profile';
import { certAnchor } from '../data/anchors';

const ISSUERS = ['All', ...Array.from(new Set(CERTIFICATIONS.map((c) => c.issuer)))] as const;

export default function CertGallery({ accent }: { accent: string }) {
  const [filter, setFilter] = useState<(typeof ISSUERS)[number]>('All');
  const gallery = useMemo(() => CERTIFICATIONS.map((c) => ({ src: c.image, alt: `${c.tag} Certificate`, label: c.tag })), []);
  const count = (issuer: string) => (issuer === 'All' ? CERTIFICATIONS.length : CERTIFICATIONS.filter((c) => c.issuer === issuer).length);

  return (
    <div className="space-y-8">
      <div role="group" aria-label="Filter by issuer" className="scrollbar-hide -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0">
        {ISSUERS.map((issuer) => {
          const on = filter === issuer;
          return (
            <button
              key={issuer}
              type="button"
              aria-pressed={on}
              onClick={() => setFilter(issuer)}
              className="flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm transition-all duration-300"
              style={{ border: `1px solid ${on ? accent : 'rgba(255,255,255,0.1)'}`, background: on ? accent : 'rgba(255,255,255,0.02)', color: on ? '#000' : '#bbb' }}
            >
              {issuer}
              <span className="font-mono text-[11px] opacity-70">{count(issuer)}</span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {CERTIFICATIONS.map((cert, idx) => {
          const visible = filter === 'All' || cert.issuer === filter;
          return (
            <Spotlight
              key={cert.tag}
              accent={accent}
              as="article"
              id={certAnchor(cert)}
              className={`scroll-mt-28 flex-col overflow-hidden transition-all duration-500 ease-expo ${visible ? 'flex' : 'hidden'}`}
              style={{ animation: visible ? `lightboxImageIn 600ms ${idx * 40}ms both var(--ease-expo)` : undefined }}
            >
              <div className="border-b border-white/5 bg-black/30 p-4">
                <div className="overflow-hidden rounded-xl">
                  <ImageLightbox src={cert.image} alt={`${cert.tag} Certificate`} gallery={gallery}>
                    <Img
                      src={cert.image}
                      alt={`${cert.tag} Certificate`}
                      sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw"
                      className="aspect-[4/3] h-auto w-full object-contain transition-transform duration-700 ease-expo group-hover/lightbox:scale-[1.03]"
                    />
                  </ImageLightbox>
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-5 p-6 sm:p-8">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500">{cert.issuer}</span>
                  <span className="font-mono text-[10px] text-neutral-600">{String(idx + 1).padStart(2, '0')} / {String(CERTIFICATIONS.length).padStart(2, '0')}</span>
                </div>
                <CardTitle accent={accent} as="h3">
                  {cert.tag}
                </CardTitle>
                <Rule accent={accent} />
                <p className="text-[15px] leading-[1.8] text-neutral-300">{cert.content}</p>
                <div className="mt-auto flex flex-wrap gap-2 pt-2">
                  {cert.metrics.map((m) => (
                    <Tag key={m} accent={accent}>
                      {m}
                    </Tag>
                  ))}
                </div>
              </div>
            </Spotlight>
          );
        })}
      </div>
    </div>
  );
}
