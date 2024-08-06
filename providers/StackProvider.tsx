'use client'

import getLoginEvents from '@/lib/stack/getLoginPoints'
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

const StackContext = createContext(null)

const StackProvider = ({ children }) => {
  const [loginEvents, setLoginEvents] = useState(null)

  useEffect(() => {
    const init = async () => {
      const events = await getLoginEvents()

      setLoginEvents(events)
    }

    init()
  }, [])

  const value: any = useMemo(
    () => ({
      loginEvents,
    }),
    [loginEvents],
  )

  return <StackContext.Provider value={value}>{children}</StackContext.Provider>
}

export const useStackProvider = () => {
  const context = useContext(StackContext)
  if (!context) {
    throw new Error('useStackProvider must be used within a StackProvider')
  }
  return context
}

export default StackProvider
