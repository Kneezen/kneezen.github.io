'use client';

import { useEffect, useRef, useState } from 'react';

type ScrollVariant = 'fadeUp' | 'clipReveal' | 'scaleFade' | 'slideRight' | 'gridPop' | 'tiltIn';

interface VariantConfig {
  hidden: React.CSSProperties;
  visible: React.CSSProperties;
  duration: string;
}

const VARIANT_STYLES: Record<ScrollVariant, VariantConfig> = {
  fadeUp: {
    hidden: { opacity: 0, transform: 'translateY(36px)' },
    visible: { opacity: 1, transform: 'translateY(0)' },
    duration: '900ms',
  },
  clipReveal: {
    hidden: { clipPath: 'inset(0 100% 0 0)', opacity: 0.4 },
    visible: { clipPath: 'inset(0 0 0 0)', opacity: 1 },
    duration: '1000ms',
  },
  scaleFade: {
    hidden: { opacity: 0, transform: 'scale(0.95) translateY(20px)', filter: 'blur(4px)' },
    visible: { opacity: 1, transform: 'scale(1) translateY(0)', filter: 'blur(0px)' },
    duration: '900ms',
  },
  slideRight: {
    hidden: { opacity: 0, transform: 'translateX(60px)' },
    visible: { opacity: 1, transform: 'translateX(0)' },
    duration: '900ms',
  },
  gridPop: {
    hidden: { opacity: 0, transform: 'scale(0.96)' },
    visible: { opacity: 1, transform: 'scale(1)' },
    duration: '700ms',
  },
  tiltIn: {
    hidden: { opacity: 0, transform: 'rotate(2deg) translateY(20px)' },
    visible: { opacity: 1, transform: 'rotate(0deg) translateY(0)' },
    duration: '900ms',
  },
};

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  variant?: ScrollVariant;
}

export default function ScrollReveal({
  children,
  delay = 0,
  className = '',
  variant = 'fadeUp',
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.05, rootMargin: '0px 0px -20px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const config = VARIANT_STYLES[variant];
  const currentStyle = isVisible ? config.visible : config.hidden;

  return (
    <div
      ref={ref}
      className={`transition-all ease-expo ${className}`}
      style={{
        ...currentStyle,
        transitionDuration: config.duration,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
