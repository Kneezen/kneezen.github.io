import type { Metadata } from 'next';
import PageHero from '../components/site/PageHero';
import ScrollReveal from '../components/ScrollReveal';
import { SignOff } from '../components/ui/Bits';
import { ACCENTS, CERTIFICATIONS } from '../data/profile';
import CertGallery from './CertGallery';

export const metadata: Metadata = {
  title: 'Certifications',
  description: 'Nine professional accreditations across IBM SkillsBuild, LinkedIn Learning, UC Irvine and Web 2.0 tool integration.',
  alternates: { canonical: '/certifications' },
};

const ACCENT = ACCENTS.amber;

export default function CertificationsPage() {
  const issuers = new Set(CERTIFICATIONS.map((c) => c.issuer)).size;
  const ai = CERTIFICATIONS.filter((c) => /\bAI\b|Artificial|Chatbot|Granite|Generative/.test(c.title)).length;
  return (
    <>
      <PageHero
        section="CERTIFICATIONS"
        title="Credentials & Mastery"
        subtitle="Professional Accreditations"
        accent={ACCENT}
        video="certifications"
        videoOpacity={0.22}
        stats={[
          { value: String(CERTIFICATIONS.length), label: 'Certificates' },
          { value: String(issuers), label: 'Issuers' },
          { value: String(ai), label: 'AI focused' },
          { value: String(CERTIFICATIONS.filter((c) => c.issuer === 'IBM SkillsBuild').length), label: 'IBM SkillsBuild' },
        ]}
      />
      <div className="relative z-10 mx-auto w-full max-w-screen-2xl space-y-16 px-5 sm:px-8 md:px-16">
        <CertGallery accent={ACCENT} />
        <ScrollReveal>
          <SignOff accent={ACCENT}>END_ARCHIVE // CERTIFICATIONS_INDEX</SignOff>
        </ScrollReveal>
      </div>
    </>
  );
}
