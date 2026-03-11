'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

// Flow step types
type Step = 
  | 'start'
  | 'new-license-interest'
  | 'new-license-location'
  | 'new-license-pricing'
  | 'new-license-not-available'
  | 'license-valid'
  | 'license-origin'
  | 'document-type'
  | 'residency-check'
  | 'not-eligible-invalid'
  | 'not-eligible-no-documents'
  | 'trc-help-offer'
  | 'not-eligible-residency'
  | 'eligible-medical'
  | 'eligible-translation'
  | 'final-pricing'
  | 'end-no-interest';

interface StepData {
  hasMedicalCert?: boolean;
  hasTranslation?: boolean;
  documentType?: string;
  isEU?: boolean;
}

// Analytics tracking types
interface TrackingData {
  session_id: string;
  event_type: 'page_view' | 'step_view' | 'button_click' | 'option_select' | 'whatsapp_click' | 'session_end';
  step_name?: string;
  action?: string;
  action_value?: string;
  flow_path?: string[];
  answers?: Record<string, any>;
  completed?: boolean;
  exit_step?: string;
  local_time?: string;
  timezone?: string;
  device_type?: string;
  browser?: string;
  os?: string;
  screen_width?: number;
  screen_height?: number;
  referrer?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}

// Utility functions for device detection
function getDeviceType(): string {
  if (typeof window === 'undefined') return 'unknown';
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
}

function getBrowser(): string {
  if (typeof navigator === 'undefined') return 'unknown';
  const ua = navigator.userAgent;
  if (ua.includes('Chrome') && !ua.includes('Edg')) return 'Chrome';
  if (ua.includes('Safari') && !ua.includes('Chrome')) return 'Safari';
  if (ua.includes('Firefox')) return 'Firefox';
  if (ua.includes('Edg')) return 'Edge';
  if (ua.includes('Opera') || ua.includes('OPR')) return 'Opera';
  return 'Other';
}

function getOS(): string {
  if (typeof navigator === 'undefined') return 'unknown';
  const ua = navigator.userAgent;
  if (ua.includes('Windows')) return 'Windows';
  if (ua.includes('Mac')) return 'macOS';
  if (ua.includes('Linux')) return 'Linux';
  if (ua.includes('Android')) return 'Android';
  if (ua.includes('iOS') || ua.includes('iPhone') || ua.includes('iPad')) return 'iOS';
  return 'Other';
}

function getUTMParams(): { utm_source?: string; utm_medium?: string; utm_campaign?: string } {
  if (typeof window === 'undefined') return {};
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get('utm_source') || undefined,
    utm_medium: params.get('utm_medium') || undefined,
    utm_campaign: params.get('utm_campaign') || undefined,
  };
}

const WHATSAPP_NUMBER = '48736286264';

// Icon class for responsive sizing
const iconClass = "w-10 h-10 md:w-12 md:h-12";

