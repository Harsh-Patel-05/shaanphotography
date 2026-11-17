import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'

type IntroContextValue = {
  introDone: boolean
  setIntroDone: (done: boolean) => void
}

const IntroContext = createContext<IntroContextValue | null>(null)

export function IntroProvider({ children }: { children: ReactNode }) {
  const [introDone, setIntroDone] = useState(false)
  const value = useMemo(() => ({ introDone, setIntroDone }), [introDone])
  return <IntroContext.Provider value={value}>{children}</IntroContext.Provider>
}

export function useIntro() {
  const ctx = useContext(IntroContext)
  if (!ctx) return { introDone: true, setIntroDone: () => {} }
  return ctx
}
