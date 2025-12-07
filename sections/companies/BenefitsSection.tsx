import Container from '@/components/layout/Container';
import Section from '@/components/layout/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/cards';
import { FadeIn } from '@/components/ui/animated';
import { companiesContent } from '@/lib/content/companies';
import { theme } from '@/lib/theme';

export default function BenefitsSection() {
  return (
    <Section>
      <Container>
        <SectionHeading
          title={companiesContent.benefits.title}
          subtitle={companiesContent.benefits.subtitle}
          align="center"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {companiesContent.benefits.items.map((benefit, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <Card className="h-full hover:shadow-xl transition-shadow">
                <div className={`w-12 h-12 ${theme.radius.lg} bg-primary/10 flex items-center justify-center mb-4`}>
                  <span className={`${theme.fontSize['2xl']} ${theme.fontWeight.bold} text-primary`}>{benefit.number}</span>
                </div>
                <h3 className={`${theme.fontSize.xl} ${theme.fontWeight.semibold} mb-3`}>
                  {benefit.title}
                </h3>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </Card>
            </FadeIn>
          ))}
        </div>
      </Container>
    </Section>
  );
}
