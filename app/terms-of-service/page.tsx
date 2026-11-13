'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Container from '@/components/layout/Container';
import Section from '@/components/layout/Section';
import { termsOfServiceContent } from '@/lib/content/legal/terms-of-service';

export default function TermsOfServicePage() {
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
                  {termsOfServiceContent.title}
                </h1>
                <div className="flex gap-3 flex-shrink-0">
                  <a
                    href={termsOfServiceContent.pdfUrlEn}
                    download="Terms-and-Conditions-of-Service.pdf"
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    aria-label="Download Terms of Service PDF (English)"
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
                    <span className="text-sm font-medium">EN PDF</span>
                  </a>
                  <a
                    href={termsOfServiceContent.pdfUrlPl}
                    download="Regulamin-Swiadczenia-Uslug.pdf"
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    aria-label="Pobierz PDF Regulaminu Świadczenia Usług (Polski)"
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
                    <span className="text-sm font-medium">PL PDF</span>
                  </a>
                </div>
              </div>

              {/* Last Updated */}
              <p className="text-sm text-gray-600 mb-8">
                Last Updated / Ostatnia aktualizacja: {termsOfServiceContent.lastUpdated}
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

              {/* Content */}
              {isExpanded && (
                <div className="space-y-8">
                  {termsOfServiceContent.sections.map((section) => (
                    <div key={section.id} className="bg-gray-50 rounded-lg p-6">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">
                        {section.title}
                      </h2>
                      <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                        {section.content}
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
