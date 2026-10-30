'use client';

import { use, useEffect, useState } from 'react';
import Container from '@/components/layout/Container';
import Section from '@/components/layout/Section';
import SignaturePad from '@/components/signing/SignaturePad';

interface SigningData {
  status: string;
  clientName: string;
  clientEmail: string;
  serviceName: string | null;
  totalPrice: number | null;
  steps: string[];
  date: string | null;
  company: Record<string, string | null>;
  signed: {
    name: string | null;
    email: string | null;
    pesel: string | null;
    idNumber: string | null;
    signedAt: string | null;
    signatureData: string | null;
  } | null;
}

const ARTICLES: { titleEn: string; titlePl: string; en: string; pl: string }[] = [
  {
    titleEn: 'Preamble',
    titlePl: 'Preambuła',
    en: 'By proceeding with the services of FOREIGNERS.PL Sp. z o.o. (the "Provider"), the undersigned Client confirms that they have read, understood, and agree to be bound by the terms set forth in this Agreement and the Provider\'s Terms of Service and Privacy Policy.',
    pl: 'Podpisując niniejszy dokument, Klient potwierdza, że zapoznał się z treścią niniejszej Umowy oraz Regulaminu i Polityki Prywatności Usługodawcy i akceptuje ich postanowienia.',
  },
  {
    titleEn: 'Article 1 — Scope of Services and No Guarantee of Result',
    titlePl: 'Artykuł 1 — Zakres usług i brak gwarancji rezultatu',
    en: 'The Provider shall perform the specific legal and/or administrative work agreed upon with the Client. The agreed fee is remuneration solely for the work performed, not for any guaranteed outcome, approval, decision by an authority, or issuance of a document. Such outcomes depend on independent decisions made by public authorities, courts, and other third parties outside the Provider\'s control.',
    pl: 'Usługodawca wykona konkretną pracę prawną i/lub administracyjną uzgodnioną z Klientem. Uzgodnione wynagrodzenie stanowi wyłącznie zapłatę za wykonaną pracę, a nie za gwarantowany rezultat, zatwierdzenie, decyzję organu lub wydanie dokumentu. Rezultaty te zależą od niezależnych decyzji podejmowanych przez organy publiczne, sądy i inne podmioty trzecie spoza kontroli Usługodawcy.',
  },
  {
    titleEn: 'Article 2 — Refund Policy',
    titlePl: 'Artykuł 2 — Polityka zwrotów',
    en: '2.1 A full refund shall be granted only if the Client cancels the service within 24 hours of the Provider\'s receipt of payment, provided the Provider has not yet performed any substantial part of the service, such as drafting or submitting a crucial application, preparing official documents, or engaging with authorities on the Client\'s behalf.\n\n2.2 If cancellation occurs after the 24-hour period, a refund may be granted only if the cancellation is due to a change in price resulting from a change in scope that is not caused by the Client under section 2.3. Any such refund shall be calculated by deducting the value of the work already completed from the total amount paid. Work already completed includes, but is not limited to, case analysis, legal or administrative research, drafting or preparing documents, correspondence with authorities, and any other tasks directly performed for the Client\'s matter. The Provider will assess this value in good faith and inform the Client of the refundable amount.\n\n2.3 No refund shall be granted if the Client refuses to proceed with the agreed services due to a change in scope, price, or timeframe that results from: (a) the Client requesting additional services beyond the originally agreed scope; or (b) the Client failing to provide complete, accurate, or timely information that affects the scope, complexity, or cost of the agreed services.',
    pl: '2.1 Pełny zwrot przysługuje wyłącznie, gdy Klient anuluje usługę w ciągu 24 godzin od momentu otrzymania płatności przez Usługodawcę, pod warunkiem że Usługodawca nie wykonał jeszcze żadnej istotnej części usługi, takiej jak sporządzenie lub złożenie kluczowego wniosku, przygotowanie dokumentów urzędowych lub podjęcie kontaktu z organami w imieniu Klienta.\n\n2.2 W przypadku anulowania po upływie 24 godzin zwrot może zostać udzielony wyłącznie, jeśli anulowanie wynika ze zmiany zakresu, która nie została spowodowana przez Klienta w rozumieniu pkt 2.3. Wysokość takiego zwrotu zostanie obliczona przez odjęcie wartości już wykonanej pracy od całkowitej zapłaconej kwoty. Do wykonanej pracy zalicza się m.in. analizę sprawy, badanie prawne lub administracyjne, sporządzanie lub przygotowywanie dokumentów, korespondencję z organami oraz inne czynności bezpośrednio wykonane w sprawie Klienta. Usługodawca określi tę wartość w dobrej wierze i poinformuje Klienta o zwracanej kwocie.\n\n2.3 Zwrot nie przysługuje, jeśli Klient odmawia kontynuowania uzgodnionych usług z powodu zmiany zakresu, ceny lub terminu wynikającej z: (a) żądania przez Klienta dodatkowych usług wykraczających poza pierwotnie uzgodniony zakres; lub (b) niepodania przez Klienta pełnych, dokładnych lub terminowych informacji wpływających na zakres, złożoność lub koszt uzgodnionych usług.',
  },
  {
    titleEn: 'Article 3 — Data Processing',
    titlePl: 'Artykuł 3 — Przetwarzanie danych',
    en: 'The Client consents to the processing of their personal data by the Provider for the purpose of performing the agreed services and communication related thereto, in accordance with the Provider\'s Privacy Policy available at foreigners.pl/privacy-policy.',
    pl: 'Klient wyraża zgodę na przetwarzanie swoich danych osobowych przez Usługodawcę w celu wykonania uzgodnionych usług oraz prowadzenia związanej z tym komunikacji, zgodnie z Polityką Prywatności dostępną na foreigners.pl/privacy-policy.',
  },
];

