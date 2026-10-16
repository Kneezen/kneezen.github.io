import ImageLightbox from '../ImageLightbox';
import Img from './Img';
import { MediaLabel } from './Bits';
import type { Media } from '../../data/profile';

interface MediaGridProps {
  items: Media[];
  accent: string;
  layout: 'dual' | 'stack' | 'grid' | 'wide';
}

/** Captioned, zoomable image set. All images in a set share one lightbox gallery. */
export default function MediaGrid({ items, accent, layout }: MediaGridProps) {
  const cols = layout === 'dual' ? 'lg:grid-cols-2' : layout === 'grid' ? 'md:grid-cols-2' : '';
  const sizes = layout === 'stack' || layout === 'wide' ? '(min-width: 1280px) 1100px, 100vw' : '(min-width: 1024px) 50vw, 100vw';
  return (
    <div className={`grid grid-cols-1 gap-6 ${cols}`}>
      {items.map((img) => (
        <figure key={img.src} className="flex flex-col gap-3">
          <MediaLabel accent={accent}>{img.label}</MediaLabel>
          <div className="overflow-hidden rounded-2xl border bg-black/40 shadow-xl shadow-black/40" style={{ borderColor: `${accent}26` }}>
            <ImageLightbox src={img.src} alt={img.alt} gallery={items}>
              <Img src={img.src} alt={img.alt} sizes={sizes} className="h-auto w-full object-contain transition-transform duration-[1.2s] ease-expo group-hover/lightbox:scale-[1.02]" />
            </ImageLightbox>
          </div>
        </figure>
      ))}
    </div>
  );
}
