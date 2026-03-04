import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';

// Get country from IP using Vercel's headers or free API
async function getGeoFromIP(ip: string): Promise<{ country?: string; city?: string }> {
  // Vercel provides geo headers automatically
  // If not available, we could use a free API, but for now return empty
  return {};
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Get IP and geo info from headers (Vercel provides these)
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 
               request.headers.get('x-real-ip') || 
               'unknown';
    
    // Vercel geo headers
    const country = request.headers.get('x-vercel-ip-country') || body.country;
    const city = request.headers.get('x-vercel-ip-city') || body.city;
    
    const {
      session_id,
      event_type,
      step_name,
      action,
      action_value,
      flow_path,
      answers,
      completed,
      exit_step,
      local_time,
      timezone,
      device_type,
      browser,
      os,
      screen_width,
      screen_height,
      referrer,
      utm_source,
      utm_medium,
      utm_campaign,
    } = body;

    // Validate required fields
    if (!session_id || !event_type) {
      return NextResponse.json(
        { error: 'Missing required fields: session_id, event_type' },
        { status: 400 }
      );
    }

    const supabaseAdmin = getSupabaseAdmin();

    const { error } = await supabaseAdmin
      .from('license_flow_analytics')
      .insert({
        session_id,
        event_type,
        step_name,
        action,
        action_value,
        flow_path,
        answers,
        completed,
        exit_step,
        local_time,
        timezone,
        device_type,
        browser,
        os,
        screen_width,
        screen_height,
        referrer,
        utm_source,
        utm_medium,
        utm_campaign,
        country,
        city,
      });

    if (error) {
      console.error('Analytics tracking error:', error);
      // Don't fail the request - analytics shouldn't break the UX
      return NextResponse.json({ success: false, error: error.message }, { status: 200 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Track flow error:', error);
    // Return success anyway - don't break UX for analytics
    return NextResponse.json({ success: false }, { status: 200 });
  }
}