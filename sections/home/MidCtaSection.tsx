'use client';

import Section from '@/components/layout/Section';
import Container from '@/components/layout/Container';
import { Button } from '@/components/ui/buttons';
import { FadeIn, ScaleIn, FloatingBlob } from '@/components/ui/animated';
import { theme } from '@/lib/theme';

export default function MidCtaSection() {
  return (
    <Section className="relative overflow-hidden">
      {/* Business/Corporate gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-50/40 via-transparent to-violet-50/40 pointer-events-none" />
      
      {/* Corporate themed floating elements */}
      <FloatingBlob color="#6366F1" size={320} top="20%" left="-10%" delay={0} duration={30} />
      <FloatingBlob color="#8B5CF6" size={240} top="40%" right="-8%" delay={2} duration={26} />

      <Container className="text-center">
        <FadeIn direction="up" delay={0.1}>
          <h2 className={`${theme.fontSize['3xl']} md:${theme.fontSize['4xl']} ${theme.fontWeight.bold} text-gray-900 mb-8`}>
            Looking to hire international talent?
          </h2>
        </FadeIn>
        <ScaleIn delay={0.3}>
          <Button href="/for-companies" variant="primary" size="lg">
            For Companies
          </Button>
        </ScaleIn>
      </Container>
    </Section>
  );
}
