import Section from '@/components/layout/Section';
import Container from '@/components/layout/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import { ServiceCard } from '@/components/ui/cards';
import { FadeIn, AnimatedGradient, FloatingBlob, AnimatedTagline } from '@/components/ui/animated';
import { theme } from '@/lib/theme';
import { servicesContent } from '@/lib/content';

// Service icons mapped by title
const serviceIcons: Record<string, React.ReactNode> = {
  Immigration: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  Driving: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9L18 10l-2-4H8L6 10l-2.5 1.1C2.7 11.3 2 12.1 2 13v3c0 .6.4 1 1 1h2" />
      <circle cx="7" cy="17" r="2" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
      <circle cx="17" cy="17" r="2" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
    </svg>
  ),
  Language: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
    </svg>
  ),
  Business: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  Studies: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
};

export default function ServicesSection() {
  return (
    <Section id="services" className="relative overflow-hidden z-10">
      {/* Red blobs positioned around service cards (which have red subtitles and links) */}
      <FloatingBlob color={theme.colors.primary} size={180} top="15%" left="-5%" delay={0} duration={32} />
      <FloatingBlob color="#FF4500" size={150} top="40%" right="-5%" delay={1.5} duration={28} />
      <FloatingBlob color="#DC2626" size={130} bottom="10%" left="5%" delay={3} duration={30} />

      <Container>
        <AnimatedTagline />
        
        <FadeIn direction="up" delay={0.1}>
          <SectionHeading
            description={servicesContent.sectionDescription}
          />
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {servicesContent.items.map((service, index) => (
            <FadeIn 
              key={index} 
              direction="up" 
              delay={0.2 + index * 0.1}
              className={service.title === 'Studies' ? 'md:col-span-2 md:w-1/2 md:mx-auto' : ''}
            >
              <ServiceCard
                icon={serviceIcons[service.title]}
                title={service.title}
                subtitle={service.subtitle}
                description={service.description}
                link={service.link}
              />
            </FadeIn>
          ))}
        </div>
      </Container>
    </Section>
  );
}
