'use client'

import usePurchase from '@/hooks/usePurchase'
import React, { createContext, useContext, useMemo } from 'react'

const PurchaseContext = createContext<ReturnType<typeof usePurchase>>(
  {} as ReturnType<typeof usePurchase>,
)

const PurchaseProvider = ({ children }: { children: React.ReactNode }) => {
  const purchase = usePurchase()

  const value = useMemo(() => ({ ...purchase }), [purchase])

  return <PurchaseContext.Provider value={value}>{children}</PurchaseContext.Provider>
}

const usePurchaseProvider = () => {
  const context = useContext(PurchaseContext)
  if (!context) {
    throw new Error('usePurchaseProvider must be used within a PurchaseProvider')
  }
  return context
}

export { PurchaseProvider, usePurchaseProvider }
