'use client';

import { useState, useCallback } from 'react';

interface SimpleWhatsAppFormProps {
  title?: string;
  prefillMessage?: string;
  source?: string;
}

export default function SimpleWhatsAppForm({
  title = 'Get in touch',
  prefillMessage = '',
  source = 'Website',
}: SimpleWhatsAppFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [message, setMessage] = useState(prefillMessage);
  const [nameError, setNameError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [emailOpened, setEmailOpened] = useState(false);

  const handleWhatsApp = useCallback(() => {
    if (!name.trim()) {
      setNameError('Please enter your name.');
      return;
    }
    setNameError('');

    const text =
      `Hi foreigners.pl team! I'm ${name.trim()}.\n\n` +
      `${message.trim() || `I'm interested in your services.`}\n\n` +
      `Could you tell me more about the process and pricing?`;

    const url = `https://wa.me/48736286264?text=${encodeURIComponent(text)}`;

    setSubmitted(true);
    window.open(url, '_blank');
  }, [name, message]);

  const handleEmail = useCallback(async () => {
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
          service: source || 'General inquiry',
          subservice: message.trim() || 'No details provided',
          location: 'Not specified',
          processStatus: 'Not specified',
          timeline: 'Not specified',
          comments: message.trim(),
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
  }, [name, email, message, source]);

  const handleReset = () => {
    setSubmitted(false);
    setName('');
    setNameError('');
    setEmail('');
    setEmailError('');
    setMessage(prefillMessage);
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
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
            onClick={handleReset}
            className="mt-6 text-xs text-gray-400 hover:text-gray-600 underline"
          >
            Start over
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.12)] border border-gray-100 overflow-hidden">
      <div className="h-1 w-full bg-primary" />
      <div className="p-8">
        {title && (
          <h3 className="text-lg font-bold text-gray-900 mb-1">{title}</h3>
        )}
        <p className="text-sm text-gray-500 mb-4">
          Fill in your details and we&apos;ll connect you on WhatsApp within minutes.
        </p>

        <div className="space-y-3">
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
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us what you need help with..."
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm bg-white text-gray-800 placeholder-gray-400 outline-none focus:border-primary transition-colors duration-150 resize-none"
            />
          </div>
        </div>

        <button
          onClick={handleWhatsApp}
          className="w-full mt-4 py-3.5 rounded-xl bg-[#25d366] text-white text-sm font-bold tracking-wide hover:-translate-y-px hover:shadow-[0_4px_20px_rgba(37,211,102,0.4)] transition-all duration-150"
        >
          Message us on WhatsApp
        </button>

        <button
          onClick={handleEmail}
          className="w-full mt-3 py-3.5 rounded-xl border border-gray-200 text-gray-700 text-sm font-bold text-center hover:bg-gray-50 hover:border-gray-300 transition-all duration-150"
        >
          {emailOpened ? 'Sending…' : 'Send us an email'}
        </button>
      </div>
    </div>
  );
}
