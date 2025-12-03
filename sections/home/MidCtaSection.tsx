'use client';

import Section from '@/components/layout/Section';
import Container from '@/components/layout/Container';
import { Button } from '@/components/ui/buttons';
import { FadeIn, ScaleIn, FloatingBlob } from '@/components/ui/animated';
import { theme } from '@/lib/theme';

export default function MidCtaSection() {
  return (
    <Section className="relative overflow-hidden">
      
      {/* Red blob positioned around CTA button */}
      <FloatingBlob color={theme.colors.primary} size={400} top="30%" left="30%" delay={0} duration={28} />
      <FloatingBlob color="#FF4500" size={300} top="20%" right="20%" delay={1.5} duration={24} />

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
