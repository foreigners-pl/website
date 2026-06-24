import { notFound } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ServiceHeroSection, TrustSection, QASection, OtherServicesSection } from '@/sections/service';
import {
  immigrationContent,
  drivingContent,
  businessContent,
  languageContent,
  studiesContent,
} from '@/lib/content/services';

// Map service slugs to content
const serviceContent = {
  immigration: immigrationContent,
  driving: drivingContent,
  business: businessContent,
  language: languageContent,
  studies: studiesContent,
} as const;

type ServiceSlug = keyof typeof serviceContent;

// Generate static params for all service pages
export async function generateStaticParams() {
  return Object.keys(serviceContent).map((service) => ({
    service,
  }));
}

// Generate metadata for each service page
export async function generateMetadata({ params }: { params: Promise<{ service: string }> }) {
  const { service } = await params;
  
  if (!(service in serviceContent)) {
    return {
      title: 'Service Not Found',
    };
  }

  const content = serviceContent[service as ServiceSlug];
  
  return {
    title: `${content.hero.title} Services | Foreigners in Poland`,
    description: content.hero.subtitle,
  };
}

export default async function ServicePage({ params }: { params: Promise<{ service: string }> }) {
  const { service } = await params;

  // Check if service exists
  if (!(service in serviceContent)) {
    notFound();
  }

  const content = serviceContent[service as ServiceSlug];

  return (
    <>
      <Navbar />
      <main>
        <ServiceHeroSection
          title={content.hero.title}
          subtitle={content.hero.subtitle}
          description={content.hero.description}
          ctaButton={content.hero.ctaButton}
          formTitle={content.hero.formTitle}
          formSource={content.hero.formSource}
          service={service}
        />
        
        <TrustSection
          heading={content.trust.heading}
          subheading={content.trust.subheading}
          description={content.trust.description}
          stats={content.trust.stats}
        />
        
        <QASection
          title={content.qa.title}
          searchPlaceholder={content.qa.searchPlaceholder}
          items={content.qa.items}
        />
        
        <OtherServicesSection
          heading={content.otherServices.heading}
          ctaButton={content.otherServices.ctaButton}
          alternativeText={content.otherServices.alternativeText}
          categories={content.otherServices.categories}
        />
      </main>
      <Footer />
    </>
  );
}