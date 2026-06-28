'use client';

import { useRef, useState, useEffect } from 'react';

interface UseInViewportOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

export default function useInViewport(options: UseInViewportOptions = {}) {
  const {
    threshold = 0.05,
    rootMargin = '0px 0px -40px 0px',
    once = true,
  } = options;

  const ref = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [hasBeenInView, setHasBeenInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        setIsInView(visible);
        if (visible) {
          setHasBeenInView(true);
          if (once) observer.unobserve(el);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, isInView, hasBeenInView };
}
