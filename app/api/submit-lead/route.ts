import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import type { TrackingData } from '@/lib/utils/tracking';
import { readFileSync } from 'fs';
import { join } from 'path';
import { Resend } from 'resend';
import { AdminNotificationEmail, ClientConfirmationEmail } from '@/lib/email/templates';

// Workaround for Turbopack not loading non-NEXT_PUBLIC_ env vars
// Read .env.local directly
let SUPABASE_SERVICE_ROLE_KEY_CACHED: string | undefined;
let RESEND_API_KEY_CACHED: string | undefined;
let BUSINESS_EMAIL_CACHED: string | undefined;

function getEnvValue(key: string): string | undefined {
  // In production (Vercel), always use process.env
  if (process.env.NODE_ENV === 'production') {
    const envValue = process.env[key];
    // Optionally log only if undefined
    if (envValue === undefined) {
      console.warn(`[ENV] ${key} is undefined in process.env (production)`);
    }
    return envValue;
  }
  // In development, try to read from .env.local for non-NEXT_PUBLIC_ variables
  try {
    const envPath = join(process.cwd(), '.env.local');
    const envContent = readFileSync(envPath, 'utf8');
    const lines = envContent.split(/\r?\n/);
    const keyLine = lines.find(line => {
      const trimmed = line.trim();
      return trimmed.startsWith(`${key}=`);
    });
    if (keyLine) {
      const value = keyLine.substring(keyLine.indexOf('=') + 1).trim();
      console.log(`[ENV] ${key} from file:`, value);
      return value;
    }
  } catch (error) {
    console.error(`Failed to read ${key} from .env.local:`, error);
  }
  // Fallback to process.env in development
  const envValue = process.env[key];
  if (envValue === undefined) {
    console.warn(`[ENV] ${key} is undefined in process.env (development)`);
  }
  return envValue;
}

function getServiceRoleKey(): string | undefined {
  if (SUPABASE_SERVICE_ROLE_KEY_CACHED) {
    return SUPABASE_SERVICE_ROLE_KEY_CACHED;
  }
  SUPABASE_SERVICE_ROLE_KEY_CACHED = getEnvValue('SUPABASE_SERVICE_ROLE_KEY');
  return SUPABASE_SERVICE_ROLE_KEY_CACHED;
}

function getResendApiKey(): string | undefined {
  if (RESEND_API_KEY_CACHED) {
    return RESEND_API_KEY_CACHED;
  }
  RESEND_API_KEY_CACHED = getEnvValue('RESEND_API_KEY');
  return RESEND_API_KEY_CACHED;
}

function getBusinessEmail(): string | undefined {
  if (BUSINESS_EMAIL_CACHED) {
    return BUSINESS_EMAIL_CACHED;
  }
  BUSINESS_EMAIL_CACHED = getEnvValue('BUSINESS_EMAIL');
  return BUSINESS_EMAIL_CACHED;
}

// Interface for form submission data
interface LeadSubmission {
  // Contact Information
  full_name: string;
  email: string;
  phone: string;
  contact_method?: string;
  description: string;
  source: string;
  privacy_accepted: boolean;
  
  // Tracking data (optional)
  tracking?: TrackingData;
}

// Get IP address from request
function getClientIP(request: NextRequest): string {
  // Try various headers where IP might be stored
  const forwarded = request.headers.get('x-forwarded-for');
  const real = request.headers.get('x-real-ip');
  const cfConnecting = request.headers.get('cf-connecting-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  if (real) {
    return real;
  }
  if (cfConnecting) {
    return cfConnecting;
  }
  
  return '';
}

// Get geolocation data from IP using ipapi.co (free tier)
async function getGeolocation(ip: string) {
  if (!ip || ip === '127.0.0.1' || ip === '::1' || ip.startsWith('192.168.')) {
    return {
      country_code: null,
      country_name: null,
      city: null,
      region: null,
    };
  }
  
  try {
    const response = await fetch(`https://ipapi.co/${ip}/json/`, {
      headers: { 'User-Agent': 'foreigners-website' },
    });
    
    if (!response.ok) {
      console.error('Geolocation API error:', response.status);
      return {
        country_code: null,
        country_name: null,
        city: null,
        region: null,
      };
    }
    
    const data = await response.json();
    
    return {
      country_code: data.country_code || null,
      country_name: data.country_name || null,
      city: data.city || null,
      region: data.region || null,
    };
  } catch (error) {
    console.error('Error fetching geolocation:', error);
    return {
      country_code: null,
      country_name: null,
      city: null,
      region: null,
    };
  }
}

