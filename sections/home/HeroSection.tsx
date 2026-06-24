'use client';

import Section from '@/components/layout/Section';
import Container from '@/components/layout/Container';
import { FadeIn, SlideIn, GlassBlob } from '@/components/ui/animated';
import { theme } from '@/lib/theme';
import { heroContent } from '@/lib/content';
import HeroQuestionnaire from '@/components/ui/HeroQuestionnaire';

export default function HeroSection() {
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
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-white/95 via-white/50 to-transparent pointer-events-none z-0" />

      <Container className="relative z-10">
        {/* Mobile: Single column with form between subtitle and description */}
        {/* Desktop: Two columns */}
        <div className="block lg:hidden space-y-6">
          {/* Title */}
          <FadeIn direction="up" delay={0.1}>
            <h1
              className="font-display text-hero-display text-gray-900"
              style={{ fontFamily: "'Fraunces'", fontWeight: 400 }}
            >
              {heroContent.title.line1}<br />
              <span className="text-primary italic">partner</span> in Poland
            </h1>
          </FadeIn>
          
          {/* Subtitle */}
          <FadeIn direction="up" delay={0.2}>
            <h2 className={`text-left text-primary ${theme.fontSize.xl} ${theme.fontWeight.semibold}`}>
              {heroContent.subtitle}
            </h2>
          </FadeIn>
          
          {/* FORM - Between subtitle and description on mobile */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-md">
              <HeroQuestionnaire />
            </div>
          </div>
          
          {/* Description */}
          <FadeIn direction="up" delay={0.3}>
            <p className={`text-body-large text-gray-600`}>
              {heroContent.description}
            </p>
          </FadeIn>

          {/* Social Proof */}
          <FadeIn direction="up" delay={0.5}>
            <div className="flex items-center gap-4 pt-6">
              <div className="flex -space-x-2">
                <div className={`w-10 h-10 ${theme.radius.full} bg-gray-300 border-2 border-white flex items-center justify-center ${theme.fontSize.sm} ${theme.fontWeight.semibold} text-gray-700`}>
                  JD
                </div>
                <div className={`w-10 h-10 ${theme.radius.full} bg-gray-400 border-2 border-white flex items-center justify-center ${theme.fontSize.sm} ${theme.fontWeight.semibold} text-gray-700`}>
                  MK
                </div>
                <div className={`w-10 h-10 ${theme.radius.full} bg-gray-500 border-2 border-white flex items-center justify-center ${theme.fontSize.sm} ${theme.fontWeight.semibold} text-white`}>
                  AS
                </div>
              </div>
              <div className="text-gray-700">
                <p className={`${theme.fontSize.sm} ${theme.fontWeight.semibold}`}>Trusted by 3000+ clients</p>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Desktop: Two column layout */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Text Content */}
          <div className="space-y-6">
            <FadeIn direction="up" delay={0.1}>
              <h1
                className="font-display text-hero-display text-gray-900"
                style={{ fontFamily: "'Fraunces'", fontWeight: 400 }}
              >
                {heroContent.title.line1}<br />
                <span className="text-primary italic">partner</span> in Poland
              </h1>
            </FadeIn>
            
            <FadeIn direction="up" delay={0.2}>
              <h2 className={`text-left text-primary ${theme.fontSize.xl} md:${theme.fontSize['2xl']} ${theme.fontWeight.semibold}`}>
                {heroContent.subtitle}
              </h2>
            </FadeIn>
            
            <FadeIn direction="up" delay={0.3}>
              <p className={`text-body-large text-gray-600`}>
                {heroContent.description}
              </p>
            </FadeIn>

            {/* Social Proof */}
            <FadeIn direction="up" delay={0.5}>
              <div className="flex items-center gap-4 pt-6">
                <div className="flex -space-x-2">
                  <div className={`w-10 h-10 ${theme.radius.full} bg-gray-300 border-2 border-white flex items-center justify-center ${theme.fontSize.sm} ${theme.fontWeight.semibold} text-gray-700`}>
                    JD
                  </div>
                  <div className={`w-10 h-10 ${theme.radius.full} bg-gray-400 border-2 border-white flex items-center justify-center ${theme.fontSize.sm} ${theme.fontWeight.semibold} text-gray-700`}>
                    MK
                  </div>
                  <div className={`w-10 h-10 ${theme.radius.full} bg-gray-500 border-2 border-white flex items-center justify-center ${theme.fontSize.sm} ${theme.fontWeight.semibold} text-white`}>
                    AS
                  </div>
                </div>
                <div className="text-gray-700">
                  <p className={`${theme.fontSize.sm} ${theme.fontWeight.semibold}`}>Trusted by 3000+ clients</p>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right Column - Hero Questionnaire */}
          <div>
            <div className="flex justify-end">
              <div className="relative w-full max-w-md">
                <HeroQuestionnaire />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}


