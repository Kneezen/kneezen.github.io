'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface ImageLightboxProps {
  src: string;
  alt: string;
  className?: string;
  children?: React.ReactNode;
}

/**
 * ImageLightbox — Click-to-magnify image viewer with cursor-based zoom inspection.
 * 
 * Wrap any <img> rendering with this component. It adds:
 * - Click to open fullscreen overlay
 * - Move cursor to pan around the image at 2.5x zoom
 * - Click again or press Escape to close
 * - Smooth open/close transitions
 */
export default function ImageLightbox({ src, alt, className, children }: ImageLightboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [transformOrigin, setTransformOrigin] = useState('center center');
  const [isClosing, setIsClosing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const ZOOM_LEVEL = 2.5;

  const handleOpen = useCallback(() => {
    setIsOpen(true);
    setIsClosing(false);
    setIsZoomed(false);
  }, []);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
      setIsZoomed(false);
    }, 300);
  }, []);

  const handleOverlayClick = useCallback((e: React.MouseEvent) => {
    // Clicks on the image are stopped from propagating by handleImageClick.
    // So any click reaching here is on the background.
    if (isZoomed) {
      setIsZoomed(false);
    } else {
      handleClose();
    }
  }, [isZoomed, handleClose]);

  const handleImageClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (isZoomed) {
      setIsZoomed(false);
    } else {
      // Zoom into where the user clicked
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setTransformOrigin(`${x}% ${y}%`);
      setIsZoomed(true);
    }
  }, [isZoomed]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isZoomed) return;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setTransformOrigin(`${x}% ${y}%`);
  }, [isZoomed]);

  // Escape key handler & Body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    // Calculate scrollbar width to prevent layout shift
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    // Lock body scroll and add padding
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    
    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleClose]);

  return (
    <>
      {/* Clickable image trigger */}
      <div
        className="relative w-full h-full group/lightbox cursor-zoom-in"
        onClick={handleOpen}
      >
        {children || (
          <img
            src={src}
            alt={alt}
            className={className}
          />
        )}
        {/* Hover indicator */}
        <div className="absolute inset-0 opacity-0 group-hover/lightbox:opacity-100 transition-opacity duration-500 pointer-events-none flex items-center justify-center">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px] transition-all duration-500" />
          <div className="relative z-10 flex items-center gap-2 bg-black/70 backdrop-blur-md px-4 py-2.5 border border-white/20 shadow-2xl">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/90">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
              <line x1="11" y1="8" x2="11" y2="14" />
              <line x1="8" y1="11" x2="14" y2="11" />
            </svg>
            <span className="font-mono text-[10px] tracking-[0.2em] text-white/80 uppercase font-medium">
              Inspect
            </span>
          </div>
        </div>
      </div>

      {/* Fullscreen lightbox overlay */}
      {isOpen && typeof document !== 'undefined' && createPortal(
        <div
          ref={containerRef}
          className={`fixed inset-0 z-[9999] flex items-center justify-center
            ${isClosing ? 'animate-lightbox-out' : 'animate-lightbox-in'}`}
          onClick={handleOverlayClick}
          style={{ cursor: isZoomed ? 'zoom-out' : 'zoom-in' }}
        >
          {/* Backdrop */}
          <div className={`absolute inset-0 bg-black/95 backdrop-blur-xl
            ${isClosing ? 'animate-fade-out' : 'animate-fade-in'}`} />

          {/* Close button */}
          <button
            onClick={(e) => { e.stopPropagation(); handleClose(); }}
            className="absolute top-6 right-8 z-[10000] flex items-center gap-2 font-mono text-xs tracking-[0.15em] text-neutral-400 uppercase font-semibold
              hover:text-white transition-colors duration-300 group/close"
          >
            <span className="group-hover/close:text-red-400 transition-colors duration-300">✕</span>
            <span>Close</span>
            <span className="text-neutral-600 text-[10px] ml-1 border border-neutral-700 px-1.5 py-0.5 rounded-sm">ESC</span>
          </button>

          {/* Zoom status indicator */}
          <div className="absolute top-6 left-8 z-[10000] font-mono text-[10px] tracking-[0.2em] text-neutral-500 uppercase font-medium flex items-center gap-3">
            <span className={`inline-block w-1.5 h-1.5 rounded-full ${isZoomed ? 'bg-emerald-400 animate-pulse' : 'bg-neutral-600'}`} />
            <span>{isZoomed ? `ZOOM ACTIVE // ${ZOOM_LEVEL}x` : 'CLICK IMAGE TO ZOOM'}</span>
          </div>

          {/* Image container */}
          <div
            className={`relative overflow-hidden flex justify-center items-center
              ${isClosing ? 'animate-image-out' : 'animate-image-in'}
              ${isZoomed ? '' : 'shadow-2xl shadow-black/50'}`}
            onClick={handleImageClick}
            onMouseMove={handleMouseMove}
          >
            <img
              ref={imageRef}
              src={src}
              alt={alt}
              className="max-w-[92vw] max-h-[88vh] object-contain transition-transform duration-200 ease-out select-none"
              style={{
                transform: isZoomed ? `scale(${ZOOM_LEVEL})` : 'scale(1)',
                transformOrigin: transformOrigin,
              }}
              draggable={false}
            />
            
            {/* Zoomed scanning guide border */}
            {isZoomed && (
              <div className="absolute inset-0 pointer-events-none border border-white/10 shadow-[inset_0_0_80px_rgba(0,0,0,0.5)]" />
            )}
          </div>

          {/* Bottom hint */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[10000] font-mono text-[10px] tracking-[0.15em] text-neutral-600 uppercase font-medium">
            {isZoomed ? 'Move cursor to pan // Click to zoom out' : 'Click image to magnify // ESC to close'}
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
