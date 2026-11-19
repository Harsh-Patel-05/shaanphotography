import { getFullAddress, getWhatsAppLink, siteConfig } from '../config/site'

export type InquiryPayload = {
  formType: 'Contact note' | 'Booking request'
  subject: string
  replyTo: string
  clientName: string
  fields: Record<string, string>
}

/** Absolute white logo URL for dark email header (Gmail-safe). */
export function getEmailLogoUrl() {
  const base = siteConfig.urls.site.replace(/\/$/, '')
  return `${base}/brand/shaan-logo-email-white.png`
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function rowsHtml(rows: [string, string][]) {
  return rows
    .map(
      ([label, value]) => `
      <tr>
        <th style="width:34%;padding:14px 18px;text-align:left;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#7a6d61;background:#fbf8f3;border-bottom:1px solid #f0e7db;font-family:Arial,Helvetica,sans-serif;">${escapeHtml(label)}</th>
        <td style="padding:14px 18px;color:#2a1f1a;font-size:14px;line-height:1.55;border-bottom:1px solid #f0e7db;font-family:Arial,Helvetica,sans-serif;white-space:pre-wrap;">${escapeHtml(value)}</td>
      </tr>`,
    )
    .join('')
}

function shell(opts: {
  eyebrow: string
  title: string
  metaHtml: string
  tableRows: [string, string][]
  footer: string
}) {
  const logo = getEmailLogoUrl()
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /></head>
<body style="margin:0;padding:24px 12px;background:#ebe4da;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #d9cbb8;border-radius:16px;overflow:hidden;">
    <tr>
      <td style="background:linear-gradient(135deg,#2a1f1a,#5c4332);padding:28px 28px 22px;text-align:center;">
        <img src="${logo}" alt="Shaan Photography" width="160" style="display:inline-block;width:160px;max-width:70%;height:auto;margin:0 auto 14px;border:0;" />
        <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:#c19a6b;">${escapeHtml(opts.eyebrow)}</p>
        <h1 style="margin:12px 0 0;font-family:Georgia,'Times New Roman',serif;font-size:24px;line-height:1.25;font-weight:500;color:#faf7f2;">${escapeHtml(opts.title)}</h1>
      </td>
    </tr>
    <tr>
      <td style="padding:14px 28px;background:#fcfaf7;border-bottom:1px solid #efe6da;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#6d6258;">
        ${opts.metaHtml}
      </td>
    </tr>
    <tr>
      <td style="padding:0;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0">${rowsHtml(opts.tableRows)}</table>
      </td>
    </tr>
    <tr>
      <td style="padding:18px 28px 24px;background:#f8f3ec;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#7a6d61;line-height:1.6;">
        ${opts.footer}
      </td>
    </tr>
  </table>
</body>
</html>`
}

/** Email to Shaandigitalstudio@gmail.com */
export function buildStudioNotifyHtml(payload: InquiryPayload) {
  return shell({
    eyebrow: 'Shaan Photography · New website inquiry',
    title: payload.subject,
    metaHtml: `
      <div><strong style="color:#2a1f1a;">Status:</strong> NEW inquiry</div>
      <div style="margin-top:4px;"><strong style="color:#2a1f1a;">Reply-To:</strong> ${escapeHtml(payload.replyTo)}</div>
      <div style="margin-top:4px;"><strong style="color:#2a1f1a;">Form:</strong> ${escapeHtml(payload.formType)}</div>
    `,
    tableRows: [
      ['Client name', payload.clientName],
      ['Client email', payload.replyTo],
      ['Form type', payload.formType],
      ...Object.entries(payload.fields),
    ],
    footer:
      'Reply to this email to respond directly to the client. Sent from the Shaan Photography website.',
  })
}

/** Confirmation email to the user */
export function buildUserConfirmHtml(payload: InquiryPayload) {
  const isBooking = payload.formType === 'Booking request'
  const intro = isBooking
    ? 'Thank you for your booking request. I’ve received your details and will get back to you shortly with availability and next steps.'
    : 'Thank you for writing in. I’ve received your note and will get back to you soon — usually within a day.'

  return shell({
    eyebrow: 'Shaan Photography · Message received',
    title: `Thanks, ${payload.clientName}`,
    metaHtml: `
      <div>${escapeHtml(intro)}</div>
      <div style="margin-top:8px;"><strong style="color:#2a1f1a;">Your email:</strong> ${escapeHtml(payload.replyTo)}</div>
    `,
    tableRows: Object.entries(payload.fields),
    footer: `
      <strong style="color:#2a1f1a;">${escapeHtml(siteConfig.brand.name)}</strong><br/>
      ${escapeHtml(siteConfig.brand.tagline)}<br/><br/>
      Studio: ${escapeHtml(getFullAddress())}<br/>
      Email: ${escapeHtml(siteConfig.contact.email)}<br/>
      Phone: ${escapeHtml(siteConfig.contact.phone)}<br/>
      WhatsApp: <a href="${getWhatsAppLink()}" style="color:#a67b52;">Chat on WhatsApp</a><br/>
      Instagram: <a href="${siteConfig.social.instagram}" style="color:#a67b52;">${escapeHtml(siteConfig.social.instagramHandle)}</a><br/>
      Website: <a href="${siteConfig.urls.site}" style="color:#a67b52;">${escapeHtml(siteConfig.urls.site)}</a><br/><br/>
      Warm regards,<br/>Shaan
    `,
  })
}

export function buildPlainText(payload: InquiryPayload, kind: 'studio' | 'user') {
  const lines = [
    kind === 'studio' ? 'NEW website inquiry' : `Thanks, ${payload.clientName}`,
    payload.subject,
    '',
    ...Object.entries(payload.fields).map(([k, v]) => `${k}: ${v}`),
    '',
    siteConfig.brand.name,
    siteConfig.contact.email,
    siteConfig.contact.phone,
    siteConfig.urls.site,
  ]
  return lines.join('\n')
}
