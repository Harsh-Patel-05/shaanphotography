import { siteConfig } from '../config/site'
import {
  buildPlainText,
  buildStudioNotifyHtml,
  buildUserConfirmHtml,
  type InquiryPayload,
} from './emailTemplates'

export type { InquiryPayload }

type SubmitResult = {
  ok: true
  message: string
}

/**
 * Sends:
 * 1) Branded HTML email (with logo) → studio Gmail
 * 2) Branded confirmation (with logo + studio details) → user
 *
 * Requires VITE_STUDIO_MAIL_ENDPOINT from Google Apps Script web app.
 * See scripts/studio-mail-apps-script.gs
 */
export async function submitStudioInquiry(
  payload: InquiryPayload,
): Promise<SubmitResult> {
  const endpoint = (import.meta.env.VITE_STUDIO_MAIL_ENDPOINT as string | undefined)?.trim()

  if (!endpoint) {
    throw new Error(
      'Email service is not connected yet. Please add VITE_STUDIO_MAIL_ENDPOINT in .env (see scripts/studio-mail-apps-script.gs).',
    )
  }

  const isBooking = payload.formType === 'Booking request'
  const body = {
    studioTo: siteConfig.contact.email,
    userTo: payload.replyTo,
    replyTo: payload.replyTo,
    subjectStudio: payload.subject,
    subjectUser: isBooking
      ? `We received your booking request — ${siteConfig.brand.name}`
      : `We received your message — ${siteConfig.brand.name}`,
    htmlStudio: buildStudioNotifyHtml(payload),
    htmlUser: buildUserConfirmHtml(payload),
    textStudio: buildPlainText(payload, 'studio'),
    textUser: buildPlainText(payload, 'user'),
  }

  const res = await fetch(endpoint, {
    method: 'POST',
    // text/plain avoids CORS preflight issues with Apps Script
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(body),
  })

  const data = (await res.json().catch(() => ({}))) as {
    ok?: boolean
    message?: string
  }

  if (!res.ok || data.ok === false) {
    throw new Error(
      data.message ||
        'Could not send your message right now. Please try WhatsApp or email.',
    )
  }

  return { ok: true, message: data.message || 'Emails sent successfully.' }
}
