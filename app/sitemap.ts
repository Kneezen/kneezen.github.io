import type { MetadataRoute } from 'next';
import { NAV, PROFILE } from './data/profile';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ href: '' }, ...NAV].map((n, i) => ({
    url: `${PROFILE.siteUrl}${n.href}`,
    changeFrequency: 'monthly',
    priority: i === 0 ? 1 : 0.8,
  }));
}
