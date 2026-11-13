'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Container from '@/components/layout/Container';
import Section from '@/components/layout/Section';
import { privacyPolicyContent } from '@/lib/content/legal/privacy-policy';

export default function PrivacyPolicyPage() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <Navbar />
      <main className="bg-[#f7f7f7]">
        <Section className="pt-20 pb-16">
          <Container>
            <div className="max-w-4xl mx-auto">
              {/* Header with PDF Downloads */}
              <div className="flex items-start justify-between mb-8 border-b border-gray-200 pb-6">
                <h1 className="text-4xl font-bold text-gray-900">
                  {privacyPolicyContent.title}
                </h1>
                <div className="flex-shrink-0">
                  <a
                    href="/privacy-policy.pdf"
                    download="Privacy-Policy-Polityka-Prywatnosci.pdf"
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    aria-label="Download Privacy Policy PDF (English & Polish) / Pobierz PDF Polityki Prywatności (Polski i Angielski)"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-sm font-medium">Download PDF</span>
                  </a>
                </div>
              </div>

              {/* Last Updated */}
              <p className="text-sm text-gray-600 mb-8">
                Last Updated / Ostatnia aktualizacja: {privacyPolicyContent.lastUpdated}
              </p>

              {/* Toggle Button */}
              <div className="text-center mb-8">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-red-600 hover:text-red-700 font-medium transition-colors"
                >
                  {isExpanded ? 'Hide / Ukryj' : 'Read More / Czytaj więcej'}
                </button>
              </div>

              {/* Collapsible Content */}
              {isExpanded && (
                <div className="space-y-12">
                  {privacyPolicyContent.sections.map((section) => (
                    <div key={section.id} className="bg-gray-50 p-8 rounded-lg">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">
                        {section.title}
                      </h2>
                      
                      {/* Intro paragraphs */}
                      <div className="space-y-4 mb-8">
                        {section.content.map((paragraph, idx) => (
                          <p key={idx} className="text-gray-700 leading-relaxed">
                            {paragraph}
                          </p>
                        ))}
                      </div>

                      {/* Subsections */}
                      <div className="space-y-6">
                        {section.subsections.map((subsection, idx) => (
                          <div key={idx} className="border-l-4 border-red-600 pl-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">
                              {subsection.subtitle}
                            </h3>
                            <div className="space-y-2">
                              {subsection.content.map((item, itemIdx) => (
                                <p key={itemIdx} className="text-gray-700">
                                  {item}
                                </p>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
