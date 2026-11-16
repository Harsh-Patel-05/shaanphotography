import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react'

type BaseProps = {
  label: string
  error?: string
  hint?: string
}

export function FieldShell({
  label,
  error,
  hint,
  id,
  children,
}: BaseProps & { id: string; children: ReactNode }) {
  return (
    <label htmlFor={id} className="block">
      <span className="mb-2 block text-[0.7rem] tracking-[0.18em] text-soft-gray uppercase">
        {label}
      </span>
      {children}
      {hint && !error ? (
        <span className="mt-1.5 block text-xs text-soft-gray/80">{hint}</span>
      ) : null}
      {error ? (
        <span className="mt-1.5 block text-xs text-desert" role="alert">
          {error}
        </span>
      ) : null}
    </label>
  )
}

const controlClass =
  'w-full border border-sand bg-warm-white px-4 py-3 text-sm text-deep-brown outline-none transition placeholder:text-soft-gray/60 focus:border-camel'

export function TextInput({
  label,
  error,
  hint,
  id,
  ...props
}: BaseProps & InputHTMLAttributes<HTMLInputElement> & { id: string }) {
  return (
    <FieldShell label={label} error={error} hint={hint} id={id}>
      <input id={id} className={controlClass} {...props} />
    </FieldShell>
  )
}

export function TextSelect({
  label,
  error,
  hint,
  id,
  children,
  ...props
}: BaseProps &
  SelectHTMLAttributes<HTMLSelectElement> & { id: string; children: ReactNode }) {
  return (
    <FieldShell label={label} error={error} hint={hint} id={id}>
      <select id={id} className={controlClass} {...props}>
        {children}
      </select>
    </FieldShell>
  )
}

export function TextTextarea({
  label,
  error,
  hint,
  id,
  ...props
}: BaseProps & TextareaHTMLAttributes<HTMLTextAreaElement> & { id: string }) {
  return (
    <FieldShell label={label} error={error} hint={hint} id={id}>
      <textarea id={id} className={`${controlClass} min-h-32 resize-y`} {...props} />
    </FieldShell>
  )
}
