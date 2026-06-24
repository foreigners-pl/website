import { NextRequest, NextResponse } from 'next/server';

const USERNAME = 'foreigners.pl';
const PROFILE_URL = `https://www.instagram.com/${USERNAME}/`;

type InstagramPost = {
  id: string;
  permalink: string;
  caption: string;
  mediaUrl: string;
};

function normalizeCaption(caption?: string): string {
  if (!caption) return 'Latest update from our Instagram.';
  return caption.replace(/\s+/g, ' ').trim();
}

function fromApiResponse(data: any[]): InstagramPost[] {
  return data
    .filter((item) => item.media_type === 'IMAGE' || item.media_type === 'CAROUSEL_ALBUM')
    .map((item) => ({
      id: String(item.id),
      permalink: String(item.permalink || ''),
      caption: normalizeCaption(item.caption),
      mediaUrl: String(item.media_url || ''),
    }))
    .slice(0, 8);
}

const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';

export async function GET(request: NextRequest) {
  try {
    // Strategy 1: Try the official Instagram Basic Display API if token exists
    const token = process.env.INSTAGRAM_TOKEN;
    if (token) {
      try {
        const apiUrl = `https://graph.instagram.com/me/media?fields=id,caption,media_url,permalink,media_type&access_token=${encodeURIComponent(token)}`;
        const response = await fetch(apiUrl, { next: { revalidate: 3600 } });
        if (response.ok) {
          const data = await response.json();
          const posts = fromApiResponse(data.data || []);
          if (posts.length > 0) return NextResponse.json({ posts });
        }
      } catch {
        // fall through to scraping
      }
    }

    // Strategy 2: Scrape via __a=1 endpoint (sometimes works from cloud IPs)
    const scrapeUrl = `https://www.instagram.com/${encodeURIComponent(USERNAME)}/?__a=1&__d=1`;
    const scrapeRes = await fetch(scrapeUrl, {
      headers: {
        'User-Agent': USER_AGENT,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'Referer': 'https://www.instagram.com/',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'same-origin',
        'Upgrade-Insecure-Requests': '1',
        'Cache-Control': 'max-age=0',
      },
      next: { revalidate: 1800 },
    });

    if (scrapeRes.ok) {
      try {
        const payload = await scrapeRes.json();
        const mediaItems = payload?.graphql?.user?.edge_owner_to_timeline_media?.edges || [];
        if (Array.isArray(mediaItems) && mediaItems.length > 0) {
          const posts = mediaItems
            .map((edge: any) => {
              const node = edge?.node;
              if (!node?.id || !node?.display_url || !node?.shortcode) return null;
              return {
                id: String(node.id),
                permalink: `https://www.instagram.com/p/${node.shortcode}/`,
                caption: normalizeCaption(node?.edge_media_to_caption?.edges?.[0]?.node?.text),
                mediaUrl: String(node.display_url),
              };
            })
            .filter(Boolean)
            .slice(0, 8) as InstagramPost[];
          if (posts.length > 0) return NextResponse.json({ posts });
        }
      } catch {
        // fall through
      }
    }

    // Strategy 3: Parse profile HTML as final fallback
    const htmlRes = await fetch(PROFILE_URL, {
      headers: {
        'User-Agent': USER_AGENT,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Referer': 'https://www.google.com/',
      },
      next: { revalidate: 1800 },
    });

    if (htmlRes.ok) {
      const html = await htmlRes.text();
      const match = html.match(/"edge_owner_to_timeline_media"\s*:\s*\{[\s\S]*?"edges"\s*:\s*(\[[\s\S]*?\])\s*\}/);
      if (match?.[1]) {
        try {
          const edges = JSON.parse(match[1]);
          if (Array.isArray(edges) && edges.length > 0) {
            const posts = edges
              .map((edge: any) => {
                const node = edge?.node;
                if (!node?.id || !node?.display_url || !node?.shortcode) return null;
                return {
                  id: String(node.id),
                  permalink: `https://www.instagram.com/p/${node.shortcode}/`,
                  caption: normalizeCaption(node?.edge_media_to_caption?.edges?.[0]?.node?.text),
                  mediaUrl: String(node.display_url),
                };
              })
              .filter(Boolean)
              .slice(0, 8) as InstagramPost[];
            if (posts.length > 0) return NextResponse.json({ posts });
          }
        } catch {
          // fall through
        }
      }
    }

    return NextResponse.json({ posts: [], error: 'Unable to fetch Instagram posts' }, { status: 200 });
  } catch (error) {
    console.error('Instagram posts fetch error:', error);
    return NextResponse.json({ posts: [] }, { status: 200 });
  }
}
