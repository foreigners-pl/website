import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const mediaUrl = request.nextUrl.searchParams.get('url');

    if (!mediaUrl) {
      return NextResponse.json({ error: 'Missing url parameter' }, { status: 400 });
    }

    let parsed: URL;
    try {
      parsed = new URL(mediaUrl);
    } catch {
      return NextResponse.json({ error: 'Invalid image URL' }, { status: 400 });
    }

    // Safety guard: only proxy Instagram/Facebook CDN domains.
    const allowedHosts = ['cdninstagram.com', 'instagram.com', 'fbcdn.net'];
    const isAllowed = allowedHosts.some((host) => parsed.hostname.endsWith(host));
    if (!isAllowed) {
      return NextResponse.json({ error: 'Host not allowed' }, { status: 403 });
    }

    const upstream = await fetch(parsed.toString(), {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        Referer: 'https://www.instagram.com/',
        Accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
      },
      next: { revalidate: 3600 },
    });

    if (!upstream.ok) {
      return NextResponse.json({ error: 'Unable to fetch image' }, { status: 502 });
    }

    const contentType = upstream.headers.get('content-type') || 'image/jpeg';
    const buffer = await upstream.arrayBuffer();

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch {
    return NextResponse.json({ error: 'Failed to proxy image' }, { status: 500 });
  }
}
