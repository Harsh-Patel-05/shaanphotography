export type FieldErrors = Record<string, string>

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phonePattern = /^[+]?[\d\s()-]{8,}$/

export function required(value: string, label: string) {
  if (!value.trim()) return `${label} is required.`
  return ''
}

export function validateEmail(value: string) {
  if (!value.trim()) return 'Email is required.'
  if (!emailPattern.test(value.trim())) return 'Enter a valid email address.'
  return ''
}

export function validatePhone(value: string) {
  if (!value.trim()) return 'Phone number is required.'
  if (!phonePattern.test(value.trim())) return 'Enter a valid phone number.'
  return ''
}

export function hasErrors(errors: FieldErrors) {
  return Object.values(errors).some(Boolean)
}
