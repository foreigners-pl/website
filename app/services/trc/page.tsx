'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Container from '@/components/layout/Container';
import Section from '@/components/layout/Section';
import { FadeIn } from '@/components/ui/animated';

// Core TRC Service Tasks
const coreServiceTasks = [
  'Preliminary virtual consultation with client and overview of situation',
  'Case Status check',
  'Preparation of initial documents and submission of power of attorney',
  'Submission of TRC Application with supporting documents',
  'Arrange biometrics with client',
  'Arrange TRC card collection',
];

// Additional Services
const additionalServices = [
  {
    id: 'monthly-check',
    name: 'Monthly Update Check (1 year)',
    description: 'Regular monthly monitoring of your case status for a full year',
    clientPrice: 1299,
    standardPrice: 1499,
  },
  {
    id: 'address-update',
    name: 'Address Update',
    description: 'Update your registered address in all official systems',
    clientPrice: 499,
    standardPrice: 699,
  },
  {
    id: 'city-change',
    name: 'City Change',
    description: 'Change your city of residence in official records',
    clientPrice: 699,
    standardPrice: 899,
  },
  {
    id: 'acceleration',
    name: 'Acceleration Letter + Court Complaint',
    description: 'Legal action to speed up delayed application process',
    clientPrice: 1699,
    standardPrice: 1999,
  },
  {
    id: 'document-update',
    name: 'Submission of Additional Document (e.g. passport update)',
    description: 'Submit updated documents to authorities when needed',
    clientPrice: 499,
    standardPrice: 699,
  },
  {
    id: 'lawyer-office',
    name: 'Lawyer — In-person Assistance at Immigration Office',
    description: 'Personal lawyer accompaniment to immigration office visits',
    clientPrice: 999,
    standardPrice: 1399,
  },
  {
    id: 'consultation-virtual',
    name: 'Additional Virtual Consultation with Lawyer',
    description: 'Extra video consultation session with your assigned lawyer',
    clientPrice: 349,
    standardPrice: 349,
  },
  {
    id: 'consultation-inperson',
    name: 'Additional In-person Consultation with Lawyer',
    description: 'Face-to-face meeting with your lawyer at our office',
    clientPrice: 799,
    standardPrice: 999,
  },
];

