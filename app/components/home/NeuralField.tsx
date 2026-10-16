'use client';

import { useEffect, useRef } from 'react';

interface NeuralFieldProps {
  className?: string;
  color?: string;
  density?: number;
}

/**
 * A living "neural network": drifting nodes that link up when close and lean toward the cursor.
 * Pure canvas 2D, capped node count, pauses off-screen, renders one still frame for reduced motion.
 */
export default function NeuralField({ className = '', color = '0, 229, 255', density = 1 }: NeuralFieldProps) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let w = 0;
    let h = 0;
    let raf = 0;
    let running = true;
    const mouse = { x: -9999, y: -9999, active: false };

    type Node = { x: number; y: number; vx: number; vy: number; r: number };
    let nodes: Node[] = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const target = Math.min(110, Math.round(((w * h) / 16000) * density));
      nodes = Array.from({ length: target }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.4 + 0.4,
      }));
    };

    const LINK = 130;
    const BUCKETS = 5;
    const paths: Path2D[] = [];
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const n of nodes) {
        if (!reduced) {
          if (mouse.active) {
            const dx = mouse.x - n.x;
            const dy = mouse.y - n.y;
            const d2 = dx * dx + dy * dy;
            if (d2 < 220 * 220) {
              const f = 0.00004 * (220 - Math.sqrt(d2));
              n.vx += dx * f;
              n.vy += dy * f;
            }
          }
          n.vx *= 0.985;
          n.vy *= 0.985;
          n.vx += (Math.random() - 0.5) * 0.012;
          n.vy += (Math.random() - 0.5) * 0.012;
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < -20) n.x = w + 20;
          if (n.x > w + 20) n.x = -20;
          if (n.y < -20) n.y = h + 20;
          if (n.y > h + 20) n.y = -20;
        }
      }
      // Batch every link into a few opacity buckets: a handful of stroke() calls per frame instead of hundreds.
      for (let b = 0; b < BUCKETS; b++) paths[b] = new Path2D();
      const cursor = new Path2D();
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < LINK * LINK) {
            const bucket = Math.min(BUCKETS - 1, Math.floor((Math.sqrt(d2) / LINK) * BUCKETS));
            paths[bucket].moveTo(a.x, a.y);
            paths[bucket].lineTo(b.x, b.y);
          }
        }
        if (mouse.active) {
          const dx = a.x - mouse.x;
          const dy = a.y - mouse.y;
          if (dx * dx + dy * dy < 170 * 170) {
            cursor.moveTo(a.x, a.y);
            cursor.lineTo(mouse.x, mouse.y);
          }
        }
      }
      ctx.lineWidth = 0.6;
      for (let b = 0; b < BUCKETS; b++) {
        ctx.strokeStyle = `rgba(${color}, ${((1 - (b + 0.5) / BUCKETS) * 0.35).toFixed(3)})`;
        ctx.stroke(paths[b]);
      }
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)';
      ctx.lineWidth = 0.7;
      ctx.stroke(cursor);
      ctx.fillStyle = `rgba(${color}, 0.9)`;
      ctx.beginPath();
      for (const n of nodes) {
        ctx.moveTo(n.x + n.r, n.y);
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      }
      ctx.fill();
    };

    const loop = () => {
      if (!running) return;
      draw();
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
      mouse.active = mouse.y >= 0 && mouse.y <= r.height;
    };
    const onLeave = () => (mouse.active = false);

    resize();
    if (reduced) draw();
    else loop();

    const io = new IntersectionObserver(([e]) => {
      const vis = e.isIntersecting && !reduced;
      if (vis && !running) {
        running = true;
        loop();
      } else if (!vis) {
        running = false;
        cancelAnimationFrame(raf);
      }
    });
    io.observe(canvas);

    const ro = new ResizeObserver(() => {
      resize();
      if (reduced) draw();
    });
    ro.observe(canvas);
    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
    };
  }, [color, density]);

  return <canvas ref={ref} aria-hidden className={`pointer-events-none ${className}`} />;
}
