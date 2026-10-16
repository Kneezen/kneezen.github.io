'use client';

import { useState, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import { asset } from '../data/asset';

interface Slide {
  src: string;
  alt: string;
  label?: string;
}

interface ImageLightboxProps {
  src: string;
  alt: string;
  /** Other images that belong with this one; arrows and ←/→ step through them. */
  gallery?: Slide[];
  className?: string;
  children?: React.ReactNode;
}

const ZOOM_LEVEL = 2.5;

/**
 * Click-to-magnify viewer. Opens the full-resolution original, click to zoom where you clicked,
 * move to pan, ←/→ to step through a gallery, Esc to close.
 */
export default function ImageLightbox({ src, alt, gallery, className = '', children }: ImageLightboxProps) {
  const slides = gallery && gallery.length > 0 ? gallery : [{ src, alt }];
  const startIndex = Math.max(0, slides.findIndex((s) => s.src === src));
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [index, setIndex] = useState(startIndex);
  const [isZoomed, setIsZoomed] = useState(false);
  const [origin, setOrigin] = useState('center center');

  const current = slides[index] ?? slides[0];

  const open = useCallback(() => {
    setIndex(startIndex);
    setIsOpen(true);
    setIsClosing(false);
    setIsZoomed(false);
  }, [startIndex]);

  const close = useCallback(() => {
    setIsClosing(true);
    window.setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
      setIsZoomed(false);
    }, 280);
  }, []);

  const step = useCallback(
    (dir: number) => {
      setIsZoomed(false);
      setIndex((i) => (i + dir + slides.length) % slides.length);
    },
    [slides.length]
  );

  useEffect(() => {
    if (!isOpen) return;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    const prev = { o: document.body.style.overflow, p: document.body.style.paddingRight };
    document.body.style.overflow = 'hidden';
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev.o;
      document.body.style.paddingRight = prev.p;
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen, close, step]);

  const zoomAt = (e: React.MouseEvent) => {
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setOrigin(`${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`);
  };

  return (
    <>
      <button
        type="button"
        onClick={open}
        aria-label={`Enlarge image: ${alt}`}
        className={`group/lightbox relative block w-full cursor-zoom-in overflow-hidden text-left ${className}`}
      >
        {children}
        <span className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover/lightbox:opacity-100 group-focus-visible/lightbox:opacity-100">
          <span className="absolute inset-0 bg-black/25" />
          <span className="relative flex items-center gap-2 rounded-full border border-white/20 bg-black/70 px-4 py-2 font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-white/85 backdrop-blur-md">
            <ZoomIn className="h-3.5 w-3.5" /> Inspect
          </span>
        </span>
      </button>

      {isOpen &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={current.alt}
            className={`fixed inset-0 z-[9999] flex items-center justify-center ${isClosing ? 'animate-lightbox-out' : 'animate-lightbox-in'}`}
            onClick={() => (isZoomed ? setIsZoomed(false) : close())}
          >
            <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" />

            <div className="absolute left-4 right-4 top-4 z-10 flex items-center justify-between gap-4 sm:left-8 sm:right-8 sm:top-6">
              <div className="flex min-w-0 items-center gap-3 font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-500">
                <span className={`inline-block h-1.5 w-1.5 shrink-0 rounded-full ${isZoomed ? 'animate-pulse bg-emerald-400' : 'bg-neutral-600'}`} />
                <span className="truncate">{isZoomed ? `ZOOM ACTIVE // ${ZOOM_LEVEL}x` : current.label || 'CLICK IMAGE TO ZOOM'}</span>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  close();
                }}
                className="flex shrink-0 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-neutral-300 transition-colors hover:text-white"
              >
                <X className="h-3.5 w-3.5" /> Close <kbd className="hidden rounded border border-neutral-700 px-1.5 text-neutral-500 sm:inline">ESC</kbd>
              </button>
            </div>

            <div
              key={current.src}
              className={`relative flex items-center justify-center overflow-hidden rounded-xl ${isClosing ? 'animate-image-out' : 'animate-image-in'}`}
              onClick={(e) => {
                e.stopPropagation();
                if (!isZoomed) zoomAt(e);
                setIsZoomed((z) => !z);
              }}
              onMouseMove={(e) => isZoomed && zoomAt(e)}
              style={{ cursor: isZoomed ? 'zoom-out' : 'zoom-in' }}
            >
              <img
                src={asset(encodeURI(current.src))}
                alt={current.alt}
                draggable={false}
                className="max-h-[80vh] max-w-[92vw] select-none object-contain transition-transform duration-200 ease-out"
                style={{ transform: isZoomed ? `scale(${ZOOM_LEVEL})` : 'scale(1)', transformOrigin: origin }}
              />
            </div>

            {slides.length > 1 && (
              <>
                {[-1, 1].map((dir) => (
                  <button
                    key={dir}
                    type="button"
                    aria-label={dir < 0 ? 'Previous image' : 'Next image'}
                    onClick={(e) => {
                      e.stopPropagation();
                      step(dir);
                    }}
                    className={`absolute top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/10 bg-black/60 p-3 text-white/80 backdrop-blur-md transition hover:border-white/30 hover:text-white ${dir < 0 ? 'left-3 sm:left-6' : 'right-3 sm:right-6'}`}
                  >
                    {dir < 0 ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                  </button>
                ))}
              </>
            )}

            <div className="absolute bottom-5 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] font-medium uppercase tracking-[0.15em] text-neutral-600">
              {slides.length > 1 && <span className="mr-3 text-neutral-400">{String(index + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}</span>}
              {isZoomed ? 'Move to pan // click to zoom out' : 'Click to magnify // ESC to close'}
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
