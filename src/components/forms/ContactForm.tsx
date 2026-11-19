import { useState, type FormEvent } from 'react'
import { getMailtoLink, getWhatsAppLink, siteConfig } from '../../config/site'
import { serviceOptions } from '../../data/servicesData'
import { submitStudioInquiry } from '../../utils/submitInquiry'
import { hasErrors, required, validateEmail, validatePhone, type FieldErrors } from '../../utils/validation'
import { Button } from '../common/Button'
import { TextInput, TextSelect, TextTextarea } from './FormField'

type FormState = {
  name: string
  email: string
  phone: string
  service: string
  eventDate: string
  location: string
  message: string
}

const initial: FormState = {
  name: '',
  email: '',
  phone: '',
  service: '',
  eventDate: '',
  location: '',
  message: '',
}

export function ContactForm() {
  const [values, setValues] = useState<FormState>(initial)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [success, setSuccess] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const update = (key: keyof FormState, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }))
  }

  const validate = () => {
    const next: FieldErrors = {
      name: required(values.name, 'Name'),
      email: validateEmail(values.email),
      phone: validatePhone(values.phone),
      service: required(values.service, 'Photography service'),
      message: required(values.message, 'Message'),
    }
    setErrors(next)
    return !hasErrors(next)
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setSubmitting(true)
    setSubmitError('')

    try {
      await submitStudioInquiry({
        formType: 'Contact note',
        subject: `NEW contact inquiry — ${values.name} · ${values.service}`,
        replyTo: values.email,
        clientName: values.name,
        fields: {
          Name: values.name,
          Email: values.email,
          Phone: values.phone,
          Service: values.service,
          'Event date': values.eventDate || 'Not shared',
          Location: values.location || 'Not shared',
          Message: values.message,
        },
      })
      setSuccess(true)
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : 'Could not send your note. Please try again.',
      )
    } finally {
      setSubmitting(false)
    }
  }

  if (success) {
    return (
      <div className="border border-sand bg-warm-white p-8 sm:p-10">
        <p className="text-[0.7rem] tracking-[0.22em] text-desert uppercase">Message sent</p>
        <h3 className="mt-3 font-serif text-3xl text-deep-brown">Thanks, {values.name}.</h3>
        <p className="mt-4 max-w-lg text-sm leading-relaxed text-soft-gray">
          Your note was sent to the studio, and a confirmation email is on its way to{' '}
          {values.email}. I’ll get back to you soon — usually within a day.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href={getWhatsAppLink(`Hi, I'm ${values.name}. ${values.message}`)} target="_blank" rel="noreferrer">
            Also message on WhatsApp
          </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              setSuccess(false)
              setValues(initial)
              setSubmitError('')
            }}
          >
            Send another
          </Button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5 border border-sand bg-warm-white p-6 sm:p-8 md:p-10">
      <div className="grid gap-5 md:grid-cols-2">
        <TextInput
          id="contact-name"
          label="Name"
          value={values.name}
          onChange={(e) => update('name', e.target.value)}
          error={errors.name}
          autoComplete="name"
        />
        <TextInput
          id="contact-email"
          label="Email"
          type="email"
          value={values.email}
          onChange={(e) => update('email', e.target.value)}
          error={errors.email}
          autoComplete="email"
        />
        <TextInput
          id="contact-phone"
          label="Phone"
          type="tel"
          value={values.phone}
          onChange={(e) => update('phone', e.target.value)}
          error={errors.phone}
          autoComplete="tel"
        />
        <TextSelect
          id="contact-service"
          label="Photography Service"
          value={values.service}
          onChange={(e) => update('service', e.target.value)}
          error={errors.service}
        >
          <option value="">Select a service</option>
          {serviceOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </TextSelect>
        <TextInput
          id="contact-date"
          label="Event Date"
          type="date"
          value={values.eventDate}
          onChange={(e) => update('eventDate', e.target.value)}
        />
        <TextInput
          id="contact-location"
          label="Location"
          value={values.location}
          onChange={(e) => update('location', e.target.value)}
          placeholder="City or venue name"
        />
      </div>
      <TextTextarea
        id="contact-message"
        label="Message"
        value={values.message}
        onChange={(e) => update('message', e.target.value)}
        error={errors.message}
        placeholder="A few lines about your day or shoot..."
      />
      {submitError ? (
        <p className="text-sm text-red-700" role="alert">
          {submitError}
        </p>
      ) : null}
      <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" disabled={submitting}>
          {submitting ? 'Sending…' : 'Submit Inquiry'}
        </Button>
        <div className="flex flex-wrap gap-4 text-xs tracking-[0.14em] text-soft-gray uppercase">
          <a href={getWhatsAppLink()} target="_blank" rel="noreferrer" className="hover:text-chocolate">
            WhatsApp
          </a>
          <a href={siteConfig.social.instagram} target="_blank" rel="noreferrer" className="hover:text-chocolate">
            Instagram
          </a>
          <a href={siteConfig.social.threads} target="_blank" rel="noreferrer" className="hover:text-chocolate">
            Threads
          </a>
          <a href={getMailtoLink()} className="hover:text-chocolate">
            Email
          </a>
        </div>
      </div>
    </form>
  )
}
