'use client';

import { useState } from 'react';
import Section from '@/components/layout/Section';
import Container from '@/components/layout/Container';
import { Card } from '@/components/ui/cards';
import { Input, Select, Checkbox } from '@/components/ui/inputs';
import { Button } from '@/components/ui/buttons';
import { FadeIn, ScaleIn, AnimatedGradient, FloatingBlob } from '@/components/ui/animated';
import { theme } from '@/lib/theme';

export default function ConsultationSection() {
  const [formData, setFormData] = useState({
    fullName: '',
    contactNumber: '',
    email: '',
    contactMethod: '',
    acceptedTerms: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const contactMethods = [
    { value: 'phone', label: 'Phone Call' },
    { value: 'whatsapp', label: 'WhatsApp' },
    { value: 'email', label: 'Email' },
    { value: 'video', label: 'Video Call' },
  ];

  return (
    <Section className="relative overflow-hidden">
      
      {/* Red blobs positioned around red CTA panel (left side) and form */}
      <FloatingBlob color={theme.colors.primary} size={500} top="20%" left="-15%" delay={0} duration={35} />
      <FloatingBlob color="#FF4500" size={380} top="10%" left="5%" delay={1} duration={30} />
      <FloatingBlob color="#DC2626" size={320} bottom="-5%" right="-12%" delay={3} duration={28} />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text */}
          <FadeIn direction="left" delay={0.1}>
            <div className="lg:pr-12">
              <div className={`bg-primary text-white p-12 ${theme.radius.xl} ${theme.shadow['2xl']} backdrop-blur-sm`}>
                <h2 className={`${theme.fontSize['3xl']} md:${theme.fontSize['4xl']} ${theme.fontWeight.bold} mb-6`}>
                  Ready to Start Your Immigration Journey?
                </h2>
                <p className={`${theme.fontSize.lg} text-white/90 leading-relaxed`}>
                  Book a free consultation with our expert team. We respond within 24 hours 
                  and provide personalized guidance for your specific situation. Let us help 
                  you navigate Polish immigration law with confidence.
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Right Column - Form Card */}
          <ScaleIn delay={0.3}>
            <div className="relative">
              <Card padding="lg">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <Input
                    id="fullName"
                    label="Full Name"
                    required
                    placeholder="Enter your full name"
                    value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />

                <div>
                  <label htmlFor="contactNumber" className={`block ${theme.fontSize.sm} ${theme.fontWeight.semibold} text-gray-700 mb-2`}>
                    Contact Number*
                  </label>
                  <div className="flex gap-2">
                    <div className={`w-20 px-3 py-3 ${theme.radius.md} border border-gray-300 bg-gray-50 flex items-center justify-center`}>
                      <span className={`${theme.fontSize.sm} ${theme.fontWeight.medium}`}>🇵🇱 +48</span>
                    </div>
                    <input
                      type="tel"
                      id="contactNumber"
                      required
                      className={`flex-1 px-4 py-3 ${theme.radius.md} border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary-light outline-none ${theme.transition.default}`}
                      placeholder="123 456 789"
                      value={formData.contactNumber}
                      onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                    />
                  </div>
                </div>

                <Input
                  id="email"
                  label="Email"
                  type="email"
                  required
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />

                <Select
                  id="contactMethod"
                  label="Preferred Contact Method"
                  required
                  placeholder="Select a method"
                  value={formData.contactMethod}
                  onChange={(e) => setFormData({ ...formData, contactMethod: e.target.value })}
                  options={contactMethods}
                />

                <Checkbox
                  id="terms"
                  required
                  checked={formData.acceptedTerms}
                  onChange={(e) => setFormData({ ...formData, acceptedTerms: e.target.checked })}
                  label={
                    <>
                      I have read and accepted the{' '}
                      <a href="/privacy-policy" className="text-primary hover:underline">
                        Privacy Policy
                      </a>
                      {' '}and{' '}
                      <a href="/terms" className="text-primary hover:underline">
                        Terms and Conditions of Service
                      </a>
                    </>
                  }
                />

                <Button type="submit" variant="primary" size="lg" className="w-full">
                  Submit
                </Button>
              </form>
            </Card>
          </div>
          </ScaleIn>
        </div>
      </Container>
    </Section>
  );
}
