'use client';

import { useState, useCallback } from 'react';
import { motion } from 'motion/react';
import { SUB_SERVICES } from '@/lib/data/serviceOptions';

// ─── Types ────────────────────────────────────────────────────────────────────

type Step = 1 | 2 | 3 | 4 | 5 | 6;

interface Option {
  id: string;
  label: string;
  sublabel?: string;
  icon: React.ReactNode;
}

interface State {
  step: Step;
  service: string;
  serviceLabel: string;
  subservice: string;
  subserviceLabel: string;
  location: string;
  locationLabel: string;
  processStatus: string;
  processStatusLabel: string;
  timeline: string;
  timelineLabel: string;
}

const INITIAL_STATE: State = {
  step: 1,
  service: '',
  serviceLabel: '',
  subservice: '',
  subserviceLabel: '',
  location: '',
  locationLabel: '',
  processStatus: '',
  processStatusLabel: '',
  timeline: '',
  timelineLabel: '',
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const SERVICES: Option[] = [
  {
    id: 'immigration',
    label: 'Immigration',
    sublabel: 'TRC / Karta Pobytu, PRC, Citizenship',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
      </svg>
    ),
  },
  {
    id: 'driving',
    label: 'Driving',
    sublabel: 'Licence exchange, international permit',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
  },
  {
    id: 'language',
    label: 'Language',
    sublabel: 'Polish courses, certified translation',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" />
      </svg>
    ),
  },
  {
    id: 'business',
    label: 'Business',
    sublabel: 'Company setup, accounting, consulting',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
      </svg>
    ),
  },
  {
    id: 'studies',
    label: 'Studies',
    sublabel: 'University admission, student visa',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
      </svg>
    ),
  },
  {
    id: 'other',
    label: 'Other',
    sublabel: 'Something not listed above',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
      </svg>
    ),
  },
];


const PROCESS_STATUS_OPTIONS: Option[] = [
  {
    id: 'not-started',
    label: "Haven't started yet",
    sublabel: 'Starting from scratch, need full guidance',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
      </svg>
    ),
  },
  {
    id: 'have-documents',
    label: 'I have documents ready',
    sublabel: 'Documents gathered, need submission help',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
  },
  {
    id: 'in-progress',
    label: 'Already started',
    sublabel: 'Process is underway, need help continuing',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
      </svg>
    ),
  },
];

const TIMELINE_OPTIONS: Option[] = [
  {
    id: 'urgent',
    label: 'Urgent — within a week',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    id: 'within-month',
    label: 'Within a month',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    ),
  },
  {
    id: 'within-quarter',
    label: 'Within 2–3 months',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
      </svg>
    ),
  },
  {
    id: 'exploring',
    label: 'Just exploring options',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

const LOCATION_OPTIONS: Option[] = [
  {
    id: 'in-poland',
    label: 'Yes, I am in Poland',
    sublabel: 'Currently living in Poland',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
      </svg>
    ),
  },
  {
    id: 'outside-poland',
    label: 'No, I am not in Poland yet',
    sublabel: 'Currently outside Poland',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
  },
];

const STEP_CONFIG = [
  { label: 'Service' },
  { label: 'Details' },
  { label: 'Location' },
  { label: 'Status' },
  { label: 'Timeline' },
  { label: 'Contact' },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fireGA4(eventName: string, params: Record<string, string | number | boolean>) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, params);
  }
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function ProgressDots({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-5">
      {Array.from({ length: total }).map((_, i) => {
        const stepNum = i + 1;
        const isComplete = stepNum < current;
        const isCurrent = stepNum === current;
        return (
          <div
            key={i}
            className={`rounded-full transition-all duration-300 ${
              isComplete
                ? 'w-2 h-2 bg-primary'
                : isCurrent
                ? 'w-6 h-2 bg-primary'
                : 'w-2 h-2 bg-gray-200'
            }`}
          />
        );
      })}
    </div>
  );
}

