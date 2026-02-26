import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import { AdminNotificationEmail, ClientConfirmationEmail } from '@/lib/email/templates';
import crypto from 'crypto';

// Meta Graph API version
const META_API_VERSION = 'v19.0';

// Interface for Meta lead data structure
interface MetaLeadField {
  name: string;
  values: string[];
}

interface MetaLeadData {
  id: string;
  created_time: string;
  ad_id?: string;
  form_id?: string;
  campaign_id?: string;
  field_data: MetaLeadField[];
}

// Verify webhook signature from Meta (optional but recommended)
function verifySignature(payload: string, signature: string | null): boolean {
  const appSecret = process.env.META_APP_SECRET;
  
  if (!appSecret || !signature) {
    console.log('[META] Signature verification skipped - no app secret or signature');
    return true;
  }
  
  const expectedSignature = crypto
    .createHmac('sha256', appSecret)
    .update(payload)
    .digest('hex');
  
  const providedSignature = signature.replace('sha256=', '');
  
  return crypto.timingSafeEqual(
    Buffer.from(expectedSignature),
    Buffer.from(providedSignature)
  );
}

// Fetch full lead data from Meta Graph API
async function fetchLeadData(leadgenId: string): Promise<MetaLeadData | null> {
  const accessToken = process.env.META_PAGE_ACCESS_TOKEN;
  
  if (!accessToken) {
    console.error('[META] META_PAGE_ACCESS_TOKEN is not configured');
    return null;
  }
  
  try {
    const url = `https://graph.facebook.com/${META_API_VERSION}/${leadgenId}?access_token=${accessToken}&fields=id,created_time,ad_id,form_id,campaign_id,field_data`;
    console.log('[META] Fetching lead data from:', url.replace(accessToken, '[REDACTED]'));
    
    const response = await fetch(url);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('[META] Failed to fetch lead data:', response.status, errorText);
      return null;
    }
    
    const data = await response.json();
    console.log('[META] Lead data retrieved:', JSON.stringify(data, null, 2));
    return data;
  } catch (error) {
    console.error('[META] Error fetching lead data:', error);
    return null;
  }
}

// Parse field_data array into a simple object
function parseLeadFields(fieldData: MetaLeadField[]): Record<string, string> {
  const fields: Record<string, string> = {};
  
  for (const field of fieldData) {
    fields[field.name.toLowerCase()] = field.values[0] || '';
  }
  
  return fields;
}

// Send email notifications
async function sendEmailNotifications(leadData: {
  full_name: string;
  email: string;
  phone: string;
  phone_country_code?: string;
  description: string;
  source: string;
  meta_lead_id: string;
  meta_ad_id?: string;
  created_time: string;
}) {
  const resendKey = process.env.RESEND_API_KEY;
  const adminEmailEnv = process.env.BUSINESS_EMAIL;
  
  // Support multiple emails separated by comma
  const adminEmails = adminEmailEnv 
    ? adminEmailEnv.split(',').map(email => email.trim()).filter(Boolean)
    : [];
  
  console.log('[META] Sending emails - Admin to:', adminEmails, '| Client to:', leadData.email);
  
  if (!resendKey) {
    console.log('[META] RESEND_API_KEY not configured - skipping');
    return { success: false, reason: 'RESEND_API_KEY not configured' };
  }
  
  const resend = new Resend(resendKey);
  
  try {
    if (adminEmails.length > 0) {
      const adminResult = await resend.emails.send({
        from: 'Instagram Leads <noreply@foreigners.pl>',
        to: adminEmails,
        subject: `[Instagram] New Lead: ${leadData.full_name}`,
        html: AdminNotificationEmail({
          fullName: leadData.full_name,
          email: leadData.email,
          phone: leadData.phone,
          phoneCountryCode: leadData.phone_country_code,
          description: leadData.description,
          source: leadData.source,
          tracking: {
            utm_source: 'instagram',
            utm_medium: 'lead_ads',
            utm_campaign: leadData.meta_ad_id || undefined,
          },
          submittedAt: leadData.created_time,
        }),
      });
      console.log('[META] Admin email result:', adminResult);
    }
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (leadData.email) {
      const clientResult = await resend.emails.send({
        from: 'Foreigners <noreply@foreigners.pl>',
        to: leadData.email,
        subject: 'Thank you for contacting us!',
        html: ClientConfirmationEmail({
          fullName: leadData.full_name,
          source: leadData.source,
        }),
      });
      console.log('[META] Client email result:', clientResult);
    }
    
    return { success: true };
  } catch (error) {
    console.error('[META] Error sending emails:', error);
    return { success: false, error };
  }
}

