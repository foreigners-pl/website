'use client';

import Container from '@/components/layout/Container';
import { FadeIn, GlassBlob } from '@/components/ui/animated';

const reviews = [
  {
    name: 'Mustapha Alao',
    date: '4 months ago',
    text: "My experience with your company is top-notch after been refused entry in Spain and thought I won't be able to get Schengen visa again, your company gave me the ...",
  },
  {
    name: 'Marina Marashdeh',
    date: '7 months ago',
    text: 'I have a very pleasant experience with Foreigners.pl. The customer service is excellent, and communication with the lawyers is outstanding. They are incredibly supportive, patient with inquiries, and always responsive. I highly recommend their services.',
  },
  {
    name: 'Ashique Abuz',
    date: '3 months ago',
    text: "Fantastic experience! The communication was seamless from start to finish, and they handled everything perfectly. It's rare to find a company this reliable-highly recommended!",
  },
  {
    name: 'Saurav',
    date: '1 year ago',
    text: 'Provides a truly exceptional experience. The speed of service is remarkable, ensuring a swift and efficient process. Transparency is clearly valued, making interactions straightforward and understandable. Their quality shines through in every aspect.',
  },
  {
    name: 'Abhay Patil',
    date: '10 months ago',
    text: 'Really recommend this consulting firm for Migration services as do provide professional and tailored services, especially Damian is proactive and quick reply to each a every concern 😊',
  },
  {
    name: 'DCStudioDev',
    date: '1 year ago',
    text: "very fast responses, helped me both with trc and driver's license conversion, didnt have to go to any other companies",
  },
  {
    name: 'Sam OS',
    date: '1 year ago',
    text: '',
  },
];

function getInitials(name: string): string {
  const words = name.trim().split(/\s+/);
  if (words.length === 1) return words[0].slice(0, 1).toUpperCase();
  return `${words[0][0]}${words[words.length - 1][0]}`.toUpperCase();
}

export default function GoogleReviewsSection() {
  return (
    <>
      {/* Decorative blobs */}
      <GlassBlob color="#fdeee7" size={480} top="6%" left="-8%" delay={0} duration={24} blur={40} opacity={0.35} />
      <GlassBlob color="#fce4d6" size={420} bottom="8%" right="-6%" delay={2} duration={28} blur={35} opacity={0.3} />

      <Container className="relative z-10">
        <FadeIn>
          <div className="mb-10 pt-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <h3 className="font-display text-2xl md:text-3xl font-semibold text-gray-900 mb-6">
                  Verified by <span className="text-primary italic">Google.</span>
                </h3>

                <div className="flex items-center gap-4">
                  <div>
                    <p className="font-display text-4xl text-gray-900 leading-none mb-2">Excellent</p>
                    <div className="flex text-amber-400 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-6 h-6 fill-current" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-gray-600">Based on <span className="font-semibold text-gray-900">7 reviews</span></p>
                  </div>
                  <p className="text-4xl tracking-wide" aria-label="Google wordmark">
                    <span className="text-[#4285F4]">G</span>
                    <span className="text-[#EA4335]">o</span>
                    <span className="text-[#FBBC05]">o</span>
                    <span className="text-[#4285F4]">g</span>
                    <span className="text-[#34A853]">l</span>
                    <span className="text-[#EA4335]">e</span>
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-start gap-4 lg:items-end">
                <a
                  href="https://www.google.com/search?sca_esv=8712aa7b0522de6e&sxsrf=ANbL-n4vqz9FwROWTbKKB_hFfhPRzM_qag:1781869379105&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOR6Gj5R2VSMrnaJ-20RtCSYqe3OdvUh6gLA1nb3zAn-SwQrJHFChX-626o5uKCYKJbybMcDBPNwqz-h8ntPh6YF-dZmB&q=Foreigners.pl+Reviews&sa=X&ved=2ahUKEwjxsILbnJOVAxUb87sIHXgHKosQ0bkNegQIMhAF&biw=1745&bih=828&dpr=1.1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#4285F4] px-8 py-4 text-base font-semibold text-white shadow-md transition-all hover:brightness-95 hover:shadow-lg"
                >
                  See on Google
                </a>
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="overflow-x-auto pb-4">
            <div className="flex min-w-max gap-5">
              {reviews.map((review) => (
                <a
                  key={`${review.name}-${review.date}`}
                  href="https://www.google.com/search?sca_esv=8712aa7b0522de6e&sxsrf=ANbL-n4vqz9FwROWTbKKB_hFfhPRzM_qag:1781869379105&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOR6Gj5R2VSMrnaJ-20RtCSYqe3OdvUh6gLA1nb3zAn-SwQrJHFChX-626o5uKCYKJbybMcDBPNwqz-h8ntPh6YF-dZmB&q=Foreigners.pl+Reviews&sa=X&ved=2ahUKEwjxsILbnJOVAxUb87sIHXgHKosQ0bkNegQIMhAF&biw=1745&bih=828&dpr=1.1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-[330px] rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer block no-underline"
                >
                  <div className="mb-4 flex items-start gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-base font-semibold text-primary">
                      {getInitials(review.name)}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 leading-tight">{review.name}</h3>
                      <p className="text-sm text-gray-500">{review.date}</p>
                    </div>
                  </div>

                  <div className="mb-4 flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>

                  {review.text ? (
                    <p className="text-base leading-relaxed text-gray-700">{review.text}</p>
                  ) : null}
                </a>
              ))}
            </div>
          </div>
        </FadeIn>
      </Container>
    </>
  );
}