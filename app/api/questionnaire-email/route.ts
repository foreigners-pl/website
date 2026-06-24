import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { readFileSync } from 'fs';
import { join } from 'path';

let RESEND_API_KEY_CACHED: string | undefined;

function getEnvValue(key: string): string | undefined {
  try {
    const envPath = join(process.cwd(), '.env.local');
    const envContent = readFileSync(envPath, 'utf-8');
    const match = envContent.match(new RegExp(`^${key}=(.+)$`, 'm'));
    return match?.[1]?.trim();
  } catch {
    return undefined;
  }
}

function getResendApiKey(): string | undefined {
  if (RESEND_API_KEY_CACHED) return RESEND_API_KEY_CACHED;
  RESEND_API_KEY_CACHED = getEnvValue('RESEND_API_KEY') || process.env.RESEND_API_KEY;
  return RESEND_API_KEY_CACHED;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, service, subservice, location, processStatus, timeline, comments } = body;

    const resendKey = getResendApiKey();
    if (!resendKey) {
      return NextResponse.json({ error: 'Email service not configured' }, { status: 500 });
    }

    const resend = new Resend(resendKey);

    const serviceLine = subservice && subservice !== 'Other'
      ? `${service} — ${subservice}`
      : service;

    const emailBody = `
      <h2>New Questionnaire Submission</h2>
      <p><strong>From:</strong> ${name || 'Not provided'} &lt;${email || 'No email'}&gt;</p>
      <p><strong>Service:</strong> ${serviceLine}</p>
      <p><strong>Location:</strong> ${location}</p>
      <p><strong>Status:</strong> ${processStatus}</p>
      <p><strong>Timeline:</strong> ${timeline}</p>
      ${comments ? `<p><strong>Comments:</strong> ${comments}</p>` : ''}
      <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;" />
      <p style="color: #666; font-size: 12px;"><strong>Tip:</strong> Just hit Reply — your response will go directly to ${email || 'the sender'}.</p>
    `;

    const result = await resend.emails.send({
      from: 'Website Questionnaire <noreply@foreigners.pl>',
      to: 'connect@foreigners.pl',
      replyTo: email || undefined,
      subject: `New Lead: ${name || 'Anonymous'} — ${serviceLine}`,
      html: emailBody,
    });

    return NextResponse.json({ success: true, id: result.data?.id });
  } catch (error) {
    console.error('Questionnaire email error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
