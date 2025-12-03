import Section from '@/components/layout/Section';
import Container from '@/components/layout/Container';
import { Button } from '@/components/ui/buttons';
import { theme } from '@/lib/theme';

export default function MidCtaSection() {
  return (
    <Section background="white">
      <Container className="text-center">
        <h2 className={`${theme.fontSize['3xl']} md:${theme.fontSize['4xl']} ${theme.fontWeight.bold} text-gray-900 mb-8`}>
          Looking to hire international talent?
        </h2>
        <Button href="/for-companies" variant="primary" size="lg">
          For Companies
        </Button>
      </Container>
    </Section>
  );
}