export default function SignPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = use(params);
  const [data, setData] = useState<SigningData | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [signed, setSigned] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pesel, setPesel] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [signature, setSignature] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/sign/${token}`)
      .then(async res => {
        if (!res.ok) throw new Error('not found');
        return res.json();
      })
      .then((d: SigningData) => {
        setData(d);
        setName(d.clientName || '');
        setEmail(d.clientEmail || '');
        setSigned(d.status === 'signed');
        if (d.status !== 'signed') {
          fetch(`/api/sign/${token}/open`, { method: 'POST' });
        }
      })
      .catch(() => setNotFound(true));
  }, [token]);

  const submit = async () => {
    setError(null);
    if (!name.trim()) return setError('Please enter your full name / Proszę podać imię i nazwisko');
    if (!signature) return setError('Please add your signature / Proszę złożyć podpis');
    setSubmitting(true);
    const res = await fetch(`/api/sign/${token}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, pesel, idNumber, signatureData: signature }),
    });
    setSubmitting(false);
    const json = await res.json().catch(() => ({}));
    if (!res.ok) setError(json.error || 'Something went wrong');
    else setSigned(true);
  };

  if (notFound) {
    return (
      <Section className="bg-gray-100 min-h-screen">
        <Container className="py-20 text-center">
          <h1 className="font-display text-2xl font-semibold text-gray-900">Link not found</h1>
          <p className="text-gray-600 mt-2">This agreement link is invalid or has expired. Please contact Foreigners.pl for a new one.</p>
        </Container>
      </Section>
    );
  }

  if (!data) {
    return (
      <Section className="bg-gray-100 min-h-screen">
        <Container className="py-20 text-center">
          <p className="text-gray-500">Loading…</p>
        </Container>
      </Section>
    );
  }

  const providerBlock = [
    data.company.company_name || 'FOREIGNERS.PL Sp. z o.o.',
    data.company.address,
    data.company.tax_id ? `NIP: ${data.company.tax_id}` : null,
    data.company.email ? `E-mail: ${data.company.email}` : null,
  ].filter(Boolean).join('\n');

  return (
    <Section className="bg-gray-100">
      <Container className="py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="font-display text-3xl md:text-4xl font-semibold text-gray-900 mb-2">
              Service Agreement
            </h1>
            <p className="text-primary font-medium">Umowa o świadczenie usług</p>
            <p className="text-gray-600 mt-2 text-sm">
              Review the agreement below, complete your details, and sign.
            </p>
          </div>

          {/* Document */}
          <div className="p-8 md:p-12 mb-8" style={{ fontFamily: "'Times New Roman', Times, serif", backgroundColor: '#ffffff', border: '1px solid #d1d5db', color: '#111827', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)' }}>
            <div className="text-center pb-6 mb-8" style={{ borderBottom: '2px solid #1f2937' }}>
              <h2 className="font-display text-2xl font-semibold uppercase tracking-wide">Client Service Agreement</h2>
              <p className="text-sm mt-1 italic text-gray-600">Umowa o świadczenie usług dla Klienta</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 text-sm leading-relaxed">
              <div>
                <p className="font-bold mb-1">Provider:</p>
                <p className="whitespace-pre-line">{providerBlock}</p>
              </div>
              <div>
                <p className="font-bold mb-1">Usługodawca:</p>
                <p className="whitespace-pre-line">{providerBlock}</p>
              </div>

              <div>
                <p className="font-bold mb-1">Client:</p>
                <p>
                  {(data.signed?.name || name) || '_________________________________'}<br />
                  {data.signed?.pesel && <>PESEL: {data.signed.pesel}<br /></>}
                  {data.signed?.idNumber && <>ID no.: {data.signed.idNumber}<br /></>}
                  Date: {data.date}
                </p>
              </div>
              <div>
                <p className="font-bold mb-1">Klient:</p>
                <p>
                  {(data.signed?.name || name) || '_________________________________'}<br />
                  {data.signed?.pesel && <>PESEL: {data.signed.pesel}<br /></>}
                  {data.signed?.idNumber && <>Nr dokumentu: {data.signed.idNumber}<br /></>}
                  Data: {data.date}
                </p>
              </div>

              <div>
                <p className="font-bold mb-1">Service:</p>
                <p>{data.serviceName || 'Selected service'}</p>
                {data.totalPrice != null && <p className="mt-1">Fee: {Number(data.totalPrice).toLocaleString()} PLN</p>}
                {data.steps.length > 0 && (
                  <>
                    <p className="mt-2 font-bold">Included steps:</p>
                    <ol className="list-decimal pl-5 space-y-0.5">
                      {data.steps.map((s, i) => <li key={i}>{s}</li>)}
                    </ol>
                  </>
                )}
              </div>
              <div>
                <p className="font-bold mb-1">Usługa:</p>
                <p>{data.serviceName || 'Wybrana usługa'}</p>
                {data.totalPrice != null && <p className="mt-1">Wynagrodzenie: {Number(data.totalPrice).toLocaleString()} PLN</p>}
                {data.steps.length > 0 && (
                  <>
                    <p className="mt-2 font-bold">Etap w zakresie usługi:</p>
                    <ol className="list-decimal pl-5 space-y-0.5">
                      {data.steps.map((s, i) => <li key={i}>{s}</li>)}
                    </ol>
                  </>
                )}
              </div>

              {ARTICLES.map(a => (
                <div key={a.titleEn} className="contents">
                  <div>
                    <h3 className="font-bold uppercase tracking-wide text-xs pb-1 mb-2" style={{ borderBottom: '1px solid #1f2937' }}>{a.titleEn}</h3>
                    {a.en.split('\n\n').map((p, i) => <p key={i} className={i > 0 ? 'mt-2' : ''}>{p}</p>)}
                  </div>
                  <div>
                    <h3 className="font-bold uppercase tracking-wide text-xs pb-1 mb-2" style={{ borderBottom: '1px solid #1f2937' }}>{a.titlePl}</h3>
                    {a.pl.split('\n\n').map((p, i) => <p key={i} className={i > 0 ? 'mt-2' : ''}>{p}</p>)}
                  </div>
                </div>
              ))}
            </div>

            {/* Signature block */}
            <div className="mt-8 pt-6" style={{ borderTop: '1px solid #1f2937' }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 text-sm">
                <div>
                  <p className="font-bold mb-2">Client signature</p>
                  {data.signed?.signatureData ? (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={data.signed.signatureData} alt="Signature" className="h-16" />
                      <p className="mt-1">{data.signed.name}</p>
                      <p className="text-xs text-gray-500">{data.signed.signedAt ? new Date(data.signed.signedAt).toLocaleString() : ''}</p>
                    </>
                  ) : (
                    <p className="text-gray-400">Sign below using your mouse or finger</p>
                  )}
                </div>
                <div>
                  <p className="font-bold mb-2">Podpis Klienta</p>
                  <p className="text-gray-400">{data.signed ? 'Podpisano' : 'Złóż podpis poniżej'}</p>
                </div>
              </div>
            </div>
          </div>

          {signed ? (
            <div className="rounded-xl border border-green-200 bg-green-50 p-6 text-center">
              <p className="font-semibold text-green-700">Agreement signed</p>
              <p className="text-sm text-gray-600 mt-1">
                Thank you — your signed agreement has been sent to your Foreigners.pl team.
              </p>
              <p className="text-sm text-gray-500 mt-1">Dziękujemy — podpisana umowa została wysłana do zespołu Foreigners.pl.</p>
            </div>
          ) : (
            <div className="rounded-xl border border-gray-200 bg-white p-6 md:p-8 space-y-4">
              <h2 className="font-display text-xl font-semibold text-gray-900">Your details / Twoje dane</h2>
              {error && <p className="text-sm text-red-600">{error}</p>}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Full name / Imię i nazwisko *</label>
                  <input
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">PESEL (optional / opcjonalnie)</label>
                  <input
                    value={pesel}
                    onChange={e => setPesel(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">ID / passport no. / Nr dokumentu (optional)</label>
                  <input
                    value={idNumber}
                    onChange={e => setIdNumber(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Signature / Podpis *</label>
                <SignaturePad onChange={setSignature} />
              </div>

              <button
                onClick={submit}
                disabled={submitting}
                className="w-full rounded-xl bg-primary py-3.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {submitting ? 'Signing… / Podpisywanie…' : 'Sign agreement / Podpisz umowę'}
              </button>
              <p className="text-[11px] text-gray-400 text-center">
                By signing you confirm you have read and accept the terms above. / Podpisując potwierdzasz, że przeczytałeś i akceptujesz powyższe warunki.
              </p>
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
}
