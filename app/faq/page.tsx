import { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Container from '@/components/layout/Container';
import Section from '@/components/layout/Section';
import { FAQTabs } from '@/components/faq';
import { faqContent } from '@/lib/content/faq';
import { theme } from '@/lib/theme';

export const metadata: Metadata = {
  title: 'FAQ | FOREIGNERS.pl',
  description: 'Frequently asked questions about our immigration, driving, business, language, and student services in Poland.',
};

export default function FAQPage() {
  return (
    <>
      <Navbar />
      <div className="bg-gray-50 min-h-screen">
        <Section className="py-16">
          <Container>
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Find answers to common questions about our services
              </p>
            </div>

            <FAQTabs categories={faqContent.categories as any} />

            <div className="max-w-4xl mx-auto mt-16 p-8 bg-white border border-gray-200 rounded-xl text-center">
              <h3 className={`${theme.fontSize['2xl']} ${theme.fontWeight.bold} text-gray-900 mb-3`}>
                Still have questions?
              </h3>
              <p className={`${theme.fontSize.base} text-gray-600 mb-6`}>
                Can't find the answer you're looking for? Our team is here to help.
              </p>
              <a
                href="/#consultation"
                className={`inline-flex items-center justify-center px-6 py-3 bg-primary text-white ${theme.fontWeight.semibold} ${theme.radius.lg} hover:bg-red-700 ${theme.transition.default}`}
              >
                Contact Us
              </a>
            </div>
          </Container>
        </Section>
      </div>
      <Footer />
    </>
  );
}
