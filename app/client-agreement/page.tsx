'use client';

import { useState, useEffect, useRef } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
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
  const documentRef = useRef<HTMLDivElement>(null);

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

  const handleDownload = async () => {
    if (!formData.name || !serverDate || !documentRef.current) return;

    const element = documentRef.current;
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    const imgX = (pdfWidth - imgWidth * ratio) / 2;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'PNG', imgX, 0, imgWidth * ratio, imgHeight * ratio);
    heightLeft -= pdfHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', imgX, position, imgWidth * ratio, imgHeight * ratio);
      heightLeft -= pdfHeight;
    }

    pdf.save(`client-agreement-${formData.name.replace(/\s+/g, '-')}-${serverDate}.pdf`);
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
          <div ref={documentRef} className="p-8 md:p-12 mb-8" style={{ fontFamily: "'Times New Roman', Times, serif", backgroundColor: '#ffffff', border: '1px solid #d1d5db', color: '#111827', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)' }}>
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
                  {formData.pesel && <>PESEL: {formData.pesel}<br /></>}
                  Date: {isLoading ? '...' : serverDate}
                </p>
              </div>
              <div>
                <p className="font-bold mb-1">Klient:</p>
                <p>
                  {formData.name || '_________________________________'}<br />
                  {formData.pesel && <>PESEL: {formData.pesel}<br /></>}
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
                  <span className="block">2.2 If cancellation occurs after the 24-hour period, a refund may be granted only if the cancellation is due to a change in scope, price, or timeframe that is not caused by the Client under section 2.3. Any such refund shall be calculated by deducting the value of the work already completed from the total amount paid. Work already completed includes, but is not limited to, case analysis, legal or administrative research, drafting or preparing documents, correspondence with authorities, and any other tasks directly performed for the Client's matter. The Provider will assess this value in good faith and inform the Client of the refundable amount.</span>
                  <span className="block">2.3 No refund shall be granted if the Client refuses to proceed with the agreed services due to a change in scope, price, or timeframe that results from: (a) the Client requesting additional services beyond the originally agreed scope; or (b) the Client failing to provide complete, accurate, or timely information that affects the scope, complexity, or cost of the agreed services.</span>
                </p>
              </div>
              <div>
                <h3 className="font-bold uppercase tracking-wide text-xs pb-1 mb-2" style={{ borderBottom: '1px solid #1f2937' }}>Artykuł 2 — Polityka zwrotów</h3>
                <p className="space-y-2">
                  <span className="block">2.1 Pełny zwrot przysługuje wyłącznie, gdy Klient anuluje usługę w ciągu 24 godzin od momentu otrzymania płatności przez Usługodawcę, pod warunkiem że Usługodawca nie wykonał jeszcze żadnej istotnej części usługi, takiej jak sporządzenie lub złożenie kluczowego wniosku, przygotowanie dokumentów urzędowych lub podjęcie kontaktu z organami w imieniu Klienta.</span>
                  <span className="block">2.2 W przypadku anulowania po upływie 24 godzin zwrot może zostać udzielony wyłącznie, jeśli anulowanie wynika ze zmiany zakresu, ceny lub terminu, która nie została spowodowana przez Klienta w rozumieniu pkt 2.3. Wysokość takiego zwrotu zostanie obliczona przez odjęcie wartości już wykonanej pracy od całkowitej zapłaconej kwoty. Do wykonanej pracy zalicza się m.in. analizę sprawy, badanie prawne lub administracyjne, sporządzanie lub przygotowywanie dokumentów, korespondencję z organami oraz inne czynności bezpośrednio wykonane w sprawie Klienta. Usługodawca określi tę wartość w dobrej wierze i poinformuje Klienta o zwracanej kwocie.</span>
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
