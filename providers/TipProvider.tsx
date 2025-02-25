'use client'

import { createContext, useContext, ReactNode } from 'react'
import useTip from '@/hooks/useTip'

const TipContext = createContext<ReturnType<typeof useTip> | undefined>(undefined)

export const TipProvider = ({ children }: { children: ReactNode }) => {
  const tip = useTip()

  return (
    <TipContext.Provider
      value={{
        ...tip,
      }}
    >
      {children}
    </TipContext.Provider>
  )
}

export const useTipProvider = () => {
  const context = useContext(TipContext)
  if (context === undefined) {
    throw new Error('useTipProvider must be used within a TipProvider')
  }
  return context
}
