'use client';

import { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import Container from '@/components/layout/Container';
import Section from '@/components/layout/Section';

type FormData = {
  name: string;
  pesel: string;
};

export default function ClientAgreementPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    pesel: '',
  });
  const [serverDate, setServerDate] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/server-date')
      .then((res) => res.json())
      .then((data) => {
        setServerDate(data.date);
        setIsLoading(false);
      })
      .catch(() => {
        setServerDate(new Date().toISOString().split('T')[0]);
        setIsLoading(false);
      });
  }, []);

  const handleDownload = () => {
    if (!formData.name || !serverDate) return;

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    let y = margin;

    const addText = (text: string, fontSize: number = 10, isBold: boolean = false) => {
      doc.setFontSize(fontSize);
      if (isBold) doc.setFont('helvetica', 'bold');
      else doc.setFont('helvetica', 'normal');

      const lines = doc.splitTextToSize(text, pageWidth - margin * 2);
      lines.forEach((line: string) => {
        if (y > 280) {
          doc.addPage();
          y = margin;
        }
        doc.text(line, margin, y);
        y += fontSize * 0.5;
      });
      y += 5;
    };

    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('CLIENT AGREEMENT ACKNOWLEDGMENT', pageWidth / 2, y, { align: 'center' });
    y += 8;
    doc.setFontSize(12);
    doc.text('POTWIERDZENIE UMOWY O ŚWIADCZENIE USŁUG', pageWidth / 2, y, { align: 'center' });
    y += 15;

    addText('The undersigned Client acknowledges that they have read, understood, and accepted the Terms and Conditions of Service and the Privacy Policy of FOREIGNERS.PL Sp. z o.o. ("the Provider"), available at foreigners.pl/terms-of-service and foreigners.pl/privacy-policy.', 10);
    addText('Osoba podpisana poniżej (Klient) potwierdza, że zapoznała się z treścią Regulaminu oraz Polityki Prywatności FOREIGNERS.PL Sp. z o.o. ("Usługodawca"), dostępnych na stronach foreigners.pl/terms-of-service oraz foreigners.pl/privacy-policy, i akceptuje ich postanowienia.', 10);
    y += 5;

    addText('1. SCOPE OF SERVICES / ZAKRES USŁUG', 12, true);
    addText('The Provider agrees to perform the specific legal and/or administrative work agreed upon with the Client. The agreed fee constitutes remuneration for the work to be performed, not for any guaranteed outcome, result, decision by any authority, or issuance of any document.');
    addText('Usługodawca zobowiązuje się do wykonania konkretnej pracy prawnej i/lub administracyjnej uzgodnionej z Klientem. Uzgodnione wynagrodzenie stanowi zapłatę za pracę do wykonania, a nie za jakikolwiek gwarantowany rezultat, decyzję organu lub wydanie dokumentu.');
    y += 5;

    addText('2. NO GUARANTEE OF RESULT / BRAK GWARANCJI REZULTATU', 12, true);
    addText('The Provider does not guarantee any particular outcome, approval, or favorable decision by any governmental authority, court, or third party. The Client understands that administrative and legal processes depend on independent decisions made by public authorities, courts, and other third parties outside the Provider\'s control.');
    addText('Usługodawca nie gwarantuje konkretnego rezultatu, zatwierdzenia ani korzystnej decyzji żadnego organu państwowego, sądu lub podmiotu trzeciego. Klient rozumie, że procesy administracyjne i prawne zależą od niezależnych decyzji podejmowanych przez organy publiczne, sądy i inne podmioty trzecie spoza kontroli Usługodawcy.');
    y += 5;

    addText('3. REFUND POLICY / POLITYKA ZWROTÓW', 12, true);
    addText('3.1 A full refund shall be granted only if the Client cancels the service within 24 hours of the Provider\'s receipt of payment.');
    addText('Pełny zwrot przysługuje wyłącznie, gdy Klient anuluje usługę w ciągu 24 godzin od momentu otrzymania płatności przez Usługodawcę.');
    addText('3.2 If cancellation occurs after the 24-hour period has elapsed, the Client shall be entitled to a refund of 80% (eighty percent) of the amount paid. The remaining 20% (twenty percent) shall be retained by the Provider as an administrative fee.');
    addText('W przypadku anulowania po upływie 24 godzin, Klientowi przysługuje zwrot 80% (osiemdziesięciu procent) zapłaconej kwoty. Pozostałe 20% (dwadzieścia procent) zostaje zatrzymane przez Usługodawcę jako opłata administracyjna.');
    addText('3.3 No refund shall be granted if the change in scope results from:');
    addText('Zwrot nie przysługuje, jeśli zmiana zakresu wynika z:');
    addText('(a) the Client requesting additional services beyond the originally agreed scope, for which the Provider issues a new quote; or');
    addText('(a) żądania przez Klienta dodatkowych usług wykraczających poza pierwotnie uzgodniony zakres, za które Usługodawca przedstawia nową wycenę; lub');
    addText('(b) the Client failing to provide complete, accurate, or timely information that affects the scope, complexity, or cost of the agreed services.');
    addText('(b) niepodania przez Klienta pełnych, dokładnych lub terminowych informacji wpływających na zakres, złożoność lub koszt uzgodnionych usług.');
    y += 5;

    addText('4. DATA PROCESSING / PRZETWARZANIE DANYCH', 12, true);
    addText('The Client consents to the processing of their personal data by the Provider for the purpose of performing the agreed services and communication related thereto, in accordance with the Privacy Policy.');
    addText('Klient wyraża zgodę na przetwarzanie swoich danych osobowych przez Usługodawcę w celu wykonania uzgodnionych usług oraz prowadzenia związanej z tym komunikacji, zgodnie z Polityką Prywatności.');
    y += 5;

    addText('5. GOVERNING LAW / PRAWO WŁAŚCIWE', 12, true);
    addText('This Agreement shall be governed by and construed in accordance with the laws of the Republic of Poland.');
    addText('Niniejsza umowa podlega prawu Rzeczypospolitej Polskiej.');
    y += 5;

    addText('6. PROVIDER INFORMATION / DANE USŁUGODAWCY', 12, true);
    addText('FOREIGNERS.PL Sp. z o.o.');
    addText('ul. 3 Maja 31/4, 40-097 Katowice, Poland');
    addText('NIP: 6343044313');
    addText('KRS: 0001124675');
    addText('E-mail: connect@foreigners.pl');
    y += 5;

    addText('7. CLIENT INFORMATION / DANE KLIENTA', 12, true);
    addText(`Name / Imię i nazwisko: ${formData.name}`);
    if (formData.pesel) {
      addText(`PESEL: ${formData.pesel}`);
    }
    addText(`Date / Data: ${serverDate}`);
    y += 5;

    addText('ACKNOWLEDGMENT / OŚWIADCZENIE', 12, true);
    addText(`I, ${formData.name}, confirm that I have read, understood, and accept the terms and conditions set forth above.`);
    addText(`Ja, ${formData.name}, potwierdzam, że przeczytałem/przeczytałam, zrozumiałem/zrozumiałam i akceptuję powyższe warunki.`);
    addText(`Client signature / Podpis Klienta: ${formData.name}`);

    doc.save(`client-agreement-${formData.name.replace(/\s+/g, '-')}-${serverDate}.pdf`);
  };

  return (
    <Section className="bg-gray-50">
      <Container className="py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-display text-3xl md:text-4xl font-semibold text-gray-900 mb-2">
            Client Agreement / Umowa Klienta
          </h1>
          <p className="text-gray-600 mb-8">
            Read the terms below, fill in your details, and download your signed agreement.
            Przeczytaj warunki poniżej, wypełnij swoje dane i pobierz podpisaną umowę.
          </p>

          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* English Column */}
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                  English
                </h2>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Scope of Services</h3>
                  <p className="text-sm text-gray-600">
                    The Provider performs the specific work agreed upon. The fee is for the work performed, not for any guaranteed outcome or decision.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">No Guarantee of Result</h3>
                  <p className="text-sm text-gray-600">
                    No guarantee of any approval, decision, or result by any authority, court, or third party.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Refund Policy</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Full refund only if cancelled within 24 hours of payment received</li>
                    <li>• After 24 hours: 80% refund (20% administrative fee retained)</li>
                    <li>• No refund if scope changes due to client-requested extras or incomplete client information</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Data Processing</h3>
                  <p className="text-sm text-gray-600">
                    Client consents to processing personal data for service provision, per the Privacy Policy at foreigners.pl/privacy-policy.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Provider</h3>
                  <p className="text-sm text-gray-600">
                    FOREIGNERS.PL Sp. z o.o.<br />
                    ul. 3 Maja 31/4, 40-097 Katowice<br />
                    NIP: 6343044313 · KRS: 0001124675
                  </p>
                </div>
              </div>

              {/* Polish Column */}
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                  Polski
                </h2>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Zakres usług</h3>
                  <p className="text-sm text-gray-600">
                    Usługodawca wykonuje konkretną uzgodnioną pracę. Wynagrodzenie jest za wykonaną pracę, nie za gwarantowany rezultat lub decyzję.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Brak gwarancji rezultatu</h3>
                  <p className="text-sm text-gray-600">
                    Brak gwarancji zatwierdzenia, decyzji lub rezultatu przez jakikolwiek organ, sąd lub podmiot trzeci.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Polityka zwrotów</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Pełny zwrot tylko przy anulowaniu w ciągu 24 godzin od otrzymania płatności</li>
                    <li>• Po 24 godzinach: zwrot 80% (zatrzymane 20% opłaty administracyjnej)</li>
                    <li>• Brak zwrotu, gdy zmiana zakresu wynika z żądania dodatków przez Klienta lub niepełnych informacji</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Przetwarzanie danych</h3>
                  <p className="text-sm text-gray-600">
                    Klient wyraża zgodę na przetwarzanie danych osobowych w celu świadczenia usług, zgodnie z Polityką Prywatności na foreigners.pl/privacy-policy.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Usługodawca</h3>
                  <p className="text-sm text-gray-600">
                    FOREIGNERS.PL Sp. z o.o.<br />
                    ul. 3 Maja 31/4, 40-097 Katowice<br />
                    NIP: 6343044313 · KRS: 0001124675
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Client Information / Dane Klienta
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name / Imię i nazwisko *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  placeholder="Jan Kowalski"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Your name will be used as your signature. / Twoje imię i nazwisko zostanie użyte jako podpis.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  PESEL Number / Numer PESEL (optional / opcjonalnie)
                </label>
                <input
                  type="text"
                  value={formData.pesel}
                  onChange={(e) => setFormData({ ...formData, pesel: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  placeholder="12345678901"
                  maxLength={11}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Only provide if required for your specific service. / Podaj tylko jeśli jest wymagany do Twojej usługi.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date / Data
                </label>
                <input
                  type="text"
                  value={isLoading ? 'Loading...' : serverDate}
                  disabled
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-100 text-gray-600 cursor-not-allowed"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Date is set by our server and cannot be changed. / Data jest ustawiana przez nasz serwer i nie można jej zmienić.
                </p>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleDownload}
                  disabled={!formData.name || !serverDate}
                  className="w-full py-4 rounded-xl bg-primary text-white font-semibold hover:bg-primary/90 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all"
                >
                  Download Signed Agreement / Pobierz podpisaną umowę
                </button>
              </div>

              <p className="text-xs text-gray-500 text-center">
                By downloading, you confirm that you have read, understood, and accept the above terms.
                Pobierając, potwierdzasz, że przeczytałeś, zrozumiałeś i akceptujesz powyższe warunki.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
