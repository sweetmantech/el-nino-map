'use client'

import { createContext, useContext, ReactNode } from 'react'
import useSubscriptionInfo from '@/hooks/useSubscriptionInfo'

const SubscriptionContext = createContext<ReturnType<typeof useSubscriptionInfo> | undefined>(
  undefined,
)

export const SubscriptionProvider = ({ children }: { children: ReactNode }) => {
  const subscriptionInfo = useSubscriptionInfo()

  return (
    <SubscriptionContext.Provider
      value={{
        ...subscriptionInfo,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  )
}

export const useSubscriptionInfoProvider = () => {
  const context = useContext(SubscriptionContext)
  if (context === undefined) {
    throw new Error('useSubscriptionInfoProvider must be used within a SubscriptionProvider')
  }
  return context
}