export default function TRCPage() {
  const [isCoreSelected, setIsCoreSelected] = useState(true);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

  const toggleAddOn = (id: string) => {
    setSelectedAddOns(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const calculateTotal = () => {
    let total = 0;
    
    if (isCoreSelected) {
      total += 2399;
    }
    
    selectedAddOns.forEach(id => {
      const service = additionalServices.find(s => s.id === id);
      if (service) {
        total += service.clientPrice;
      }
    });
    
    return total;
  };

  const handleSendToWhatsApp = () => {
    const parts: string[] = [];
    parts.push('TRC Service Quote Request');
    parts.push('');
    
    if (isCoreSelected) {
      parts.push('*Core Service: TRC Application*');
      parts.push('Price: 2399 zl');
      parts.push('');
      parts.push('Included services:');
      coreServiceTasks.forEach(task => {
        parts.push(`- ${task}`);
      });
    }
    
    if (selectedAddOns.length > 0) {
      parts.push('');
      parts.push('*Additional Services:*');
      selectedAddOns.forEach(id => {
        const service = additionalServices.find(s => s.id === id);
        if (service) {
          parts.push(`- ${service.name} - ${service.clientPrice} zl`);
        }
      });
    }
    
    parts.push('');
    parts.push(`*Total: ${calculateTotal()} zl*`);
    parts.push('');
    parts.push('I would like to proceed with these services. Please confirm availability.');
    
    const message = parts.join('\n');
    const encoded = encodeURIComponent(message);
    const url = `https://wa.me/48736286264?text=${encoded}`;
    window.open(url, '_blank');
  };

  return (
    <>
      <Navbar />
      
      <main className="min-h-screen bg-gray-50">
        {/* Hero */}
        <Section className="bg-white pt-6 pb-6">
          <Container>
            <FadeIn direction="up">
              <div className="max-w-4xl">
                <h1 className="font-display text-3xl md:text-4xl font-semibold text-gray-900 mb-2">
                  TRC Application
                </h1>
                <p className="text-gray-600">
                  Select the services you need. Get an instant quote and send it to us via WhatsApp.
                </p>
              </div>
            </FadeIn>
          </Container>
        </Section>

        {/* Core Service */}
        <Section className="bg-white pb-8">
          <Container>
            <FadeIn>
              <div className="max-w-4xl mx-auto">
                <div 
                  className={`rounded-2xl border-2 transition-all cursor-pointer ${
                    isCoreSelected 
                      ? 'border-primary bg-red-50/30' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setIsCoreSelected(!isCoreSelected)}
                >
                  <div className="p-6 md:p-8">
                    <div className="flex items-start gap-4">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mt-1 ${
                        isCoreSelected ? 'border-primary bg-primary' : 'border-gray-300'
                      }`}>
                        {isCoreSelected && (
                          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
                          <div>
                            <span className="inline-block px-3 py-1 bg-primary text-white text-xs font-semibold uppercase tracking-wider rounded-full mb-2">
                              Core Service
                            </span>
                            <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
                              TRC Application
                            </h2>
                          </div>
                          <div className="text-right">
                            <p className="text-3xl font-bold text-primary">
                              2399 zł
                            </p>
                          </div>
                        </div>
                        
                        <div className="mt-6 pt-6 border-t border-gray-200">
                          <p className="text-sm font-semibold text-gray-700 mb-3">What's included:</p>
                          <ul className="space-y-2">
                            {coreServiceTasks.map((task, index) => (
                              <li key={index} className="flex items-start gap-3 text-gray-600">
                                <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-sm">{task}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </Container>
        </Section>

        {/* Additional Services */}
        <Section className="bg-gray-50 py-12">
          <Container>
            <FadeIn>
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">Additional Services</h2>
                <p className="text-gray-600 mb-8">
                  Enhance your TRC application with these optional add-ons
                </p>
                
                <div className="space-y-4">
                  {additionalServices.map((service) => (
                    <div
                      key={service.id}
                      onClick={() => toggleAddOn(service.id)}
                      className={`rounded-xl border-2 p-5 cursor-pointer transition-all ${
                        selectedAddOns.includes(service.id)
                          ? 'border-primary bg-white shadow-md'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5 ${
                          selectedAddOns.includes(service.id) ? 'border-primary bg-primary' : 'border-gray-300'
                        }`}>
                          {selectedAddOns.includes(service.id) && (
                            <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                          )}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                            <div>
                              <h3 className="font-semibold text-gray-900">{service.name}</h3>
                              <p className="text-sm text-gray-500 mt-1">{service.description}</p>
                            </div>
                            <div className="text-right md:pl-4">
                              <p className="text-xl font-bold text-primary">
                                {service.clientPrice} zł
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </Container>
        </Section>

        {/* Summary & CTA - Sticky at bottom of content */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 shadow-lg z-50">
          <Container>
            <div className="max-w-4xl mx-auto py-3">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <p className="text-2xl font-bold text-primary">
                    {calculateTotal()} zł
                  </p>
                  <p className="text-sm text-gray-500">
                    ({isCoreSelected ? 1 : 0} core + {selectedAddOns.length} add-ons)
                  </p>
                </div>
                
                <button
                  onClick={handleSendToWhatsApp}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-white rounded-lg font-semibold text-sm hover:bg-red-700 transition-all hover:shadow-md active:scale-95"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  Send Quote
                </button>
              </div>
            </div>
          </Container>
        </div>
      </main>
      
      <Footer />
    </>
  );
}
