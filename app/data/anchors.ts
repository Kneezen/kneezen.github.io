import type { Certification } from './profile';

/** Stable in-page anchor for a certificate card, e.g. "build-an-ai-agent". */
export function certAnchor(c: Pick<Certification, 'title'>) {
  return c.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}