// Send lead data to CRM
async function sendToCRM(leadData: {
  full_name: string;
  email: string;
  phone: string;
  phone_country_code?: string;
  description: string;
  source: string;
  meta_lead_id: string;
  meta_ad_id?: string;
}) {
  const crmUrl = process.env.CRM_WEBHOOK_URL || 'https://crm.foreigners.pl/api/webhooks/leads';
  const crmSecret = process.env.CRM_WEBHOOK_SECRET;
  
  if (!crmSecret) {
    console.log('[META] CRM webhook secret not configured, skipping');
    return { success: false, reason: 'CRM not configured' };
  }
  
  try {
    console.log('[META] Sending lead to CRM...');
    
    const response = await fetch(crmUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${crmSecret}`,
      },
      body: JSON.stringify({
        full_name: leadData.full_name,
        email: leadData.email,
        phone_country_code: leadData.phone_country_code || '',
        phone: leadData.phone,
        description: leadData.description,
        source: leadData.source,
        privacy_accepted: true,
        tracking: {
          utm_source: 'instagram',
          utm_medium: 'lead_ads',
          meta_lead_id: leadData.meta_lead_id,
          meta_ad_id: leadData.meta_ad_id || '',
        }
      }),
    });
    
    const responseText = await response.text();
    console.log('[META] CRM Response:', response.status, responseText);
    
    if (!response.ok) {
      throw new Error(`CRM error: ${response.status} - ${responseText}`);
    }
    
    return { success: true, result: responseText };
  } catch (error) {
    console.error('[META] CRM sync failed:', error);
    return { success: false, error };
  }
}

// Save lead to database
async function saveToDatabase(leadData: {
  full_name: string;
  email: string;
  phone: string;
  phone_country_code?: string;
  description: string;
  source: string;
  meta_lead_id: string;
  meta_ad_id?: string;
  meta_form_id?: string;
  created_time: string;
}) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!supabaseUrl || !supabaseKey) {
    console.log('[META] Supabase not configured - skipping');
    return { success: false, reason: 'Supabase not configured' };
  }
  
  try {
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    const { data, error } = await supabase
      .from('lead_submissions')
      .insert({
        full_name: leadData.full_name,
        email: leadData.email,
        phone: leadData.phone,
        phone_country_code: leadData.phone_country_code || null,
        description: leadData.description,
        source: leadData.source,
        privacy_accepted: true,
        utm_source: 'instagram',
        utm_medium: 'lead_ads',
        utm_campaign: leadData.meta_ad_id || null,
        referrer: `meta_lead_id:${leadData.meta_lead_id}`,
      })
      .select()
      .single();
    
    if (error) {
      console.error('[META] Database error:', error);
      return { success: false, error };
    }
    
    console.log('[META] Lead saved to database, ID:', data.id);
    return { success: true, data };
  } catch (error) {
    console.error('[META] Database error:', error);
    return { success: false, error };
  }
}

// Process a single lead from webhook
async function processLead(leadgenId: string, pageId: string, formId: string, adId?: string) {
  console.log('[META] Processing lead:', { leadgenId, pageId, formId, adId });
  
  const leadData = await fetchLeadData(leadgenId);
  
  if (!leadData) {
    console.error('[META] Failed to fetch lead data for:', leadgenId);
    return { success: false, reason: 'Failed to fetch lead data' };
  }
  
  const fields = parseLeadFields(leadData.field_data);
  console.log('[META] Parsed fields:', fields);
  
  // Build full name from available fields
  let fullName = fields.full_name || fields.name || '';
  if (!fullName && (fields.first_name || fields.last_name)) {
    fullName = `${fields.first_name || ''} ${fields.last_name || ''}`.trim();
  }
  if (!fullName) fullName = 'Unknown';
  
  // Build description from remaining fields
  const knownFields = ['full_name', 'name', 'first_name', 'last_name', 'email', 'phone_number', 'phone', 'phone_country_code'];
  const extraFields = Object.entries(fields)
    .filter(([key]) => !knownFields.includes(key))
    .map(([key, value]) => `${key}: ${value}`)
    .join('\n');
  
  const processedLead = {
    full_name: fullName,
    email: fields.email || '',
    phone: fields.phone_number || fields.phone || '',
    phone_country_code: fields.phone_country_code || '',
    description: fields.message || fields.description || extraFields || 'Lead from Instagram ad',
    source: 'instagram-lead-ad',
    meta_lead_id: leadgenId,
    meta_ad_id: leadData.ad_id || adId,
    meta_form_id: leadData.form_id || formId,
    created_time: leadData.created_time,
  };
  
  console.log('[META] Processed lead:', processedLead);
  
  const [dbResult, emailResult, crmResult] = await Promise.all([
    saveToDatabase(processedLead),
    sendEmailNotifications(processedLead),
    sendToCRM(processedLead),
  ]);
  
  console.log('[META] Processing results:', { dbResult, emailResult, crmResult });
  
  return {
    success: true,
    results: { database: dbResult, email: emailResult, crm: crmResult }
  };
}

// GET handler - Webhook verification from Meta
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');
  
  console.log('[META] Webhook verification request:', { mode, token: token ? '[REDACTED]' : null, challenge });
  
  const verifyToken = process.env.META_VERIFY_TOKEN;
  
  if (!verifyToken) {
    console.error('[META] META_VERIFY_TOKEN is not configured');
    return new NextResponse('Server configuration error', { status: 500 });
  }
  
  if (mode === 'subscribe' && token === verifyToken) {
    console.log('[META] Webhook verified successfully!');
    return new NextResponse(challenge, { status: 200 });
  }
  
  console.error('[META] Webhook verification failed - invalid token');
  return new NextResponse('Verification failed', { status: 403 });
}

// POST handler - Receive lead data from Meta
export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();
    console.log('[META] Received webhook payload:', rawBody);
    
    const signature = request.headers.get('x-hub-signature-256');
    if (!verifySignature(rawBody, signature)) {
      console.error('[META] Invalid webhook signature');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }
    
    const body = JSON.parse(rawBody);
    
    if (body.object !== 'page') {
      console.log('[META] Ignoring non-page webhook:', body.object);
      return NextResponse.json({ received: true });
    }
    
    const results = [];
    
    for (const entry of body.entry || []) {
      const pageId = entry.id;
      
      for (const change of entry.changes || []) {
        if (change.field === 'leadgen') {
          const leadValue = change.value;
          
          const result = await processLead(
            leadValue.leadgen_id,
            leadValue.page_id || pageId,
            leadValue.form_id,
            leadValue.ad_id
          );
          
          results.push(result);
        }
      }
    }
    
    console.log('[META] Webhook processing complete:', results);
    
    return NextResponse.json({ 
      received: true, 
      processed: results.length,
      results 
    });
    
  } catch (error) {
    console.error('[META] Webhook error:', error);
    return NextResponse.json({ received: true, error: 'Processing error' });
  }
}
