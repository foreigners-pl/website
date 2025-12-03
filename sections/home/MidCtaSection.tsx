'use client';

import Section from '@/components/layout/Section';
import Container from '@/components/layout/Container';
import { Button } from '@/components/ui/buttons';
import { FadeIn, ScaleIn, FloatingBlob } from '@/components/ui/animated';
import { theme } from '@/lib/theme';

export default function MidCtaSection() {
  return (
    <Section background="white" className="relative overflow-hidden">
      {/* Floating Blobs */}
      <FloatingBlob color={theme.colors.primary} size={350} top="50%" left="-10%" delay={1} duration={30} />
      <FloatingBlob color="#FF6B35" size={250} top="20%" right="-5%" delay={2} duration={24} />

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
