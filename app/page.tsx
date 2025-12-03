import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/sections/home/HeroSection';
import ServicesSection from '@/sections/home/ServicesSection';
import MidCtaSection from '@/sections/home/MidCtaSection';
import OfficesSection from '@/sections/home/OfficesSection';
import ConsultationSection from '@/sections/home/ConsultationSection';

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <MidCtaSection />
      <OfficesSection />
      <ConsultationSection />
      <Footer />
    </>
  );
}


