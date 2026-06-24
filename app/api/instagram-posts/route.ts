import { NextResponse } from 'next/server';

const USERNAME = 'foreigners.pl';
const PROFILE_URL = `https://www.instagram.com/${USERNAME}/`;

type InstagramPost = {
  id: string;
  permalink: string;
  caption: string;
  mediaUrl: string;
  likeCount?: number;
  commentCount?: number;
};

function toPermalink(shortcode: string): string {
  return `https://www.instagram.com/p/${shortcode}/`;
}

function normalizeCaption(caption?: string): string {
  if (!caption) return 'Latest update from our Instagram.';
  return caption.replace(/\s+/g, ' ').trim();
}

function fromWebProfileInfo(payload: any): InstagramPost[] {
  const edges = payload?.data?.user?.edge_owner_to_timeline_media?.edges;
  if (!Array.isArray(edges)) return [];

  return edges
    .map((edge: any) => {
      const node = edge?.node;
      const captionNode = node?.edge_media_to_caption?.edges?.[0]?.node?.text;
      const mediaUrl = node?.display_url || node?.thumbnail_src;
      const shortcode = node?.shortcode;
      const likeCount = node?.edge_media_preview_like?.count;
      const commentCount = node?.edge_media_to_comment?.count;

      if (!node?.id || !mediaUrl || !shortcode) return null;

      return {
        id: String(node.id),
        permalink: toPermalink(shortcode),
        caption: normalizeCaption(captionNode),
        mediaUrl: String(mediaUrl),
        likeCount: typeof likeCount === 'number' ? likeCount : undefined,
        commentCount: typeof commentCount === 'number' ? commentCount : undefined,
      } satisfies InstagramPost;
    })
    .filter(Boolean)
    .slice(0, 8) as InstagramPost[];
}

function fromEmbeddedJson(html: string): InstagramPost[] {
  const match = html.match(/"edge_owner_to_timeline_media"\s*:\s*\{[\s\S]*?"page_info"\s*:\s*\{[\s\S]*?\}\s*\}/);
  if (!match?.[0]) return [];

  try {
    const mediaObject = JSON.parse(`{${match[0]}}`).edge_owner_to_timeline_media;
    const edges = mediaObject?.edges;
    if (!Array.isArray(edges)) return [];

    return edges
      .map((edge: any) => {
        const node = edge?.node;
        const captionNode = node?.edge_media_to_caption?.edges?.[0]?.node?.text;
        const mediaUrl = node?.display_url || node?.thumbnail_src;
        const shortcode = node?.shortcode;
        const likeCount = node?.edge_media_preview_like?.count;
        const commentCount = node?.edge_media_to_comment?.count;

        if (!node?.id || !mediaUrl || !shortcode) return null;

        return {
          id: String(node.id),
          permalink: toPermalink(shortcode),
          caption: normalizeCaption(captionNode),
          mediaUrl: String(mediaUrl),
          likeCount: typeof likeCount === 'number' ? likeCount : undefined,
          commentCount: typeof commentCount === 'number' ? commentCount : undefined,
        } satisfies InstagramPost;
      })
      .filter(Boolean)
      .slice(0, 8) as InstagramPost[];
  } catch {
    return [];
  }
}

export async function GET() {
  try {
    // Primary source: Instagram web profile info endpoint.
    const webInfoResponse = await fetch(
      `https://www.instagram.com/api/v1/users/web_profile_info/?username=${encodeURIComponent(USERNAME)}`,
      {
        headers: {
          'x-ig-app-id': '936619743392459',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
          Accept: 'application/json',
          Referer: PROFILE_URL,
        },
        next: { revalidate: 3600 },
      }
    );

    if (webInfoResponse.ok) {
      const payload = await webInfoResponse.json();
      const posts = fromWebProfileInfo(payload);
      if (posts.length > 0) {
        return NextResponse.json({ posts });
      }
    }

    // Fallback: parse profile HTML if endpoint is blocked.
    const profileResponse = await fetch(PROFILE_URL, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        Accept: 'text/html',
      },
      next: { revalidate: 3600 },
    });

    if (!profileResponse.ok) {
      return NextResponse.json({ posts: [], error: 'Unable to fetch Instagram profile' }, { status: 200 });
    }

    const html = await profileResponse.text();
    const posts = fromEmbeddedJson(html);

    return NextResponse.json({ posts });
  } catch (error) {
    console.error('Instagram posts fetch error:', error);
    return NextResponse.json({ posts: [] }, { status: 200 });
  }
}
