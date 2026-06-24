'use client';

import Section from '@/components/layout/Section';
import Container from '@/components/layout/Container';
import { Button } from '@/components/ui/buttons';
import { FadeIn, SlideIn, GlassBlob } from '@/components/ui/animated';
import { theme } from '@/lib/theme';
import ServiceSubserviceForm from '@/components/ui/ServiceSubserviceForm';

interface ServiceHeroSectionProps {
  title: string;
  subtitle: string;
  description: string;
  ctaButton: string;
  formTitle: string;
  formSource: string;
  service: string;
}

export default function ServiceHeroSection({ 
  title, 
  subtitle, 
  description, 
  ctaButton,
  formTitle,
  formSource,
  service
}: ServiceHeroSectionProps) {

  return (
    <Section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-red-50/30">
      {/* Glass Blobs - More subtle and glassy */}
      <GlassBlob color="#fdeee7" size={480} top="8%" left="-8%" delay={0} duration={27} blur={20} opacity={0.25} />
      <GlassBlob color="#fce4d6" size={420} top="15%" right="-5%" delay={1.5} duration={31} blur={18} opacity={0.22} />
      <GlassBlob color="#fdd5c4" size={350} bottom="10%" right="5%" delay={3} duration={25} blur={16} opacity={0.20} />
      <GlassBlob color="#fcc9b3" size={300} bottom="20%" left="8%" delay={2} duration={28} blur={16} opacity={0.18} />
      
      {/* Additional accent blobs */}
      <GlassBlob color="#fbd4c0" size={220} top="50%" left="30%" delay={4} duration={24} blur={14} opacity={0.15} />
      <GlassBlob color="#fdeee7" size={180} bottom="35%" right="28%" delay={3.5} duration={26} blur={12} opacity={0.12} />

      {/* Gradient fade to white at bottom */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none z-[5]" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-6 lg:pr-8">
            <FadeIn direction="up" delay={0.1}>
              <h1 className={`${theme.fontSize['4xl']} md:${theme.fontSize['5xl']} ${theme.fontWeight.bold} text-gray-900`}>
                {title}
              </h1>
            </FadeIn>
            
            <FadeIn direction="up" delay={0.2}>
              <h2 className={`text-primary ${theme.fontSize.xl} md:${theme.fontSize['2xl']} ${theme.fontWeight.semibold}`}>
                {subtitle}
              </h2>
            </FadeIn>
            
            <FadeIn direction="up" delay={0.3}>
              <p className={`${theme.fontSize.lg} text-gray-600 leading-relaxed`}>
                {description}
              </p>
            </FadeIn>
          </div>

          {/* Right Column - Service Subservice Form */}
          <SlideIn direction="left" delay={0.2}>
            <div className="w-full max-w-md mx-auto lg:mx-0 lg:ml-auto">
              <ServiceSubserviceForm service={service} title={formTitle} />
            </div>
          </SlideIn>
        </div>
      </Container>
    </Section>
  );
}
