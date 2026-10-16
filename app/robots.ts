import type { MetadataRoute } from 'next';
import { PROFILE } from './data/profile';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${PROFILE.siteUrl}/sitemap.xml`,
  };
}
