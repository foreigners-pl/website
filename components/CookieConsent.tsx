'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/buttons';
import { theme } from '@/lib/theme';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already accepted/rejected cookies
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Show banner after a short delay
      setTimeout(() => setShowBanner(true), 1000);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    localStorage.setItem('cookie-consent-date', new Date().toISOString());
    setShowBanner(false);
  };

  const rejectCookies = () => {
    localStorage.setItem('cookie-consent', 'rejected');
    localStorage.setItem('cookie-consent-date', new Date().toISOString());
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white border-t-2 border-gray-200 shadow-2xl animate-slide-up">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className={`${theme.fontSize.lg} ${theme.fontWeight.bold} text-gray-900 mb-2`}>
               We use cookies
            </h3>
            <p className={`${theme.fontSize.sm} text-gray-600 leading-relaxed`}>
              We use cookies and similar technologies to improve your experience, analyze site traffic, and personalize content. 
              By clicking "Accept", you consent to our use of cookies for analytics and tracking purposes.
              {' '}
              <a href="/privacy-policy" className="text-primary hover:underline">
                Learn more
              </a>
            </p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <Button
              variant="secondary"
              size="md"
              onClick={rejectCookies}
            >
              Reject
            </Button>
            <Button
              variant="navy"
              size="md"
              onClick={acceptCookies}
            >
              Accept
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper function to check if cookies are accepted (use this before tracking)
export function areCookiesAccepted(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('cookie-consent') === 'accepted';
}
