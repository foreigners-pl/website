'use client';

import Section from '@/components/layout/Section';
import Container from '@/components/layout/Container';
import { FadeIn } from '@/components/ui/animated';
import { theme } from '@/lib/theme';
import PartnerLogo from '@/components/ui/PartnerLogo';

const partners = [
  {
    name: 'Consensus',
    logo: '/PartnersLogos/consensus.png',
    url: 'https://www.consensus.nieruchomosci.pl/'
  },
  {
    name: 'CREATE',
    logo: '/PartnersLogos/create.jpg',
    url: 'https://alejejerozolimskie109.pl/'
  },
  {
    name: 'Easy Learning Complex Cien',
    logo: '/PartnersLogos/easy-learning.png',
    url: 'https://easylekcje.pl/en/about-us-english/'
  },
  {
    name: 'KTW Internationals',
    logo: '/PartnersLogos/ktw-internationals.png',
    url: 'https://www.katowiceinternationals.org/'
  }
];

export default function PartnersSection() {
  return (
    <Section className="bg-white">
      <Container>
        <FadeIn>
          <div className="text-center mb-12">
            <h2 className={`${theme.fontSize['3xl']} ${theme.fontWeight.bold} text-gray-900 mb-4`}>
              Trusted by Leading Organizations
            </h2>
            <p className={`${theme.fontSize.lg} text-gray-600 max-w-2xl mx-auto`}>
              We are proud to partner with industry leaders who share our commitment to excellence
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 items-center">
          {partners.map((partner, index) => (
            <FadeIn key={partner.name} delay={0.1 * (index + 1)}>
              <PartnerLogo
                name={partner.name}
                logo={partner.logo}
                url={partner.url}
              />
            </FadeIn>
          ))}
        </div>
      </Container>
    </Section>
  );
}
