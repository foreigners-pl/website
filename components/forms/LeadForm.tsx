'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/cards';
import { Input, Select, Checkbox } from '@/components/ui/inputs';
import { Button } from '@/components/ui/buttons';
import { theme } from '@/lib/theme';
import { collectTrackingData } from '@/lib/utils/tracking';

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
    contactNumber: '',
    email: '',
    contactMethod: '',
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
      const submissionData = {
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.contactNumber,
        contact_method: formData.contactMethod,
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
      setSubmittedPhone(formData.contactNumber);
      setSubmitStatus('success');
      setFormData({
        fullName: '',
        contactNumber: '',
        email: '',
        contactMethod: '',
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

  const contactMethods = [
    { value: 'call', label: 'Phone Call' },
    { value: 'whatsapp', label: 'WhatsApp' },
    { value: 'email', label: 'Email' },
  ];

  return (
    <div className="relative max-w-md mx-auto">
      <Card padding="md" glass={false} className="bg-white/95 backdrop-blur-sm">
        {submitStatus === 'success' ? (
          // Success State - Show Confirmation Message
          <div className="text-center py-8 animate-fadeIn">
            <div className="mb-6">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className={`${theme.fontSize.xl} ${theme.fontWeight.bold} text-gray-900 mb-2`}>
                Thank You for Reaching Out!
              </h3>
              <p className={`${theme.fontSize.sm} text-gray-600 mb-6`}>
                Your request has been successfully submitted.
              </p>
            </div>

            <div className={`${theme.radius.lg} bg-blue-50 border border-blue-100 p-4 mb-6 text-left`}>
              <p className={`${theme.fontSize.sm} text-gray-700 mb-2`}>
                We'll contact you on WhatsApp at{' '}
                <span className={`${theme.fontWeight.semibold} text-gray-900`}>+48 {submittedPhone}</span>
                {' '}within the next hour.
              </p>
              <p className={`${theme.fontSize.sm} text-gray-600`}>
                Or chat with us now for faster service:
              </p>
            </div>

            <a
              href="https://wa.me/48736286264"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white ${theme.radius.lg} hover:bg-green-700 ${theme.transition.default} ${theme.fontWeight.semibold} mb-4`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Chat with us on WhatsApp
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
              <div className={`w-16 px-2 py-2 ${theme.radius.md} border border-gray-100/50 bg-white/95 backdrop-blur-sm flex items-center justify-center`}>
                <span className={`${theme.fontSize.xs} ${theme.fontWeight.medium}`}> +48</span>
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
            <p className={`mt-1 ${theme.fontSize.xs} text-primary`}>
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

          <Select
            id="contactMethod"
            label="Contact Method"
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
