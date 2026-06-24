'use client';

import { useEffect, useState } from 'react';
import Section from '@/components/layout/Section';
import Container from '@/components/layout/Container';
import { FadeIn, GlassBlob } from '@/components/ui/animated';

type InstagramPost = {
  id: string;
  caption: string;
  mediaUrl: string;
  postUrl: string;
};

function toCardTitle(caption: string): string {
  const withoutHashtags = caption.split('#')[0].trim();
  const short = withoutHashtags.slice(0, 90).trim();
  if (!short) return 'Latest update from our Instagram.';
  return short.length < withoutHashtags.length ? `${short}...` : short;
}

export default function InstagramSection() {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const visiblePosts = posts.slice(0, 6);

  useEffect(() => {
    let isMounted = true;

    const loadPosts = async () => {
      try {
        const response = await fetch('/api/instagram-posts');
        if (!response.ok) return;

        const data = await response.json();
        if (isMounted && Array.isArray(data?.posts) && data.posts.length > 0) {
          setPosts(
            data.posts.map((post: any) => ({
              id: String(post.id),
              caption: String(post.caption || ''),
              mediaUrl: String(post.mediaUrl || ''),
              postUrl: String(post.permalink || 'https://www.instagram.com/foreigners.pl/'),
            }))
          );
        }
      } catch {
        // Silent fallback to empty state.
      }
    };

    loadPosts();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      {/* Decorative blobs */}
      <GlassBlob color="#fdeee7" size={420} top="0%" left="-6%" delay={0} duration={24} blur={32} opacity={0.25} />
      <GlassBlob color="#fce4d6" size={380} bottom="5%" right="-8%" delay={2} duration={28} blur={30} opacity={0.2} />

      <Container className="relative z-10 pt-16">
        <FadeIn>
          <div className="mb-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <h3 className="font-display text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
                  From our <span className="text-primary italic">Instagram.</span>
                </h3>
                <p className="text-body-large text-gray-600 max-w-2xl">
                  Tips, news, and real stories from foreigners building their lives in Poland.
                </p>
              </div>

              <div className="flex flex-col items-start gap-4 lg:items-end">
                <a
                  href="https://www.instagram.com/foreigners.pl/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-6 py-3 text-base font-semibold text-gray-800 shadow-sm transition-all hover:shadow-md"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37a4 4 0 1 1-7.75 1.27 4 4 0 0 1 7.75-1.27z" />
                    <line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
                  </svg>
                  @foreigners.pl
                </a>
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          {visiblePosts.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {visiblePosts.map((post) => {
                // Use a server-side proxy because Instagram CDN often blocks direct hotlinking.
                const proxiedImageSrc = `/api/instagram-image?url=${encodeURIComponent(post.mediaUrl)}`;

                return (
                <a
                  key={post.id}
                  href={post.postUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative rounded-2xl aspect-[4/5] overflow-hidden text-white shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <img
                    src={proxiedImageSrc}
                    alt={toCardTitle(post.caption)}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-black/5" />

                  <div className="flex h-full flex-col justify-between p-5">
                    <div className="relative z-10 text-xs font-semibold uppercase tracking-[0.16em] text-white/85">Instagram</div>

                    <div className="relative z-10 -mx-5 -mb-5 mt-6 bg-black/55 px-5 py-4 backdrop-blur-[1px]">
                      <h3 className="font-display leading-tight font-semibold text-[20px] sm:text-[24px] lg:text-[26px] text-left">
                        <span
                          style={{
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                          }}
                        >
                          {toCardTitle(post.caption)}
                        </span>
                      </h3>
                    </div>
                  </div>
                </a>
                );
              })}
            </div>
          ) : (
            <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center">
              <p className="text-body-large text-gray-700 mb-4">
                Latest Instagram posts are loading or temporarily unavailable.
              </p>
              <a
                href="https://www.instagram.com/foreigners.pl/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full border border-gray-200 bg-white px-5 py-2 text-sm font-semibold text-gray-800 shadow-sm transition-all hover:shadow-md"
              >
                Open @foreigners.pl on Instagram
              </a>
            </div>
          )}
        </FadeIn>
      </Container>
    </>
  );
}
