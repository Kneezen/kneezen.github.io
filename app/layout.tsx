import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { ViewTransition } from 'react';
import './globals.css';

import SiteHeader from './components/site/SiteHeader';
import SiteFooter from './components/site/SiteFooter';
import CommandPalette from './components/site/CommandPalette';
import CompanionMount from './components/CompanionMount';
import Delight from './components/fun/Delight';
import { PROFILE } from './data/profile';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin', 'latin-ext'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin', 'latin-ext'] });

const description =
  'English Language Educator, AI Model Trainer, and Tech Journalist bridging the gap between human expression and machine intelligence.';

export const metadata: Metadata = {
  metadataBase: new URL(PROFILE.siteUrl),
  title: {
    default: `${PROFILE.name} | ${PROFILE.shortTitle}`,
    template: `%s | ${PROFILE.name}`,
  },
  description,
  applicationName: `${PROFILE.name} Portfolio`,
  authors: [{ name: PROFILE.name, url: PROFILE.siteUrl }],
  keywords: ['Ozan Özen', 'English Language Teaching', 'ELT', 'TED University', 'AI Model Trainer', 'Outlier', 'Alignerr', 'Invisible Technologies', 'LLM training', 'Tech Journalist', 'Technopat', 'EdTech', 'Ankara'],
  openGraph: {
    type: 'website',
    url: '/',
    siteName: PROFILE.name,
    title: `${PROFILE.name} | ${PROFILE.shortTitle}`,
    description,
    images: [{ url: '/og.png', width: 1200, height: 630, alt: `${PROFILE.name}: ${PROFILE.shortTitle}` }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${PROFILE.name} | ${PROFILE.shortTitle}`,
    description,
    images: ['/og.png'],
  },
  alternates: { canonical: '/' },
};

export const viewport: Viewport = {
  themeColor: '#050505',
  colorScheme: 'dark',
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: PROFILE.name,
  url: PROFILE.siteUrl,
  email: `mailto:${PROFILE.email}`,
  jobTitle: PROFILE.roles,
  address: { '@type': 'PostalAddress', addressLocality: 'Ankara', addressCountry: 'TR' },
  alumniOf: { '@type': 'CollegeOrUniversity', name: 'TED University' },
  worksFor: [
    { '@type': 'Organization', name: 'Outlier' },
    { '@type': 'Organization', name: 'Invisible Technologies' },
    { '@type': 'Organization', name: 'Alignerr' },
  ],
  knowsAbout: ['English Language Teaching', 'Large Language Models', 'Prompt Engineering', 'Technical Journalism', 'Educational Technology'],
  sameAs: [PROFILE.linkedin],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body className="flex min-h-screen flex-col text-white">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, '\\u003c') }} />
        <SiteHeader />
        <ViewTransition enter="page" exit="page" default="none">
          <main id="main" className="relative flex-1">
            {children}
          </main>
        </ViewTransition>
        <SiteFooter />
        <CommandPalette />
        <CompanionMount />
        <Delight />
        <div className="grain" aria-hidden />
      </body>
    </html>
  );
}
