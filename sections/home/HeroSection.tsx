import Section from '@/components/layout/Section';
import Container from '@/components/layout/Container';
import Button from '@/components/ui/Button';
import { theme } from '@/lib/theme';

export default function HeroSection() {
  const avatars = ['JD', 'MK', 'AS'];

  return (
    <Section background="white" className="relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-24 -right-24 w-96 h-96 bg-[${theme.colors.primary}] opacity-5 rounded-full blur-3xl`}></div>
        <div className={`absolute top-1/2 -left-32 w-80 h-80 bg-[${theme.colors.primary}] opacity-5 rounded-full blur-3xl`}></div>
        <div className="absolute bottom-0 right-1/3 w-64 h-64 bg-orange-200 opacity-10 rounded-full blur-2xl"></div>
      </div>

      <Container>
        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-6">
            <h1 className={`${theme.fontSize['4xl']} md:${theme.fontSize['5xl']} lg:${theme.fontSize['6xl']} ${theme.fontWeight.bold} text-gray-900 leading-tight`}>
              Your Trusted<br />
              Partner in Poland
            </h1>
            
            <h2 className={`${theme.fontSize.xl} md:${theme.fontSize['2xl']} ${theme.fontWeight.semibold} text-[${theme.colors.primary}]`}>
              Solution for Foreigners
            </h2>
            
            <p className={`${theme.fontSize.lg} text-gray-600 leading-relaxed`}>
              Professional assistance with work permits, residence cards, business setup, 
              and all aspects of living in Poland. We make your transition smooth and legally compliant.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button variant="primary" size="lg">
                Free Consultation
              </Button>
              <Button variant="secondary" size="lg">
                Our Services
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-4 pt-6">
              <div className="flex -space-x-2">
                {avatars.map((initials, index) => (
                  <div
                    key={initials}
                    className={`w-10 h-10 ${theme.radius.full} bg-gray-${300 + index * 100} border-2 border-white flex items-center justify-center ${theme.fontSize.sm} ${theme.fontWeight.semibold} text-gray-700`}
                  >
                    {initials}
                  </div>
                ))}
              </div>
              <p className={`${theme.fontSize.sm} text-gray-600`}>
                <span className={`${theme.fontWeight.bold} text-gray-900`}>1000+</span> clients trusted us this year
              </p>
            </div>
          </div>

          {/* Right Column - Floating Card */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md">
              <div className={`bg-white ${theme.radius.xl} ${theme.shadow['2xl']} p-8 border border-gray-100 transform hover:scale-105 ${theme.transition.transform}`}>
                {/* Card Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-16 h-16 ${theme.radius.lg} bg-[${theme.colors.primary}] flex items-center justify-center`}>
                    <span className={`text-white ${theme.fontSize['2xl']} ${theme.fontWeight.bold}`}>ID</span>
                  </div>
                  <div className="flex-1">
                    <div className={`h-3 bg-gray-200 ${theme.radius.full} w-3/4 mb-2`}></div>
                    <div className={`h-3 bg-gray-200 ${theme.radius.full} w-1/2`}></div>
                  </div>
                </div>

                {/* Card Body - Form Fields */}
                <div className="space-y-4 mb-6">
                  <div className={`h-12 bg-gray-100 ${theme.radius.md}`}></div>
                  <div className={`h-12 bg-gray-100 ${theme.radius.md}`}></div>
                  <div className={`h-12 bg-gray-100 ${theme.radius.md}`}></div>
                  <div className={`h-12 bg-gray-100 ${theme.radius.md}`}></div>
                </div>

                {/* Card Footer */}
                <div className="flex items-center justify-between">
                  <div className={`h-12 bg-[${theme.colors.primaryLight}] ${theme.radius.md} flex-1 mr-4`}></div>
                  <div className={`w-12 h-12 ${theme.radius.full} bg-[${theme.colors.primary}] flex items-center justify-center`}>
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}