// Send email notifications
async function sendEmailNotifications(
  leadData: any,
  ipAddress: string,
  geoData: any
) {
  const resendKey = getResendApiKey();
  // Read fresh every time to avoid caching issues
  const adminEmail = getEnvValue('BUSINESS_EMAIL');
  
  console.log('📧 Sending emails - Admin to:', adminEmail, '| Client to:', leadData.email);
  
  if (!resendKey) {
    console.log('⚠️ RESEND_API_KEY not configured - skipping email notifications');
    return { success: false, reason: 'RESEND_API_KEY not configured' };
  }
  
  const resend = new Resend(resendKey);
  
  if (!adminEmail) {
    console.warn('⚠️ BUSINESS_EMAIL not configured - skipping admin notification');
  }
  
  try {
    // Send admin notification email first
    if (adminEmail) {
      try {
        const adminResult = await resend.emails.send({
          from: 'Website Leads <onboarding@resend.dev>',
          to: adminEmail,
          subject: `New Lead: ${leadData.full_name}`,
          html: AdminNotificationEmail({
            fullName: leadData.full_name,
            email: leadData.email,
            phone: leadData.phone,
            phoneCountryCode: leadData.phone_country_code,
            description: leadData.description,
            source: leadData.source,
            tracking: {
              referrer: leadData.referrer,
              utm_source: leadData.utm_source,
              utm_medium: leadData.utm_medium,
              utm_campaign: leadData.utm_campaign,
              device_type: leadData.device_type,
              browser_name: leadData.browser_name,
            },
            ipAddress: ipAddress,
            location: {
              city: geoData.city,
              region: geoData.region,
              country_name: geoData.country_name,
            },
            submittedAt: new Date().toISOString(),
          }),
        });
        console.log('✅ Admin email result:', adminResult);
      } catch (adminError) {
        console.error('❌ Admin email error:', adminError);
      }
    }
    
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Send client confirmation email
    try {
      const clientResult = await resend.emails.send({
        from: 'Foreigners <onboarding@resend.dev>',
        to: leadData.email,
        subject: 'Thank you for contacting us!',
        html: ClientConfirmationEmail({
          fullName: leadData.full_name,
          source: leadData.source,
        }),
      });
      console.log('✅ Client email result:', clientResult);
    } catch (clientError) {
      console.error('❌ Client email error:', clientError);
    }
    
    return { success: true };
  } catch (error) {
    console.error('❌ Error sending emails:', error);
    return { success: false, error };
  }
}

