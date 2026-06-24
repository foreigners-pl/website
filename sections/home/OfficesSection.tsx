'use client';

import { useState } from 'react';
import Section from '@/components/layout/Section';
import Container from '@/components/layout/Container';
import Tab from '@/components/ui/Tab';
import { FadeIn, SlideIn, AnimatedGradient, GlassBlob } from '@/components/ui/animated';
import { theme } from '@/lib/theme';
import { officesContent } from '@/lib/content';

type Office = {
  name: string;
  heading: string;
  description: string;
  appointmentPrompt: string;
  address: string;
  phone: string;
  email: string;
  mapEmbed: string;
};

export default function OfficesSection() {
  const [activeTab, setActiveTab] = useState<'warsaw' | 'katowice' | 'other'>('warsaw');

  const offices: Record<'warsaw' | 'katowice' | 'other', Office> = officesContent as any;

  const currentOffice = offices[activeTab];

  return (
    <Section id="offices" className="relative overflow-hidden">

      <Container className="relative z-10">
        {/* Tabs */}
        <FadeIn direction="up" delay={0.1}>
          <div className="flex gap-4 justify-center mb-12 overflow-x-auto pb-2">
            <Tab label="Warsaw" active={activeTab === 'warsaw'} onClick={() => setActiveTab('warsaw')} />
            <Tab label="Katowice" active={activeTab === 'katowice'} onClick={() => setActiveTab('katowice')} />
            <Tab label="Other" active={activeTab === 'other'} onClick={() => setActiveTab('other')} />
          </div>
        </FadeIn>

        {/* Office Content */}
        <div className="flex justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-5xl w-full">
            {/* Left Column - Office Info */}
            <SlideIn direction="left" delay={0.2}>
              <div className="space-y-6" id={`${activeTab}-office-info`}>
                <h2 className={`font-display text-section-title font-semibold text-gray-900`}>
                  {currentOffice.heading}
                </h2>
                
                <p className={`text-body-large text-gray-600`}>
                  {currentOffice.description}
                </p>

                <div className="space-y-2">
                  <p className={`${theme.fontSize.base} text-gray-600`}>
                    {currentOffice.appointmentPrompt}
                  </p>
                  <a 
                    href={officesContent.appointmentLink} 
                    className={`inline-block ${theme.fontSize.base} ${theme.fontWeight.semibold} text-primary relative group transition-all`}
                  >
                    {officesContent.appointmentLinkText}
                    <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                  </a>
                </div>

                <div className="space-y-4 pt-4">
                  <div>
                    <h4 className={`${theme.fontWeight.semibold} text-gray-900 mb-1`}>Location</h4>
                    <p className="text-gray-600">{currentOffice.address}</p>
                  </div>

                  <div>
                    <h4 className={`${theme.fontWeight.semibold} text-gray-900 mb-1`}>Number (WhatsApp)</h4>
                    <a
                      href={`https://wa.me/${currentOffice.phone.replace(/\s/g, '')}`}
                      className="text-primary hover:underline"
                    >
                      {currentOffice.phone}
                    </a>
                  </div>

                  <div>
                    <h4 className={`${theme.fontWeight.semibold} text-gray-900 mb-1`}>Email</h4>
                    <a
                      href={`mailto:${currentOffice.email}`}
                      className="text-primary hover:underline"
                    >
                      {currentOffice.email}
                    </a>
                  </div>
                </div>
              </div>
            </SlideIn>

            {/* Right Column - Map */}
            <SlideIn direction="right" delay={0.3}>
              <div className={`w-full h-full ${theme.radius.lg} overflow-hidden ${theme.shadow.lg}`}>
                <iframe
                  src={currentOffice.mapEmbed}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`${currentOffice.name} Office Location`}
                ></iframe>
              </div>
            </SlideIn>
          </div>
        </div>
      </Container>
    </Section>
  );
}
