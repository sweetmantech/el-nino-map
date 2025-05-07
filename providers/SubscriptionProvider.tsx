'use client'

import { createContext, useContext, ReactNode } from 'react'
import useSubscribe from '@/hooks/useSubscribe'
import useSubscriptionInfo from '@/hooks/useSubscriptionInfo'

const SubscriptionContext = createContext<
  (ReturnType<typeof useSubscribe> & ReturnType<typeof useSubscriptionInfo>) | undefined
>(undefined)

export const SubscriptionProvider = ({ children }: { children: ReactNode }) => {
  const subscribe = useSubscribe()
  const subscriptionInfo = useSubscriptionInfo()

  return (
    <SubscriptionContext.Provider
      value={{
        ...subscribe,
        ...subscriptionInfo,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  )
}

export const useSubscriptionProvider = () => {
  const context = useContext(SubscriptionContext)
  if (context === undefined) {
    throw new Error('useSubscriptionProvider must be used within a SubscriptionProvider')
  }
  return context
}
