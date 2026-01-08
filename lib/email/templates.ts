import { TrackingData } from '@/lib/utils/tracking';

interface AdminEmailProps {
  fullName: string;
  email: string;
  phone: string;
  phoneCountryCode?: string;
  description: string;
  source: string;
  tracking?: TrackingData;
  ipAddress?: string;
  location?: {
    city: string | null;
    region: string | null;
    country_name: string | null;
  };
  submittedAt: string;
}

export function AdminNotificationEmail({
  fullName,
  email,
  phone,
  phoneCountryCode,
  description,
  source,
  tracking,
  ipAddress,
  location,
  submittedAt,
}: AdminEmailProps) {
  const fullPhone = phoneCountryCode ? `${phoneCountryCode} ${phone}` : phone;
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Lead Submission</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  
  <div style="background: linear-gradient(135deg, #d42010 0%, #AB1604 50%, #8a1203 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
    <h1 style="color: white; margin: 0; font-size: 24px;">New Lead Submission</h1>
  </div>
  
  <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
    
    <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
      <h2 style="color: #AB1604; margin-top: 0; border-bottom: 2px solid #AB1604; padding-bottom: 10px;">Contact Information</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px 0; font-weight: 600; color: #666;">Name:</td>
          <td style="padding: 8px 0;">${fullName}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: 600; color: #666;">Email:</td>
          <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #AB1604; text-decoration: none;">${email}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: 600; color: #666;">Phone:</td>
          <td style="padding: 8px 0;"><a href="tel:${fullPhone.replace(/\s/g, '')}" style="color: #AB1604; text-decoration: none;">${fullPhone}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: 600; color: #666;">Description:</td>
          <td style="padding: 8px 0; white-space: pre-wrap;">${description}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: 600; color: #666;">Form Source:</td>
          <td style="padding: 8px 0;"><span style="background: #AB1604; color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px;">${source}</span></td>
        </tr>
      </table>
    </div>
    
    ${tracking || ipAddress || location ? `
    <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
      <h2 style="color: #AB1604; margin-top: 0; border-bottom: 2px solid #AB1604; padding-bottom: 10px;">Tracking Information</h2>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        ${ipAddress ? `
        <tr>
          <td style="padding: 6px 0; font-weight: 600; color: #666;">IP Address:</td>
          <td style="padding: 6px 0;">${ipAddress}</td>
        </tr>
        ` : ''}
        ${location?.city || location?.region || location?.country_name ? `
        <tr>
          <td style="padding: 6px 0; font-weight: 600; color: #666;">Location:</td>
          <td style="padding: 6px 0;">${[location.city, location.region, location.country_name].filter(Boolean).join(', ')}</td>
        </tr>
        ` : ''}
        ${tracking?.referrer ? `
        <tr>
          <td style="padding: 6px 0; font-weight: 600; color: #666;">Referrer:</td>
          <td style="padding: 6px 0; word-break: break-all;">${tracking.referrer}</td>
        </tr>
        ` : ''}
        ${tracking?.utm_source ? `
        <tr>
          <td style="padding: 6px 0; font-weight: 600; color: #666;">UTM Source:</td>
          <td style="padding: 6px 0;">${tracking.utm_source}</td>
        </tr>
        ` : ''}
        ${tracking?.utm_medium ? `
        <tr>
          <td style="padding: 6px 0; font-weight: 600; color: #666;">UTM Medium:</td>
          <td style="padding: 6px 0;">${tracking.utm_medium}</td>
        </tr>
        ` : ''}
        ${tracking?.utm_campaign ? `
        <tr>
          <td style="padding: 6px 0; font-weight: 600; color: #666;">UTM Campaign:</td>
          <td style="padding: 6px 0;">${tracking.utm_campaign}</td>
        </tr>
        ` : ''}
        ${tracking?.device_type ? `
        <tr>
          <td style="padding: 6px 0; font-weight: 600; color: #666;">Device:</td>
          <td style="padding: 6px 0;">${tracking.device_type}</td>
        </tr>
        ` : ''}
        ${tracking?.browser_name ? `
        <tr>
          <td style="padding: 6px 0; font-weight: 600; color: #666;">Browser:</td>
          <td style="padding: 6px 0;">${tracking.browser_name}</td>
        </tr>
        ` : ''}
      </table>
    </div>
    ` : ''}
    
    <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
      <p style="margin: 0; color: #666; font-size: 14px;">
        <strong>Submitted:</strong> ${new Date(submittedAt).toLocaleString('en-US', { 
          dateStyle: 'full', 
          timeStyle: 'long' 
        })}
      </p>
    </div>
    
    <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #e9ecef; text-align: center; color: #6c757d; font-size: 12px;">
      <p style="margin: 0;">This is an automated notification from your website lead form.</p>
    </div>
    
  </div>
  
</body>
</html>
  `.trim();
}

interface ClientEmailProps {
  fullName: string;
  source: string;
}

// Map source to human-readable service name
function getServiceName(source: string): string {
  const serviceMap: Record<string, string> = {
    'home-consultation': 'immigration',
    'immigration': 'immigration',
    'driving': 'driving license',
    'driving-license': 'driving license',
    'companies': 'company registration',
    'company': 'company registration',
    'documents': 'documents',
  };
  return serviceMap[source.toLowerCase()] || 'our services';
}

export function ClientConfirmationEmail({
  fullName,
  source,
}: ClientEmailProps) {
  const firstName = fullName.split(' ')[0];
  const serviceName = getServiceName(source);
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>We Received Your Request</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background: #f8f9fa;">
  
  <div style="background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
    
    <div style="background: linear-gradient(135deg, #d42010 0%, #AB1604 50%, #8a1203 100%); padding: 40px 30px; text-align: center;">
      <h1 style="color: white; margin: 0 0 10px 0; font-size: 28px;">Thank You</h1>
      <p style="color: rgba(255,255,255,0.9); margin: 0; font-size: 16px;">We received your request</p>
    </div>
    
    <div style="padding: 40px 30px;">
      
      <p style="font-size: 16px; margin: 0 0 20px 0;">Hi ${firstName},</p>
      
      <p style="font-size: 16px; margin: 0 0 20px 0;">
        Thank you for reaching out regarding <strong>${serviceName}</strong>. Our team typically responds within 30 minutes during business hours.
      </p>
      
      <div style="background: #f8f9fa; border-left: 4px solid #AB1604; padding: 20px; border-radius: 4px; margin: 30px 0;">
        <h2 style="color: #AB1604; margin: 0 0 15px 0; font-size: 18px;">What happens next?</h2>
        <ul style="margin: 0; padding-left: 20px; color: #555;">
          <li style="margin-bottom: 10px;">We will reach out to you via <strong>${contactMethod}</strong></li>
          <li style="margin-bottom: 10px;">You will receive a detailed process overview and transparent pricing</li>
          <li style="margin-bottom: 10px;">We will start working on your case as soon as you confirm</li>
        </ul>
      </div>
      
      <div style="background: rgba(171, 22, 4, 0.05); padding: 20px; border-radius: 8px; margin: 30px 0; text-align: center;">
        <p style="margin: 0 0 15px 0; font-size: 14px; color: #333;">
          <strong>Need immediate assistance?</strong>
        </p>
        <p style="margin: 0; font-size: 14px; color: #555;">
          Skip the wait and contact us directly<br>
          <a href="https://wa.me/48538215997" style="color: #AB1604; text-decoration: none; font-weight: 600;">WhatsApp: +48 538 215 997</a><br>
          or<br>
          <a href="mailto:connect@foreigners.pl" style="color: #AB1604; text-decoration: none; font-weight: 600;">connect@foreigners.pl</a>
        </p>
      </div>
      
      <p style="font-size: 16px; margin: 30px 0 0 0;">
        Best regards,<br>
        <strong style="color: #AB1604;">Foreigners.pl Team</strong>
      </p>
      
    </div>
    
    <div style="background: #f8f9fa; padding: 20px 30px; text-align: center; border-top: 1px solid #e9ecef;">
      <p style="margin: 0 0 5px 0; font-size: 12px; color: #6c757d;">
        This is an automated confirmation email.
      </p>
      <p style="margin: 0; font-size: 12px; color: #6c757d;">
        Please do not reply to this email.
      </p>
    </div>
    
  </div>
  
</body>
</html>
  `.trim();
}
