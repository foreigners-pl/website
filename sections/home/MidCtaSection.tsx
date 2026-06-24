'use client';

import Section from '@/components/layout/Section';
import Container from '@/components/layout/Container';
import { Button } from '@/components/ui/buttons';
import { FadeIn, ScaleIn, FloatingBlob } from '@/components/ui/animated';
import { theme } from '@/lib/theme';
import { midCtaContent } from '@/lib/content';

export default function MidCtaSection() {
  return (
    <Section id="mid-cta-section" className="relative overflow-hidden">
      
      {/* Red blob positioned around CTA button */}
      <FloatingBlob color={theme.colors.primary} size={180} top="30%" left="30%" delay={0} duration={28} />
      <FloatingBlob color="#FF4500" size={140} top="20%" right="20%" delay={1.5} duration={24} />

      <Container className="text-center">
        <FadeIn direction="up" delay={0.1}>
          <h2 className={`font-display text-section-title font-semibold text-gray-900 mb-8`}>
            {midCtaContent.heading}
          </h2>
        </FadeIn>
        <ScaleIn delay={0.3}>
          <Button href={midCtaContent.buttonLink} variant="primary" size="lg">
            {midCtaContent.buttonText}
          </Button>
        </ScaleIn>
      </Container>
    </Section>
  );
}
