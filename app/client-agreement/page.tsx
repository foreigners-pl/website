'use client';

import { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import Container from '@/components/layout/Container';
import Section from '@/components/layout/Section';

type FormData = {
  name: string;
};

export default function ClientAgreementPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
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

    const doc = new jsPDF('p', 'mm', 'a4');
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 15;
    const colGap = 8;
    const colWidth = (pageWidth - margin * 2 - colGap) / 2;
    const leftX = margin;
    const rightX = margin + colWidth + colGap;
    let y = margin;

    const setFont = (size: number, style: 'normal' | 'bold' | 'italic' = 'normal') => {
      doc.setFontSize(size);
      if (style === 'bold') doc.setFont('times', 'bold');
      else if (style === 'italic') doc.setFont('times', 'italic');
      else doc.setFont('times', 'normal');
    };

    const addHeader = () => {
      setFont(16, 'bold');
      doc.text('CLIENT SERVICE AGREEMENT', pageWidth / 2, y, { align: 'center' });
      y += 6;
      setFont(10, 'italic');
      doc.text('Umowa o świadczenie usług dla Klienta', pageWidth / 2, y, { align: 'center' });
      y += 8;
      doc.setLineWidth(0.5);
      doc.line(margin, y, pageWidth - margin, y);
      y += 8;
    };

    const textHeight = (text: string, size: number, width: number) => {
      setFont(size);
      const lines = doc.splitTextToSize(text, width);
      return (Array.isArray(lines) ? lines.length : 1) * size * 0.5;
    };

    const renderBlock = (title: string, body: string, titlePl: string, bodyPl: string, size = 9) => {
      const titleH = textHeight(title, size - 1, colWidth);
      const bodyH = textHeight(body, size, colWidth);
      const blockH = titleH + bodyH + 4;

      if (y + blockH > pageHeight - margin) {
        doc.addPage();
        y = margin;
      }

      setFont(size - 1, 'bold');
      doc.text(title, leftX, y);
      doc.text(titlePl, rightX, y);
      const titleLinesL = doc.splitTextToSize(title, colWidth);
      const titleLinesR = doc.splitTextToSize(titlePl, colWidth);
      const titleLinesH = Math.max(titleLinesL.length, titleLinesR.length) * (size - 1) * 0.55;
      y += titleLinesH + 1;

      setFont(size);
      doc.text(doc.splitTextToSize(body, colWidth), leftX, y);
      doc.text(doc.splitTextToSize(bodyPl, colWidth), rightX, y);
      const bodyLinesL = doc.splitTextToSize(body, colWidth);
      const bodyLinesR = doc.splitTextToSize(bodyPl, colWidth);
      const bodyLinesH = Math.max(bodyLinesL.length, bodyLinesR.length) * size * 0.55;
      y += bodyLinesH + 5;
    };

    const renderSimpleBlock = (bodyLeft: string, bodyRight: string, size = 9) => {
      const blockH = Math.max(textHeight(bodyLeft, size, colWidth), textHeight(bodyRight, size, colWidth)) + 4;

      if (y + blockH > pageHeight - margin) {
        doc.addPage();
        y = margin;
      }

      setFont(size);
      doc.text(doc.splitTextToSize(bodyLeft, colWidth), leftX, y);
      doc.text(doc.splitTextToSize(bodyRight, colWidth), rightX, y);
      y += Math.max(doc.splitTextToSize(bodyLeft, colWidth).length, doc.splitTextToSize(bodyRight, colWidth).length) * size * 0.55 + 5;
    };

    addHeader();

    renderSimpleBlock(
      'Provider:\nFOREIGNERS.PL Sp. z o.o.\nul. 3 Maja 31/4, 40-097 Katowice, Poland\nNIP: 6343044313 · KRS: 0001124675\nE-mail: connect@foreigners.pl',
      'Usługodawca:\nFOREIGNERS.PL Sp. z o.o.\nul. 3 Maja 31/4, 40-097 Katowice\nNIP: 6343044313 · KRS: 0001124675\nE-mail: connect@foreigners.pl'
    );

    renderSimpleBlock(
      `Client:\n${formData.name}\nDate: ${serverDate}`,
      `Klient:\n${formData.name}\nData: ${serverDate}`
    );

    renderBlock(
      'Preamble',
      'By proceeding with the services of FOREIGNERS.PL Sp. z o.o. (the "Provider"), the undersigned Client confirms that they have read, understood, and agree to be bound by the terms set forth in this Agreement and the Provider\'s Terms of Service and Privacy Policy.',
      'Preambuła',
      'Podpisując niniejszy dokument, Klient potwierdza, że zapoznał się z treścią niniejszej Umowy oraz Regulaminu i Polityki Prywatności Usługodawcy i akceptuje ich postanowienia.'
    );

    renderBlock(
      'Article 1 — Scope of Services and No Guarantee of Result',
      'The Provider shall perform the specific legal and/or administrative work agreed upon with the Client. The agreed fee is remuneration solely for the work performed, not for any guaranteed outcome, approval, decision by an authority, or issuance of a document. Such outcomes depend on independent decisions made by public authorities, courts, and other third parties outside the Provider\'s control.',
      'Artykuł 1 — Zakres usług i brak gwarancji rezultatu',
      'Usługodawca wykona konkretną pracę prawną i/lub administracyjną uzgodnioną z Klientem. Uzgodnione wynagrodzenie stanowi wyłącznie zapłatę za wykonaną pracę, a nie za gwarantowany rezultat, zatwierdzenie, decyzję organu lub wydanie dokumentu. Rezultaty te zależą od niezależnych decyzji podejmowanych przez organy publiczne, sądy i inne podmioty trzecie spoza kontroli Usługodawcy.'
    );

    renderBlock(
      'Article 2 — Refund Policy',
      '2.1 A full refund shall be granted only if the Client cancels the service within 24 hours of the Provider\'s receipt of payment, provided the Provider has not yet performed any substantial part of the service, such as drafting or submitting a crucial application, preparing official documents, or engaging with authorities on the Client\'s behalf.\n\n2.2 If cancellation occurs after the 24-hour period, a refund may be granted only if the cancellation is due to a change in price resulting from a change in scope that is not caused by the Client under section 2.3. Any such refund shall be calculated by deducting the value of the work already completed from the total amount paid. Work already completed includes, but is not limited to, case analysis, legal or administrative research, drafting or preparing documents, correspondence with authorities, and any other tasks directly performed for the Client\'s matter. The Provider will assess this value in good faith and inform the Client of the refundable amount.\n\n2.3 No refund shall be granted if the Client refuses to proceed with the agreed services due to a change in scope, price, or timeframe that results from: (a) the Client requesting additional services beyond the originally agreed scope; or (b) the Client failing to provide complete, accurate, or timely information that affects the scope, complexity, or cost of the agreed services.',
      'Artykuł 2 — Polityka zwrotów',
      '2.1 Pełny zwrot przysługuje wyłącznie, gdy Klient anuluje usługę w ciągu 24 godzin od momentu otrzymania płatności przez Usługodawcę, pod warunkiem że Usługodawca nie wykonał jeszcze żadnej istotnej części usługi, takiej jak sporządzenie lub złożenie kluczowego wniosku, przygotowanie dokumentów urzędowych lub podjęcie kontaktu z organami w imieniu Klienta.\n\n2.2 W przypadku anulowania po upływie 24 godzin zwrot może zostać udzielony wyłącznie, jeśli anulowanie wynika ze zmiany ceny będącej konsekwencją zmiany zakresu, która nie została spowodowana przez Klienta w rozumieniu pkt 2.3. Wysokość takiego zwrotu zostanie obliczona przez odjęcie wartości już wykonanej pracy od całkowitej zapłaconej kwoty. Do wykonanej pracy zalicza się m.in. analizę sprawy, badanie prawne lub administracyjne, sporządzanie lub przygotowywanie dokumentów, korespondencję z organami oraz inne czynności bezpośrednio wykonane w sprawie Klienta. Usługodawca określi tę wartość w dobrej wierze i poinformuje Klienta o zwracanej kwocie.\n\n2.3 Zwrot nie przysługuje, jeśli Klient odmawia kontynuowania uzgodnionych usług z powodu zmiany zakresu, ceny lub terminu wynikającej z: (a) żądania przez Klienta dodatkowych usług wykraczających poza pierwotnie uzgodniony zakres; lub (b) niepodania przez Klienta pełnych, dokładnych lub terminowych informacji wpływających na zakres, złożoność lub koszt uzgodnionych usług.'
    );

    renderBlock(
      'Article 3 — Data Processing',
      'The Client consents to the processing of their personal data by the Provider for the purpose of performing the agreed services and communication related thereto, in accordance with the Provider\'s Privacy Policy available at foreigners.pl/privacy-policy.',
      'Artykuł 3 — Przetwarzanie danych',
      'Klient wyraża zgodę na przetwarzanie swoich danych osobowych przez Usługodawcę w celu wykonania uzgodnionych usług oraz prowadzenia związanej z tym komunikacji, zgodnie z Polityką Prywatności dostępną na foreigners.pl/privacy-policy.'
    );

    // Acknowledgment
    if (y + 35 > pageHeight - margin) {
      doc.addPage();
      y = margin;
    }
    doc.setLineWidth(0.3);
    doc.line(margin, y, pageWidth - margin, y);
    y += 8;

    renderBlock(
      'Acknowledgment',
      `I, ${formData.name}, confirm that I have read, understood, and accept the terms and conditions set forth above. I understand that my typed name below shall serve as my electronic signature.`,
      'Oświadczenie',
      `Ja, ${formData.name}, potwierdzam, że przeczytałem/przeczytałam, zrozumiałem/zrozumiałam i akceptuję powyższe warunki. Rozumiem, że moje wpisane imię i nazwisko stanowi mój elektroniczny podpis.`
    );

    setFont(9, 'bold');
    doc.text('Client Signature', leftX, y);
    doc.text('Podpis Klienta', rightX, y);
    y += 5;
    setFont(9);
    doc.text(formData.name, leftX, y);
    doc.text(formData.name, rightX, y);
    doc.line(leftX, y + 2, leftX + colWidth - 5, y + 2);
    doc.line(rightX, y + 2, rightX + colWidth - 5, y + 2);
    y += 12;

    setFont(9, 'bold');
    doc.text('Date', leftX, y);
    doc.text('Data', rightX, y);
    y += 5;
    setFont(9);
    doc.text(serverDate, leftX, y);
    doc.text(serverDate, rightX, y);
    doc.line(leftX, y + 2, leftX + colWidth - 5, y + 2);
    doc.line(rightX, y + 2, rightX + colWidth - 5, y + 2);

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
          <div className="p-8 md:p-12 mb-8" style={{ fontFamily: "'Times New Roman', Times, serif", backgroundColor: '#ffffff', border: '1px solid #d1d5db', color: '#111827', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)' }}>
            <div className="text-center pb-6 mb-8" style={{ borderBottom: '2px solid #1f2937' }}>
              <h2 className="font-display text-2xl font-semibold uppercase tracking-wide" style={{ color: '#111827' }}>
                Client Service Agreement
              </h2>
              <p className="text-sm mt-1 italic" style={{ color: '#4b5563' }}>
                Umowa o świadczenie usług dla Klienta
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 text-sm leading-relaxed" style={{ color: '#111827' }}>
              {/* Row: Provider / Usługodawca */}
              <div>
                <p className="font-bold mb-1">Provider:</p>
                <p>
                  FOREIGNERS.PL Sp. z o.o.<br />
                  ul. 3 Maja 31/4, 40-097 Katowice, Poland<br />
                  NIP: 6343044313 · KRS: 0001124675<br />
                  E-mail: connect@foreigners.pl
                </p>
              </div>
              <div>
                <p className="font-bold mb-1">Usługodawca:</p>
                <p>
                  FOREIGNERS.PL Sp. z o.o.<br />
                  ul. 3 Maja 31/4, 40-097 Katowice<br />
                  NIP: 6343044313 · KRS: 0001124675<br />
                  E-mail: connect@foreigners.pl
                </p>
              </div>

              {/* Row: Client / Klient */}
              <div>
                <p className="font-bold mb-1">Client:</p>
                <p>
                  {formData.name || '_________________________________'}<br />
                  Date: {isLoading ? '...' : serverDate}
                </p>
              </div>
              <div>
                <p className="font-bold mb-1">Klient:</p>
                <p>
                  {formData.name || '_________________________________'}<br />
                  Data: {isLoading ? '...' : serverDate}
                </p>
              </div>

              {/* Row: Preamble / Preambuła */}
              <div>
                <h3 className="font-bold uppercase tracking-wide text-xs pb-1 mb-2" style={{ borderBottom: '1px solid #1f2937' }}>Preamble</h3>
                <p>
                  By proceeding with the services of FOREIGNERS.PL Sp. z o.o. (the "Provider"), the undersigned Client confirms that they have read, understood, and agree to be bound by the terms set forth in this Agreement and the Provider's Terms of Service and Privacy Policy.
                </p>
              </div>
              <div>
                <h3 className="font-bold uppercase tracking-wide text-xs pb-1 mb-2" style={{ borderBottom: '1px solid #1f2937' }}>Preambuła</h3>
                <p>
                  Podpisując niniejszy dokument, Klient potwierdza, że zapoznał się z treścią niniejszej Umowy oraz Regulaminu i Polityki Prywatności Usługodawcy i akceptuje ich postanowienia.
                </p>
              </div>

              {/* Row: Article 1 — Scope and No Guarantee / Zakres i brak gwarancji */}
              <div>
                <h3 className="font-bold uppercase tracking-wide text-xs pb-1 mb-2" style={{ borderBottom: '1px solid #1f2937' }}>Article 1 — Scope of Services and No Guarantee of Result</h3>
                <p>
                  The Provider shall perform the specific legal and/or administrative work agreed upon with the Client. The agreed fee is remuneration solely for the work performed, not for any guaranteed outcome, approval, decision by an authority, or issuance of a document. Such outcomes depend on independent decisions made by public authorities, courts, and other third parties outside the Provider's control.
                </p>
              </div>
              <div>
                <h3 className="font-bold uppercase tracking-wide text-xs pb-1 mb-2" style={{ borderBottom: '1px solid #1f2937' }}>Artykuł 1 — Zakres usług i brak gwarancji rezultatu</h3>
                <p>
                  Usługodawca wykona konkretną pracę prawną i/lub administracyjną uzgodnioną z Klientem. Uzgodnione wynagrodzenie stanowi wyłącznie zapłatę za wykonaną pracę, a nie za gwarantowany rezultat, zatwierdzenie, decyzję organu lub wydanie dokumentu. Rezultaty te zależą od niezależnych decyzji podejmowanych przez organy publiczne, sądy i inne podmioty trzecie spoza kontroli Usługodawcy.
                </p>
              </div>

              {/* Row: Article 2 — Refund Policy / Polityka zwrotów */}
              <div>
                <h3 className="font-bold uppercase tracking-wide text-xs pb-1 mb-2" style={{ borderBottom: '1px solid #1f2937' }}>Article 2 — Refund Policy</h3>
                <p className="space-y-2">
                  <span className="block">2.1 A full refund shall be granted only if the Client cancels the service within 24 hours of the Provider's receipt of payment, provided the Provider has not yet performed any substantial part of the service, such as drafting or submitting a crucial application, preparing official documents, or engaging with authorities on the Client's behalf.</span>
                  <span className="block">2.2 If cancellation occurs after the 24-hour period, a refund may be granted only if the cancellation is due to a change in price resulting from a change in scope that is not caused by the Client under section 2.3. Any such refund shall be calculated by deducting the value of the work already completed from the total amount paid. Work already completed includes, but is not limited to, case analysis, legal or administrative research, drafting or preparing documents, correspondence with authorities, and any other tasks directly performed for the Client's matter. The Provider will assess this value in good faith and inform the Client of the refundable amount.</span>
                  <span className="block">2.3 No refund shall be granted if the Client refuses to proceed with the agreed services due to a change in scope, price, or timeframe that results from: (a) the Client requesting additional services beyond the originally agreed scope; or (b) the Client failing to provide complete, accurate, or timely information that affects the scope, complexity, or cost of the agreed services.</span>
                </p>
              </div>
              <div>
                <h3 className="font-bold uppercase tracking-wide text-xs pb-1 mb-2" style={{ borderBottom: '1px solid #1f2937' }}>Artykuł 2 — Polityka zwrotów</h3>
                <p className="space-y-2">
                  <span className="block">2.1 Pełny zwrot przysługuje wyłącznie, gdy Klient anuluje usługę w ciągu 24 godzin od momentu otrzymania płatności przez Usługodawcę, pod warunkiem że Usługodawca nie wykonał jeszcze żadnej istotnej części usługi, takiej jak sporządzenie lub złożenie kluczowego wniosku, przygotowanie dokumentów urzędowych lub podjęcie kontaktu z organami w imieniu Klienta.</span>
                  <span className="block">2.2 W przypadku anulowania po upływie 24 godzin zwrot może zostać udzielony wyłącznie, jeśli anulowanie wynika ze zmiany ceny będącej konsekwencją zmiany zakresu, która nie została spowodowana przez Klienta w rozumieniu pkt 2.3. Wysokość takiego zwrotu zostanie obliczona przez odjęcie wartości już wykonanej pracy od całkowitej zapłaconej kwoty. Do wykonanej pracy zalicza się m.in. analizę sprawy, badanie prawne lub administracyjne, sporządzanie lub przygotowywanie dokumentów, korespondencję z organami oraz inne czynności bezpośrednio wykonane w sprawie Klienta. Usługodawca określi tę wartość w dobrej wierze i poinformuje Klienta o zwracanej kwocie.</span>
                  <span className="block">2.3 Zwrot nie przysługuje, jeśli Klient odmawia kontynuowania uzgodnionych usług z powodu zmiany zakresu, ceny lub terminu wynikającej z: (a) żądania przez Klienta dodatkowych usług wykraczających poza pierwotnie uzgodniony zakres; lub (b) niepodania przez Klienta pełnych, dokładnych lub terminowych informacji wpływających na zakres, złożoność lub koszt uzgodnionych usług.</span>
                </p>
              </div>

              {/* Row: Article 3 — Data Processing / Przetwarzanie danych */}
              <div>
                <h3 className="font-bold uppercase tracking-wide text-xs pb-1 mb-2" style={{ borderBottom: '1px solid #1f2937' }}>Article 3 — Data Processing</h3>
                <p>
                  The Client consents to the processing of their personal data by the Provider for the purpose of performing the agreed services and communication related thereto, in accordance with the Provider's Privacy Policy available at foreigners.pl/privacy-policy.
                </p>
              </div>
              <div>
                <h3 className="font-bold uppercase tracking-wide text-xs pb-1 mb-2" style={{ borderBottom: '1px solid #1f2937' }}>Artykuł 3 — Przetwarzanie danych</h3>
                <p>
                  Klient wyraża zgodę na przetwarzanie swoich danych osobowych przez Usługodawcę w celu wykonania uzgodnionych usług oraz prowadzenia związanej z tym komunikacji, zgodnie z Polityką Prywatności dostępną na foreigners.pl/privacy-policy.
                </p>
              </div>

              {/* Row: Acknowledgment / Oświadczenie */}
              <div className="pt-4" style={{ borderTop: '1px solid #d1d5db' }}>
                <h3 className="font-bold uppercase tracking-wide text-xs mb-2" style={{ color: '#111827' }}>Acknowledgment</h3>
                <p className="mb-4">
                  I, {formData.name || '_________________________________'}, confirm that I have read, understood, and accept the terms and conditions set forth above. I understand that my typed name below shall serve as my electronic signature.
                </p>
                <p className="font-semibold text-xs mb-1">Client Signature</p>
                <p className="py-1" style={{ borderBottom: '1px solid #1f2937' }}>{formData.name || ''}</p>
                <p className="font-semibold text-xs mt-3 mb-1">Date</p>
                <p className="py-1" style={{ borderBottom: '1px solid #1f2937' }}>{isLoading ? '...' : serverDate}</p>
              </div>
              <div className="pt-4" style={{ borderTop: '1px solid #d1d5db' }}>
                <h3 className="font-bold uppercase tracking-wide text-xs mb-2" style={{ color: '#111827' }}>Oświadczenie</h3>
                <p className="mb-4">
                  Ja, {formData.name || '_________________________________'}, potwierdzam, że przeczytałem/przeczytałam, zrozumiałem/zrozumiałam i akceptuję powyższe warunki. Rozumiem, że moje wpisane imię i nazwisko stanowi mój elektroniczny podpis.
                </p>
                <p className="font-semibold text-xs mb-1">Podpis Klienta</p>
                <p className="py-1" style={{ borderBottom: '1px solid #1f2937' }}>{formData.name || ''}</p>
                <p className="font-semibold text-xs mt-3 mb-1">Data</p>
                <p className="py-1" style={{ borderBottom: '1px solid #1f2937' }}>{isLoading ? '...' : serverDate}</p>
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
