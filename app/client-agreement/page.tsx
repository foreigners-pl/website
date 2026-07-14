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
        y += fontSize * 0.55;
      });
      y += 4;
    };

    const addSectionTitle = (text: string) => {
      y += 4;
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text(text, margin, y);
      y += 8;
    };

    // Header
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('CLIENT SERVICE AGREEMENT', pageWidth / 2, y, { align: 'center' });
    y += 7;
    doc.setFontSize(11);
    doc.setFont('helvetica', 'italic');
    doc.text('Umowa o świadczenie usług dla Klienta', pageWidth / 2, y, { align: 'center' });
    y += 12;

    doc.setLineWidth(0.5);
    doc.line(margin, y, pageWidth - margin, y);
    y += 10;

    // Parties
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('Provider / Usługodawca:', margin, y);
    y += 6;
    doc.setFont('helvetica', 'normal');
    addText('FOREIGNERS.PL Sp. z o.o.\nul. 3 Maja 31/4, 40-097 Katowice, Poland\nNIP: 6343044313 · KRS: 0001124675\nE-mail: connect@foreigners.pl');

    doc.setFont('helvetica', 'bold');
    doc.text('Client / Klient:', margin, y);
    y += 6;
    doc.setFont('helvetica', 'normal');
    addText(`${formData.name}${formData.pesel ? '\nPESEL: ' + formData.pesel : ''}\nDate / Data: ${serverDate}`);

    // Preamble
    addSectionTitle('Preamble / Preambuła');
    addText('By proceeding with the services of FOREIGNERS.PL Sp. z o.o. (the "Provider"), the undersigned Client confirms that they have read, understood, and agree to be bound by the terms set forth in this Agreement and the Provider\'s Terms of Service and Privacy Policy.');
    addText('Podpisując niniejszy dokument, Klient potwierdza, że zapoznał się z treścią niniejszej Umowy oraz Regulaminu i Polityki Prywatności Usługodawcy i akceptuje ich postanowienia.');

    // Article 1
    addSectionTitle('Article 1 — Scope of Services / Zakres usług');
    addText('The Provider shall perform the specific legal and/or administrative work agreed upon with the Client. The agreed fee constitutes remuneration solely for the work to be performed, and not for any guaranteed outcome, result, decision by any authority, or issuance of any document.');
    addText('Usługodawca zobowiązuje się do wykonania konkretnej pracy prawnej i/lub administracyjnej uzgodnionej z Klientem. Uzgodnione wynagrodzenie stanowi wyłącznie zapłatę za pracę do wykonania, a nie za jakikolwiek gwarantowany rezultat, decyzję organu lub wydanie dokumentu.');

    // Article 2
    addSectionTitle('Article 2 — No Guarantee of Result / Brak gwarancji rezultatu');
    addText('The Provider does not guarantee any particular outcome, approval, or favorable decision by any governmental authority, court, or third party. The Client understands that administrative and legal processes depend on independent decisions made by public authorities, courts, and other third parties outside the Provider\'s control.');
    addText('Usługodawca nie gwarantuje konkretnego rezultatu, zatwierdzenia ani korzystnej decyzji żadnego organu państwowego, sądu lub podmiotu trzeciego. Klient rozumie, że procesy administracyjne i prawne zależą od niezależnych decyzji podejmowanych przez organy publiczne, sądy i inne podmioty trzecie spoza kontroli Usługodawcy.');

    // Article 3
    addSectionTitle('Article 3 — Refund Policy / Polityka zwrotów');
    addText('3.1 A full refund shall be granted only if the Client cancels the service within 24 hours of the Provider\'s receipt of payment.');
    addText('Pełny zwrot przysługuje wyłącznie, gdy Klient anuluje usługę w ciągu 24 godzin od momentu otrzymania płatności przez Usługodawcę.');
    addText('3.2 If cancellation occurs after the 24-hour period has elapsed, the Client shall be entitled to a refund of 80% (eighty percent) of the amount paid. The remaining 20% (twenty percent) shall be retained by the Provider as an administrative fee.');
    addText('W przypadku anulowania po upływie 24 godzin, Klientowi przysługuje zwrot 80% zapłaconej kwoty. Pozostałe 20% zostaje zatrzymane przez Usługodawcę jako opłata administracyjna.');
    addText('3.3 No refund shall be granted if the change in scope results from: (a) the Client requesting additional services beyond the originally agreed scope, for which the Provider issues a new quote; or (b) the Client failing to provide complete, accurate, or timely information that affects the scope, complexity, or cost of the agreed services.');
    addText('Zwrot nie przysługuje, jeśli zmiana zakresu wynika z: (a) żądania przez Klienta dodatkowych usług wykraczających poza pierwotnie uzgodniony zakres, za które Usługodawca przedstawia nową wycenę; lub (b) niepodania przez Klienta pełnych, dokładnych lub terminowych informacji wpływających na zakres, złożoność lub koszt uzgodnionych usług.');

    // Article 4
    addSectionTitle('Article 4 — Data Processing / Przetwarzanie danych');
    addText('The Client consents to the processing of their personal data by the Provider for the purpose of performing the agreed services and communication related thereto, in accordance with the Provider\'s Privacy Policy available at foreigners.pl/privacy-policy.');
    addText('Klient wyraża zgodę na przetwarzanie swoich danych osobowych przez Usługodawcę w celu wykonania uzgodnionych usług oraz prowadzenia związanej z tym komunikacji, zgodnie z Polityką Prywatności dostępną na foreigners.pl/privacy-policy.');

    // Article 5
    addSectionTitle('Article 5 — Governing Law / Prawo właściwe');
    addText('This Agreement shall be governed by and construed in accordance with the laws of the Republic of Poland.');
    addText('Niniejsza umowa podlega prawu Rzeczypospolitej Polskiej.');

    // Acknowledgment
    y += 6;
    doc.setLineWidth(0.3);
    doc.line(margin, y, pageWidth - margin, y);
    y += 10;
    addSectionTitle('Acknowledgment / Oświadczenie');
    addText(`I, ${formData.name}, confirm that I have read, understood, and accept the terms and conditions set forth above. I understand that my typed name below shall serve as my electronic signature.`);
    addText(`Ja, ${formData.name}, potwierdzam, że przeczytałem/przeczytałam, zrozumiałem/zrozumiałam i akceptuję powyższe warunki. Rozumiem, że moje wpisane imię i nazwisko stanowi mój elektroniczny podpis.`);

    y += 8;
    doc.setFont('helvetica', 'bold');
    doc.text('Client Signature / Podpis Klienta:', margin, y);
    y += 8;
    doc.setFont('helvetica', 'normal');
    doc.text(formData.name, margin, y);
    doc.line(margin, y + 2, pageWidth / 2 - 10, y + 2);

    y += 16;
    doc.setFont('helvetica', 'bold');
    doc.text('Date / Data:', margin, y);
    y += 8;
    doc.setFont('helvetica', 'normal');
    doc.text(serverDate, margin, y);
    doc.line(margin, y + 2, pageWidth / 2 - 10, y + 2);

    doc.save(`client-agreement-${formData.name.replace(/\s+/g, '-')}-${serverDate}.pdf`);
  };

  return (
    <Section className="bg-gray-100">
      <Container className="py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="font-display text-3xl md:text-4xl font-semibold text-gray-900 mb-2">
              Service Agreement Acknowledgment
            </h1>
            <p className="text-primary font-medium">
              Potwierdzenie umowy o świadczenie usług
            </p>
            <p className="text-gray-600 mt-2 text-sm">
              Review the agreement below, complete your details, and download the signed document.
            </p>
          </div>

          {/* Document Preview */}
          <div className="bg-white shadow-xl border border-gray-300 p-8 md:p-12 mb-8">
            <div className="text-center border-b-2 border-gray-800 pb-6 mb-8">
              <h2 className="font-display text-2xl font-semibold text-gray-900 uppercase tracking-wide">
                Client Service Agreement
              </h2>
              <p className="text-gray-600 text-sm mt-1 italic">
                Umowa o świadczenie usług dla Klienta
              </p>
            </div>

            <div className="mb-8 text-sm">
              <p className="mb-2"><strong>Provider / Usługodawca:</strong></p>
              <p className="mb-4">
                FOREIGNERS.PL Sp. z o.o.<br />
                ul. 3 Maja 31/4, 40-097 Katowice, Poland<br />
                NIP: 6343044313 · KRS: 0001124675<br />
                E-mail: connect@foreigners.pl
              </p>
              <p className="mb-2"><strong>Client / Klient:</strong></p>
              <p className="mb-1">{formData.name || '_________________________________'}</p>
              {formData.pesel && <p className="text-gray-600">PESEL: {formData.pesel}</p>}
              <p className="text-gray-600">Date / Data: {isLoading ? '...' : serverDate}</p>
            </div>

            <div className="space-y-6 text-sm text-gray-800 leading-relaxed">
              <div>
                <h3 className="font-bold text-gray-900 mb-2 uppercase tracking-wide text-xs">Preamble / Preambuła</h3>
                <p className="mb-2">
                  By proceeding with the services of FOREIGNERS.PL Sp. z o.o. (the "Provider"), the undersigned Client confirms that they have read, understood, and agree to be bound by the terms set forth in this Agreement and the Provider's Terms of Service and Privacy Policy.
                </p>
                <p className="text-gray-600 italic text-xs">
                  Podpisując niniejszy dokument, Klient potwierdza, że zapoznał się z treścią niniejszej Umowy oraz Regulaminu i Polityki Prywatności Usługodawcy i akceptuje ich postanowienia.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-2 uppercase tracking-wide text-xs">Article 1 — Scope of Services / Zakres usług</h3>
                <p className="mb-2">
                  The Provider shall perform the specific legal and/or administrative work agreed upon with the Client. The agreed fee constitutes remuneration solely for the work to be performed, and not for any guaranteed outcome, result, decision by any authority, or issuance of any document.
                </p>
                <p className="text-gray-600 italic text-xs">
                  Usługodawca zobowiązuje się do wykonania konkretnej pracy prawnej i/lub administracyjnej uzgodnionej z Klientem. Uzgodnione wynagrodzenie stanowi wyłącznie zapłatę za pracę do wykonania, a nie za jakikolwiek gwarantowany rezultat, decyzję organu lub wydanie dokumentu.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-2 uppercase tracking-wide text-xs">Article 2 — No Guarantee of Result / Brak gwarancji rezultatu</h3>
                <p className="mb-2">
                  The Provider does not guarantee any particular outcome, approval, or favorable decision by any governmental authority, court, or third party. The Client understands that administrative and legal processes depend on independent decisions made by public authorities, courts, and other third parties outside the Provider's control.
                </p>
                <p className="text-gray-600 italic text-xs">
                  Usługodawca nie gwarantuje konkretnego rezultatu, zatwierdzenia ani korzystnej decyzji żadnego organu państwowego, sądu lub podmiotu trzeciego. Klient rozumie, że procesy administracyjne i prawne zależą od niezależnych decyzji podejmowanych przez organy publiczne, sądy i inne podmioty trzecie spoza kontroli Usługodawcy.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-2 uppercase tracking-wide text-xs">Article 3 — Refund Policy / Polityka zwrotów</h3>
                <p className="mb-2">
                  3.1 A full refund shall be granted only if the Client cancels the service within 24 hours of the Provider's receipt of payment.
                </p>
                <p className="mb-2">
                  3.2 If cancellation occurs after the 24-hour period has elapsed, the Client shall be entitled to a refund of 80% (eighty percent) of the amount paid. The remaining 20% (twenty percent) shall be retained by the Provider as an administrative fee.
                </p>
                <p className="mb-2">
                  3.3 No refund shall be granted if the change in scope results from: (a) the Client requesting additional services beyond the originally agreed scope, for which the Provider issues a new quote; or (b) the Client failing to provide complete, accurate, or timely information that affects the scope, complexity, or cost of the agreed services.
                </p>
                <p className="text-gray-600 italic text-xs">
                  3.1 Pełny zwrot przysługuje wyłącznie, gdy Klient anuluje usługę w ciągu 24 godzin od momentu otrzymania płatności przez Usługodawcę.<br />
                  3.2 W przypadku anulowania po upływie 24 godzin, Klientowi przysługuje zwrot 80% zapłaconej kwoty. Pozostałe 20% zostaje zatrzymane przez Usługodawcę jako opłata administracyjna.<br />
                  3.3 Zwrot nie przysługuje, jeśli zmiana zakresu wynika z: (a) żądania przez Klienta dodatkowych usług wykraczających poza pierwotnie uzgodniony zakres, za które Usługodawca przedstawia nową wycenę; lub (b) niepodania przez Klienta pełnych, dokładnych lub terminowych informacji wpływających na zakres, złożoność lub koszt uzgodnionych usług.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-2 uppercase tracking-wide text-xs">Article 4 — Data Processing / Przetwarzanie danych</h3>
                <p className="mb-2">
                  The Client consents to the processing of their personal data by the Provider for the purpose of performing the agreed services and communication related thereto, in accordance with the Provider's Privacy Policy available at foreigners.pl/privacy-policy.
                </p>
                <p className="text-gray-600 italic text-xs">
                  Klient wyraża zgodę na przetwarzanie swoich danych osobowych przez Usługodawcę w celu wykonania uzgodnionych usług oraz prowadzenia związanej z tym komunikacji, zgodnie z Polityką Prywatności dostępną na foreigners.pl/privacy-policy.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-2 uppercase tracking-wide text-xs">Article 5 — Governing Law / Prawo właściwe</h3>
                <p className="mb-2">
                  This Agreement shall be governed by and construed in accordance with the laws of the Republic of Poland.
                </p>
                <p className="text-gray-600 italic text-xs">
                  Niniejsza umowa podlega prawu Rzeczypospolitej Polskiej.
                </p>
              </div>

              <div className="border-t border-gray-300 pt-6 mt-8">
                <h3 className="font-bold text-gray-900 mb-4 uppercase tracking-wide text-xs">Acknowledgment / Oświadczenie</h3>
                <p className="mb-4">
                  I, {formData.name || '_________________________________'}, confirm that I have read, understood, and accept the terms and conditions set forth above. I understand that my typed name below shall serve as my electronic signature.
                </p>
                <p className="text-gray-600 italic text-xs mb-8">
                  Ja, {formData.name || '_________________________________'}, potwierdzam, że przeczytałem, zrozumiałem i akceptuję powyższe warunki. Rozumiem, że moje wpisane imię i nazwisko stanowi mój elektroniczny podpis.
                </p>

                <div className="grid grid-cols-2 gap-8 mt-8">
                  <div>
                    <p className="text-sm font-semibold mb-1">Client Signature / Podpis Klienta</p>
                    <p className="border-b border-gray-800 py-2 text-sm">{formData.name || ''}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold mb-1">Date / Data</p>
                    <p className="border-b border-gray-800 py-2 text-sm">{isLoading ? '...' : serverDate}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Complete Your Details / Uzupełnij dane
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
                  Your typed name will serve as your electronic signature. / Wpisane imię i nazwisko posłuży jako elektroniczny podpis.
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
