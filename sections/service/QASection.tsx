'use client';

import { useState } from 'react';
import Section from '@/components/layout/Section';
import Container from '@/components/layout/Container';
import { FadeIn } from '@/components/ui/animated';
import { theme } from '@/lib/theme';

interface QAItem {
  question: string;
  answer: string;
}

interface QASectionProps {
  title: string;
  searchPlaceholder: string;
  items: readonly QAItem[];
}

export default function QASection({ title, searchPlaceholder, items }: QASectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = items.filter(item =>
    item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Section id="services-section">
      <Container>
        <div>
          {/* Title */}
          <FadeIn direction="up" delay={0.1}>
            <h2 className={`${theme.fontSize['3xl']} md:${theme.fontSize['4xl']} ${theme.fontWeight.bold} text-gray-900 mb-8`}>
              {title}
            </h2>
          </FadeIn>

          {/* Search Bar */}
          <FadeIn direction="up" delay={0.2}>
            <div className="relative mb-8">
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-lg ${theme.fontSize.base} focus:outline-none focus:border-primary transition-colors`}
              />
              <svg
                className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </FadeIn>

          {/* Q&A Items */}
          <div className="space-y-4">
            {filteredItems.map((item, index) => (
              <FadeIn key={index} direction="up" delay={0.1 + index * 0.05}>
                <div className="border-b border-gray-200">
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className={`w-full py-4 flex items-center justify-between text-left ${theme.fontSize.lg} ${theme.fontWeight.semibold} text-primary hover:opacity-80 transition-opacity`}
                  >
                    <span>{item.question}</span>
                    <svg
                      className={`w-5 h-5 transition-transform ${openIndex === index ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div 
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      openIndex === index ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className={`pb-4 ${theme.fontSize.base} text-gray-600 leading-relaxed whitespace-pre-line`}>
                      {item.answer}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <p className={`text-center text-gray-500 ${theme.fontSize.lg} py-8`}>
              No results found. Try a different search term.
            </p>
          )}
        </div>
      </Container>
    </Section>
  );
}