// Function to send lead data to CRM
async function sendToCRM(leadData: any) {
  const crmUrl = process.env.CRM_WEBHOOK_URL || 'https://crm.foreigners.pl/api/webhooks/leads';
  const crmSecret = process.env.CRM_WEBHOOK_SECRET;

  if (!crmSecret) {
    console.log('⚠️ CRM webhook secret not configured, skipping');
    return;
  }

  try {
    console.log('📤 Sending lead to CRM...');
    
    const response = await fetch(crmUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${crmSecret}`,
      },
      body: JSON.stringify({
        full_name: leadData.full_name,
        email: leadData.email,
        phone_country_code: leadData.phone_country_code,
        phone: leadData.phone,
        description: leadData.description,
        source: leadData.source,
        privacy_accepted: leadData.privacy_accepted,
        tracking: {
          ip: leadData.ip,
          city: leadData.city,
          country: leadData.country_name,
          userAgent: leadData.user_agent,
          referrer: leadData.referrer,
          utm_campaign: leadData.utm_campaign,
          utm_source: leadData.utm_source,
          utm_medium: leadData.utm_medium,
        }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`CRM webhook error: ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    console.log('✅ CRM sync successful:', result);
    return { success: true, result };
    
  } catch (error) {
    console.error('❌ CRM sync failed:', error);
    // Don't throw - we don't want to fail the form submission
    return { success: false, error };
  }
}

// Interface for form submission data
interface LeadSubmission {
  // Contact Information
  full_name: string;
  email: string;
  phone: string;
  phone_country_code?: string;
  contact_method?: string;
  description: string;
  source: string;
  privacy_accepted: boolean;
  
  // Tracking data (optional)
  tracking?: TrackingData;
}

export async function POST(request: NextRequest) {
  try {
    const body: LeadSubmission = await request.json();
    
    console.log('Received form submission:', body);
    
    // Validate required fields
    if (!body.full_name || !body.email || !body.phone || !body.description || !body.source || body.privacy_accepted !== true) {
      console.log('Validation failed:', {
        full_name: !!body.full_name,
        email: !!body.email,
        phone: !!body.phone,
        description: !!body.description,
        source: !!body.source,
        privacy_accepted: body.privacy_accepted
      });
      return NextResponse.json(
        { error: 'Missing required fields: name, email, phone, description, and privacy acceptance are required' },
        { status: 400 }
      );
    }
    
    // Get IP address
    const ip_address = getClientIP(request);
    
    // Get geolocation data
    const geoData = await getGeolocation(ip_address);
    
    // Prepare data for database
    const leadData = {
      // Contact Information
      full_name: body.full_name,
      email: body.email,
      phone: body.phone,
      phone_country_code: body.phone_country_code || '+48',
      contact_method: body.contact_method,
      source: body.source,
      privacy_accepted: body.privacy_accepted,
      
      // IP & Geolocation
      ip_address: ip_address || null,
      ...geoData,
      
      // Tracking Data (from client)
      cookies_accepted: body.tracking?.cookies_accepted || false,
      browser_name: body.tracking?.browser_name || null,
      browser_version: body.tracking?.browser_version || null,
      device_type: body.tracking?.device_type || null,
      device_vendor: body.tracking?.device_vendor || null,
      device_model: body.tracking?.device_model || null,
      os_name: body.tracking?.os_name || null,
      os_version: body.tracking?.os_version || null,
      referrer: body.tracking?.referrer || null,
      referrer_domain: body.tracking?.referrer_domain || null,
      utm_source: body.tracking?.utm_source || null,
      utm_medium: body.tracking?.utm_medium || null,
      utm_campaign: body.tracking?.utm_campaign || null,
      utm_term: body.tracking?.utm_term || null,
      utm_content: body.tracking?.utm_content || null,
      landing_page: body.tracking?.landing_page || null,
      current_page: body.tracking?.current_page || null,
      session_duration: body.tracking?.session_duration || null,
      pages_viewed: body.tracking?.pages_viewed || null,
      is_returning_visitor: body.tracking?.is_returning_visitor || false,
      screen_resolution: body.tracking?.screen_resolution || null,
      language: body.tracking?.language || null,
      user_agent: body.tracking?.user_agent || null,
      user_local_time: body.tracking?.user_local_time || null,
      user_timezone: body.tracking?.user_timezone || null,
    };
    
    console.log('Inserting data into Supabase:', leadData);
    
    // Create admin client (bypasses RLS)
    // Service key comes from environment variable (set in Vercel dashboard for production)
    const serviceKey = getServiceRoleKey();
    
    if (!serviceKey) {
      console.error('SUPABASE_SERVICE_ROLE_KEY not configured');
      console.error('Tried process.env and .env.local file');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }
    
    console.log('Service key loaded successfully');
    console.log('Service key length:', serviceKey.length);
    console.log('Service key preview:', serviceKey.substring(0, 20) + '...');
    
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      serviceKey,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );
    
    const { data, error } = await supabaseAdmin
      .from('lead_submissions')
      .insert([leadData])
      .select();
    
    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to submit form', details: error.message },
        { status: 500 }
      );
    }
    
    console.log('Successfully inserted:', data);
    
    // Send email notifications (non-blocking - don't fail submission if emails fail)
    sendEmailNotifications(leadData, ip_address, geoData).catch(error => {
      console.error('Email notification error (non-critical):', error);
    });

    // Send to CRM (non-blocking - don't fail submission if CRM is down)
    sendToCRM(leadData).catch(error => {
      console.error('CRM sync error (non-critical):', error);
    });
    
    return NextResponse.json(
      { success: true, data },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