// SVG Icons
const Icons = {
  car: (
    <svg className={`${iconClass} text-primary`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
    </svg>
  ),
  document: (
    <svg className={`${iconClass} text-primary`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  check: (
    <svg className={`${iconClass} text-green-600`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  x: (
    <svg className={`${iconClass} text-red-500`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  location: (
    <svg className={`${iconClass} text-primary`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  currency: (
    <svg className={`${iconClass} text-primary`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  home: (
    <svg className={`${iconClass} text-primary`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
  clock: (
    <svg className={`${iconClass} text-amber-500`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  medical: (
    <svg className={`${iconClass} text-primary`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),
  translate: (
    <svg className={`${iconClass} text-primary`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
    </svg>
  ),
  quote: (
    <svg className={`${iconClass} text-green-600`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
    </svg>
  ),
  info: (
    <svg className={`${iconClass} text-blue-500`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  wave: (
    <svg className={`${iconClass} text-primary`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
    </svg>
  ),
  globe: (
    <svg className={`${iconClass} text-primary`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  back: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  ),
};

export default function LicenseExchangePage() {
  const [currentStep, setCurrentStep] = useState<Step>('start');
  const [stepData, setStepData] = useState<StepData>({});
  const [history, setHistory] = useState<Step[]>([]);
  const [sessionId] = useState(() => 
    typeof crypto !== 'undefined' ? crypto.randomUUID() : `session_${Date.now()}`
  );
  const flowPathRef = useRef<string[]>(['start']);
  const hasTrackedPageView = useRef(false);

  // Analytics tracking function
  const trackEvent = useCallback(async (
    eventType: TrackingData['event_type'],
    extras: Partial<TrackingData> = {}
  ) => {
    try {
      const data: TrackingData = {
        session_id: sessionId,
        event_type: eventType,
        step_name: currentStep,
        flow_path: flowPathRef.current,
        answers: stepData,
        local_time: new Date().toISOString(),
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        device_type: getDeviceType(),
        browser: getBrowser(),
        os: getOS(),
        screen_width: typeof window !== 'undefined' ? window.innerWidth : undefined,
        screen_height: typeof window !== 'undefined' ? window.innerHeight : undefined,
        referrer: typeof document !== 'undefined' ? document.referrer : undefined,
        ...getUTMParams(),
        ...extras,
      };

      // Fire and forget - don't await to not slow down UX
      fetch('/api/track-flow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }).catch(() => {}); // Silently fail
    } catch {
      // Analytics should never break the app
    }
  }, [sessionId, currentStep, stepData]);

  // Track page view on mount
  useEffect(() => {
    if (!hasTrackedPageView.current) {
      hasTrackedPageView.current = true;
      trackEvent('page_view');
    }
  }, [trackEvent]);

  // Track step changes
  useEffect(() => {
    if (hasTrackedPageView.current && currentStep !== 'start') {
      flowPathRef.current = [...flowPathRef.current, currentStep];
      trackEvent('step_view');
    }
  }, [currentStep, trackEvent]);

  // Track session end on page leave
  useEffect(() => {
    const handleBeforeUnload = () => {
      const isCompleted = currentStep === 'final-pricing' || 
                          flowPathRef.current.some(s => s.includes('whatsapp'));
      
      // Use sendBeacon for reliable tracking on page leave
      const data = {
        session_id: sessionId,
        event_type: 'session_end',
        step_name: currentStep,
        exit_step: currentStep,
        flow_path: flowPathRef.current,
        answers: stepData,
        completed: isCompleted,
        local_time: new Date().toISOString(),
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      };
      
      navigator.sendBeacon('/api/track-flow', JSON.stringify(data));
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        handleBeforeUnload();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [sessionId, currentStep, stepData]);

  const goToStep = (step: Step, action?: string, actionValue?: string) => {
    // Track the button click
    trackEvent('button_click', { action, action_value: actionValue });
    setHistory(prev => [...prev, currentStep]);
    setCurrentStep(step);
  };

  const goBack = () => {
    if (history.length > 0) {
      trackEvent('button_click', { action: 'back' });
      const newHistory = [...history];
      const previousStep = newHistory.pop()!;
      setHistory(newHistory);
      setCurrentStep(previousStep);
    }
  };

  const trackWhatsAppClick = () => {
    trackEvent('whatsapp_click', { completed: true });
  };

  const calculatePrice = () => {
    let base = stepData.isEU ? 399 : 699;
    let translation = stepData.hasTranslation ? 0 : 249;
    
    return {
      base,
      translation,
      total: base + translation,
      needsMedical: !stepData.hasMedicalCert,
      isEU: stepData.isEU,
    };
  };

  const getWhatsAppLink = (message: string) => {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex flex-col">
      <Navbar />
      
      {/* Persistent page title */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-2xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0" />
              </svg>
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-semibold text-gray-900">License Exchange</h1>
              <p className="text-xs sm:text-sm text-gray-500">Check your eligibility</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Back button for flow navigation */}
      {history.length > 0 && (
        <div className="bg-white border-b border-gray-100">
          <div className="max-w-2xl mx-auto px-3 sm:px-4 py-2 sm:py-3">
            <button
              onClick={goBack}
              className="flex items-center gap-1.5 sm:gap-2 text-gray-600 hover:text-primary transition-colors text-xs sm:text-sm"
            >
              {Icons.back}
              Previous step
            </button>
          </div>
        </div>
      )}

      <main className="flex-1 py-10 sm:py-16 md:py-20">
        <div className="max-w-2xl mx-auto px-3 sm:px-4">
          <AnimatePresence mode="wait">
            
            {/* START */}
            {currentStep === 'start' && (
              <StepContainer key="start" variants={containerVariants}>
                <IconWrapper>{Icons.car}</IconWrapper>
                <StepTitle>Driving License Exchange</StepTitle>
                <StepDescription>
                  Let's find out if you're eligible to exchange your foreign driving license for a Polish one.
                </StepDescription>
                <StepQuestion>
                  Do you already have a driving license from another country?
                </StepQuestion>
                <ButtonGroup>
                  <PrimaryButton onClick={() => goToStep('license-valid')}>
                    Yes, I have a foreign license
                  </PrimaryButton>
                  <SecondaryButton onClick={() => goToStep('new-license-interest')}>
                    No, I need a new license
                  </SecondaryButton>
                </ButtonGroup>
              </StepContainer>
            )}

            {/* NEW LICENSE - Interest */}
            {currentStep === 'new-license-interest' && (
              <StepContainer key="new-license-interest" variants={containerVariants}>
                <IconWrapper>{Icons.document}</IconWrapper>
                <StepTitle>Start Fresh</StepTitle>
                <StepDescription>
                  We can help you obtain a brand new Polish driving license from scratch.
                </StepDescription>
                <StepQuestion>
                  Would you like to start the process for a brand new license?
                </StepQuestion>
                <ButtonGroup>
                  <PrimaryButton onClick={() => goToStep('new-license-location')}>
                    Yes, I'm interested
                  </PrimaryButton>
                  <SecondaryButton onClick={() => goToStep('end-no-interest')}>
                    No, not right now
                  </SecondaryButton>
                </ButtonGroup>
              </StepContainer>
            )}

            {/* NEW LICENSE - Location */}
            {currentStep === 'new-license-location' && (
              <StepContainer key="new-license-location" variants={containerVariants}>
                <IconWrapper>{Icons.location}</IconWrapper>
                <StepTitle>Location Check</StepTitle>
                <StepDescription>
                  Our driving school services are currently available in the Katowice area.
                </StepDescription>
                <StepQuestion>
                  Are you located in or near Katowice?
                </StepQuestion>
                <ButtonGroup>
                  <PrimaryButton onClick={() => goToStep('new-license-pricing')}>
                    Yes, I'm in/near Katowice
                  </PrimaryButton>
                  <SecondaryButton onClick={() => goToStep('new-license-not-available')}>
                    No, I'm elsewhere
                  </SecondaryButton>
                </ButtonGroup>
              </StepContainer>
            )}

            {/* NEW LICENSE - Pricing */}
            {currentStep === 'new-license-pricing' && (
              <StepContainer key="new-license-pricing" variants={containerVariants}>
                <IconWrapper>{Icons.currency}</IconWrapper>
                <StepTitle>New License Package</StepTitle>
                <StepDescription>
                  Great! Here's what we offer for obtaining a new Polish driving license:
                </StepDescription>
                <PricingBox>
                  <PricingTotal>4,500 PLN</PricingTotal>
                  <PricingSubtext>Total package price</PricingSubtext>
                  <PricingBreakdown>
                    <PricingItem>
                      <span>Upfront payment</span>
                      <span className="font-semibold">1,000 PLN</span>
                    </PricingItem>
                    <PricingNote>For starting and handling the administrative part</PricingNote>
                    <PricingItem>
                      <span>Remaining balance</span>
                      <span className="font-semibold">3,500 PLN</span>
                    </PricingItem>
                    <PricingNote>Can be paid in installments</PricingNote>
                  </PricingBreakdown>
                </PricingBox>
                <StepQuestion>
                  Would you like to talk about starting this service?
                </StepQuestion>
                <ButtonGroup>
                  <WhatsAppButton onClick={trackWhatsAppClick} href={getWhatsAppLink("Hi! I'm interested in getting a new driving license in Katowice. I saw the package for 4,500 PLN and would like to discuss starting the process.")}>
                    Yes, let's talk on WhatsApp
                  </WhatsAppButton>
                  <SecondaryButton onClick={() => goToStep('end-no-interest')}>
                    Maybe later
                  </SecondaryButton>
                </ButtonGroup>
              </StepContainer>
            )}

            {/* NEW LICENSE - Not Available */}
            {currentStep === 'new-license-not-available' && (
              <StepContainer key="new-license-not-available" variants={containerVariants}>
                <IconWrapper>{Icons.x}</IconWrapper>
                <StepTitle>Not Available in Your Area</StepTitle>
                <StepDescription>
                  Unfortunately, our driving school services are currently only available in the Katowice area.
                </StepDescription>
                <InfoBox variant="warning">
                  <p>We're working on expanding to other cities. Feel free to reach out and we'll let you know when we're available in your area.</p>
                </InfoBox>
                <ButtonGroup>
                  <WhatsAppButton onClick={trackWhatsAppClick} href={getWhatsAppLink("Hi! I'm interested in getting a new driving license but I'm not in Katowice. Can you let me know when you expand to other areas?")}>
                    Contact us anyway
                  </WhatsAppButton>
                  <SecondaryButton onClick={() => setCurrentStep('start')}>
                    Start over
                  </SecondaryButton>
                </ButtonGroup>
              </StepContainer>
            )}

            {/* LICENSE VALID CHECK */}
            {currentStep === 'license-valid' && (
              <StepContainer key="license-valid" variants={containerVariants}>
                <IconWrapper>{Icons.check}</IconWrapper>
                <StepTitle>License Validity</StepTitle>
                <StepDescription>
                  To exchange your license, it must currently be valid (not expired).
                </StepDescription>
                <StepQuestion>
                  Is your foreign driving license still valid?
                </StepQuestion>
                <ButtonGroup>
                  <PrimaryButton onClick={() => goToStep('license-origin')}>
                    Yes, it's valid
                  </PrimaryButton>
                  <SecondaryButton onClick={() => goToStep('not-eligible-invalid')}>
                    No, it has expired
                  </SecondaryButton>
                </ButtonGroup>
              </StepContainer>
            )}

            {/* LICENSE ORIGIN - EU vs Non-EU */}
            {currentStep === 'license-origin' && (
              <StepContainer key="license-origin" variants={containerVariants}>
                <IconWrapper>{Icons.globe}</IconWrapper>
                <StepTitle>License Origin</StepTitle>
                <StepDescription>
                  The exchange process differs depending on where your license was issued.
                </StepDescription>
                <StepQuestion>
                  Was your license issued in an EU country?
                </StepQuestion>
                <ButtonGroup>
                  <PrimaryButton onClick={() => {
                    setStepData(prev => ({ ...prev, isEU: true }));
                    goToStep('final-pricing');
                  }}>
                    Yes, EU country
                  </PrimaryButton>
                  <SecondaryButton onClick={() => {
                    setStepData(prev => ({ ...prev, isEU: false }));
                    goToStep('document-type');
                  }}>
                    No, outside EU
                  </SecondaryButton>
                </ButtonGroup>
              </StepContainer>
            )}

            {/* NOT ELIGIBLE - Invalid License */}
            {currentStep === 'not-eligible-invalid' && (
              <StepContainer key="not-eligible-invalid" variants={containerVariants}>
                <IconWrapper>{Icons.x}</IconWrapper>
                <StepTitle>License Must Be Valid</StepTitle>
                <StepDescription>
                  Unfortunately, you cannot exchange an expired license.
                </StepDescription>
                <InfoBox variant="error">
                  <p><strong>What you can do:</strong></p>
                  <p>Renew your license in your home country first, then come back to us for the exchange process.</p>
                </InfoBox>
                <ButtonGroup>
                  <SecondaryButton onClick={() => setCurrentStep('start')}>
                    Start over
                  </SecondaryButton>
                </ButtonGroup>
              </StepContainer>
            )}

            {/* DOCUMENT TYPE CHECK */}
            {currentStep === 'document-type' && (
              <StepContainer key="document-type" variants={containerVariants}>
                <IconWrapper>{Icons.document}</IconWrapper>
                <StepTitle>Residency Documents</StepTitle>
                <StepDescription>
                  To exchange your license, you need a valid document proving your legal stay in Poland.
                </StepDescription>
                <StepQuestion>
                  Do you have any of the following?
                </StepQuestion>
                <OptionList>
                  <OptionButton 
                    onClick={() => {
                      setStepData(prev => ({ ...prev, documentType: 'visa' }));
                      goToStep('residency-check');
                    }}
                  >
                    <OptionIcon>
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                      </svg>
                    </OptionIcon>
                    <OptionText>
                      <OptionTitle>Active Polish Visa</OptionTitle>
                      <OptionDesc>Valid visa in your passport</OptionDesc>
                    </OptionText>
                  </OptionButton>
                  <OptionButton 
                    onClick={() => {
                      setStepData(prev => ({ ...prev, documentType: 'trc' }));
                      goToStep('residency-check');
                    }}
                  >
                    <OptionIcon>
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                    </OptionIcon>
                    <OptionText>
                      <OptionTitle>Active TRC</OptionTitle>
                      <OptionDesc>Temporary Residence Card (Karta Pobytu)</OptionDesc>
                    </OptionText>
                  </OptionButton>
                  <OptionButton 
                    onClick={() => {
                      setStepData(prev => ({ ...prev, documentType: 'stamp' }));
                      goToStep('residency-check');
                    }}
                  >
                    <OptionIcon>
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </OptionIcon>
                    <OptionText>
                      <OptionTitle>Red Stamp in Passport</OptionTitle>
                      <OptionDesc>While waiting for new TRC</OptionDesc>
                    </OptionText>
                  </OptionButton>
                  <OptionButton onClick={() => goToStep('not-eligible-no-documents')} variant="none">
                    <OptionIcon>
                      <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </OptionIcon>
                    <OptionText>
                      <OptionTitle>None of the above</OptionTitle>
                      <OptionDesc>I don't have these documents</OptionDesc>
                    </OptionText>
                  </OptionButton>
                </OptionList>
              </StepContainer>
            )}

            {/* NOT ELIGIBLE - No Documents */}
            {currentStep === 'not-eligible-no-documents' && (
              <StepContainer key="not-eligible-no-documents" variants={containerVariants}>
                <IconWrapper>{Icons.info}</IconWrapper>
                <StepTitle>Documents Required</StepTitle>
                <StepDescription>
                  You need one of the required documents to be eligible for a license exchange.
                </StepDescription>
                <InfoBox variant="info">
                  <p><strong>Good news!</strong></p>
                  <p>We can help you speed up the TRC (Temporary Residence Card) process, and then exchange your license once it's completed.</p>
                </InfoBox>
                <StepQuestion>
                  Would you like to talk to us about speeding up your TRC process?
                </StepQuestion>
                <ButtonGroup>
                  <WhatsAppButton onClick={trackWhatsAppClick} href={getWhatsAppLink("Hi! I'm interested in exchanging my driving license but I don't have the required documents yet. I'd like to learn about speeding up the TRC process.")}>
                    Yes, tell me more
                  </WhatsAppButton>
                  <SecondaryButton onClick={() => goToStep('trc-help-offer')}>
                    No, I'll wait
                  </SecondaryButton>
                </ButtonGroup>
              </StepContainer>
            )}

            {/* TRC Help - Will wait */}
            {currentStep === 'trc-help-offer' && (
              <StepContainer key="trc-help-offer" variants={containerVariants}>
                <IconWrapper>{Icons.wave}</IconWrapper>
                <StepTitle>Come Back Later</StepTitle>
                <StepDescription>
                  No problem! Please reach back to us once you have one of the valid documents needed.
                </StepDescription>
                <InfoBox variant="info">
                  <p>Required documents:</p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Active Polish Visa</li>
                    <li>Temporary Residence Card (TRC)</li>
                    <li>Red stamp in passport (while waiting for TRC)</li>
                  </ul>
                </InfoBox>
                <ButtonGroup>
                  <SecondaryButton onClick={() => setCurrentStep('start')}>
                    Start over
                  </SecondaryButton>
                </ButtonGroup>
              </StepContainer>
            )}

            {/* RESIDENCY CHECK */}
            {currentStep === 'residency-check' && (
              <StepContainer key="residency-check" variants={containerVariants}>
                <IconWrapper>{Icons.home}</IconWrapper>
                <StepTitle>Residency Requirement</StepTitle>
                <StepDescription>
                  Polish law requires you to be a resident for at least 6 months to exchange your license.
                </StepDescription>
                <StepQuestion>
                  Have you been living in Poland for at least 6 months?
                </StepQuestion>
                <ButtonGroup>
                  <PrimaryButton onClick={() => goToStep('eligible-medical')}>
                    Yes, 6 months or more
                  </PrimaryButton>
                  <SecondaryButton onClick={() => goToStep('not-eligible-residency')}>
                    No, less than 6 months
                  </SecondaryButton>
                </ButtonGroup>
              </StepContainer>
            )}

            {/* NOT ELIGIBLE - Residency */}
            {currentStep === 'not-eligible-residency' && (
              <StepContainer key="not-eligible-residency" variants={containerVariants}>
                <IconWrapper>{Icons.clock}</IconWrapper>
                <StepTitle>Need More Time in Poland</StepTitle>
                <StepDescription>
                  You need to be a resident of Poland for at least 6 months before you can exchange your license.
                </StepDescription>
                <InfoBox variant="warning">
                  <p>Please reach out to us once you've been in Poland for 6 months. We'll be happy to help you then!</p>
                </InfoBox>
                <ButtonGroup>
                  <SecondaryButton onClick={() => setCurrentStep('start')}>
                    Start over
                  </SecondaryButton>
                </ButtonGroup>
              </StepContainer>
            )}

            {/* ELIGIBLE - Medical Certificate */}
            {currentStep === 'eligible-medical' && (
              <StepContainer key="eligible-medical" variants={containerVariants}>
                <SuccessBadge>You're eligible for exchange!</SuccessBadge>
                <IconWrapper>{Icons.medical}</IconWrapper>
                <StepTitle>Medical Certificate</StepTitle>
                <StepDescription>
                  You'll need a medical certificate stating that you're fit to drive.
                </StepDescription>
                <StepQuestion>
                  Do you already have a valid medical certificate for driving?
                </StepQuestion>
                <ButtonGroup>
                  <PrimaryButton onClick={() => {
                    setStepData(prev => ({ ...prev, hasMedicalCert: true }));
                    goToStep('eligible-translation');
                  }}>
                    Yes, I have one
                  </PrimaryButton>
                  <SecondaryButton onClick={() => {
                    setStepData(prev => ({ ...prev, hasMedicalCert: false }));
                    goToStep('eligible-translation');
                  }}>
                    No, I don't have it yet
                  </SecondaryButton>
                </ButtonGroup>
              </StepContainer>
            )}

            {/* ELIGIBLE - Translation */}
            {currentStep === 'eligible-translation' && (
              <StepContainer key="eligible-translation" variants={containerVariants}>
                <SuccessBadge>You're eligible for exchange!</SuccessBadge>
                <IconWrapper>{Icons.translate}</IconWrapper>
                <StepTitle>Sworn Translation</StepTitle>
                <StepDescription>
                  Your foreign license needs to be translated into Polish by a sworn translator.
                </StepDescription>
                <StepQuestion>
                  Do you already have a sworn translation of your license?
                </StepQuestion>
                <ButtonGroup>
                  <PrimaryButton onClick={() => {
                    setStepData(prev => ({ ...prev, hasTranslation: true }));
                    goToStep('final-pricing');
                  }}>
                    Yes, I have it
                  </PrimaryButton>
                  <SecondaryButton onClick={() => {
                    setStepData(prev => ({ ...prev, hasTranslation: false }));
                    goToStep('final-pricing');
                  }}>
                    No, I need one
                  </SecondaryButton>
                </ButtonGroup>
              </StepContainer>
            )}

            {/* FINAL PRICING */}
            {currentStep === 'final-pricing' && (
              <StepContainer key="final-pricing" variants={containerVariants}>
                <SuccessBadge>You're eligible for exchange!</SuccessBadge>
                <IconWrapper>{Icons.quote}</IconWrapper>
                <StepTitle>Your Quote</StepTitle>
                <StepDescription>
                  Great news! Here's your personalized pricing for the license exchange:
                </StepDescription>
                <PricingBox>
                  <PricingBreakdown>
                    <PricingItem>
                      <span>License exchange {stepData.isEU ? '(EU)' : '(non-EU)'}</span>
                      <span className="font-semibold">{calculatePrice().base} PLN</span>
                    </PricingItem>
                    {!stepData.isEU && !stepData.hasTranslation && (
                      <PricingItem>
                        <span>Sworn translation</span>
                        <span className="font-semibold">+{calculatePrice().translation} PLN</span>
                      </PricingItem>
                    )}
                  </PricingBreakdown>
                  <PricingDivider />
                  <PricingTotal>{stepData.isEU ? calculatePrice().base : calculatePrice().total} PLN</PricingTotal>
                  <PricingSubtext>Our service fee</PricingSubtext>
                  
                  {!stepData.isEU && !stepData.hasMedicalCert && (
                    <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200">
                      <p className="text-xs sm:text-sm text-gray-600 text-center">
                        You'll also need a medical certificate. We'll arrange the clinic visit for you - clinic fee is around 200 PLN (paid directly to clinic).
                      </p>
                    </div>
                  )}
                </PricingBox>
                <StepQuestion>
                  Ready to proceed with your license exchange?
                </StepQuestion>
                <ButtonGroup>
                  <WhatsAppButton onClick={trackWhatsAppClick} href={getWhatsAppLink(
                    stepData.isEU 
                      ? `Hi! I completed the license exchange eligibility check and I'm ready to proceed.\n\n` +
                        `My details:\n` +
                        `- License from: EU country\n\n` +
                        `Quote: ${calculatePrice().base} PLN`
                      : `Hi! I completed the license exchange eligibility check and I'm ready to proceed.\n\n` +
                        `My details:\n` +
                        `- License from: Non-EU country\n` +
                        `- Document type: ${stepData.documentType || 'Valid document'}\n` +
                        `- Medical certificate: ${stepData.hasMedicalCert ? 'Yes, I have it' : 'No, I need one'}\n` +
                        `- Sworn translation: ${stepData.hasTranslation ? 'Yes, I have it' : 'No, I need one'}\n\n` +
                        `Quote: ${calculatePrice().total} PLN`
                  )}>
                    Continue on WhatsApp
                  </WhatsAppButton>
                  <SecondaryButton onClick={() => setCurrentStep('start')}>
                    Start over
                  </SecondaryButton>
                </ButtonGroup>
              </StepContainer>
            )}

            {/* END - No Interest */}
            {currentStep === 'end-no-interest' && (
              <StepContainer key="end-no-interest" variants={containerVariants}>
                <IconWrapper>{Icons.wave}</IconWrapper>
                <StepTitle>No Problem!</StepTitle>
                <StepDescription>
                  Feel free to come back whenever you're ready. We're here to help.
                </StepDescription>
                <ButtonGroup>
                  <PrimaryButton onClick={() => setCurrentStep('start')}>
                    Start over
                  </PrimaryButton>
                  <Link href="/" className="block">
                    <SecondaryButton as="div">
                      Back to homepage
                    </SecondaryButton>
                  </Link>
                </ButtonGroup>
              </StepContainer>
            )}

          </AnimatePresence>
        </div>
      </main>

      <Footer />
    </div>
  );
}

// Styled Components
function StepContainer({ children, variants }: { children: React.ReactNode; variants: any }) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={variants}
      className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-5 sm:p-8 md:p-10 my-4 sm:my-6"
    >
      {children}
    </motion.div>
  );
}

function IconWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center mb-4 sm:mb-6">{children}</div>
  );
}

function StepTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 text-center mb-3 sm:mb-4">
      {children}
    </h2>
  );
}

function StepDescription({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-gray-600 text-center mb-6 sm:mb-8 text-sm sm:text-base md:text-lg">
      {children}
    </p>
  );
}

function StepQuestion({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-gray-900 font-semibold text-center mb-4 sm:mb-6 text-sm sm:text-base md:text-lg">
      {children}
    </p>
  );
}

function ButtonGroup({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-2 sm:space-y-3">
      {children}
    </div>
  );
}

function PrimaryButton({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full py-3 sm:py-4 px-4 sm:px-6 bg-white text-gray-800 text-sm sm:text-base font-semibold rounded-lg sm:rounded-xl border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 active:scale-[0.98] transition-all duration-200"
    >
      {children}
    </button>
  );
}

function SecondaryButton({ children, onClick, as }: { children: React.ReactNode; onClick?: () => void; as?: string }) {
  const className = "w-full py-3 sm:py-4 px-4 sm:px-6 bg-white text-gray-800 text-sm sm:text-base font-semibold rounded-lg sm:rounded-xl border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 active:scale-[0.98] transition-all duration-200 text-center";
  
  if (as === 'div') {
    return <div className={className}>{children}</div>;
  }
  
  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  );
}

function WhatsAppButton({ children, href, onClick }: { children: React.ReactNode; href: string; onClick?: () => void }) {
  const handleClick = () => {
    if (onClick) onClick();
  };
  
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="w-full py-3 sm:py-4 px-4 sm:px-6 bg-green-600 text-white text-sm sm:text-base font-semibold rounded-lg sm:rounded-xl hover:bg-green-700 active:scale-[0.98] transition-all duration-200 shadow-md sm:shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
    >
      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
      </svg>
      {children}
    </a>
  );
}

function InfoBox({ children, variant }: { children: React.ReactNode; variant: 'info' | 'warning' | 'error' }) {
  const variants = {
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    warning: 'bg-amber-50 border-amber-200 text-amber-800',
    error: 'bg-red-50 border-red-200 text-red-800',
  };
  
  return (
    <div className={`p-3 sm:p-4 rounded-lg sm:rounded-xl border mb-4 sm:mb-6 text-sm sm:text-base ${variants[variant]}`}>
      {children}
    </div>
  );
}

function SuccessBadge({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center mb-3 sm:mb-4">
      <span className="bg-green-100 text-green-800 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-1.5 sm:gap-2">
        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        {children}
      </span>
    </div>
  );
}

function OptionList({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-2 sm:space-y-3">
      {children}
    </div>
  );
}

function OptionButton({ children, onClick, variant }: { children: React.ReactNode; onClick: () => void; variant?: 'none' }) {
  return (
    <button
      onClick={onClick}
      className={`w-full p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 text-left flex items-center gap-3 sm:gap-4 active:scale-[0.98] transition-all duration-200 ${
        variant === 'none'
          ? 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
          : 'border-primary/20 hover:border-primary hover:bg-primary/5'
      }`}
    >
      {children}
    </button>
  );
}

function OptionIcon({ children }: { children: React.ReactNode }) {
  return <span className="flex-shrink-0 [&>svg]:w-5 [&>svg]:h-5 sm:[&>svg]:w-6 sm:[&>svg]:h-6">{children}</span>;
}

function OptionText({ children }: { children: React.ReactNode }) {
  return <div className="flex-1 min-w-0">{children}</div>;
}

function OptionTitle({ children }: { children: React.ReactNode }) {
  return <div className="font-semibold text-gray-900 text-sm sm:text-base">{children}</div>;
}

function OptionDesc({ children }: { children: React.ReactNode }) {
  return <div className="text-xs sm:text-sm text-gray-500">{children}</div>;
}

function PricingBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gray-50 rounded-lg sm:rounded-xl p-4 sm:p-6 mb-4 sm:mb-6 border border-gray-200">
      {children}
    </div>
  );
}

function PricingTotal({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-2xl sm:text-3xl font-bold text-primary text-center">
      {children}
    </div>
  );
}

function PricingSubtext({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-gray-500 text-center text-xs sm:text-sm">
      {children}
    </div>
  );
}

function PricingBreakdown({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
      {children}
    </div>
  );
}

function PricingItem({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-between items-center text-sm sm:text-base">
      {children}
    </div>
  );
}

function PricingNote({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[11px] sm:text-xs text-gray-500 italic ml-3 sm:ml-4">
      {children}
    </div>
  );
}

function PricingDivider() {
  return <div className="border-t border-gray-300 my-4" />;
}