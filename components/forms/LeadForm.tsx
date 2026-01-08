'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/cards';
import { Input, Checkbox } from '@/components/ui/inputs';
import { Button } from '@/components/ui/buttons';
import { theme } from '@/lib/theme';
import { collectTrackingData } from '@/lib/utils/tracking';
import { countryCodes } from '@/lib/data/countryCodes';
import CustomSelect from '@/components/ui/inputs/CustomSelect';

interface LeadFormProps {
  title?: string;
  source?: string;
}

export default function LeadForm({ 
  title = 'Start now, pay in installments',
  source = 'unknown'
}: LeadFormProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneCountryCode: 'PL:+48', // Store as code:dialCode
    contactNumber: '',
    email: '',
    description: '',
    acceptedTerms: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [submittedPhone, setSubmittedPhone] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      // Collect tracking data
      const trackingData = collectTrackingData();
      console.log('[Form] Collected tracking data:', trackingData);

      // Prepare submission data
      const dialCode = formData.phoneCountryCode.split(':')[1]; // Extract dial code from "CODE:+XX"
      const submissionData = {
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.contactNumber,
        phone_country_code: dialCode,
        description: formData.description,
        source: source,
        privacy_accepted: formData.acceptedTerms,
        tracking: trackingData,
      };
      console.log('[Form] Submitting data:', submissionData);

      // Submit to API
      const response = await fetch('/api/submit-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });
      console.log('[Form] API response status:', response.status);

      const data = await response.json();
      console.log('[Form] API response data:', data);

      if (!response.ok) {
        console.error('[Form] Submission failed:', data);
        throw new Error(data.error || 'Failed to submit form');
      }

      // Success
      console.log('[Form] ✅ Submission successful!');
      const displayDialCode = formData.phoneCountryCode.split(':')[1];
      setSubmittedPhone(displayDialCode + ' ' + formData.contactNumber);
      setSubmitStatus('success');
      setFormData({
        fullName: '',
        phoneCountryCode: 'PL:+48',
        contactNumber: '',
        email: '',
        description: '',
        acceptedTerms: false,
      });

    } catch (error) {
      console.error('[Form] ❌ Submission error:', error);
      console.error('[Form] Error details:', error instanceof Error ? error.message : 'Unknown error');
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const countryOptions = countryCodes.map(country => ({
    value: `${country.code}:${country.dialCode}`, // Use country code + dial code as unique key
    label: `${country.name} ${country.dialCode}`,
    code: country.code, // Pass country code for styled badge display
  }));

  return (
    <div className="relative max-w-md mx-auto">
      <Card padding="md" glass={false} className="bg-white/95 backdrop-blur-sm">
        {submitStatus === 'success' ? (
          // Success State - Show Confirmation Message
          <div className="text-center py-8 animate-fadeIn">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h3 className={`${theme.fontSize.xl} ${theme.fontWeight.bold} text-gray-900 mb-4`}>
              Your request has been successfully submitted
            </h3>

            <p className={`${theme.fontSize.base} text-gray-700 mb-6`}>
              We usually respond within an hour
            </p>

            <p className={`${theme.fontSize.base} text-gray-700 mb-4`}>
              Or get an instant response - message us:
            </p>

            <a
              href="https://wa.me/48736286264"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white ${theme.radius.lg} hover:bg-green-700 ${theme.transition.default} ${theme.fontWeight.semibold} mb-6`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              <span>Chat with us: +48 736 286 264</span>
            </a>

            <button
              onClick={() => setSubmitStatus('idle')}
              className={`block mx-auto ${theme.fontSize.sm} text-primary hover:underline`}
            >
              Submit another request
            </button>
          </div>
        ) : (
          // Form State
          <>
            {title && (
              <div className="mb-4">
                <h3 className={`${theme.fontSize.lg} ${theme.fontWeight.bold} text-gray-900`}>
                  {title}
                </h3>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
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
                  <div className="w-48">
                    <CustomSelect
                      value={formData.phoneCountryCode}
                      onChange={(value) => setFormData({ ...formData, phoneCountryCode: value })}
                      options={countryOptions}
                      placeholder="Country"
                      showSearch={true}
                    />
                  </div>
                  <input
                    type="tel"
                    id="contactNumber"
                    required
                    className={`flex-1 px-3 py-2 ${theme.radius.md} border border-gray-100/50 bg-white/95 backdrop-blur-sm focus:border-primary focus:ring-2 focus:ring-primary-light outline-none ${theme.transition.default}`}
                    placeholder="123 456 789"
                    value={formData.contactNumber}
                    onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                  />
                </div>
                <p className={`mt-1 ${theme.fontSize.xs} text-gray-600 italic`}>
                  This number has to be available on WhatsApp
                </p>
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

              <div className="space-y-2">
                <label htmlFor="description" className={`block ${theme.fontSize.sm} ${theme.fontWeight.semibold} text-gray-700`}>
                  Description <span className="text-red-600">*</span>
                </label>
                <textarea
                  id="description"
                  required
                  placeholder="Tell us about your situation or what you need help with..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className={`w-full px-4 py-3 ${theme.radius.md} border border-gray-100/50 bg-white/95 backdrop-blur-sm focus:border-primary focus:ring-2 focus:ring-primary-light outline-none ${theme.transition.default}`}
                />
              </div>

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

              {submitStatus === 'error' && (
                <div className={`p-3 ${theme.radius.md} bg-red-50 border border-red-200`}>
                  <p className={`${theme.fontSize.sm} text-red-800 ${theme.fontWeight.semibold}`}>
                    ✗ {errorMessage || 'Something went wrong. Please try again.'}
                  </p>
                </div>
              )}

              <Button 
                type="submit" 
                variant="primary" 
                size="md" 
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </Button>
              
              <p className={`text-center ${theme.fontSize.xs} text-gray-600`}>
                for a Free Consultation
              </p>
            </form>
          </>
        )}
      </Card>
    </div>
  );
}
