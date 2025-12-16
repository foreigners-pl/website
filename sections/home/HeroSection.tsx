'use client';

import Section from '@/components/layout/Section';
import Container from '@/components/layout/Container';
import { Button } from '@/components/ui/buttons';
import { FadeIn, AnimatedGradient, GlassBlob } from '@/components/ui/animated';
import { theme } from '@/lib/theme';
import { heroContent } from '@/lib/content';

export default function HeroSection() {
  return (
    <Section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-red-50/30">
      {/* Glass Blobs - Apple-inspired glassmorphism effect */}
      <div className="opacity-30 md:opacity-100">
        <GlassBlob color="#fdeee7" size={550} top="12%" left="-12%" delay={0} duration={25} blur={12} opacity={0.7} />
        <GlassBlob color="#fce4d6" size={450} top="3%" left="8%" delay={2} duration={30} blur={10} opacity={0.65} />
        <GlassBlob color="#fdd5c4" size={380} top="30%" right="3%" delay={1} duration={28} blur={10} opacity={0.6} />
        <GlassBlob color="#fdeee7" size={480} bottom="3%" right="-10%" delay={4} duration={22} blur={12} opacity={0.68} />
        <GlassBlob color="#fcc9b3" size={320} bottom="22%" left="10%" delay={3} duration={26} blur={8} opacity={0.55} />
        <GlassBlob color="#fbd4c0" size={280} top="52%" left="32%" delay={5} duration={24} blur={8} opacity={0.5} />
        <GlassBlob color="#fce4d6" size={350} top="10%" right="22%" delay={2.5} duration={27} blur={10} opacity={0.58} />
        <GlassBlob color="#fdeee7" size={300} top="40%" left="5%" delay={2.2} duration={28} blur={9} opacity={0.6} />
      </div>

      {/* Gradient fade to white at bottom */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-white/95 via-white/50 to-transparent pointer-events-none z-0" />

      <Container className="relative z-10">
        <div className="relative max-w-4xl mx-auto text-center">
          {/* Text Content */}
          <div className="space-y-6">
            <FadeIn direction="up" delay={0.1}>
              <h1 className={`${theme.fontSize['4xl']} md:${theme.fontSize['5xl']} lg:${theme.fontSize['6xl']} ${theme.fontWeight.bold} text-gray-900 leading-tight`}>
                {heroContent.title.line1}<br />
                {heroContent.title.line2}
              </h1>
            </FadeIn>
            
            <FadeIn direction="up" delay={0.2}>
              <h2 className={`text-primary ${theme.fontSize.xl} md:${theme.fontSize['2xl']} ${theme.fontWeight.semibold}`}>
                {heroContent.subtitle}
              </h2>
            </FadeIn>
            
            <FadeIn direction="up" delay={0.3}>
              <p className={`${theme.fontSize.lg} text-gray-600 leading-relaxed max-w-2xl mx-auto`}>
                {heroContent.description}
              </p>
            </FadeIn>

            {/* CTA Buttons */}
            <FadeIn direction="up" delay={0.4}>
              <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
                <Button 
                  variant="primary" 
                  size="lg"
                  onClick={() => {
                    const consultationSection = document.querySelector('#consultation');
                    consultationSection?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  {heroContent.buttons.primary}
                </Button>
                <Button 
                  variant="secondary" 
                  size="lg"
                  onClick={() => {
                    const servicesSection = document.querySelector('#services');
                    servicesSection?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  {heroContent.buttons.secondary}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </Button>
              </div>
            </FadeIn>

            {/* Social Proof */}
            <FadeIn direction="up" delay={0.5}>
              <div className="flex items-center gap-4 pt-6 justify-center">
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
                  <p className={`${theme.fontSize.sm} ${theme.fontWeight.semibold}`}>Trusted by 500+ clients</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </Container>
    </Section>
  );
}

