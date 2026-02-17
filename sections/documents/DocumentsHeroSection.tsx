'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Container from '@/components/layout/Container';
import Section from '@/components/layout/Section';
import LeadForm from '@/components/forms/LeadForm';
import { SlideIn, FadeIn, GlassBlob } from '@/components/ui/animated';
import { theme } from '@/lib/theme';

const taglines = [
  "Don't risk delays or rejections. Our legal team can prepare everything for you, correctly and stress-free.",
  "A small error in these forms can cause big problems later. Choose the safe option - we prepare everything for you.",
  "Feeling lost? You're not alone. Thousands of foreigners trust us to prepare their documents - let us help you too."
];

export default function DocumentsHeroSection() {
  const [currentTagline, setCurrentTagline] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTagline((prev) => (prev + 1) % taglines.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-red-50/30 pt-32 pb-16">
      {/* Glass Blobs */}
      <GlassBlob color="#fdeee7" size={500} top="10%" left="-12%" delay={0} duration={28} blur={12} opacity={0.85} />
      <GlassBlob color="#fce4d6" size={400} top="5%" right="8%" delay={1.5} duration={32} blur={10} opacity={0.8} />
      <GlassBlob color="#fdd5c4" size={350} bottom="5%" right="-10%" delay={3} duration={26} blur={8} opacity={0.75} />
      <GlassBlob color="#fcc9b3" size={300} bottom="15%" left="12%" delay={2} duration={30} blur={8} opacity={0.7} />

      {/* Gradient fade to white at bottom */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none z-[5]" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Title and Rotating Tagline */}
          <div className="space-y-6 lg:pr-8">
            <FadeIn direction="up" delay={0.1}>
              <h1 className={`${theme.fontSize['4xl']} md:${theme.fontSize['5xl']} ${theme.fontWeight.bold} text-gray-900`}>
                Documents to download
              </h1>
            </FadeIn>

            <div className="relative min-h-[100px]">
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentTagline}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className={`${theme.fontSize.lg} text-gray-600 leading-relaxed absolute inset-0`}
                >
                  {taglines[currentTagline]}
                </motion.p>
              </AnimatePresence>
            </div>

            <FadeIn direction="up" delay={0.3}>
              <a 
                href="/documents/documents-list.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-red-700 text-white font-semibold rounded-lg transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download All Documents (PDF)
              </a>
            </FadeIn>
          </div>

          {/* Right Column - Lead Form */}
          <SlideIn direction="left" delay={0.2}>
            <LeadForm title="Request a Free Consultation" source="documents" />
          </SlideIn>
        </div>
      </Container>
    </Section>
  );
}