function OptionButton({
  option,
  onClick,
  index = 0,
}: {
  option: Option;
  onClick: () => void;
  index?: number;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border border-gray-200 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:border-primary hover:bg-red-50/50 hover:shadow-[0_4px_16px_rgba(171,22,4,0.12)] active:scale-[0.98] transition-all duration-150 text-left group"
    >
      <span className="flex-shrink-0 w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center text-primary transition-colors duration-150">
        {option.icon}
      </span>
      <span className="flex-1 min-w-0">
        <span className="block text-sm font-semibold text-gray-800 leading-tight">{option.label}</span>
        {option.sublabel && (
          <span className="block text-xs text-gray-400 mt-0.5 leading-tight">{option.sublabel}</span>
        )}
      </span>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 text-gray-300 group-hover:text-primary flex-shrink-0 transition-colors duration-150">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
      </svg>
    </button>
  );
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 transition-colors duration-150 mb-4"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
      </svg>
      Back
    </button>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function HeroQuestionnaire() {
  const [state, setState] = useState<State>(INITIAL_STATE);
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [comments, setComments] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [emailOpened, setEmailOpened] = useState(false);

  const goTo = useCallback((step: Step) => {
    setState((s) => ({ ...s, step }));
  }, []);

  const selectService = useCallback((option: Option) => {
    if (option.id === 'other') {
      setState((s) => ({ ...s, service: option.id, serviceLabel: option.label, subservice: 'other', subserviceLabel: 'Other', step: 3 }));
    } else {
      setState((s) => ({ ...s, service: option.id, serviceLabel: option.label, step: 2 }));
    }
    fireGA4('questionnaire_started', { service: option.id });
  }, []);

  const selectSubservice = useCallback((option: Option) => {
    setState((s) => ({ ...s, subservice: option.id, subserviceLabel: option.label, step: 3 }));
    fireGA4('questionnaire_step', { step_number: 2, step_1: state.service, step_2: option.id });
  }, [state.service]);

  const selectLocation = useCallback((option: Option) => {
    setState((s) => ({ ...s, location: option.id, locationLabel: option.label, step: 4 }));
    fireGA4('questionnaire_step', { step_number: 3, step_1: state.service, step_2: state.subservice });
  }, [state.service, state.subservice]);

  const selectProcessStatus = useCallback((option: Option) => {
    setState((s) => ({ ...s, processStatus: option.id, processStatusLabel: option.label, step: 5 }));
    fireGA4('questionnaire_step', { step_number: 4, step_1: state.service, step_2: state.subservice });
  }, [state.service, state.subservice]);

  const selectTimeline = useCallback((option: Option) => {
    setState((s) => ({ ...s, timeline: option.id, timelineLabel: option.label, step: 6 }));
    fireGA4('questionnaire_step', { step_number: 5, step_1: state.service, step_2: state.subservice });
  }, [state.service, state.subservice]);

  const handleSubmit = useCallback(() => {
    if (!name.trim()) {
      setNameError('Please enter your name.');
      return;
    }
    setNameError('');

    const subserviceLine = state.service === 'other'
      ? `${state.serviceLabel}`
      : `${state.serviceLabel} — ${state.subserviceLabel}`;

    const message =
      `Hi foreigners.pl team! I'm ${name.trim()}.\n\n` +
      `• Service: ${subserviceLine}\n` +
      `• Location: ${state.locationLabel}\n` +
      `• Status: ${state.processStatusLabel}\n` +
      `• Timeline: ${state.timelineLabel}` +
      (comments.trim() ? `\n\n• Comments: ${comments.trim()}` : '') +
      `\n\nCould you tell me more about the process and pricing?`;

    const url = `https://wa.me/48736286264?text=${encodeURIComponent(message)}`;

    fireGA4('questionnaire_submitted', {
      service: state.service,
      subservice: state.subservice,
      timeline: state.timeline,
    });

    setSubmitted(true);
    window.open(url, '_blank');
  }, [name, state]);

  const { step } = state;

  if (submitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="bg-white rounded-2xl shadow-[0_12px_50px_rgba(0,0,0,0.18)] border border-gray-100 overflow-hidden"
      >
          <div className="h-1 w-full bg-primary" />
          <div className="p-8 text-center">
        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <svg viewBox="0 0 24 24" fill="none" stroke="#AB1604" strokeWidth={2} className="w-7 h-7">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-base font-semibold text-gray-800 mb-1">Message sent successfully</p>
        <p className="text-sm text-gray-500">A specialist will reply in under an hour.</p>
        <button
          onClick={() => { setState(INITIAL_STATE); setSubmitted(false); setName(''); setNameError(''); setEmail(''); setEmailError(''); setComments(''); }}
          className="mt-6 text-xs text-gray-400 hover:text-gray-600 underline"
        >
          Start over
        </button>
        </div>
      </motion.div>
    );
  }

  return (
      <motion.div 
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.5,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
        className="bg-white rounded-2xl shadow-[0_12px_50px_rgba(0,0,0,0.18)] border border-gray-100 overflow-hidden"
      >
        <div className="h-1 w-full bg-primary" />
        <div className="p-6">
      <ProgressDots current={step} total={6} />

      {/* ── Step 1 ── */}
      {step === 1 && (
        <div>
          <h3 className="text-base font-semibold text-gray-900 mb-2">What can we help you with?</h3>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/8 border border-primary/20 text-primary text-xs font-semibold mb-4">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
            Contact us within 30 seconds
          </span>
          <div className="space-y-2">
            {SERVICES.map((s, i) => (
              <OptionButton key={s.id} option={s} onClick={() => selectService(s)} index={i} />
            ))}
          </div>
        </div>
      )}

      {/* ── Step 2 ── */}
      {step === 2 && (
        <div>
          <BackButton onClick={() => goTo(1)} />
          <h3 className="text-base font-semibold text-gray-900 mb-2">
            {state.service === 'immigration' && 'Which immigration service?'}
            {state.service === 'driving' && 'What do you need for driving?'}
            {state.service === 'language' && 'Which language service?'}
            {state.service === 'business' && 'What are you looking for?'}
            {state.service === 'studies' && 'Where are you in your studies?'}
            {state.service === 'other' && 'What do you need help with?'}
          </h3>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/8 border border-primary/20 text-primary text-xs font-semibold mb-4">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
            Contact us within 30 seconds
          </span>
          <div className="space-y-2">
            {(SUB_SERVICES[state.service] || []).map((s, i) => (
              <OptionButton key={s.id} option={s} onClick={() => selectSubservice(s)} index={i} />
            ))}
          </div>
        </div>
      )}

      {/* ── Step 3 ── */}
      {step === 3 && (
        <div>
          <BackButton onClick={() => goTo(state.service === 'other' ? 1 : 2)} />
          <h3 className="text-base font-semibold text-gray-900 mb-2">Are you currently in Poland?</h3>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/8 border border-primary/20 text-primary text-xs font-semibold mb-4">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
            Contact us within 30 seconds
          </span>
          <div className="space-y-2">
            {LOCATION_OPTIONS.map((s, i) => (
              <OptionButton key={s.id} option={s} onClick={() => selectLocation(s)} index={i} />
            ))}
          </div>
        </div>
      )}

      {/* ── Step 4 ── */}
      {step === 4 && (
        <div>
          <BackButton onClick={() => goTo(3)} />
          <h3 className="text-base font-semibold text-gray-900 mb-2">Where are you in the process?</h3>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/8 border border-primary/20 text-primary text-xs font-semibold mb-4">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
            Contact us within 30 seconds
          </span>
          <div className="space-y-2">
            {PROCESS_STATUS_OPTIONS.map((s, i) => (
              <OptionButton key={s.id} option={s} onClick={() => selectProcessStatus(s)} index={i} />
            ))}
          </div>
        </div>
      )}

      {/* ── Step 5 ── */}
      {step === 5 && (
        <div>
          <BackButton onClick={() => goTo(4)} />
          <h3 className="text-base font-semibold text-gray-900 mb-2">How soon do you need us to get started?</h3>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/8 border border-primary/20 text-primary text-xs font-semibold mb-4">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
            Contact us within 30 seconds
          </span>
          <div className="space-y-2">
            {TIMELINE_OPTIONS.map((s, i) => (
              <OptionButton key={s.id} option={s} onClick={() => selectTimeline(s)} index={i} />
            ))}
          </div>
        </div>
      )}

      {/* ── Step 6 ── */}
      {step === 6 && (
        <div>
          <BackButton onClick={() => goTo(5)} />
          <h3 className="text-base font-semibold text-gray-900 mb-2">Almost done — let's talk.</h3>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/8 border border-primary/20 text-primary text-xs font-semibold mb-4">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
            Contact us within 30 seconds
          </span>

          {/* Summary */}
          <div className="bg-gray-50 rounded-xl p-3 mb-4 space-y-1">
            <p className="text-xs text-gray-500">
              <span className="font-semibold text-gray-700">Service: </span>
              {state.service === 'other' ? state.serviceLabel : `${state.serviceLabel} — ${state.subserviceLabel}`}
            </p>
            <p className="text-xs text-gray-500">
              <span className="font-semibold text-gray-700">Location: </span>
              {state.locationLabel}
            </p>
            <p className="text-xs text-gray-500">
              <span className="font-semibold text-gray-700">Status: </span>
              {state.processStatusLabel}
            </p>
            <p className="text-xs text-gray-500">
              <span className="font-semibold text-gray-700">Timeline: </span>
              {state.timelineLabel}
            </p>
          </div>

          {/* Form */}
          <div className="space-y-3 mb-4">
            <div>
              <input
                type="text"
                value={name}
                onChange={(e) => { setName(e.target.value); setNameError(''); }}
                placeholder="Your full name *"
                className={`w-full px-4 py-3 rounded-xl border text-sm bg-white text-gray-800 placeholder-gray-400 outline-none transition-colors duration-150 ${nameError ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-primary'}`}
              />
              {nameError && <p className="text-xs text-red-500 mt-1">{nameError}</p>}
            </div>
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setEmailError(''); }}
                placeholder="Your email address *"
                className={`w-full px-4 py-3 rounded-xl border text-sm bg-white text-gray-800 placeholder-gray-400 outline-none transition-colors duration-150 ${emailError ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-primary'}`}
              />
              {emailError && <p className="text-xs text-red-500 mt-1">{emailError}</p>}
            </div>
            <div>
              <textarea
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="Any additional comments or questions? (optional)"
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm bg-white text-gray-800 placeholder-gray-400 outline-none focus:border-primary transition-colors duration-150 resize-none"
              />
            </div>
      </div>
          <button
            onClick={handleSubmit}
            className="w-full py-3.5 rounded-xl bg-[#25d366] text-white text-sm font-bold tracking-wide hover:-translate-y-px hover:shadow-[0_4px_20px_rgba(37,211,102,0.4)] transition-all duration-150"
          >
            Message us on WhatsApp
          </button>

          <button
            onClick={async () => {
              let hasError = false;
              if (!name.trim()) {
                setNameError('Please enter your name.');
                hasError = true;
              }
              if (!email.trim() || !email.includes('@')) {
                setEmailError('Please enter a valid email.');
                hasError = true;
              }
              if (hasError) return;
              setNameError('');
              setEmailError('');
              setEmailOpened(true);

              try {
                const response = await fetch('/api/questionnaire-email', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    name: name.trim(),
                    email: email.trim(),
                    service: state.serviceLabel,
                    subservice: state.subserviceLabel,
                    location: state.locationLabel,
                    processStatus: state.processStatusLabel,
                    timeline: state.timelineLabel,
                    comments: comments.trim(),
                  }),
                });

                if (response.ok) {
                  setSubmitted(true);
                } else {
                  alert('Failed to send email. Please try WhatsApp or copy our email connect@foreigners.pl');
                }
              } catch {
                alert('Failed to send email. Please try WhatsApp or copy our email connect@foreigners.pl');
              }

              setEmailOpened(false);
            }}
            className="w-full mt-3 py-3.5 rounded-xl border border-gray-200 text-gray-700 text-sm font-bold text-center hover:bg-gray-50 hover:border-gray-300 transition-all duration-150"
          >
            {emailOpened ? 'Sending…' : 'Send us an email'}
          </button>
        </div>
      )}
        </div>
      </motion.div>
  );
}
