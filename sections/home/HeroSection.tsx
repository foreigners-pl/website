'use client';

import Section from '@/components/layout/Section';
import Container from '@/components/layout/Container';
import { Button } from '@/components/ui/buttons';
import { FadeIn, SlideIn, ScaleIn, AnimatedGradient, FloatingBlob, ParticleField } from '@/components/ui/animated';
import { theme } from '@/lib/theme';

export default function HeroSection() {
  return (
    <Section background="white" className="relative overflow-hidden">
      {/* Animated Background Gradient */}
      <AnimatedGradient />

      {/* Floating Blobs */}
      <FloatingBlob color={theme.colors.primary} size={400} top="-10%" right="-5%" delay={0} />
      <FloatingBlob color="#FF4500" size={300} top="50%" left="-10%" delay={2} duration={25} />
      <FloatingBlob color="#FF8C00" size={200} bottom="10%" right="30%" delay={4} duration={18} />

      {/* Particle Field */}
      <ParticleField count={15} color={theme.colors.primary} />

      <Container>
        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-6">
            <FadeIn direction="up" delay={0.1}>
              <h1 className={`${theme.fontSize['4xl']} md:${theme.fontSize['5xl']} lg:${theme.fontSize['6xl']} ${theme.fontWeight.bold} text-gray-900 leading-tight`}>
                Your Trusted<br />
                Partner in Poland
              </h1>
            </FadeIn>
            
            <FadeIn direction="up" delay={0.2}>
              <h2 className={`text-brand-primary ${theme.fontSize.xl} md:${theme.fontSize['2xl']} ${theme.fontWeight.semibold}`}>
                Solution for Foreigners
              </h2>
            </FadeIn>
            
            <FadeIn direction="up" delay={0.3}>
              <p className={`${theme.fontSize.lg} text-gray-600 leading-relaxed`}>
                Professional assistance with work permits, residence cards, business setup, 
                and all aspects of living in Poland. We make your transition smooth and legally compliant.
              </p>
            </FadeIn>

            {/* CTA Buttons */}
            <FadeIn direction="up" delay={0.4}>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button variant="primary" size="lg">
                  Free Consultation
                </Button>
                <Button variant="secondary" size="lg">
                  Our Services
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </Button>
              </div>
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
                <p className={`${theme.fontSize.sm} text-gray-600`}>
                  <span className={`${theme.fontWeight.bold} text-gray-900`}>1000+</span> clients trusted us this year
                </p>
              </div>
            </FadeIn>
          </div>

          {/* Right Column - Floating Card */}
          <SlideIn direction="right" delay={0.3} duration={0.8}>
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md">
                <ScaleIn delay={0.5}>
                  <div className={`bg-white ${theme.radius.xl} ${theme.shadow['2xl']} p-8 border border-gray-100 transform hover:scale-105 ${theme.transition.transform}`}>
                    {/* Card Header */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`w-16 h-16 ${theme.radius.lg} bg-brand-primary flex items-center justify-center`}>
                        <span className={`text-white ${theme.fontSize['2xl']} ${theme.fontWeight.bold}`}>ID</span>
                      </div>
                      <div className="flex-1">
                        <div className={`h-3 bg-gray-200 ${theme.radius.full} w-3/4 mb-2`}></div>
                        <div className={`h-3 bg-gray-200 ${theme.radius.full} w-1/2`}></div>
                      </div>
                    </div>

                    {/* Card Body - Form Fields */}
                    <div className="space-y-4 mb-6">
                      <div className={`h-12 bg-gray-100 ${theme.radius.md}`}></div>
                      <div className={`h-12 bg-gray-100 ${theme.radius.md}`}></div>
                      <div className={`h-12 bg-gray-100 ${theme.radius.md}`}></div>
                      <div className={`h-12 bg-gray-100 ${theme.radius.md}`}></div>
                    </div>

                    {/* Card Footer */}
                    <div className="flex items-center justify-between">
                      <div className={`h-12 bg-brand-primary-light ${theme.radius.md} flex-1 mr-4`}></div>
                      <div className={`w-12 h-12 ${theme.radius.full} bg-brand-primary flex items-center justify-center`}>
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </ScaleIn>
              </div>
            </div>
          </SlideIn>
        </div>
      </Container>
    </Section>
  );
}