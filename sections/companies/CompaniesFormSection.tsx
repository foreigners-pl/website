'use client';

import { useState, useEffect, useRef } from 'react';
import Container from '@/components/layout/Container';
import Section from '@/components/layout/Section';
import SimpleWhatsAppForm from '@/components/ui/SimpleWhatsAppForm';
import { FadeIn } from '@/components/ui/animated';
import { companiesContent } from '@/lib/content/companies';
import { theme } from '@/lib/theme';

export default function CompaniesFormSection() {
  const [visibleChecks, setVisibleChecks] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleChecks.length === 0) {
          // Show checks one by one with delays
          setTimeout(() => setVisibleChecks([0]), 800);
          setTimeout(() => setVisibleChecks([0, 1]), 1600);
          setTimeout(() => setVisibleChecks([0, 1, 2]), 2400);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [visibleChecks.length]);

  return (
    <Section id="consultation-form" className="bg-gradient-to-br from-primary to-red-700 text-white !py-10 md:!py-14">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <FadeIn>
            <div ref={sectionRef}>
              <h2 className={`${theme.fontSize['4xl']} ${theme.fontWeight.bold} mb-4`}>
                {companiesContent.cta.title}
              </h2>
              <p className={`${theme.fontSize.xl} mb-8 text-white/90`}>
                {companiesContent.cta.subtitle}
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className={`w-6 h-6 ${theme.radius.full} bg-white/20 flex items-center justify-center flex-shrink-0 mt-1 relative overflow-hidden`}>
                    <svg 
                      className={`w-4 h-4 text-white transition-all duration-700 ${visibleChecks.includes(0) ? 'scale-100 opacity-100 rotate-0' : 'scale-0 opacity-0 -rotate-90'}`}
                      style={{ transitionTimingFunction: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)' }}
                      fill="none" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="3" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <div>
                    <p className={`${theme.fontWeight.semibold}`}>Free Initial Consultation</p>
                    <p className={`${theme.fontSize.sm} text-white/80`}>No obligation assessment of your needs</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className={`w-6 h-6 ${theme.radius.full} bg-white/20 flex items-center justify-center flex-shrink-0 mt-1 relative overflow-hidden`}>
                    <svg 
                      className={`w-4 h-4 text-white transition-all duration-700 ${visibleChecks.includes(1) ? 'scale-100 opacity-100 rotate-0' : 'scale-0 opacity-0 -rotate-90'}`}
                      style={{ transitionTimingFunction: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)' }}
                      fill="none" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="3" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <div>
                    <p className={`${theme.fontWeight.semibold}`}>Custom Proposal</p>
                    <p className={`${theme.fontSize.sm} text-white/80`}>Tailored to your company size and requirements</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className={`w-6 h-6 ${theme.radius.full} bg-white/20 flex items-center justify-center flex-shrink-0 mt-1 relative overflow-hidden`}>
                    <svg 
                      className={`w-4 h-4 text-white transition-all duration-700 ${visibleChecks.includes(2) ? 'scale-100 opacity-100 rotate-0' : 'scale-0 opacity-0 -rotate-90'}`}
                      style={{ transitionTimingFunction: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)' }}
                      fill="none" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="3" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <div>
                    <p className={`${theme.fontWeight.semibold}`}>Fast Response</p>
                    <p className={`${theme.fontSize.sm} text-white/80`}>We'll contact you within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="w-full max-w-md mx-auto lg:mx-0 lg:ml-auto">
              <SimpleWhatsAppForm
                title="Get Started Today"
                prefillMessage="I need legal support for foreign employees in my company — work permits, residence cards, and compliance. I'd like to discuss a tailored solution."
                source="Companies Page"
              />
            </div>
          </FadeIn>
        </div>
      </Container>
    </Section>
  );
}
