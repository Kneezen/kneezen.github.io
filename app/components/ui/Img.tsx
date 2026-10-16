import media from '../../data/media.json';
import { asset } from '../../data/asset';

type Entry = { w: number; h: number; sm: string; lg: string };
const MEDIA = media as Record<string, Entry>;

interface ImgProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src: string;
  alt: string;
  /** CSS sizes hint for the browser, e.g. "(min-width: 1024px) 50vw, 100vw" */
  sizes?: string;
  priority?: boolean;
}

/** Responsive <img> that serves the optimized WebP copies from scripts/optimize-media.py. */
export default function Img({ src, alt, sizes = '(min-width: 1024px) 50vw, 100vw', priority, ...rest }: ImgProps) {
  const entry = MEDIA[src];
  if (!entry) {
    return <img src={asset(encodeURI(src))} alt={alt} loading={priority ? 'eager' : 'lazy'} decoding="async" {...rest} />;
  }
  return (
    <img
      src={asset(entry.lg)}
      srcSet={`${asset(entry.sm)} 800w, ${asset(entry.lg)} 1600w`}
      sizes={sizes}
      width={entry.w}
      height={entry.h}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding="async"
      {...rest}
    />
  );
}

export function mediaSize(src: string) {
  return MEDIA[src];
}
