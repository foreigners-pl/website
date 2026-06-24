'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/sections/home/HeroSection';
import ServicesSection from '@/sections/home/ServicesSection';
import MidCtaSection from '@/sections/home/MidCtaSection';
import OfficesSection from '@/sections/home/OfficesSection';
import GoogleReviewsSection from '@/sections/home/GoogleReviewsSection';
import InstagramSection from '@/sections/home/InstagramSection';
import PartnersSection from '@/sections/home/PartnersSection';
import TeamSection from '@/sections/home/TeamSection';
import Section from '@/components/layout/Section';
import Container from '@/components/layout/Container';
import { FadeIn } from '@/components/ui/animated';

function TrustSection() {
  return (
    <Section id="reviews-section" className="bg-gray-50 relative overflow-hidden py-20">
      {/* Unified Header - Left aligned */}
      <Container className="relative z-10">
        <FadeIn direction="up">
          <div className="text-left mb-20 pt-8">
            <h2 className="font-display text-section-title font-semibold text-gray-900">
              Why people <span className="text-primary italic">trust us</span>
            </h2>
          </div>
        </FadeIn>
      </Container>

      {/* Google Reviews */}
      <div className="relative z-10 mb-24">
        <GoogleReviewsSection />
      </div>

      {/* Instagram */}
      <div className="relative z-10 mb-24">
        <InstagramSection />
      </div>

      {/* Our Team */}
      <div className="relative z-10">
        <TeamSection />
      </div>
    </Section>
  );
}

export default function Home() {
  return (
    <>
      <Navbar />

      <div className="relative min-h-screen">
        <HeroSection />
        <ServicesSection />
        <MidCtaSection />
        <OfficesSection />
        <TrustSection />
        <PartnersSection />
      </div>
      <Footer />
    </>
  );
}



