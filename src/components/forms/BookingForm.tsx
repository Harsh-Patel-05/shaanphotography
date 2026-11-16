import { useState, type FormEvent } from 'react'
import { getMailtoLink, getWhatsAppLink } from '../../config/site'
import { serviceOptions } from '../../data/servicesData'
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

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setSuccess(true)
  }

  if (success) {
    return (
      <div className="border border-sand bg-warm-white p-8 sm:p-10">
        <p className="text-[0.7rem] tracking-[0.22em] text-desert uppercase">Booking</p>
        <h3 className="mt-3 font-serif text-3xl text-deep-brown">
          Got it, {values.fullName}.
        </h3>
        <p className="mt-4 max-w-lg text-sm leading-relaxed text-soft-gray">
          Your details are ready here. Jump to WhatsApp or email next so we can talk dates and
          finalize everything.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button
            href={getWhatsAppLink(
              `Booking inquiry from ${values.fullName} for ${values.photographyType} on ${values.eventDate} at ${values.eventLocation}.`,
            )}
            target="_blank"
            rel="noreferrer"
          >
            Continue on WhatsApp
          </Button>
          <Button href={getMailtoLink(`Booking inquiry — ${values.fullName}`)} variant="secondary">
            Email Studio
          </Button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5 border border-sand bg-warm-white p-6 sm:p-8 md:p-10">
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
      <Button type="submit">Request a Quote</Button>
    </form>
  )
}
