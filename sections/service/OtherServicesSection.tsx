import Link from 'next/link';
import Section from '@/components/layout/Section';
import Container from '@/components/layout/Container';
import { Button } from '@/components/ui/buttons';
import { FadeIn } from '@/components/ui/animated';
import { theme } from '@/lib/theme';

interface OtherServicesSectionProps {
  heading: string;
  ctaButton: string;
  alternativeText: string;
  categories: readonly string[];
}

export default function OtherServicesSection({ heading, ctaButton, alternativeText, categories }: OtherServicesSectionProps) {
  return (
    <Section>
      <Container>
        <div className="space-y-8">
          {/* Heading */}
          <FadeIn direction="up" delay={0.1}>
            <h2 className={`${theme.fontSize['2xl']} md:${theme.fontSize['3xl']} ${theme.fontWeight.bold} text-gray-900`}>
              {heading}
            </h2>
          </FadeIn>

          {/* CTA Button */}
          <FadeIn direction="up" delay={0.2}>
            <Link href="/#consultation">
              <Button variant="primary" size="lg">
                {ctaButton}
              </Button>
            </Link>
          </FadeIn>

          {/* Alternative Text */}
          <FadeIn direction="up" delay={0.3}>
            <p className={`${theme.fontSize.xl} text-gray-900 ${theme.fontWeight.medium}`}>
              {alternativeText}
            </p>
          </FadeIn>

          {/* Categories */}
          <FadeIn direction="up" delay={0.4}>
            <div className="flex flex-wrap gap-6 pt-4">
              {categories.map((category, index) => (
                <Link
                  key={index}
                  href={`/services/${category.toLowerCase()}`}
                  className={`${theme.fontSize.lg} ${theme.fontWeight.medium} text-primary relative group transition-all`}
                >
                  {category}
                  <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </Link>
              ))}
            </div>
          </FadeIn>
        </div>
      </Container>
    </Section>
  );
}
