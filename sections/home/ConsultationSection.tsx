'use client';

import Section from '@/components/layout/Section';
import Container from '@/components/layout/Container';
import { FadeIn, ScaleIn, FloatingBlob } from '@/components/ui/animated';
import { theme } from '@/lib/theme';
import { consultationContent } from '@/lib/content';
import LeadForm from '@/components/forms/LeadForm';

export default function ConsultationSection() {

  return (
    <Section id="consultation" className="relative overflow-hidden">
      
      {/* Red blobs positioned around red CTA panel (left side) and form */}
      <FloatingBlob color={theme.colors.primary} size={200} top="20%" left="-7%" delay={0} duration={35} />
      <FloatingBlob color="#FF4500" size={160} top="10%" left="2%" delay={1} duration={30} />
      <FloatingBlob color="#DC2626" size={140} bottom="-5%" right="-6%" delay={3} duration={28} />

      {/* Full-width red background - on mobile: behind text, on desktop: vertically centered */}
      <div className="absolute left-0 right-0 top-0 bottom-0 lg:top-1/2 lg:bottom-auto lg:-translate-y-1/2 lg:h-[40%] bg-primary z-0" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:items-center">
          {/* Left Column - Text */}
          <FadeIn direction="left" delay={0.1}>
            <div className="lg:pr-12">
              <div className="text-white py-12 lg:py-16">
                <div>
                  <h2 className={`font-display text-section-title font-semibold mb-4 md:mb-6`}>
                    {consultationContent.heading}
                  </h2>
                  <p className={`text-body-large text-white/90`}>
                    {consultationContent.description}
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Right Column - Form Card */}
          <ScaleIn delay={0.3}>
            <div className="lg:-my-16">
              <LeadForm 
                title="General Consultation" 
                source="home-consultation"
              />
            </div>
          </ScaleIn>
        </div>
      </Container>
    </Section>
  );
}
