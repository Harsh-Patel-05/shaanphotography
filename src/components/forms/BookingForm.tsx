import { useState, type FormEvent } from 'react'
import { getWhatsAppLink } from '../../config/site'
import { serviceOptions } from '../../data/servicesData'
import { submitStudioInquiry } from '../../utils/submitInquiry'
import { hasErrors, required, validateEmail, validatePhone, type FieldErrors } from '../../utils/validation'
import { Button } from '../common/Button'
import { TextInput, TextSelect, TextTextarea } from './FormField'

type FormState = {
  fullName: string
  email: string
  mobile: string
  photographyType: string
  eventDate: string
  eventLocation: string
  budget: string
  details: string
}

const initial: FormState = {
  fullName: '',
  email: '',
  mobile: '',
  photographyType: '',
  eventDate: '',
  eventLocation: '',
  budget: '',
  details: '',
}

const budgetRanges = [
  'Prefer not to say',
  'Under ₹50,000',
  '₹50,000 – ₹1,00,000',
  '₹1,00,000 – ₹2,50,000',
  '₹2,50,000+',
]

export function BookingForm() {
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
      fullName: required(values.fullName, 'Full name'),
      email: validateEmail(values.email),
      mobile: validatePhone(values.mobile),
      photographyType: required(values.photographyType, 'Photography type'),
      eventDate: required(values.eventDate, 'Event date'),
      eventLocation: required(values.eventLocation, 'Event location'),
      details: required(values.details, 'Additional details'),
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
        formType: 'Booking request',
        subject: `NEW booking request — ${values.fullName} · ${values.photographyType}`,
        replyTo: values.email,
        clientName: values.fullName,
        fields: {
          Name: values.fullName,
          Email: values.email,
          Mobile: values.mobile,
          'Photography type': values.photographyType,
          'Event date': values.eventDate,
          'Event location': values.eventLocation,
          Budget: values.budget || 'Not shared',
          Details: values.details,
        },
      })
      setSuccess(true)
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : 'Could not send your booking request. Please try again.',
      )
    } finally {
      setSubmitting(false)
    }
  }

  if (success) {
    return (
      <div className="py-2 sm:py-4">
        <p className="text-[0.7rem] tracking-[0.22em] text-desert uppercase">Request sent</p>
        <h3 className="mt-3 font-serif text-3xl text-deep-brown">
          Got it, {values.fullName}.
        </h3>
        <p className="mt-4 max-w-lg text-sm leading-relaxed text-soft-gray">
          Your booking request was sent to the studio, and a confirmation email is on its way to{' '}
          {values.email}. I’ll reply soon with availability and next steps.
        </p>
        <dl className="mt-6 grid gap-3 border-t border-sand/80 pt-5 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-[0.62rem] tracking-[0.16em] text-soft-gray uppercase">Type</dt>
            <dd className="mt-1 text-deep-brown">{values.photographyType}</dd>
          </div>
          <div>
            <dt className="text-[0.62rem] tracking-[0.16em] text-soft-gray uppercase">Date</dt>
            <dd className="mt-1 text-deep-brown">{values.eventDate}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-[0.62rem] tracking-[0.16em] text-soft-gray uppercase">Location</dt>
            <dd className="mt-1 text-deep-brown">{values.eventLocation}</dd>
          </div>
        </dl>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button
            href={getWhatsAppLink(
              `Booking inquiry from ${values.fullName} for ${values.photographyType} on ${values.eventDate} at ${values.eventLocation}.`,
            )}
            target="_blank"
            rel="noreferrer"
          >
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
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div className="mb-2 border-b border-sand/80 pb-5">
        <p className="text-[0.68rem] tracking-[0.2em] text-desert uppercase">Inquiry form</p>
        <p className="mt-2 text-sm text-soft-gray">
          Required fields help me reply with a useful quote — budget is optional.
        </p>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <TextInput
          id="booking-name"
          label="Full Name"
          value={values.fullName}
          onChange={(e) => update('fullName', e.target.value)}
          error={errors.fullName}
          autoComplete="name"
        />
        <TextInput
          id="booking-email"
          label="Email"
          type="email"
          value={values.email}
          onChange={(e) => update('email', e.target.value)}
          error={errors.email}
          autoComplete="email"
        />
        <TextInput
          id="booking-mobile"
          label="Mobile Number"
          type="tel"
          value={values.mobile}
          onChange={(e) => update('mobile', e.target.value)}
          error={errors.mobile}
          autoComplete="tel"
        />
        <TextSelect
          id="booking-type"
          label="Photography Type"
          value={values.photographyType}
          onChange={(e) => update('photographyType', e.target.value)}
          error={errors.photographyType}
        >
          <option value="">Select type</option>
          {serviceOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </TextSelect>
        <TextInput
          id="booking-date"
          label="Event Date"
          type="date"
          value={values.eventDate}
          onChange={(e) => update('eventDate', e.target.value)}
          error={errors.eventDate}
        />
        <TextInput
          id="booking-location"
          label="Event Location"
          value={values.eventLocation}
          onChange={(e) => update('eventLocation', e.target.value)}
          error={errors.eventLocation}
        />
        <div className="md:col-span-2">
          <TextSelect
            id="booking-budget"
            label="Budget Range (optional)"
            value={values.budget}
            onChange={(e) => update('budget', e.target.value)}
          >
            <option value="">Select a range</option>
            {budgetRanges.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </TextSelect>
        </div>
      </div>
      <TextTextarea
        id="booking-details"
        label="Additional Details"
        value={values.details}
        onChange={(e) => update('details', e.target.value)}
        error={errors.details}
        placeholder="Anything helpful — guest count, venues, vibe, timelines..."
      />
      {submitError ? (
        <p className="text-sm text-red-700" role="alert">
          {submitError}
        </p>
      ) : null}
      <Button type="submit" disabled={submitting}>
        {submitting ? 'Sending…' : 'Request a Quote'}
      </Button>
    </form>
  )
}
