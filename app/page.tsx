'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/sections/home/HeroSection';
import ServicesSection from '@/sections/home/ServicesSection';
import MidCtaSection from '@/sections/home/MidCtaSection';
import OfficesSection from '@/sections/home/OfficesSection';
import GoogleReviewsSection from '@/sections/home/GoogleReviewsSection';
import ConsultationSection from '@/sections/home/ConsultationSection';

export default function Home() {
  return (
    <>
      <Navbar />
      
      <div className="relative min-h-screen">
        <HeroSection />
        <ServicesSection />
        <MidCtaSection />
        <OfficesSection />
        <GoogleReviewsSection />
        <ConsultationSection />
      </div>
      <Footer />
    </>
  );
}



