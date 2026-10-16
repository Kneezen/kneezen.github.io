'use client';

import dynamic from 'next/dynamic';

// The companion only exists in the browser: no server HTML, and its code loads after the page.
const AiCompanion = dynamic(() => import('./AiCompanion'), { ssr: false });

export default function CompanionMount() {
  return <AiCompanion />;
}
